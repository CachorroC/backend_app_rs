import * as z from 'zod';
import { NotaElementSchema } from './nota';


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
    'ANTIOQUIA',
    'BOGOTÁ',
    'BOYACÁ',
    'CNDINAMARCA',
    'CUN DINAMARCA',
    'CUNDINAMARCA',
    'CUNDINNAMARCA',
    'TOLIMA',
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
    '00                              ',
  ]
);

export type CodRegla = z.infer<typeof CodReglaSchema>;

export const UltimaActuacionSchema = z.object(
  {
    'createdAt'     : z.coerce.date(),
    'idRegActuacion': z.coerce.number(),
    'llaveProceso'  : z.coerce.string(),
    'consActuacion' : z.coerce.number(),
    'fechaActuacion': z.coerce.date(),
    'actuacion'     : z.coerce.string(),
    'anotacion'     : z.union(
      [
        z.null(),
        z.coerce.string()
      ]
    ),
    'fechaInicial': z.union(
      [
        z.coerce.date(),
        z.null()
      ]
    ),
    'fechaRegistro': z.coerce.date(),
    'fechaFinal'   : z.union(
      [
        z.coerce.date(),
        z.null()
      ]
    ),
    'codRegla'        : CodReglaSchema,
    'conDocumentos'   : z.coerce.boolean(),
    'cant'            : z.coerce.number(),
    'carpetaNumero'   : z.coerce.number(),
    'procesoIdProceso': z.null(),
  }
);

export type UltimaActuacion = z.infer<typeof UltimaActuacionSchema>;

export const SubTareaSchema = z.object(
  {
    'text'      : z.coerce.string(),
    'date'      : z.coerce.date(),
    'isComplete': z.coerce.boolean(),
    'tareaId'   : z.coerce.number(),
  }
);

export type SubTarea = z.infer<typeof SubTareaSchema>;

export const TareaSchema = z.object(
  {
    'id'       : z.coerce.number(),
    'dueDate'  : z.null(),
    'carpetaId': z.coerce.number(),
    'complete' : z.coerce.boolean(),
    'content'  : z.coerce.string(),
    'createdAt': z.coerce.date(),
    'title'    : z.coerce.string(),
    'updatedAt': z.coerce.date(),
    'subTareas': z.array(
      SubTareaSchema
    ),
  }
);

export type Tarea = z.infer<typeof TareaSchema>;

export const ProcesoSchema = z.object(
  {
    'idProceso'           : z.coerce.number(),
    'idConexion'          : z.coerce.number(),
    'llaveProceso'        : z.coerce.string(),
    'fechaProceso'        : z.coerce.date(),
    'fechaUltimaActuacion': z.union(
      [
        z.coerce.date(),
        z.null()
      ]
    ),
    'despacho'         : z.coerce.string(),
    'departamento'     : DepartamentoSchema,
    'sujetosProcesales': z.coerce.string(),
    'esPrivado'        : z.coerce.boolean(),
    'cantFilas'        : z.coerce.number(),
    'carpetaNumero'    : z.coerce.number(),
  }
);

export type Proceso = z.infer<typeof ProcesoSchema>;



export const JuzgadoSchema = z.object(
  {
    'id'  : z.coerce.number(),
    'tipo': z.coerce.string(),
    'url' : z.coerce.string(),
  }
);

export type Juzgado = z.infer<typeof JuzgadoSchema>;

export const DeudorSchema = z.object(
  {
    'id'            : z.coerce.number(),
    'cedula'        : z.coerce.string(),
    'primerNombre'  : z.coerce.string(),
    'primerApellido': z.coerce.string(),
    'segundoNombre' : z.union(
      [
        z.null(),
        z.coerce.string()
      ]
    ),
    'segundoApellido': z.union(
      [
        z.null(),
        z.coerce.string()
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
    'telCelular': z.union(
      [
        z.null(),
        z.coerce.string()
      ]
    ),
    'telFijo': z.union(
      [
        z.null(),
        z.coerce.string()
      ]
    ),
    'carpetaNumero': z.coerce.number(),
  }
);

export type Deudor = z.infer<typeof DeudorSchema>;

export const DemandaSchema = z.object(
  {
    'id'                     : z.coerce.number(),
    'departamento'           : DepartamentoSchema,
    'capitalAdeudado'        : z.coerce.string(),
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
        z.coerce.date(),
        z.null()
      ]
    ),
    'municipio' : z.coerce.string(),
    'obligacion': z.array(
      z.coerce.string()
    ),
    'radicado': z.union(
      [
        z.null(),
        z.coerce.string()
      ]
    ),
    'vencimientoPagare': z.array(
      z.coerce.date()
    ),
    'expediente': z.union(
      [
        z.null(),
        z.coerce.string()
      ]
    ),
    'carpetaNumero': z.coerce.number(),
    'despacho'     : z.null(),
  }
);

export type Demanda = z.infer<typeof DemandaSchema>;

export const IntCarpetaElementSchema = z.object(
  {
    'id'          : z.coerce.number(),
    'numero'      : z.coerce.number(),
    'llaveProceso': z.union(
      [
        z.null(),
        z.coerce.string()
      ]
    ),
    'nombre'    : z.coerce.string(),
    'idProcesos': z.array(
      z.coerce.number()
    ),
    'category': CategorySchema,
    'fecha'   : z.union(
      [
        z.coerce.date(),
        z.null()
      ]
    ),
    'demanda': z.union(
      [
        DemandaSchema,
        z.null()
      ]
    ),
    'deudor'         : DeudorSchema,
    'ultimaActuacion': z.union(
      [
        UltimaActuacionSchema,
        z.null()
      ]
    ),
    'juzgados': z.array(
      JuzgadoSchema
    ),
    'procesos': z.array(
      ProcesoSchema
    ),
    'notas': z.array(
      NotaElementSchema
    ),
    'tareas': z.array(
      TareaSchema
    ),
  }
);

export type IntCarpetaElement = z.infer<typeof IntCarpetaElementSchema>;
