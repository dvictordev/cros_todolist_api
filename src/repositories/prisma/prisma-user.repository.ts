import { Task, User } from "@prisma/client";
import { CreateTaskUseCaseRequest } from "../../use-cases/create-task";
import { TaskRepositoryInterface } from "../task-interface.repository";
import { UsersRepositoryInterface } from "../user-interface.repository";
import { RegisterUseCaseProps } from "../../use-cases/register";
import { prisma } from "../../lib/prisma";

export class PrismaUserRepository implements UsersRepositoryInterface {
  async create(data: RegisterUseCaseProps): Promise<User> {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    return user;
  }
}
