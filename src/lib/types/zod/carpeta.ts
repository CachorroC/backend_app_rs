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
    'TOLIMA',
  ]
);

export type Departamento = z.infer<typeof DepartamentoSchema>;


export const TipoProcesoSchema = z.enum(
  [
    'HIPOTECARIA',
    'HIPOTECARIO',
    'HIPOTECARO',
    'HMM PISO 1',
    'PRENDARIO',
    'PRENDARO',
    'SINGULAR',
    'SINGULAR ACUM HIPOTECARIO',
    'SINGULAR ACUMULADO CON HIPOTECARIO',
    'SINGULAR ACUMULADO CON HIPOTECARIO CAJA SOCIAL',
    'SOACHA',
    ' HIPOTECARIO',
    '  SINGULAR',
  ]
);

export type TipoProceso = z.infer<typeof TipoProcesoSchema>;

export const TelSchema = z.object(
  {
    'fijo': z.coerce.number()
      .nullable(),
    'celular': z.union(
      [
        z.coerce.number(),
        z.null()
      ]
    ),
  }
);

export type Tel = z.infer<typeof TelSchema>;

export const DeudorSchema = z.object(
  {
    'tel'          : TelSchema,
    'primerNombre' : z.coerce.string(),
    'segundoNombre': z.union(
      [
        z.null(),
        z.coerce.string()
      ]
    ),
    'primerApellido' : z.coerce.string(),
    'segundoApellido': z.union(
      [
        z.null(),
        z.coerce.string()
      ]
    ),
    'cedula': z.union(
      [
        z.coerce.number(),
        z.null()
      ]
    ),
    'direccion': z.union(
      [
        z.null(),
        z.coerce.string()
      ]
    ),
    'email': z.union(
      [
        z.null(),
        z.coerce.string()
      ]
    ),
  }
);

export type Deudor = z.infer<typeof DeudorSchema>;

export const JuzgadoSchema = z.object(
  {
    'id'  : z.coerce.number(),
    'tipo': z.coerce.string(),
    'url' : z.coerce.string(),
  }
);

export type Juzgado = z.infer<typeof JuzgadoSchema>;

export const DemandaSchema = z.object(
  {
    'capitalAdeudado': z.union(
      [
        z.coerce.number(),
        z.null()
      ]
    ),
    'departamento': z.union(
      [
        DepartamentoSchema,
        z.null()
      ]
    ),
    'entregaGarantiasAbogado': z.union(
      [
        z.coerce.date(),
        z.null()
      ]
    ),
    'tipoProceso'    : TipoProcesoSchema,
    'mandamientoPago': z.union(
      [
        z.coerce.date(),
        z.null()
      ]
    ),
    'etapaProcesal': z.union(
      [
        z.null(),
        z.coerce.string()
      ]
    ),
    'fechaPresentacion': z.union(
      [
        z.null(),
        z.coerce.date()
      ]
    ),
    'municipio': z.union(
      [
        z.null(),
        z.coerce.string()
      ]
    ),
    'obligacion': z.array(
      z.union(
        [
          z.coerce.number(),
          z.coerce.string()
        ]
      )
    ),
    'radicado': z.union(
      [
        z.null(),
        z.coerce.string()
      ]
    ),
    'vencimientoPagare': z.array(
      z.union(
        [
          z.null(),
          z.coerce.string()
        ]
      )
    ),
    'expediente': z.union(
      [
        z.null(),
        z.coerce.string()
      ]
    ),
    'juzgados': z.union(
      [
        z.array(
          JuzgadoSchema
        ),
        z.null()
      ]
    ),
  }
);

export type Demanda = z.infer<typeof DemandaSchema>;

export const IntCarpetaElementSchema = z.object(
  {
    '_id'         : z.coerce.string(),
    'llaveProceso': z.union(
      [
        z.null(),
        z.coerce.string()
      ]
    ),
    'numero': z.coerce.number(),
    'cc'    : z.union(
      [
        z.coerce.number(),
        z.null()
      ]
    ),
    'idProcesos': z.union(
      [
        z.array(
          z.coerce.number()
        ),
        z.null()
      ]
    ),
    'category'   : CategorySchema,
    'tipoProceso': TipoProcesoSchema,
    'deudor'     : DeudorSchema,
    'demanda'    : DemandaSchema,
  }
);

export type IntCarpetaElement = z.infer<typeof IntCarpetaElementSchema>;
