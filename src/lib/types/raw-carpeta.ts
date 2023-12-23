import { Category, TipoProceso } from './carpetas';

export interface TrulyCruda {
  demanda: DemandaRaw;
  codeudor?: rawCodeudor;
  deudor: DeudorRaw;
  numero: number;
}

export interface CarpetaRaw extends TrulyCruda {
  category: Category;
}


export interface NuevaCarpeta
{
  numero: number;
  category: Category;
  deudor: {
    primerNombre: string;
    segundoNombre?: string;
    primerApellido: string;
    segundoApellido?: string;
    cedula: number;

    direccion?: string;
    email?: string;
    tel: {
      celular?: number;
      fijo?: number;
    };
  };
  demanda: {
    capitalAdeudado: number;
    entregaGarantiasAbogado: string; //? Date
    obligacion: ( number | string )[] | null;
    tipoProceso: TipoProceso;
    vencimientoPagare: string[]; //?Date[]
    fechaPresentacion?: string[]; //?Date[]
  };
}

export interface DeudorRaw {
  cedula: number | string;
  direccion?: number | string;
  email?: number | string;
  nombre: string;
  telefono?: number | string;
}


export interface rawCodeudor {
  cedula?: number | string;
  nombre?: number | string;
  direccion?: number | string;
  telefono?: number | string;
}

export interface DemandaRaw {
  llaveProceso: string;
  capitalAdeudado?: number | string;
  departamento?: string;
  entregaGarantiasAbogado?: number | string;
  tipoProceso?: string;
  mandamientoPago?: string;
  medidasCautelares?: {
    fechaOrdenaMedidas?: string;
    medidaSolicitada?: string;
  };
  etapaProcesal?: number | string;
  fechaPresentacion?: number | string;
  municipio?: string;
  obligacion?: {
    A?: number | string;
    B?: number | string;
  };
  notificacion?: rawNotificacion;
  radicado?: number | string;
  vencimientoPagare?: number | string;
}


export interface rawNotificacion {
  '291'?: Theraw291;
  '292'?: Theraw292;
  certimail?: string;
  fisico?: FisicoEnum | number;
  tipo?: number | string;
  autoNotificado?: number | string;
}

export interface Theraw291 {
  fechaRecibido?: number | string;
  resultado?: number | string;
  fechaAporta?: number | string;
}

export interface Theraw292 {
  fechaRecibido?: string;
  fechaAporta?: number | string;
  resultado?: ResultadoEnum | number;
}


export type ResultadoEnum =
  | ''
  | '31/03/1901'
  | 'POSITIVO'
  | 'CERTIMAIL'
  | '06/07/2018'
  | 'FISICA'
  | 'NEGATIVO'
  | 'FISICO'
  | '20/06/2018 JAIME'
  | '28/11/2017'
  | '09/04/2018 CERTIMAIL'
  | '15/06/2018'
  | '14/09/2018 WILSON'
  | 'PERSONAL'
  | '20/06/2018'
  | '8/03/2018'
  | '16/05/2018'
  | '14/09/2018 GLADIS'
  | '04/05/2018'
  | '06/06/2018'
  | '20/06 ANGELICA FISICO'
  | '10/06/2018'
  | '18/07/2018'
  | '11/05/2018';

export type FisicoEnum =
  | ''
  | 'NO'
  | 'PERSONAL'
  | 'EMBARGO VEHICULO'
  | 'SI'
  | 'INMUEBLE'
  | 'EMBARGO APTO'
  | 'NO TIENE EN CUENTA'
  | 'VEHICULO'
  | 'INMUEBLE/BANCOS'
  | 'CERTIMAIL'
  | '13/09/2017'
  | 'X'
  | 'ENVIADO 292 24/08/2018'
  | 'FISICO'
  | 'ENVIADO 24/08'
  | 'OK'
  | '17/09/2018 ENVIO 291'
  | '30/10/2018'
  | '13/11/2018';
