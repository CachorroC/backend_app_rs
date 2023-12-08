// To parse this data:
//
//   import { Convert } from "./file";
//
//   const intCarpeta = Convert.toIntCarpeta(json);

import { intJuzgado } from './carpetas';

export interface intCarpeta
{

  category: intCategory;
  demanda: intDemanda;
  deudor: intDeudor;
  numero: number;
  llaveProceso: string;
  nombre: string;
  idProcesos?: number[];
  procesos?: intProceso[];
  revisado: boolean;
  updatedAt: Date;
  terminado: boolean;
  idRegUltimaAct?: number;
  ultimaActuacion?: intActuacion;
  actuaciones?: intActuacion[];

  tipoProceso: intTipoProceso;
  fecha?: Date;

  codeudor?: intCodeudor;
  juzgados?: intJuzgado[]
}

export type intCategory = 'Terminados' | 'LiosJuridicos' | 'Bancolombia' | 'Reintegra' | 'Insolvencia';

export interface intCodeudor
{
  id: number;
  carpetaNumero: number;
  cedula:string | null;
  direccion: string | null;
  nombre: string | null;
  telefonos:string | null;
}

export interface intActuacion
{
  isUltimaAct: boolean;
  createdAt: Date;
  idRegActuacion: number;
  llaveProceso: string;
  consActuacion: number;
  fechaActuacion: Date;
  actuacion: string;
  anotacion: null | string;
  fechaInicial: Date | null;
  fechaRegistro: Date;
  fechaFinal: Date | null;
  codRegla: string;
  conDocumentos: boolean;
  cant: number;
  idProceso: number;
}

export interface intDemanda
{
  capitalAdeudado: number;
  departamento: intDepartamento;
  entregaGarantiasAbogado?: Date;
  etapaProcesal?: string;
  expediente?:  string;
  fechaPresentacion?: Date;
  mandamientoPago?: Date;
  medidasCautelares?: intMedidasCautelares;
  municipio: string;
  notificacion?: intNotificacion;
  obligacion?: intObligacion;
  radicado?: string;
  tipoProceso: intTipoProceso;
  vencimientoPagare?: Date[];

}

export interface intProceso
{
  idProceso: number;
  idConexion: number;
  llaveProceso: string;
  fechaProceso: Date | null;
  fechaUltimaActuacion: Date | null;
  despacho: string;
  departamento: intDepartamento;
  sujetosProcesales: string;
  esPrivado: boolean;
  cantFilas: number;
}

export type intDepartamento = 'BOGOTÁ' | 'CUNDINAMARCA' | 'ANTIOQUIA' | 'META' | 'TOLIMA' | 'BOYACA' | 'ATLANTICO';

export interface intMedidasCautelares
{
  fechaOrdenaMedidas: Date | null
  medidaSolicitada: string | null;
}

export interface intNotificacion
{
  autoNotificado: Date | null;
  tipo: string | null;
  '291': intTheNotifier;
  '292':  intTheNotifier;
  certimail: boolean;
  fisico: boolean
}

export interface intTheNotifier
{
  fechaAporta: Date | null;
  fechaRecibido: Date | null;
  resultado: boolean | null;
}


export interface intObligacion
{
  A?: number | string;
  B?: number | string;
}

export type intTipoProceso = 'HIPOTECARIO' | 'PRENDARIO' | 'SINGULAR' | 'ACUMULADO' ;

export interface intDeudor
{

  cedula?: number;
  primerNombre: string;
  primerApellido: string;
  segundoNombre: null | string;
  segundoApellido: null | string;
  direccion: null | string;
  email: null | string;
  nombre: string;
  telefono?: {
    fijo?: number
    celular?: number
  }
}

// Converts JSON strings to/from your types
export class Convert {
  public static toIntCarpeta (
    json: string
  ): intCarpeta {
    return JSON.parse(
      json
    );
  }

  public static intCarpetaToJson (
    value: intCarpeta
  ): string {
    return JSON.stringify(
      value
    );
  }

  public static toCodeudor (
    json: string
  ): intCodeudor {
    return JSON.parse(
      json
    );
  }

  public static codeudorToJson (
    value: intCodeudor
  ): string {
    return JSON.stringify(
      value
    );
  }

  public static toDemanda (
    json: string
  ): intDemanda {
    return JSON.parse(
      json
    );
  }

  public static demandaToJson (
    value: intDemanda
  ): string {
    return JSON.stringify(
      value
    );
  }

  public static toMedidasCautelares (
    json: string
  ): intMedidasCautelares {
    return JSON.parse(
      json
    );
  }

  public static medidasCautelaresToJson (
    value: intMedidasCautelares
  ): string {
    return JSON.stringify(
      value
    );
  }

  public static toNotificacion (
    json: string
  ): intNotificacion {
    return JSON.parse(
      json
    );
  }

  public static notificacionToJson (
    value: intNotificacion
  ): string {
    return JSON.stringify(
      value
    );
  }

  public static toThe291 (
    json: string
  ): intTheNotifier {
    return JSON.parse(
      json
    );
  }

  public static the291ToJson (
    value: intTheNotifier
  ): string {
    return JSON.stringify(
      value
    );
  }

  public static toThe292 (
    json: string
  ): intTheNotifier {
    return JSON.parse(
      json
    );
  }

  public static the292ToJson (
    value: intTheNotifier
  ): string {
    return JSON.stringify(
      value
    );
  }

  public static toObligacion (
    json: string
  ): intObligacion {
    return JSON.parse(
      json
    );
  }

  public static obligacionToJson (
    value: intObligacion
  ): string {
    return JSON.stringify(
      value
    );
  }

  public static toDeudor (
    json: string
  ): intDeudor {
    return JSON.parse(
      json
    );
  }

  public static deudorToJson (
    value: intDeudor
  ): string {
    return JSON.stringify(
      value
    );
  }
}
