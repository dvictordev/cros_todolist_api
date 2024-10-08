import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import { app } from "../../../app";
import { prisma } from "../../../lib/prisma";

describe("Register (e2e)", () => {
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
  it("should be able to register", async () => {
    const response = await request(app).post("/user").send({
      name: "1123",
      email: "teste@gmail.com",
      password: "12345",
    });
    expect(response.status).toEqual(201);
  });
});
