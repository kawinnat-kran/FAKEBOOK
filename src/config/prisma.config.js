import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

// คำสั่งใช้เช็คว่า prisma client ใช้งานได้ไหม propmt node src/config/prisma.config.js
// prisma.$queryRaw`SHOW TABLES`.then((rs) => console.log(rs));

export default prisma;
