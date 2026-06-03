/*
  Warnings:

  - A unique constraint covering the columns `[usuarioId,conquistaId]` on the table `conquista_usuario` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "conquista_usuario_usuarioId_conquistaId_key" ON "conquista_usuario"("usuarioId", "conquistaId");
