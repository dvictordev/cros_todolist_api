import request from "supertest";
import { afterAll, describe, expect, it } from "vitest";
import { app } from "../../../app";
import { prisma } from "../../../lib/prisma";
import { hash } from "bcryptjs";
import resetDb from "../../test/helper/reset-db";

describe("Create task (e2e)", () => {
  afterAll(async () => {
    await resetDb();
  });

  it("should be able to update a task", async () => {
    const user = await prisma.user.create({
      data: {
        name: "first task",
        email: "test-update@example.com",
        password: await hash("123456", 6),
      },
    });

    const task = await prisma.task.create({
      data: {
        status: false,
        title: "teste",
        userId: user.id,
      },
    });

    const authResponse = await request(app).post("/login").send({
      email: "test-update@example.com",
      password: "123456",
    });

    const { token } = authResponse.body;

    const { body } = await request(app)
      .put("/task")
      .set("Authorization", `Bearer ${token}`)
      .send({
        status: true,
        taskId: task.id,
      });

    expect(body).toHaveProperty("id");
    expect(body.status).toEqual(true);
  });
});
