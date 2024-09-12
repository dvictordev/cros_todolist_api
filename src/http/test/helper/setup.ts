import { execSync } from "child_process";
import { PrismaClient } from "@prisma/client";
import { afterEach, beforeEach } from "vitest";
import { env } from "../../../env";

const prisma = new PrismaClient();

beforeEach(async () => {
  const dbName = `test_${Date.now()}`;
  env.DATABASE_URL = `mysql://root:password@localhost:3306/${dbName}`;
  execSync(`mysql -u root -e "CREATE DATABASE ${dbName};"`);
  await prisma.$connect();
  await prisma.$executeRaw`CREATE SCHEMA public`;
});

afterEach(async () => {
  const dbName = env.DATABASE_URL.split("/").pop();
  await prisma.$disconnect();
  execSync(`mysql -u root -e "DROP DATABASE ${dbName};"`);
});
