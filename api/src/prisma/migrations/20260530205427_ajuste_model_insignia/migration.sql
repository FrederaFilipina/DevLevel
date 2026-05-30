/*
  Warnings:

  - A unique constraint covering the columns `[titulo]` on the table `insignia` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "insignia_titulo_key" ON "insignia"("titulo");
