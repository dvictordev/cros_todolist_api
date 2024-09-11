import request from "supertest";
import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { app } from "../../../app";
import { prisma } from "../../../lib/prisma";
import { hash } from "bcryptjs";
import resetDb from "../../test/helper/reset-db";

describe("Create task (e2e)", () => {
  afterAll(async () => {
    await resetDb();
  });

  it("should be able to register", async () => {
    await prisma.user.create({
      data: {
        name: "first task",
        email: "test-create@example.com",
        password: await hash("123456", 6),
      },
    });

    const authResponse = await request(app).post("/login").send({
      email: "test-create@example.com",
      password: "123456",
    });

    const { token } = authResponse.body;

    const { body, status } = await request(app)
      .post("/task")
      .set("Authorization", `Bearer ${token}`)
      .send({
        status: false,
        title: "Criar testes end to end",
        description: "Criar teste end to end para a crosoften",
      });

    expect(status).toEqual(201);
  });
});
