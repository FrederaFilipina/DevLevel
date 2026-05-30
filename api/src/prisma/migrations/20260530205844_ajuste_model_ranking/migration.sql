/*
  Warnings:

  - A unique constraint covering the columns `[usuarioId]` on the table `ranking` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ranking_usuarioId_key" ON "ranking"("usuarioId");
