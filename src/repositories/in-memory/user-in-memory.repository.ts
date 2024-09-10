import { Prisma, User } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { UsersRepositoryInterface } from "../user-interface.repository";

export class InMemoryUserRepository implements UsersRepositoryInterface {
  public items: User[] = [];

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user: User = {
      id: randomUUID(),
      email: data.email,
      name: data.name,
      password: data.password,
    };

    this.items.push(user);

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((item) => {
      return item.email === email;
    });

    if (!user) {
      return null;
    }

    return user;
  }
}
