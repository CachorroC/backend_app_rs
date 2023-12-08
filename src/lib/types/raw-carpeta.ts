// To parse this data:
//
//   import { Convert } from "./file";
//
//   const rawCarpeta = Convert.toRawCarpeta(json);

export interface RawCarpeta
{
  category: RawCategory;
  demanda: RawDemanda;
  deudor: RawDeudor;
  numero: number;
  codeudor?: RawCodeudor;
}

export type RawCategory = 'Terminados' | 'LiosJuridicos' | 'Bancolombia' | 'Reintegra' | 'Insolvencia';

export interface RawCodeudor
{
  cedula?: number | string;
  direccion?: number | string;
  nombre?: number | string;
  telefonos?: number | string;
}

export interface RawDemanda
{
  capitalAdeudado?: number | string;
  departamento: RawDepartamento;
  entregaGarantiasAbogado?: number | string;
  etapaProcesal?: number | string;
  expediente?: number | string;
  fechaPresentacion?: string;
  mandamientoPago?: string;
  medidasCautelares?: RawMedidasCautelares;
  municipio: string;
  notificacion?: RawNotificacion;
  obligacion?: RawObligacion;
  radicado?: string;
  tipoProceso?: RawTipoProceso;
  vencimientoPagare?: number | string;
}

export type RawDepartamento = 'CUNDINAMARCA' | 'CUNDINNAMARCA' | 'TOLIMA' | 'CUN DINAMARCA' | 'BOYACÁ' | 'CUNDINAMRCA' | 'CNDINAMARCA' | 'BOYACA' | 'ATLANTICO';

export interface RawMedidasCautelares
{
  fechaOrdenaMedidas?: number | string;
  medidaSolicitada?: number | string;
}

export interface RawNotificacion
{
  autoNotificado?: number | string;
  tipo?: number | string;
  '291'?: RawThe291;
  '292'?: RawThe292;
  certimail?: string;
  fisico?: number | string;
}

export interface RawThe291
{
  fechaAporta?: number | string;
  fechaRecibido?: number | string;
  resultado?: number | string;
}

export interface RawThe292
{
  fechaRecibido?: string;
  fechaAporta?: number | string;
  resultado?: number | string;
}

export interface RawObligacion
{
  A?: number | string;
  B?: number | string;
}

export type RawTipoProceso = 'HIPOTECARIO' | 'PRENDARIO' | 'SINGULAR' | 'SINGULAR ACUMULADO CON HIPOTECARIO' | 'SINGULAR ACUM HIPOTECARIO' | 'PRENDARO' | 'BOGOTA' | '7 CME' | 'HMM PISO 1' | 'HIPOTECARIA' | '5 CME' | 'HIPOTECARO' | 'SINGULAR ACUMULADO CON HIPOTECARIO CAJA SOCIAL' | 'SOACHA' | '\'SINGULAR';

export interface RawDeudor
{
  cedula?: number | string;
  direccion?: number | string;
  email?: number | string;
  nombre: string;
  telefonos?: number | string;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toRawCarpeta (
    json: string
  ): RawCarpeta {
    return JSON.parse(
      json
    );
  }

  public static rawCarpetaToJson (
    value: RawCarpeta
  ): string {
    return JSON.stringify(
      value
    );
  }

  public static toCodeudor (
    json: string
  ): RawCodeudor {
    return JSON.parse(
      json
    );
  }

  public static codeudorToJson (
    value: RawCodeudor
  ): string {
    return JSON.stringify(
      value
    );
  }

  public static toDemanda (
    json: string
  ): RawDemanda {
    return JSON.parse(
      json
    );
  }

  public static demandaToJson (
    value: RawDemanda
  ): string {
    return JSON.stringify(
      value
    );
  }

  public static toMedidasCautelares (
    json: string
  ): RawMedidasCautelares {
    return JSON.parse(
      json
    );
  }

  public static medidasCautelaresToJson (
    value: RawMedidasCautelares
  ): string {
    return JSON.stringify(
      value
    );
  }

  public static toNotificacion (
    json: string
  ): RawNotificacion {
    return JSON.parse(
      json
    );
  }

  public static notificacionToJson (
    value: RawNotificacion
  ): string {
    return JSON.stringify(
      value
    );
  }

  public static toThe291 (
    json: string
  ): RawThe291 {
    return JSON.parse(
      json
    );
  }

  public static the291ToJson (
    value: RawThe291
  ): string {
    return JSON.stringify(
      value
    );
  }

  public static toThe292 (
    json: string
  ): RawThe292 {
    return JSON.parse(
      json
    );
  }

  public static the292ToJson (
    value: RawThe292
  ): string {
    return JSON.stringify(
      value
    );
  }

  public static toObligacion (
    json: string
  ): RawObligacion {
    return JSON.parse(
      json
    );
  }

  public static obligacionToJson (
    value: RawObligacion
  ): string {
    return JSON.stringify(
      value
    );
  }

  public static toDeudor (
    json: string
  ): RawDeudor {
    return JSON.parse(
      json
    );
  }

  public static deudorToJson (
    value: RawDeudor
  ): string {
    return JSON.stringify(
      value
    );
  }
}
