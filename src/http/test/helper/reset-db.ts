import { prisma } from "../../../lib/prisma";

export default async () => {
  await prisma.$transaction([
    prisma.task.deleteMany(),
    prisma.user.deleteMany(),
  ]);
};
