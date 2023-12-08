import { WithId } from 'mongodb';
import { intActuacion } from './actuaciones';
import { intProceso } from './procesos';
import { Despachos } from '../Procesos/despachos';
import { Juzgado } from '@prisma/client';

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
    obligacion: Obligacion[] | null;
    tipoProceso: TipoProceso;
    vencimientoPagare: string[]; //?Date[]
    fechaPresentacion?: string; //?Date
  };
}

export interface IntCarpeta
{
  category: Category;
  cc: number | null;
  codeudor: intCodeudor | null;
  demanda: intDemanda;
  deudor: intDeudor;
  fecha?: Date;
  idProcesos: number[] | null;
  llaveProceso: null | string;
  nombre: string;
  numero: number;
  procesos?: intProceso[];
  tipoProceso: TipoProceso;
  ultimaActuacion?: intActuacion;
}

export type Departamento = 'CUNDINAMARCA' | 'BOGOTÁ' | 'TOLIMA' | 'CUN DINAMARCA' | 'CUNDINNAMARCA' | 'BOYACÁ' | 'CNDINAMARCA' | 'ANTIOQUIA' | 'META';

export type TipoProceso = 'SINGULAR' | 'HIPOTECARIO' | 'PRENDARIO' | 'SINGULAR ACUMULADO CON HIPOTECARIO' | 'SINGULAR ACUM HIPOTECARIO' | 'PRENDARO' | 'HMM PISO 1' | 'HIPOTECARIA' | 'HIPOTECARO' | 'SINGULAR ACUMULADO CON HIPOTECARIO CAJA SOCIAL' | 'SOACHA';



export type Category =
  | 'Terminados'
  | 'LiosJuridicos'
  | 'Bancolombia'
  | 'Reintegra'
  | 'Insolvencia'
  | 'sinEspecificar'
  | 'todos';

export interface intDemanda
{
  capitalAdeudado: number | null;
  departamento: string | null;
  entregaGarantiasAbogado: Date | null;
  tipoProceso: TipoProceso;
  mandamientoPago: Date | null;
  etapaProcesal: string | null;
  fechaPresentacion: Date[]
  municipio: string | null;
  obligacion: ( number | string )[];
  radicado: string | null;
  vencimientoPagare: ( Date | null )[];
  juzgado: Juzgado | null;
  idProceso: number;
  idConexion: number | null;
  llaveProceso: string | null;
  fechaProceso: Date | null;
  fechaUltimaActuacion: Date | null;
  sujetosProcesales: string | null;
  esPrivado: boolean | null;
  cantFilas: number | null;
  notificacion: intNotificacion | null;
  medidasCautelares: {
    fechaOrdenaMedida: Date | null;
    medidaSolicitada: string | null;
  } | null;
}

export interface intNotificacion {
  certimail: boolean | null;
  fisico: boolean | null;
  autoNotificado: string | null;
  notifiers: {
    tipo: '291' | '292';
    fechaRecibido: Date | null;
    resultado: boolean | null;
    fechaAporta: Date | null;
  }[];
}


export type Obligacion = number | string;



export interface intJuzgado
{
  id: number;
  tipo: string;
  url: string;
}

export interface intDeudor
{
  tel: intTel;
  primerNombre: string;
  segundoNombre: string | null;
  primerApellido: string;
  cedula: number | null;
  direccion: string | null;
  email: string | null;

  segundoApellido: string[] | null | string;
}

export interface intTel
{
  fijo: number | null;
  celular: number | null;
}

export interface intCodeudor
{
  cedula?: number | string;
  direccion?: number | string;
  nombre?: number | string;
  telefono?: number | string;
}



export type CodRegla = '00                              ';

export interface MonCarpeta extends IntCarpeta
{
  fecha?: Date;
  ultimaActuacion?: intActuacion;
  nombre: string;
  _id: string;
}

export type CarpetaKeys = keyof MonCarpeta;

export type NuevaCarpetaKeys = keyof NuevaCarpeta;

export type Concrete<Type> = {
  [ Property in keyof Type ]-?: Type[ Property ];
};

//? Converts JSON strings to/from your types

export class carpetaConvert {
  public static demandaToJson (
    value: intDemanda
  ): string {
    return JSON.stringify(
      value
    );
  }

  public static departamentoToJson (
    value: Departamento
  ): string {
    return JSON.stringify(
      value
    );
  }

  public static deudorToJson (
    value: intDeudor
  ): string {
    return JSON.stringify(
      value
    );
  }

  public static intCarpetasToJson (
    value: IntCarpeta[]
  ): string {
    return JSON.stringify(
      value
    );
  }

  public static intCarpetaToJson (
    value: IntCarpeta
  ): string {
    return JSON.stringify(
      value
    );
  }

