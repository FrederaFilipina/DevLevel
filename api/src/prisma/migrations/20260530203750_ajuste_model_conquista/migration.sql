/*
  Warnings:

  - A unique constraint covering the columns `[titulo]` on the table `conquista` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "conquista_titulo_key" ON "conquista"("titulo");
