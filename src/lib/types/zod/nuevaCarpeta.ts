import * as z from 'zod';

export const CategorySchema = z.enum(
  [
    'Bancolombia',
    'Insolvencia',
    'LiosJuridicos',
    'Reintegra',
    'Terminados',
  ] 
);

export type Category = z.infer<typeof CategorySchema>;

export const DepartamentoSchema = z.enum(
  [
    'BOYACÁ',
    'CUNDINAMARCA',
    'TOLIMA'
  ] 
);

export type Departamento = z.infer<typeof DepartamentoSchema>;

export const TipoProcesoSchema = z.enum(
  [
    'ACUMULADO',
    'HIPOTECARIO',
    'PRENDARIO',
    'SINGULAR',
  ] 
);

export type TipoProceso = z.infer<typeof TipoProcesoSchema>;

export const CodReglaSchema = z.enum(
  [
    '00                              '
  ] 
);

export type CodRegla = z.infer<typeof CodReglaSchema>;

export const TelSchema = z.object(
  {
    celular: z.coerce.number(),
    fijo   : z.coerce.number(),
  } 
);

export type Tel = z.infer<typeof TelSchema>;

export const DeudorSchema = z.object(
  {
    primerNombre   : z.coerce.string(),
    segundoNombre  : z.coerce.string(),
    primerApellido : z.coerce.string(),
    segundoApellido: z.coerce.string(),
    cedula         : z.coerce.number(),
    email          : z.coerce.string(),
    direccion      : z.coerce.string(),
    tel            : TelSchema,
  } 
);

export type Deudor = z.infer<typeof DeudorSchema>;

export const ObligacionSchema = z.object(
  {
    A: z.coerce.number(),
    B: z.coerce.string(),
  } 
);

export type Obligacion = z.infer<typeof ObligacionSchema>;

export const DemandaSchema = z.object(
  {
    capitalAdeudado        : z.coerce.number(),
    entregaGarantiasAbogado: z.coerce.date(),
    tipoProceso            : TipoProcesoSchema,
    fechaPresentacion      : z.coerce.date(),
    vencimientoPagare      : z.array(
      z.coerce.date() 
    ),
    obligacion: ObligacionSchema,
  } 
);

export type Demanda = z.infer<typeof DemandaSchema>;

export const NuevaCarpetaSchema = z.object(
  {
    numero  : z.coerce.number(),
    category: CategorySchema,
    deudor  : DeudorSchema,
    demanda : DemandaSchema,
  } 
);

export type NuevaCarpeta = z.infer<typeof NuevaCarpetaSchema>;