  public static juzgadoToJson (
    value: intJuzgado
  ): string {
    return JSON.stringify(
      value
    );
  }

  public static telToJson (
    value: intTel
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

  public static toDepartamento (
    json: string
  ): Departamento {
    return JSON.parse(
      json
    );
  }

  public static toDeudor (
    json: string
  ): intDeudor {
    return JSON.parse(
      json
    );
  }

  public static toIntCarpeta (
    json: string
  ): IntCarpeta {
    return JSON.parse(
      json
    );
  }

  public static toIntCarpetas (
    json: string
  ): IntCarpeta[] {
    return JSON.parse(
      json
    );
  }

  public static toJuzgado (
    json: string
  ): intJuzgado {
    return JSON.parse(
      json
    );
  }

  public static toMonCarpeta (
    carpeta: WithId<IntCarpeta>
  ): MonCarpeta {
    return {
      ...carpeta,
      _id   : carpeta._id.toString(),
      nombre: `${ carpeta.deudor.primerNombre } ${ carpeta.deudor.segundoNombre } ${ carpeta.deudor.primerApellido } ${ carpeta.deudor.segundoApellido }`,
    };
  }
  public static toMonCarpetas (
    carpetas: WithId<IntCarpeta>[]
  ): MonCarpeta[] {
    return carpetas.map(
      (
        carpeta
      ) => {
        return this.toMonCarpeta(
          carpeta
        );
      }
    );


  }

  public static toTel (
    json: string
  ): intTel {
    return JSON.parse(
      json
    );
  }
}

export type KeyOfCarpeta = keyof IntCarpeta;

export const mockCarpeta: IntCarpeta = {
  idProcesos: [
    0
  ],
  category    : 'Terminados',
  numero      : 0,
  llaveProceso: '',
  tipoProceso : 'HIPOTECARIO',
  deudor      : {
    tel: {
      fijo   : 0,
      celular: 0,
    },
    primerNombre   : '',
    segundoNombre  : '',
    primerApellido : '',
    segundoApellido: '',
    cedula         : 0,
    direccion      : '',
    email          : '',
  },
  demanda: {
    departamento           : 'CUNDINAMARCA',
    capitalAdeudado        : 0,
    entregaGarantiasAbogado: new Date(),
    etapaProcesal          : null,
    fechaPresentacion      : [
      new Date()
    ],
    municipio  : 'Bogota',
    tipoProceso: 'SINGULAR',
    obligacion : [
      0
    ],
    radicado         : null,
    vencimientoPagare: [
      new Date()
    ],
    llaveProceso        : null,
    juzgado             : null,
    mandamientoPago     : null,
    idProceso           : 0,
    idConexion          : null,
    fechaProceso        : null,
    fechaUltimaActuacion: null,
    sujetosProcesales   : null,
    esPrivado           : null,
    cantFilas           : null,
    notificacion        : null,
    medidasCautelares   : null
  },
  cc      : null,
  codeudor: null,
  nombre  : ''
};

function incomingStringFixer (
  stringValue: string
) {
  return stringValue.toLowerCase()
    .normalize(
      'NFD'
    )
    .replace(
      /\p{Diacritic}/gu, ''
    )
    .trim();
}

export class DespachoJudicial implements intJuzgado {
  constructor (
    proceso: intProceso
  ) {
    const matchedDespacho = Despachos.find(
      (
        dependenciaJudiail
      ) => {
        const {
          nombre
        } = dependenciaJudiail;

        const {
          despacho
        } = proceso;

        const nombreDependenciaJudicial = incomingStringFixer(
          nombre
        );

        const nombreDespachoProceso = incomingStringFixer(
          despacho
        );

        const indexOfDesp = nombreDependenciaJudicial.indexOf(
          nombreDespachoProceso
        );


        if ( indexOfDesp >= 0 ) {
          console.log(
            `procesos despacho is in despachos ${ indexOfDesp + 1
            }`
          );
        }

        return nombreDependenciaJudicial === nombreDespachoProceso;
      }
    );

    if ( matchedDespacho ) {
      const {
        nombre, url
      } = matchedDespacho;

      const stringId = nombre.match(
        /\d+/g
      );
      this.tipo = nombre;
      this.id = stringId
        ? Number(
          stringId.toString()
        )
        : 0;
      this.url = `https://www.ramajudicial.gov.co${ url }`;
    } else {
      this.tipo = proceso.despacho,
      this.url = `https://www.ramajudicial.gov.co/web/${ proceso.despacho
        .replaceAll(
          ' ', '-'
        )
        .toLowerCase() }`;
      this.id = 0;
    }

  }
  id: number;
  tipo: string;
  url: string;
}
