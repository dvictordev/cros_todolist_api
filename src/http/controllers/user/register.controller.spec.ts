import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../app";
import { prisma } from "../../../lib/prisma";

describe("Register (e2e)", () => {
  afterAll(async () => {
    const deletedUsers = prisma.user.deleteMany();
    const deletedTasks = prisma.task.deleteMany();

    await prisma.$transaction([deletedUsers, deletedTasks]);

    await prisma.$disconnect();
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
