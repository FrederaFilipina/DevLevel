/*
  Warnings:

  - You are about to drop the column `dificuldade` on the `questao` table. All the data in the column will be lost.
  - You are about to drop the column `pontuacaoNecessaria` on the `trilha_usuario` table. All the data in the column will be lost.
  - You are about to drop the `trilha` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `nivel` to the `questao` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TipoDesbloqueio" AS ENUM ('SEQUENCIAL', 'LIVRE');

-- DropForeignKey
ALTER TABLE "modulo" DROP CONSTRAINT "modulo_trilhaId_fkey";

-- DropForeignKey
ALTER TABLE "trilha" DROP CONSTRAINT "trilha_temaId_fkey";

-- DropForeignKey
ALTER TABLE "trilha" DROP CONSTRAINT "trilha_trilhaAnteriorId_fkey";

-- DropForeignKey
ALTER TABLE "trilha_usuario" DROP CONSTRAINT "trilha_usuario_trilhaId_fkey";

-- AlterTable
ALTER TABLE "questao" DROP COLUMN "dificuldade",
ADD COLUMN     "nivel" "NivelDificuldade" NOT NULL;

-- AlterTable
ALTER TABLE "trilha_usuario" DROP COLUMN "pontuacaoNecessaria",
ADD COLUMN     "desbloqueadaPorTrilhaId" INTEGER;

-- DropTable
DROP TABLE "trilha";

-- CreateTable
CREATE TABLE "Trilha" (
    "id" SERIAL NOT NULL,
    "temaId" INTEGER NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT,
    "nivel" "NivelDificuldade" NOT NULL,
    "ordem" INTEGER NOT NULL,
    "pontuacaoMinima" INTEGER NOT NULL,
    "tipoDesbloqueio" "TipoDesbloqueio" NOT NULL DEFAULT 'SEQUENCIAL',
    "trilhaAnteriorId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Trilha_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Trilha_temaId_idx" ON "Trilha"("temaId");

-- CreateIndex
CREATE UNIQUE INDEX "Trilha_temaId_ordem_key" ON "Trilha"("temaId", "ordem");

-- CreateIndex
CREATE INDEX "conquista_usuario_usuarioId_idx" ON "conquista_usuario"("usuarioId");

-- CreateIndex
CREATE INDEX "conquista_usuario_conquistaId_idx" ON "conquista_usuario"("conquistaId");

-- CreateIndex
CREATE INDEX "habilidade_usuario_usuarioId_idx" ON "habilidade_usuario"("usuarioId");

-- CreateIndex
CREATE INDEX "habilidade_usuario_habilidadeId_idx" ON "habilidade_usuario"("habilidadeId");

-- CreateIndex
CREATE INDEX "modulo_trilhaId_idx" ON "modulo"("trilhaId");

-- CreateIndex
CREATE INDEX "questao_moduloId_idx" ON "questao"("moduloId");

-- CreateIndex
CREATE INDEX "resposta_questao_questaoId_idx" ON "resposta_questao"("questaoId");

-- CreateIndex
CREATE INDEX "resposta_usuario_usuarioId_idx" ON "resposta_usuario"("usuarioId");

-- CreateIndex
CREATE INDEX "resposta_usuario_questaoId_idx" ON "resposta_usuario"("questaoId");

-- CreateIndex
CREATE INDEX "tema_usuario_usuarioId_idx" ON "tema_usuario"("usuarioId");

-- CreateIndex
CREATE INDEX "tema_usuario_temaId_idx" ON "tema_usuario"("temaId");

-- CreateIndex
CREATE INDEX "token_usuarioId_idx" ON "token"("usuarioId");

-- CreateIndex
CREATE INDEX "trilha_usuario_usuarioId_idx" ON "trilha_usuario"("usuarioId");

-- CreateIndex
CREATE INDEX "trilha_usuario_trilhaId_idx" ON "trilha_usuario"("trilhaId");

-- AddForeignKey
ALTER TABLE "Trilha" ADD CONSTRAINT "Trilha_temaId_fkey" FOREIGN KEY ("temaId") REFERENCES "tema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trilha" ADD CONSTRAINT "Trilha_trilhaAnteriorId_fkey" FOREIGN KEY ("trilhaAnteriorId") REFERENCES "Trilha"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "modulo" ADD CONSTRAINT "modulo_trilhaId_fkey" FOREIGN KEY ("trilhaId") REFERENCES "Trilha"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trilha_usuario" ADD CONSTRAINT "trilha_usuario_trilhaId_fkey" FOREIGN KEY ("trilhaId") REFERENCES "Trilha"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trilha_usuario" ADD CONSTRAINT "trilha_usuario_desbloqueadaPorTrilhaId_fkey" FOREIGN KEY ("desbloqueadaPorTrilhaId") REFERENCES "Trilha"("id") ON DELETE SET NULL ON UPDATE CASCADE;
