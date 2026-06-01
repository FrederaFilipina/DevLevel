/*
  Warnings:

  - A unique constraint covering the columns `[usuarioId,insigniaId]` on the table `insignia_usuario` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "insignia_usuario_usuarioId_insigniaId_key" ON "insignia_usuario"("usuarioId", "insigniaId");
