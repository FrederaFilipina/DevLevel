/*
  Warnings:

  - The primary key for the `conquista` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `conquista` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `conquista_usuario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `conquista_usuario` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `habilidade` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `habilidade` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `habilidade_usuario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `habilidade_usuario` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `modulo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `modulo` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `questao` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `questao` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `resposta_questao` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `resposta_questao` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `resposta_usuario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `resposta_usuario` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `tema` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `tema` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `tema_usuario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `tema_usuario` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `trilha` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `trilha` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `trilhaAnteriorId` column on the `trilha` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `trilha_usuario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `trilha_usuario` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `moduloAtualId` column on the `trilha_usuario` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `questaoAtualId` column on the `trilha_usuario` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `usuario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `usuario` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `usuarioId` on the `conquista_usuario` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `conquistaId` on the `conquista_usuario` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `usuarioId` on the `habilidade_usuario` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `habilidadeId` on the `habilidade_usuario` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `trilhaId` on the `modulo` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `moduloId` on the `questao` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `questaoId` on the `resposta_questao` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `usuarioId` on the `resposta_usuario` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `questaoId` on the `resposta_usuario` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `respostaQuestaoId` on the `resposta_usuario` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `usuarioId` on the `tema_usuario` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `temaId` on the `tema_usuario` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `usuarioId` on the `token` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `temaId` on the `trilha` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `usuarioId` on the `trilha_usuario` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `trilhaId` on the `trilha_usuario` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "conquista_usuario" DROP CONSTRAINT "conquista_usuario_conquistaId_fkey";

-- DropForeignKey
ALTER TABLE "conquista_usuario" DROP CONSTRAINT "conquista_usuario_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "habilidade_usuario" DROP CONSTRAINT "habilidade_usuario_habilidadeId_fkey";

-- DropForeignKey
ALTER TABLE "habilidade_usuario" DROP CONSTRAINT "habilidade_usuario_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "modulo" DROP CONSTRAINT "modulo_trilhaId_fkey";

-- DropForeignKey
ALTER TABLE "questao" DROP CONSTRAINT "questao_moduloId_fkey";

-- DropForeignKey
ALTER TABLE "resposta_questao" DROP CONSTRAINT "resposta_questao_questaoId_fkey";

-- DropForeignKey
ALTER TABLE "resposta_usuario" DROP CONSTRAINT "resposta_usuario_questaoId_fkey";

-- DropForeignKey
ALTER TABLE "resposta_usuario" DROP CONSTRAINT "resposta_usuario_respostaQuestaoId_fkey";

-- DropForeignKey
ALTER TABLE "resposta_usuario" DROP CONSTRAINT "resposta_usuario_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "tema_usuario" DROP CONSTRAINT "tema_usuario_temaId_fkey";

-- DropForeignKey
ALTER TABLE "tema_usuario" DROP CONSTRAINT "tema_usuario_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "token" DROP CONSTRAINT "token_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "trilha" DROP CONSTRAINT "trilha_temaId_fkey";

-- DropForeignKey
ALTER TABLE "trilha" DROP CONSTRAINT "trilha_trilhaAnteriorId_fkey";

-- DropForeignKey
ALTER TABLE "trilha_usuario" DROP CONSTRAINT "trilha_usuario_trilhaId_fkey";

-- DropForeignKey
ALTER TABLE "trilha_usuario" DROP CONSTRAINT "trilha_usuario_usuarioId_fkey";

-- AlterTable
ALTER TABLE "conquista" DROP CONSTRAINT "conquista_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "conquista_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "conquista_usuario" DROP CONSTRAINT "conquista_usuario_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "usuarioId",
ADD COLUMN     "usuarioId" INTEGER NOT NULL,
DROP COLUMN "conquistaId",
ADD COLUMN     "conquistaId" INTEGER NOT NULL,
ADD CONSTRAINT "conquista_usuario_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "habilidade" DROP CONSTRAINT "habilidade_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "habilidade_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "habilidade_usuario" DROP CONSTRAINT "habilidade_usuario_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "usuarioId",
ADD COLUMN     "usuarioId" INTEGER NOT NULL,
DROP COLUMN "habilidadeId",
ADD COLUMN     "habilidadeId" INTEGER NOT NULL,
ADD CONSTRAINT "habilidade_usuario_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "modulo" DROP CONSTRAINT "modulo_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "trilhaId",
ADD COLUMN     "trilhaId" INTEGER NOT NULL,
ADD CONSTRAINT "modulo_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "questao" DROP CONSTRAINT "questao_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "moduloId",
ADD COLUMN     "moduloId" INTEGER NOT NULL,
ADD CONSTRAINT "questao_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "resposta_questao" DROP CONSTRAINT "resposta_questao_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "questaoId",
ADD COLUMN     "questaoId" INTEGER NOT NULL,
ADD CONSTRAINT "resposta_questao_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "resposta_usuario" DROP CONSTRAINT "resposta_usuario_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "usuarioId",
ADD COLUMN     "usuarioId" INTEGER NOT NULL,
DROP COLUMN "questaoId",
ADD COLUMN     "questaoId" INTEGER NOT NULL,
DROP COLUMN "respostaQuestaoId",
ADD COLUMN     "respostaQuestaoId" INTEGER NOT NULL,
ADD CONSTRAINT "resposta_usuario_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "tema" DROP CONSTRAINT "tema_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "tema_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "tema_usuario" DROP CONSTRAINT "tema_usuario_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "usuarioId",
ADD COLUMN     "usuarioId" INTEGER NOT NULL,
DROP COLUMN "temaId",
ADD COLUMN     "temaId" INTEGER NOT NULL,
ADD CONSTRAINT "tema_usuario_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "token" DROP COLUMN "usuarioId",
ADD COLUMN     "usuarioId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "trilha" DROP CONSTRAINT "trilha_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "temaId",
ADD COLUMN     "temaId" INTEGER NOT NULL,
DROP COLUMN "trilhaAnteriorId",
ADD COLUMN     "trilhaAnteriorId" INTEGER,
ADD CONSTRAINT "trilha_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "trilha_usuario" DROP CONSTRAINT "trilha_usuario_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "usuarioId",
ADD COLUMN     "usuarioId" INTEGER NOT NULL,
DROP COLUMN "trilhaId",
ADD COLUMN     "trilhaId" INTEGER NOT NULL,
DROP COLUMN "moduloAtualId",
ADD COLUMN     "moduloAtualId" INTEGER,
DROP COLUMN "questaoAtualId",
ADD COLUMN     "questaoAtualId" INTEGER,
ADD CONSTRAINT "trilha_usuario_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "usuario" DROP CONSTRAINT "usuario_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "usuario_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "habilidade_usuario_usuarioId_habilidadeId_key" ON "habilidade_usuario"("usuarioId", "habilidadeId");

-- CreateIndex
CREATE UNIQUE INDEX "modulo_trilhaId_ordem_key" ON "modulo"("trilhaId", "ordem");

-- CreateIndex
CREATE UNIQUE INDEX "questao_moduloId_ordem_key" ON "questao"("moduloId", "ordem");

-- CreateIndex
CREATE UNIQUE INDEX "resposta_usuario_usuarioId_questaoId_key" ON "resposta_usuario"("usuarioId", "questaoId");

-- CreateIndex
CREATE UNIQUE INDEX "tema_usuario_usuarioId_temaId_key" ON "tema_usuario"("usuarioId", "temaId");

-- CreateIndex
CREATE UNIQUE INDEX "trilha_temaId_ordem_key" ON "trilha"("temaId", "ordem");

-- CreateIndex
CREATE UNIQUE INDEX "trilha_usuario_usuarioId_trilhaId_key" ON "trilha_usuario"("usuarioId", "trilhaId");

-- AddForeignKey
ALTER TABLE "tema_usuario" ADD CONSTRAINT "tema_usuario_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tema_usuario" ADD CONSTRAINT "tema_usuario_temaId_fkey" FOREIGN KEY ("temaId") REFERENCES "tema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trilha" ADD CONSTRAINT "trilha_temaId_fkey" FOREIGN KEY ("temaId") REFERENCES "tema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trilha" ADD CONSTRAINT "trilha_trilhaAnteriorId_fkey" FOREIGN KEY ("trilhaAnteriorId") REFERENCES "trilha"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "modulo" ADD CONSTRAINT "modulo_trilhaId_fkey" FOREIGN KEY ("trilhaId") REFERENCES "trilha"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questao" ADD CONSTRAINT "questao_moduloId_fkey" FOREIGN KEY ("moduloId") REFERENCES "modulo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resposta_questao" ADD CONSTRAINT "resposta_questao_questaoId_fkey" FOREIGN KEY ("questaoId") REFERENCES "questao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resposta_usuario" ADD CONSTRAINT "resposta_usuario_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resposta_usuario" ADD CONSTRAINT "resposta_usuario_questaoId_fkey" FOREIGN KEY ("questaoId") REFERENCES "questao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resposta_usuario" ADD CONSTRAINT "resposta_usuario_respostaQuestaoId_fkey" FOREIGN KEY ("respostaQuestaoId") REFERENCES "resposta_questao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trilha_usuario" ADD CONSTRAINT "trilha_usuario_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trilha_usuario" ADD CONSTRAINT "trilha_usuario_trilhaId_fkey" FOREIGN KEY ("trilhaId") REFERENCES "trilha"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conquista_usuario" ADD CONSTRAINT "conquista_usuario_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conquista_usuario" ADD CONSTRAINT "conquista_usuario_conquistaId_fkey" FOREIGN KEY ("conquistaId") REFERENCES "conquista"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "habilidade_usuario" ADD CONSTRAINT "habilidade_usuario_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "habilidade_usuario" ADD CONSTRAINT "habilidade_usuario_habilidadeId_fkey" FOREIGN KEY ("habilidadeId") REFERENCES "habilidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "token" ADD CONSTRAINT "token_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
