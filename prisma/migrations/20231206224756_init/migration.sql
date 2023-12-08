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
    "numero" INTEGER NOT NULL,
    "llaveProceso" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "idProcesos" INTEGER[],
    "category" "Category" NOT NULL DEFAULT 'SinEspecificar',
    "tipoProceso" "TipoProceso" NOT NULL DEFAULT 'SINGULAR',
    "fecha" TIMESTAMP(3),
    "revisado" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "terminado" BOOLEAN NOT NULL DEFAULT false,
    "idRegUltimaAct" INTEGER,

    CONSTRAINT "Carpeta_pkey" PRIMARY KEY ("numero")
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
    "telCelular" TEXT,
    "telFijo" TEXT,
    "carpetaNumero" INTEGER NOT NULL,

    CONSTRAINT "Deudor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Codeudor" (
    "id" INTEGER NOT NULL,
    "cedula" TEXT,
    "direccion" TEXT,
    "nombre" TEXT,
    "telefono" TEXT,
    "carpetaNumero" INTEGER NOT NULL,

    CONSTRAINT "Codeudor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Nota" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pathname" TEXT,
    "carpetaNumero" INTEGER,
    "content" TEXT,
    "title" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Nota_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tarea" (
    "id" SERIAL NOT NULL,
    "dueDate" DATE,
    "carpetaNumero" INTEGER,
    "complete" BOOLEAN NOT NULL DEFAULT false,
    "content" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tarea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubTarea" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "date" TIMESTAMP(3),
    "isComplete" BOOLEAN NOT NULL DEFAULT false,
    "tareaId" INTEGER,

    CONSTRAINT "SubTarea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Actuacion" (
    "id" SERIAL NOT NULL,
    "carpetaNumero" INTEGER,
    "isUltimaAct" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "idRegActuacion" INTEGER NOT NULL,
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
    "idProceso" INTEGER NOT NULL,

    CONSTRAINT "Actuacion_pkey" PRIMARY KEY ("id")
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
    "carpetaNumero" INTEGER NOT NULL,
    "despacho" TEXT,
    "idProceso" INTEGER NOT NULL,
    "idConexion" INTEGER,
    "llaveProceso" TEXT,
    "fechaProceso" DATE,
    "fechaUltimaActuacion" DATE,
    "sujetosProcesales" TEXT,
    "esPrivado" BOOLEAN,
    "cantFilas" INTEGER,

    CONSTRAINT "Demanda_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notificacion" (
    "id" SERIAL NOT NULL,
    "certimail" BOOLEAN,
    "fisico" BOOLEAN,
    "autoNotificado" TEXT,
    "demandaId" INTEGER NOT NULL,

    CONSTRAINT "Notificacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MedidasCautelares" (
    "id" SERIAL NOT NULL,
    "fechaOrdenaMedida" TIMESTAMP(3),
    "medidaSolicitada" TEXT,
    "demandaId" INTEGER NOT NULL,

    CONSTRAINT "MedidasCautelares_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notifier" (
    "id" SERIAL NOT NULL,
    "fechaRecibido" TIMESTAMP(3),
    "resultado" BOOLEAN,
    "fechaAporta" TIMESTAMP(3),
    "notificacionId" INTEGER,

    CONSTRAINT "Notifier_pkey" PRIMARY KEY ("id")
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
    "idProceso" INTEGER NOT NULL,
    "idConexion" INTEGER NOT NULL,
    "llaveProceso" TEXT NOT NULL,
    "fechaProceso" DATE,
    "fechaUltimaActuacion" DATE,
    "despacho" TEXT NOT NULL,
    "departamento" TEXT NOT NULL,
    "sujetosProcesales" TEXT NOT NULL,
    "carpetaNumero" INTEGER NOT NULL,
    "esPrivado" BOOLEAN NOT NULL,
    "cantFilas" INTEGER NOT NULL,

    CONSTRAINT "Proceso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JuzgadoDemanda" (
    "demandaNumero" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL,

    CONSTRAINT "JuzgadoDemanda_pkey" PRIMARY KEY ("demandaNumero","tipo")
);

-- CreateTable
CREATE TABLE "JuzgadoProceso" (
    "idProceso" INTEGER NOT NULL,
    "despacho" TEXT NOT NULL,

    CONSTRAINT "JuzgadoProceso_pkey" PRIMARY KEY ("idProceso","despacho")
);

-- CreateTable
CREATE TABLE "_CarpetaToJuzgado" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Deudor_carpetaNumero_key" ON "Deudor"("carpetaNumero");

-- CreateIndex
CREATE UNIQUE INDEX "Codeudor_carpetaNumero_key" ON "Codeudor"("carpetaNumero");

-- CreateIndex
CREATE UNIQUE INDEX "Actuacion_idRegActuacion_key" ON "Actuacion"("idRegActuacion");

-- CreateIndex
CREATE UNIQUE INDEX "Demanda_idProceso_key" ON "Demanda"("idProceso");

-- CreateIndex
CREATE UNIQUE INDEX "Notificacion_demandaId_key" ON "Notificacion"("demandaId");

-- CreateIndex
CREATE UNIQUE INDEX "MedidasCautelares_demandaId_key" ON "MedidasCautelares"("demandaId");

-- CreateIndex
CREATE UNIQUE INDEX "Proceso_idProceso_key" ON "Proceso"("idProceso");

-- CreateIndex
CREATE UNIQUE INDEX "_CarpetaToJuzgado_AB_unique" ON "_CarpetaToJuzgado"("A", "B");

-- CreateIndex
CREATE INDEX "_CarpetaToJuzgado_B_index" ON "_CarpetaToJuzgado"("B");

-- AddForeignKey
ALTER TABLE "Carpeta" ADD CONSTRAINT "Carpeta_idRegUltimaAct_fkey" FOREIGN KEY ("idRegUltimaAct") REFERENCES "Actuacion"("idRegActuacion") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deudor" ADD CONSTRAINT "Deudor_carpetaNumero_fkey" FOREIGN KEY ("carpetaNumero") REFERENCES "Carpeta"("numero") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Codeudor" ADD CONSTRAINT "Codeudor_carpetaNumero_fkey" FOREIGN KEY ("carpetaNumero") REFERENCES "Carpeta"("numero") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nota" ADD CONSTRAINT "Nota_carpetaNumero_fkey" FOREIGN KEY ("carpetaNumero") REFERENCES "Carpeta"("numero") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tarea" ADD CONSTRAINT "Tarea_carpetaNumero_fkey" FOREIGN KEY ("carpetaNumero") REFERENCES "Carpeta"("numero") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubTarea" ADD CONSTRAINT "SubTarea_tareaId_fkey" FOREIGN KEY ("tareaId") REFERENCES "Tarea"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Demanda" ADD CONSTRAINT "Demanda_carpetaNumero_fkey" FOREIGN KEY ("carpetaNumero") REFERENCES "Carpeta"("numero") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notificacion" ADD CONSTRAINT "Notificacion_demandaId_fkey" FOREIGN KEY ("demandaId") REFERENCES "Demanda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedidasCautelares" ADD CONSTRAINT "MedidasCautelares_demandaId_fkey" FOREIGN KEY ("demandaId") REFERENCES "Demanda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notifier" ADD CONSTRAINT "Notifier_notificacionId_fkey" FOREIGN KEY ("notificacionId") REFERENCES "Notificacion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proceso" ADD CONSTRAINT "Proceso_carpetaNumero_fkey" FOREIGN KEY ("carpetaNumero") REFERENCES "Carpeta"("numero") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JuzgadoDemanda" ADD CONSTRAINT "JuzgadoDemanda_demandaNumero_fkey" FOREIGN KEY ("demandaNumero") REFERENCES "Demanda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JuzgadoDemanda" ADD CONSTRAINT "JuzgadoDemanda_tipo_fkey" FOREIGN KEY ("tipo") REFERENCES "Juzgado"("tipo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JuzgadoProceso" ADD CONSTRAINT "JuzgadoProceso_despacho_fkey" FOREIGN KEY ("despacho") REFERENCES "Juzgado"("tipo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JuzgadoProceso" ADD CONSTRAINT "JuzgadoProceso_idProceso_fkey" FOREIGN KEY ("idProceso") REFERENCES "Proceso"("idProceso") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CarpetaToJuzgado" ADD CONSTRAINT "_CarpetaToJuzgado_A_fkey" FOREIGN KEY ("A") REFERENCES "Carpeta"("numero") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CarpetaToJuzgado" ADD CONSTRAINT "_CarpetaToJuzgado_B_fkey" FOREIGN KEY ("B") REFERENCES "Juzgado"("tipo") ON DELETE CASCADE ON UPDATE CASCADE;
