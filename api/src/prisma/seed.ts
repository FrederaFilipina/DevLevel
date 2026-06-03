import fs from "fs";
import path from "path";
import { Client } from "pg";
import "dotenv/config";

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function main() {
  await client.connect();

  const sqlDir = path.join(process.cwd(), "sql");

  const files = fs
    .readdirSync(sqlDir)
    .filter(file => file.endsWith(".sql"))
    .sort();

  for (const file of files) {
    console.log(`Executando ${file}`);

    const sql = fs.readFileSync(
      path.join(sqlDir, file),
      "utf8"
    );

    await client.query(sql);
  }

  await client.end();

  console.log("Seed concluído!");
}

main().catch(console.error);