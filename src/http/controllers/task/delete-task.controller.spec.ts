import request from "supertest";
import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { app } from "../../../app";
import { prisma } from "../../../lib/prisma";
import { hash } from "bcryptjs";
import resetDb from "../../test/helper/reset-db";

describe("Delete task (e2e)", () => {
  afterAll(async () => {
    try {
      await prisma.$transaction([
        prisma.task.deleteMany(),
        prisma.user.deleteMany(),
      ]);
    } catch (error) {
      console.error("Erro ao limpar o banco de dados antes do teste:", error);
    }
  });

  it("should be able to delete a task", async () => {
    const user = await prisma.user.create({
      data: {
        name: "first task",
        email: "test-delete@example.com",
        password: await hash("123456", 6),
      },
    });

    const authResponse = await request(app).post("/login").send({
      email: "test-delete@example.com",
      password: "123456",
    });

    const { token } = authResponse.body;

    const task = await prisma.task.create({
      data: {
        status: false,
        title: "teste",
        userId: user.id,
      },
    });

    const deleteResponse = await request(app)
      .delete(`/task`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        taskId: task.id,
      });

    expect(deleteResponse.status).toEqual(201);
    expect(deleteResponse.body.message).toEqual("Task deleted successfully");
  });
});
