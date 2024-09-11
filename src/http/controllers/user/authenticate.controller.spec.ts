import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import { app } from "../../../app";
import { prisma } from "../../../lib/prisma";
import { hash } from "bcryptjs";

describe("Authenticate (e2e)", () => {
  beforeEach(async () => {
    try {
      await prisma.$transaction([
        prisma.task.deleteMany(),
        prisma.user.deleteMany(),
      ]);
    } catch (error) {
      console.error("Erro ao limpar o banco de dados antes do teste:", error);
    }
  });
  it("should be able to authenticate", async () => {
    await prisma.user.create({
      data: {
        name: "john doe",
        email: "johndoe@example.com",
        password: await hash("123456", 6),
      },
    });

    const authResponse = await request(app).post("/login").send({
      email: "johndoe@example.com",
      password: "123456",
    });

    const { token } = authResponse.body;

    expect(token).toEqual(expect.any(String));
  });
});
