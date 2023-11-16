// To parse this data:
//
//   import { Convert } from "./file";
//
//   const intPrueba = Convert.toIntPrueba(json);

export interface IntPrueba {
  category: Category;
  cc: number | null;
  demanda: Demanda;
  deudor: Deudor;
  idProcesos?: number[];
  llaveProceso?: string;
  numero: number;
  tipoProceso: TipoProceso;
}

export type Category =
  | 'Bancolombia'
  | 'Reintegra'
  | 'Terminados'
  | 'Insolvencia'
  | 'LiosJuridicos';

export interface Demanda {
  capitalAdeudado: number | null;
  departamento: Departamento | null;
  entregaGarantiasAbogado: Date | null;
  etapaProcesal: null | string;
  expediente: null | string;
  fechaPresentacion: null | string;
  juzgados: Juzgado[] | null;
  mandamientoPago: Date | null;
  municipio: null | string;
  obligacion: Obligacion | null;
  radicado: null | string;
  tipoProceso: TipoProceso;
  vencimientoPagare: ( null | string )[] | null;
}

export type Departamento = 'CUNDINAMARCA' | 'TOLIMA' | 'BOYACÁ';

export interface Juzgado {
  id: number;
  tipo: string;
  url: string;
}

export interface Obligacion {
  A?: A;
  B?: A;
}

export type A = number | string;

export type TipoProceso =
  | 'SINGULAR'
  | 'PRENDARIO'
  | 'HIPOTECARIO'
  | 'HIPOTECARO'
  | 'HMM PISO 1'
  | '  SINGULAR'
  | 'SINGULAR ACUMULADO CON HIPOTECARIO'
  | 'SINGULAR ACUM HIPOTECARIO'
  | 'PRENDARO'
  | ' HIPOTECARIO'
  | 'HIPOTECARIA'
  | 'SINGULAR ACUMULADO CON HIPOTECARIO CAJA SOCIAL'
  | 'SOACHA';

export interface Deudor {
  cedula: number | null;
  direccion?: string;
  email?: string;
  primerApellido: string;
  primerNombre: string;
  segundoApellido?: string;
  tel: Tel;
  segundoNombre?: string;
}

export interface Tel {
  celular?: number;
  fijo?: number;
}

// Converts JSON strings to/from your types
export class Convert {
  public static demandaToJson(
    value: Demanda 
  ): string {
    return JSON.stringify(
      value 
    );
  }

  public static deudorToJson(
    value: Deudor 
  ): string {
    return JSON.stringify(
      value 
    );
  }

  public static intPruebaToJson(
    value: IntPrueba 
  ): string {
    return JSON.stringify(
      value 
    );
  }

  public static juzgadoToJson(
    value: Juzgado 
  ): string {
    return JSON.stringify(
      value 
    );
  }

  public static obligacionToJson(
    value: Obligacion 
  ): string {
    return JSON.stringify(
      value 
    );
  }

  public static telToJson(
    value: Tel 
  ): string {
    return JSON.stringify(
      value 
    );
  }

  public static toDemanda(
    json: string 
  ): Demanda {
    return JSON.parse(
      json 
    );
  }

  public static toDeudor(
    json: string 
  ): Deudor {
    return JSON.parse(
      json 
    );
  }

  public static toIntPrueba(
    json: string 
  ): IntPrueba {
    return JSON.parse(
      json 
    );
  }

  public static toJuzgado(
    json: string 
  ): Juzgado {
    return JSON.parse(
      json 
    );
  }

  public static toObligacion(
    json: string 
  ): Obligacion {
    return JSON.parse(
      json 
    );
  }

  public static toTel(
    json: string 
  ): Tel {
    return JSON.parse(
      json 
    );
  }
}
