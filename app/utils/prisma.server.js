import { PrismaClient } from "@prisma/client";

let db;

if (!global.__db__) {
  global.__db__ = new PrismaClient();
}
db = global.__db__;
db.$connect();

export { db };
