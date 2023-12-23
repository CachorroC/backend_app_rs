-- DropForeignKey
ALTER TABLE "Codeudor" DROP CONSTRAINT "Codeudor_carpetaNumero_fkey";

-- DropForeignKey
ALTER TABLE "Demanda" DROP CONSTRAINT "Demanda_carpetaNumero_fkey";

-- DropForeignKey
ALTER TABLE "Deudor" DROP CONSTRAINT "Deudor_carpetaNumero_fkey";

-- DropForeignKey
ALTER TABLE "MedidasCautelares" DROP CONSTRAINT "MedidasCautelares_demandaId_fkey";

-- DropForeignKey
ALTER TABLE "Notificacion" DROP CONSTRAINT "Notificacion_demandaId_fkey";

-- AlterTable
ALTER TABLE "Codeudor" ALTER COLUMN "carpetaNumero" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Demanda" ALTER COLUMN "carpetaNumero" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Deudor" ALTER COLUMN "carpetaNumero" DROP NOT NULL;

-- AlterTable
ALTER TABLE "MedidasCautelares" ALTER COLUMN "demandaId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Notificacion" ALTER COLUMN "demandaId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Deudor" ADD CONSTRAINT "Deudor_carpetaNumero_fkey" FOREIGN KEY ("carpetaNumero") REFERENCES "Carpeta"("numero") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Codeudor" ADD CONSTRAINT "Codeudor_carpetaNumero_fkey" FOREIGN KEY ("carpetaNumero") REFERENCES "Carpeta"("numero") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Demanda" ADD CONSTRAINT "Demanda_carpetaNumero_fkey" FOREIGN KEY ("carpetaNumero") REFERENCES "Carpeta"("numero") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notificacion" ADD CONSTRAINT "Notificacion_demandaId_fkey" FOREIGN KEY ("demandaId") REFERENCES "Demanda"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedidasCautelares" ADD CONSTRAINT "MedidasCautelares_demandaId_fkey" FOREIGN KEY ("demandaId") REFERENCES "Demanda"("id") ON DELETE SET NULL ON UPDATE CASCADE;
