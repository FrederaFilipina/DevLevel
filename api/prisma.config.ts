import "dotenv/config";
import { defineConfig } from "prisma/config";



export default defineConfig({
  schema: "src/prisma/schema.prisma",
  migrations: {
    path: "src/prisma/migrations",
    seed: "tsx src/prisma/seed.ts",
  },
  datasource: {
    url: "postgresql://postgres:senai@localhost:5432/dev-level?schema=public",
  }
});
