-- CreateEnum
CREATE TYPE "NotifierName" AS ENUM ('DOS91', 'DOS92');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('Terminados', 'LiosJuridicos', 'Bancolombia', 'Reintegra', 'Insolvencia', 'SinEspecificar', 'todos');

-- CreateEnum
CREATE TYPE "Departamento" AS ENUM ('BOGOTA', 'CUNDINAMARCA', 'META', 'ANTIOQUIA', 'ATLANTICO');

-- CreateEnum
CREATE TYPE "TipoProceso" AS ENUM ('HIPOTECARIO', 'PRENDARIO', 'SINGULAR', 'ACUMULADO');

-- CreateTable
CREATE TABLE "Carpeta" (
    "category" "Category" NOT NULL DEFAULT 'SinEspecificar',
    "fecha" TIMESTAMP(3),
    "idProcesos" INTEGER[],
    "idRegUltimaAct" INTEGER,
    "llaveProceso" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "revisado" BOOLEAN NOT NULL DEFAULT false,
    "terminado" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Carpeta_pkey" PRIMARY KEY ("numero")
);

-- CreateTable
CREATE TABLE "Nota" (
    "carpetaNumero" INTEGER,
    "content" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date" TIMESTAMP(3) NOT NULL,
    "id" SERIAL NOT NULL,
    "pathname" TEXT,
    "title" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Nota_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tarea" (
    "carpetaNumero" INTEGER,
    "complete" BOOLEAN NOT NULL DEFAULT false,
    "content" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dueDate" DATE,
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tarea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubTarea" (
    "date" TIMESTAMP(3),
    "id" SERIAL NOT NULL,
    "isComplete" BOOLEAN NOT NULL DEFAULT false,
    "tareaId" INTEGER,
    "text" TEXT NOT NULL,

    CONSTRAINT "SubTarea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Actuacion" (
    "id" SERIAL NOT NULL,
    "actuacion" TEXT NOT NULL,
    "anotacion" TEXT,
    "cant" INTEGER NOT NULL,
    "carpetaNumero" INTEGER,
    "codRegla" TEXT NOT NULL,
    "conDocumentos" BOOLEAN NOT NULL,
    "consActuacion" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaActuacion" DATE NOT NULL,
    "fechaFinal" DATE,
    "fechaInicial" DATE,
    "fechaRegistro" DATE NOT NULL,
    "idProceso" INTEGER NOT NULL,
    "idRegActuacion" INTEGER NOT NULL,
    "isUltimaAct" BOOLEAN NOT NULL,
    "llaveProceso" TEXT NOT NULL,

    CONSTRAINT "Actuacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Juzgado" (
    "id" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Juzgado_pkey" PRIMARY KEY ("tipo")
);

-- CreateTable
CREATE TABLE "Proceso" (
    "id" SERIAL NOT NULL,
    "cantFilas" INTEGER NOT NULL,
    "carpetaNumero" INTEGER NOT NULL,
    "departamento" TEXT NOT NULL,
    "despacho" TEXT NOT NULL,
    "esPrivado" BOOLEAN NOT NULL,
    "fechaProceso" DATE,
    "fechaUltimaActuacion" DATE,
    "idConexion" INTEGER NOT NULL,
    "idProceso" INTEGER NOT NULL,
    "juzgadoTipo" TEXT NOT NULL,
    "llaveProceso" TEXT NOT NULL,
    "sujetosProcesales" TEXT NOT NULL,

    CONSTRAINT "Proceso_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Actuacion_idRegActuacion_key" ON "Actuacion"("idRegActuacion");

-- CreateIndex
CREATE UNIQUE INDEX "Proceso_idProceso_key" ON "Proceso"("idProceso");

-- AddForeignKey
ALTER TABLE "Carpeta" ADD CONSTRAINT "Carpeta_idRegUltimaAct_fkey" FOREIGN KEY ("idRegUltimaAct") REFERENCES "Actuacion"("idRegActuacion") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nota" ADD CONSTRAINT "Nota_carpetaNumero_fkey" FOREIGN KEY ("carpetaNumero") REFERENCES "Carpeta"("numero") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tarea" ADD CONSTRAINT "Tarea_carpetaNumero_fkey" FOREIGN KEY ("carpetaNumero") REFERENCES "Carpeta"("numero") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubTarea" ADD CONSTRAINT "SubTarea_tareaId_fkey" FOREIGN KEY ("tareaId") REFERENCES "Tarea"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Actuacion" ADD CONSTRAINT "Actuacion_idProceso_fkey" FOREIGN KEY ("idProceso") REFERENCES "Proceso"("idProceso") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proceso" ADD CONSTRAINT "Proceso_carpetaNumero_fkey" FOREIGN KEY ("carpetaNumero") REFERENCES "Carpeta"("numero") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proceso" ADD CONSTRAINT "Proceso_juzgadoTipo_fkey" FOREIGN KEY ("juzgadoTipo") REFERENCES "Juzgado"("tipo") ON DELETE RESTRICT ON UPDATE CASCADE;
