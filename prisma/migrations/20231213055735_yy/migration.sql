-- DropForeignKey
ALTER TABLE "Actuacion" DROP CONSTRAINT "Actuacion_idProceso_fkey";

-- AlterTable
ALTER TABLE "Actuacion" ADD COLUMN     "procesoId" INTEGER;

-- AddForeignKey
ALTER TABLE "Actuacion" ADD CONSTRAINT "Actuacion_procesoId_fkey" FOREIGN KEY ("procesoId") REFERENCES "Proceso"("idProceso") ON DELETE SET NULL ON UPDATE CASCADE;
