/*
  Warnings:

  - A unique constraint covering the columns `[usuarioId,habilidadeId]` on the table `habilidade_usuario` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "habilidade_usuario_usuarioId_habilidadeId_key" ON "habilidade_usuario"("usuarioId", "habilidadeId");
