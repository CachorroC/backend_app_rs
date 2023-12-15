import { WithId } from 'mongodb';
import { intProceso, outProceso } from './procesos';
import { Despachos } from '../Procesos/despachos';
import { Juzgado } from './int-carpeta';
import { outActuacion } from './actuaciones';


export interface TrulyCruda {
  demanda: DemandaRaw;
  codeudor?: rawCodeudor;
  deudor: DeudorRaw;
  numero: number;
}


export interface DeudorRaw {
  cedula: number | string;
  direccion?: number | string;
  email?: number | string;
  nombre: string;
  telefono?: number | string;
}

export interface CarpetaRaw extends TrulyCruda {
  category: Category;
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
    obligacion: string[] | null;
    tipoProceso: TipoProceso;
    vencimientoPagare: string[]; //?Date[]
    fechaPresentacion?: string; //?Date
  };
}
// To parse this data:
//
//   import { Convert } from "./file";
//
//   const intCarpeta = Convert.toIntCarpeta(json);

export interface IntCarpeta {
    _id:             number;
    actuaciones:     outActuacion[];
    category:        Category;
    codeudor:        Codeudor | null;
    demanda:         Demanda;
    deudor:          Deudor;
    fecha:           Date | null;
    idProcesos:      number[];
    idRegUltimaAct:  number | null;
    llaveProceso:    string;
    nombre:          string;
    numero:          number;
    procesos:        outProceso[];
    revisado:        boolean;
    terminado:       boolean;
    tipoProceso:     TipoProceso;
    ultimaActuacion: outActuacion | null;
    updatedAt:       Date;
    tareas:          any[];
}

export interface Actuacion {
    idRegActuacion: number;
    llaveProceso:   string;
    consActuacion:  number;
    fechaActuacion: Date;
    actuacion:      string;
    anotacion:      null | string;
    fechaInicial:   Date | null;
    fechaFinal:     Date | null;
    fechaRegistro:  Date;
    codRegla:       CodRegla;
    conDocumentos:  boolean;
    cant:           number;
    idProceso:      number;
    isUltimaAct:    boolean;
    createdAt:      Date;
    id?:            number | null;
    carpetaNumero?: number | null;
    procesoId?:     null | number;
}

export type CodRegla = '00                              ';

export type Category = 'Terminados' |'todos' | 'LiosJuridicos' | 'Bancolombia' | 'Reintegra' | 'Insolvencia';

export interface Codeudor {
    nombre:        null | string;
    cedula:        null | string;
    direccion:     null | string;
    telefono:      null | string;
    id:            number;
    carpetaNumero: number;
}

export interface Demanda {
    obligacion:              string[];
    llaveProceso:            string;
    notificacion:            Notificacion | null;
    medidasCautelares:       MedidasCautelares | null;
    capitalAdeudado:         number | null;
    departamento:            DemandaDepartamento | null;
    entregaGarantiasAbogado: Date | null;
    etapaProcesal:           null | string;
    expediente:              string;
    fechaPresentacion:       Date[];
    mandamientoPago:         Date | null;
    municipio:               string | null;
    radicado:                null | string;
    tipoProceso:             TipoProceso;
    vencimientoPagare:       Date[];
}

export type DemandaDepartamento = 'CUNDINAMARCA' | 'CUNDINNAMARCA' | 'TOLIMA' | 'CUN DINAMARCA' | 'BOYACÁ' | 'CUNDINAMRCA' | 'CNDINAMARCA' | 'ATLANTICO';

export interface MedidasCautelares {
    fechaOrdenaMedida: null | Date;
    medidaSolicitada:  null | string;
}

export interface Notificacion {
    '291':          The291 | null;
    '292':          The291 | null;
    certimail:      boolean | null;
    fisico:         boolean | null;
    autoNotificado: null | string;
}

export interface The291 {
    fechaRecibido: Date | null;
    fechaAporta:   Date | null;
    resultado:     boolean | null;
}

export type TipoProceso = 'HIPOTECARIO' | 'PRENDARIO' | 'SINGULAR' | 'ACUMULADO';

export interface Deudor {
    tel:             Tel;
    primerNombre:    string;
    segundoNombre:   null | string;
    primerApellido:  string;
    segundoApellido: null | string;
    cedula:          number | null;
    direccion:       null | string;
    email:           null | string;
}

export interface Tel {
    fijo:    number | null;
    celular: number | null;
}

