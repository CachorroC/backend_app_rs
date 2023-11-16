-- CreateEnum
CREATE TYPE "Category" AS ENUM ('Terminados', 'LiosJuridicos', 'Bancolombia', 'Reintegra', 'Insolvencia', 'SinEspecificar', 'todos');

-- CreateEnum
CREATE TYPE "Departamento" AS ENUM ('BOGOTA', 'CUNDINAMARCA', 'META', 'ANTIOQUIA', 'ATLANTICO');

-- CreateEnum
CREATE TYPE "TipoProceso" AS ENUM ('HIPOTECARIO', 'PRENDARIO', 'SINGULAR', 'ACUMULADO');

-- CreateTable
CREATE TABLE "Carpeta" (
    "id" SERIAL NOT NULL,
    "numero" INTEGER NOT NULL,
    "llaveProceso" TEXT,
    "nombre" TEXT NOT NULL,
    "idProcesos" INTEGER[],
    "category" "Category" NOT NULL,
    "fecha" DATE,

    CONSTRAINT "Carpeta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Deudor" (
    "id" SERIAL NOT NULL,
    "cedula" TEXT NOT NULL,
    "primerNombre" TEXT NOT NULL,
    "primerApellido" TEXT NOT NULL,
    "segundoNombre" TEXT,
    "segundoApellido" TEXT,
    "direccion" TEXT,
    "email" TEXT,
    "telCelular" BIGINT,
    "telFijo" BIGINT,
    "carpetaNumero" INTEGER NOT NULL,

    CONSTRAINT "Deudor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Nota" (
    "text" TEXT NOT NULL,
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pathname" TEXT,
    "carpetaNumero" INTEGER,

    CONSTRAINT "Nota_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tarea" (
    "id" SERIAL NOT NULL,
    "creationDate" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dueDate" DATE,
    "carpetaId" INTEGER,
    "text" TEXT NOT NULL,
    "isComplete" BOOLEAN NOT NULL,

    CONSTRAINT "Tarea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubTarea" (
    "text" TEXT NOT NULL,
    "date" TIMESTAMP(3),
    "isComplete" BOOLEAN NOT NULL,
    "tareaId" INTEGER,

    CONSTRAINT "SubTarea_pkey" PRIMARY KEY ("text")
);

-- CreateTable
CREATE TABLE "Actuacion" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "idRegActuacion" OID NOT NULL,
    "llaveProceso" TEXT NOT NULL,
    "consActuacion" INTEGER NOT NULL,
    "fechaActuacion" DATE NOT NULL,
    "actuacion" TEXT NOT NULL,
    "anotacion" TEXT,
    "fechaInicial" DATE,
    "fechaRegistro" DATE NOT NULL,
    "fechaFinal" DATE,
    "codRegla" TEXT NOT NULL,
    "conDocumentos" BOOLEAN NOT NULL,
    "cant" INTEGER NOT NULL,
    "carpetaNumero" INTEGER,
    "procesoIdProceso" INTEGER,

    CONSTRAINT "Actuacion_pkey" PRIMARY KEY ("idRegActuacion")
);

-- CreateTable
CREATE TABLE "Demanda" (
    "id" SERIAL NOT NULL,
    "departamento" TEXT,
    "capitalAdeudado" MONEY,
    "entregaGarantiasAbogado" DATE,
    "tipoProceso" "TipoProceso" NOT NULL DEFAULT 'SINGULAR',
    "mandamientoPago" DATE,
    "etapaProcesal" TEXT,
    "fechaPresentacion" DATE,
    "municipio" TEXT,
    "obligacion" TEXT[],
    "radicado" TEXT,
    "vencimientoPagare" DATE[],
    "expediente" TEXT,
    "carpetaNumero" INTEGER NOT NULL,

    CONSTRAINT "Demanda_pkey" PRIMARY KEY ("id")
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
    "idProceso" INTEGER NOT NULL,
    "idConexion" INTEGER NOT NULL,
    "llaveProceso" TEXT NOT NULL,
    "fechaProceso" DATE,
    "fechaUltimaActuacion" DATE,
    "despacho" TEXT NOT NULL,
    "departamento" TEXT NOT NULL,
    "sujetosProcesales" TEXT NOT NULL,
    "esPrivado" BOOLEAN NOT NULL,
    "cantFilas" INTEGER NOT NULL,
    "carpetaNumero" INTEGER NOT NULL,

    CONSTRAINT "Proceso_pkey" PRIMARY KEY ("idProceso")
);

-- CreateTable
CREATE TABLE "_CarpetaToJuzgado" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_DemandaToJuzgado" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_JuzgadoToProceso" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Carpeta_numero_key" ON "Carpeta"("numero");

-- CreateIndex
CREATE UNIQUE INDEX "Deudor_carpetaNumero_key" ON "Deudor"("carpetaNumero");

-- CreateIndex
CREATE UNIQUE INDEX "Nota_id_key" ON "Nota"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Tarea_id_key" ON "Tarea"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Actuacion_carpetaNumero_key" ON "Actuacion"("carpetaNumero");

-- CreateIndex
CREATE UNIQUE INDEX "Demanda_carpetaNumero_key" ON "Demanda"("carpetaNumero");

-- CreateIndex
CREATE UNIQUE INDEX "Juzgado_tipo_key" ON "Juzgado"("tipo");

-- CreateIndex
CREATE UNIQUE INDEX "_CarpetaToJuzgado_AB_unique" ON "_CarpetaToJuzgado"("A", "B");

-- CreateIndex
CREATE INDEX "_CarpetaToJuzgado_B_index" ON "_CarpetaToJuzgado"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DemandaToJuzgado_AB_unique" ON "_DemandaToJuzgado"("A", "B");

-- CreateIndex
CREATE INDEX "_DemandaToJuzgado_B_index" ON "_DemandaToJuzgado"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_JuzgadoToProceso_AB_unique" ON "_JuzgadoToProceso"("A", "B");

-- CreateIndex
CREATE INDEX "_JuzgadoToProceso_B_index" ON "_JuzgadoToProceso"("B");

-- AddForeignKey
ALTER TABLE "Deudor" ADD CONSTRAINT "Deudor_carpetaNumero_fkey" FOREIGN KEY ("carpetaNumero") REFERENCES "Carpeta"("numero") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nota" ADD CONSTRAINT "Nota_carpetaNumero_fkey" FOREIGN KEY ("carpetaNumero") REFERENCES "Carpeta"("numero") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tarea" ADD CONSTRAINT "Tarea_carpetaId_fkey" FOREIGN KEY ("carpetaId") REFERENCES "Carpeta"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubTarea" ADD CONSTRAINT "SubTarea_tareaId_fkey" FOREIGN KEY ("tareaId") REFERENCES "Tarea"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Actuacion" ADD CONSTRAINT "Actuacion_carpetaNumero_fkey" FOREIGN KEY ("carpetaNumero") REFERENCES "Carpeta"("numero") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Actuacion" ADD CONSTRAINT "Actuacion_procesoIdProceso_fkey" FOREIGN KEY ("procesoIdProceso") REFERENCES "Proceso"("idProceso") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Demanda" ADD CONSTRAINT "Demanda_carpetaNumero_fkey" FOREIGN KEY ("carpetaNumero") REFERENCES "Carpeta"("numero") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proceso" ADD CONSTRAINT "Proceso_carpetaNumero_fkey" FOREIGN KEY ("carpetaNumero") REFERENCES "Carpeta"("numero") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CarpetaToJuzgado" ADD CONSTRAINT "_CarpetaToJuzgado_A_fkey" FOREIGN KEY ("A") REFERENCES "Carpeta"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CarpetaToJuzgado" ADD CONSTRAINT "_CarpetaToJuzgado_B_fkey" FOREIGN KEY ("B") REFERENCES "Juzgado"("tipo") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DemandaToJuzgado" ADD CONSTRAINT "_DemandaToJuzgado_A_fkey" FOREIGN KEY ("A") REFERENCES "Demanda"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DemandaToJuzgado" ADD CONSTRAINT "_DemandaToJuzgado_B_fkey" FOREIGN KEY ("B") REFERENCES "Juzgado"("tipo") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JuzgadoToProceso" ADD CONSTRAINT "_JuzgadoToProceso_A_fkey" FOREIGN KEY ("A") REFERENCES "Juzgado"("tipo") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JuzgadoToProceso" ADD CONSTRAINT "_JuzgadoToProceso_B_fkey" FOREIGN KEY ("B") REFERENCES "Proceso"("idProceso") ON DELETE CASCADE ON UPDATE CASCADE;
