/*
  Warnings:

  - The primary key for the `usuario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `usuario` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `usuarioId` on the `conquista_usuario` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `usuarioId` on the `habilidade_usuario` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `usuarioId` on the `insignia_usuario` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `usuarioId` on the `ranking` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `usuarioId` on the `resposta_usuario` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `usuarioId` on the `tema_usuario` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `usuarioId` on the `token` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `usuarioId` on the `trilha_usuario` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "conquista_usuario" DROP CONSTRAINT "conquista_usuario_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "habilidade_usuario" DROP CONSTRAINT "habilidade_usuario_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "insignia_usuario" DROP CONSTRAINT "insignia_usuario_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "ranking" DROP CONSTRAINT "ranking_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "resposta_usuario" DROP CONSTRAINT "resposta_usuario_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "tema_usuario" DROP CONSTRAINT "tema_usuario_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "token" DROP CONSTRAINT "token_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "trilha_usuario" DROP CONSTRAINT "trilha_usuario_usuarioId_fkey";

-- AlterTable
ALTER TABLE "conquista_usuario" DROP COLUMN "usuarioId",
ADD COLUMN     "usuarioId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "habilidade_usuario" DROP COLUMN "usuarioId",
ADD COLUMN     "usuarioId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "insignia_usuario" DROP COLUMN "usuarioId",
ADD COLUMN     "usuarioId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ranking" DROP COLUMN "usuarioId",
ADD COLUMN     "usuarioId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "resposta_usuario" DROP COLUMN "usuarioId",
ADD COLUMN     "usuarioId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "tema_usuario" DROP COLUMN "usuarioId",
ADD COLUMN     "usuarioId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "token" DROP COLUMN "usuarioId",
ADD COLUMN     "usuarioId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "trilha_usuario" DROP COLUMN "usuarioId",
ADD COLUMN     "usuarioId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "usuario" DROP CONSTRAINT "usuario_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "usuario_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "resposta_usuario_usuarioId_questaoId_key" ON "resposta_usuario"("usuarioId", "questaoId");

-- CreateIndex
CREATE UNIQUE INDEX "tema_usuario_usuarioId_temaId_key" ON "tema_usuario"("usuarioId", "temaId");

-- CreateIndex
CREATE UNIQUE INDEX "trilha_usuario_usuarioId_trilhaId_key" ON "trilha_usuario"("usuarioId", "trilhaId");

-- AddForeignKey
ALTER TABLE "tema_usuario" ADD CONSTRAINT "tema_usuario_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resposta_usuario" ADD CONSTRAINT "resposta_usuario_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trilha_usuario" ADD CONSTRAINT "trilha_usuario_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conquista_usuario" ADD CONSTRAINT "conquista_usuario_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "habilidade_usuario" ADD CONSTRAINT "habilidade_usuario_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "insignia_usuario" ADD CONSTRAINT "insignia_usuario_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ranking" ADD CONSTRAINT "ranking_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "token" ADD CONSTRAINT "token_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
