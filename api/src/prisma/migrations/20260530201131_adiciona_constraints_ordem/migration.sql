/*
  Warnings:

  - A unique constraint covering the columns `[trilhaId,ordem]` on the table `modulo` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[moduloId,ordem]` on the table `questao` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[temaId,ordem]` on the table `trilha` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "modulo_trilhaId_ordem_key" ON "modulo"("trilhaId", "ordem");

-- CreateIndex
CREATE UNIQUE INDEX "questao_moduloId_ordem_key" ON "questao"("moduloId", "ordem");

-- CreateIndex
CREATE UNIQUE INDEX "trilha_temaId_ordem_key" ON "trilha"("temaId", "ordem");
