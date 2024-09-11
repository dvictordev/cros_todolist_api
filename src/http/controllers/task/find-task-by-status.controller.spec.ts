import request from "supertest";
import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { app } from "../../../app";
import { prisma } from "../../../lib/prisma";
import { hash } from "bcryptjs";

describe("Find many tasks by status (e2e)", () => {
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
  it("should be able to register", async () => {
    const user = await prisma.user.create({
      data: {
        name: "first task",
        email: "test-find-by-status@example.com",
        password: await hash("123456", 6),
      },
    });

    await prisma.task.create({
      data: {
        status: true,
        title: "teste",
        userId: user.id,
      },
    });

    await prisma.task.create({
      data: {
        status: false,
        title: "teste",
        userId: user.id,
      },
    });

    const authResponse = await request(app).post("/login").send({
      email: "test-find-by-status@example.com",
      password: "123456",
    });

    const { token } = authResponse.body;

    const { body } = await request(app)
      .get("/task")
      .set("Authorization", `Bearer ${token}`)
      .send({
        status: false,
      });

    expect(body).toHaveProperty("tasks");
    expect(body.tasks).toHaveLength(1);
  });
});