export interface Proceso {
    id:                   number;
    cantFilas:            number;
    carpetaNumero:        number;
    departamento:         ProcesoDepartamento;
    despacho:             string;
    esPrivado:            boolean;
    fechaProceso:         Date | null;
    fechaUltimaActuacion: Date | null;
    idConexion:           number;
  idProceso: number;
  juzgado: Juzgado;
    llaveProceso:         string;
    sujetosProcesales:    string;
}

export type ProcesoDepartamento = 'BOGOTÁ' | 'CUNDINAMARCA' | 'META' | 'ANTIOQUIA';

// Converts JSON strings to/from your types
export class Convert {
  public static toIntCarpeta(
    json: string
  ): IntCarpeta {
    return JSON.parse(
      json
    );
  }

  public static intCarpetaToJson(
    value: IntCarpeta
  ): string {
    return JSON.stringify(
      value
    );
  }

  public static toActuacion(
    json: string
  ): Actuacion {
    return JSON.parse(
      json
    );
  }

  public static actuacionToJson(
    value: Actuacion
  ): string {
    return JSON.stringify(
      value
    );
  }

  public static toCodeudor(
    json: string
  ): Codeudor {
    return JSON.parse(
      json
    );
  }

  public static codeudorToJson(
    value: Codeudor
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

  public static demandaToJson(
    value: Demanda
  ): string {
    return JSON.stringify(
      value
    );
  }

  public static toMedidasCautelares(
    json: string
  ): MedidasCautelares {
    return JSON.parse(
      json
    );
  }

  public static medidasCautelaresToJson(
    value: MedidasCautelares
  ): string {
    return JSON.stringify(
      value
    );
  }

  public static toNotificacion(
    json: string
  ): Notificacion {
    return JSON.parse(
      json
    );
  }

  public static notificacionToJson(
    value: Notificacion
  ): string {
    return JSON.stringify(
      value
    );
  }

  public static toThe291(
    json: string
  ): The291 {
    return JSON.parse(
      json
    );
  }

  public static the291ToJson(
    value: The291
  ): string {
    return JSON.stringify(
      value
    );
  }

  public static toDeudor(
    json: string
  ): Deudor {
    return JSON.parse(
      json
    );
  }

  public static deudorToJson(
    value: Deudor
  ): string {
    return JSON.stringify(
      value
    );
  }

  public static toTel(
    json: string
  ): Tel {
    return JSON.parse(
      json
    );
  }

  public static telToJson(
    value: Tel
  ): string {
    return JSON.stringify(
      value
    );
  }

  public static toProceso(
    json: string
  ): Proceso {
    return JSON.parse(
      json
    );
  }

  public static procesoToJson(
    value: Proceso
  ): string {
    return JSON.stringify(
      value
    );
  }
}

export interface MonCarpeta extends IntCarpeta
{
  fecha: Date | null;
  ultimaActuacion: outActuacion | null;
  nombre: string;
}

export type CarpetaKeys = keyof MonCarpeta;

export type NuevaCarpetaKeys = keyof NuevaCarpeta;

export type Concrete<Type> = {
  [ Property in keyof Type ]-?: Type[ Property ];
};

//? Converts JSON strings to/from your types

export class carpetaConvert {
  public static demandaToJson (
    value: Demanda
  ): string {
    return JSON.stringify(
      value
    );
  }


  public static deudorToJson (
    value: Deudor
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


  public static telToJson (
    value: Tel
  ): string {
    return JSON.stringify(
      value
    );
  }

  public static toDemanda (
    json: string
  ): Demanda {
    return JSON.parse(
      json
    );
  }



  public static toDeudor (
    json: string
  ): Deudor {
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



  public static toMonCarpeta (
    carpeta: WithId<IntCarpeta>
  ): MonCarpeta {
    return {
      ...carpeta,
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
  ): Tel {
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
      '0'
    ],
    radicado         : null,
    vencimientoPagare: [
      new Date()
    ],
    llaveProceso     : 'SinEspecificar',
    notificacion     : null,
    medidasCautelares: null,
    expediente       : '',
    mandamientoPago  : null
  },
  codeudor       : null,
  nombre         : '',
  _id            : 0,
  actuaciones    : [],
  fecha          : null,
  idRegUltimaAct : null,
  procesos       : [],
  revisado       : false,
  terminado      : false,
  ultimaActuacion: null,
  updatedAt      : new Date(),
  tareas         : []
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

export class DespachoJudicial implements Juzgado {
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
