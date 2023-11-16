-- DropForeignKey
ALTER TABLE "Tarea" DROP CONSTRAINT "Tarea_carpetaId_fkey";

-- AlterTable
ALTER TABLE "Carpeta" ALTER COLUMN "category" SET DEFAULT 'SinEspecificar';

-- AlterTable
ALTER TABLE "Deudor" ALTER COLUMN "cedula" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Tarea" ADD CONSTRAINT "Tarea_carpetaId_fkey" FOREIGN KEY ("carpetaId") REFERENCES "Carpeta"("numero") ON DELETE SET NULL ON UPDATE CASCADE;
