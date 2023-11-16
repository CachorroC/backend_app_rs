/*
  Warnings:

  - You are about to drop the column `text` on the `Nota` table. All the data in the column will be lost.
  - You are about to drop the column `creationDate` on the `Tarea` table. All the data in the column will be lost.
  - You are about to drop the column `isComplete` on the `Tarea` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `Tarea` table. All the data in the column will be lost.
  - You are about to drop the `_JuzgadoToProceso` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `title` to the `Nota` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Nota` table without a default value. This is not possible if the table is not empty.
  - Added the required column `complete` to the `Tarea` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Tarea` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Tarea` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_JuzgadoToProceso" DROP CONSTRAINT "_JuzgadoToProceso_A_fkey";

-- DropForeignKey
ALTER TABLE "_JuzgadoToProceso" DROP CONSTRAINT "_JuzgadoToProceso_B_fkey";

-- DropIndex
DROP INDEX "Nota_id_key";

-- DropIndex
DROP INDEX "Tarea_id_key";

-- AlterTable
ALTER TABLE "Demanda" ADD COLUMN     "despacho" TEXT;

-- AlterTable
ALTER TABLE "Nota" DROP COLUMN "text",
ADD COLUMN     "content" TEXT,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Tarea" DROP COLUMN "creationDate",
DROP COLUMN "isComplete",
DROP COLUMN "text",
ADD COLUMN     "complete" BOOLEAN NOT NULL,
ADD COLUMN     "content" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "_JuzgadoToProceso";

-- AddForeignKey
ALTER TABLE "Proceso" ADD CONSTRAINT "Proceso_despacho_fkey" FOREIGN KEY ("despacho") REFERENCES "Juzgado"("tipo") ON DELETE RESTRICT ON UPDATE CASCADE;
