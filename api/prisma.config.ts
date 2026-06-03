import "dotenv/config";
import { defineConfig } from "prisma/config";



export default defineConfig({
  schema: "src/prisma/schema.prisma",
  migrations: {
    path: "src/prisma/migrations",
  },
  datasource: {
    url: "postgresql://postgres:senai@localhost:5432/dev-level?schema=public",
  }
});
