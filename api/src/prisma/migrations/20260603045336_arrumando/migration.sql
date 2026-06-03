-- DropForeignKey
ALTER TABLE "token" DROP CONSTRAINT "token_usuarioId_fkey";

-- AddForeignKey
ALTER TABLE "token" ADD CONSTRAINT "token_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
