/*
  Warnings:

  - Added the required column `usuarioId` to the `Despesa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Despesa" ADD COLUMN     "usuarioId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Despesa" ADD CONSTRAINT "Despesa_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
