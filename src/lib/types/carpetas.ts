// To parse this data:
//
//   import { Convert } from "./file";
//
//   const intCarpeta = Convert.toIntCarpeta(json);

import { Despachos } from '../Procesos/despachos';
import { outActuacion } from './actuaciones';
import { outProceso } from './procesos';
import { WithId } from 'mongodb';

export interface IntCarpeta {
  category:        Category;
  fecha:           Date | null;
  idProcesos:      number[];
  idRegUltimaAct:  number | null;
  llaveProceso:    string;
  nombre:          string;
  numero:          number;
  revisado:        boolean;
  terminado:       boolean;
  tipoProceso:     TipoProceso;
  updatedAt:       Date;
  ultimaActuacion: outActuacion | null;
  deudor:          Deudor | null;
  codeudor:        Codeudor | null;
  notas:           Nota[];
  demanda:         Demanda | null;
  procesos:        outProceso[];
  tareas:          Tarea[];
  _id:             string;
}

export type Category = 'Terminados' | 'Reintegra' | 'Bancolombia' | 'Insolvencia' | 'LiosJuridicos' | 'todos' | 'SinEspecificar';

export interface Codeudor {
  carpetaNumero: number | null;
  cedula:        null | string;
  direccion:     null | string;
  id:            number;
  nombre:        null | string;
  telefono:      null | string;
}

export interface Demanda {
  capitalAdeudado:         null | string;
  carpetaNumero?:           number;
  departamento:            string | null;
  despacho:                null | string;
  entregaGarantiasAbogado: Date | null;
  etapaProcesal:           null | string;
  llaveProceso:            string;
  fechaPresentacion:       Date[];
  id:                      number;
  mandamientoPago:         Date | null;
  tipoProceso:             TipoProceso;
  municipio:               string | null;
  obligacion:              string[];
  radicado:                null | string;
  vencimientoPagare:       Date[];
  notificacion:            Notificacion;
  medidasCautelares:       MedidasCautelares;
}

export type DemandaDepartamento = 'CUNDINAMARCA' | 'CUNDINNAMARCA' | 'TOLIMA' | 'CUN DINAMARCA' | 'BOYACÁ' | 'CUNDINAMRCA' | 'CNDINAMARCA' | 'ATLANTICO';

export interface MedidasCautelares {
  demandaId:         number;
  fechaOrdenaMedida: Date | null;
  id:                number;
  medidaSolicitada:  null | string;
}

export interface Notificacion {
  autoNotificado: null | string;
  demandaId:      number;
  certimail:      boolean;
  fisico:         boolean;
  id:             number;
  notifiers:      Notifier[];
}

export interface Notifier {
  fechaAporta:    Date | null;
  fechaRecibido:  Date | null;
  id?:             number;
  notificacionId: number;
  resultado:      boolean | null;
  tipo:           string;
}

export type TipoProceso = 'SINGULAR' | 'PRENDARIO' | 'HIPOTECARIO' | 'ACUMULADO';

export interface Deudor {
  carpetaNumero:   number | null;
  cedula:          string;
  direccion:       null | string;
  email:           null | string;
  id:              number;
  primerApellido:  string;
  primerNombre:    string;
  segundoApellido: null | string;
  segundoNombre:   null | string;
  telCelular:      null | string;
  telFijo:         null | string;
}

export interface Nota {
  carpetaNumero: number | null;
  content:       null | string;
  createdAt:     Date;
  date:          Date;
  id:            number;
  pathname:      null | string;
  title:         string;
  updatedAt:     Date;
}

export type ProcesoDepartamento = 'BOGOTÁ' | 'CUNDINAMARCA' | 'ANTIOQUIA' | 'META';

export interface Juzgado {
  id:   number;
  tipo: string;
  url:  string;
}

export interface Tarea {
  carpetaNumero: number | null;
  complete:      boolean;
  content:       null | string;
  createdAt:     Date;
  dueDate:       Date | null;
  id:            number;
  title:         string;
  updatedAt:     Date;
  subTareas:     SubTarea[];
}

export interface SubTarea {
  date:       Date | null;
  id:         number;
  isComplete: boolean;
  tareaId:    number | null;
  text:       string;
}

export type CodRegla = '00                              ';

export interface MonCarpeta extends IntCarpeta
{
  _id: string;
}

// Converts JSON strings to/from your types
export class carpetaConvert {

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
      fecha: carpeta.fecha
        ? new Date(
          carpeta.fecha
        )
        : null,
      idRegUltimaAct: carpeta.idRegUltimaAct
        ? carpeta.idRegUltimaAct
        : null,
      ultimaActuacion: carpeta.ultimaActuacion
        ? carpeta.ultimaActuacion
        : null,
      nombre: carpeta.deudor
        ? `${ carpeta.deudor.primerNombre } ${ carpeta.deudor.segundoNombre } ${ carpeta.deudor.primerApellido } ${ carpeta.deudor.segundoApellido }`
        : carpeta.nombre,
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

  public static toNotifier(
    json: string
  ): Notifier {
    return JSON.parse(
      json
    );
  }

  public static notifierToJson(
    value: Notifier
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

  public static toNota(
    json: string
  ): Nota {
    return JSON.parse(
      json
    );
  }

  public static notaToJson(
    value: Nota
  ): string {
    return JSON.stringify(
      value
    );
  }


  public static toJuzgado(
    json: string
  ): Juzgado {
    return JSON.parse(
      json
    );
  }

  public static juzgadoToJson(
    value: Juzgado
  ): string {
    return JSON.stringify(
      value
    );
  }

  public static toTarea(
    json: string
  ): Tarea {
    return JSON.parse(
      json
    );
  }

  public static tareaToJson(
    value: Tarea
  ): string {
    return JSON.stringify(
      value
    );
  }

  public static toSubTarea(
    json: string
  ): SubTarea {
    return JSON.parse(
      json
    );
  }

  public static subTareaToJson(
    value: SubTarea
  ): string {
    return JSON.stringify(
      value
    );
  }


}

export type KeyOfCarpeta = keyof IntCarpeta;

export const mockCarpeta: IntCarpeta = {
  idProcesos  : [],
  category    : 'Terminados',
  numero      : 0,
  llaveProceso: '',
  tipoProceso : 'HIPOTECARIO',
  deudor      : {
    telFijo        : '0',
    id             : 0,
    carpetaNumero  : 0,
    telCelular     : '0',
    primerNombre   : '',
    segundoNombre  : '',
    primerApellido : '',
    segundoApellido: '',
    cedula         : '0',
    direccion      : '',
    email          : '',
  },
  demanda: {
    departamento           : 'CUNDINAMARCA',
    capitalAdeudado        : '1000000',
    entregaGarantiasAbogado: new Date(),
    carpetaNumero          : 0,
    id                     : 0,
    despacho               : 'SinEspecificar',
    etapaProcesal          : null,
    fechaPresentacion      : [
      new Date()
    ],
    municipio  : 'Bogota',
    tipoProceso: 'SINGULAR',
    obligacion : [
      '0',
    ],
    radicado         : null,
    vencimientoPagare: [
      new Date()
    ],
    llaveProceso: 'SinEspecificar',
    notificacion: {
      demandaId     : 0,
      id            : 0,
      autoNotificado: null,
      certimail     : false,
      fisico        : false,
      notifiers     : []
    },
    medidasCautelares: {
      demandaId        : 0,
      fechaOrdenaMedida: null,
      id               : 0,
      medidaSolicitada : null
    },
    mandamientoPago: null
  },
  codeudor       : null,
  nombre         : '',
  _id            : 'cedula',
  fecha          : null,
  idRegUltimaAct : null,
  procesos       : [],
  revisado       : false,
  terminado      : false,
  ultimaActuacion: null,
  updatedAt      : new Date(),
  tareas         : [],
  notas          : []
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
    proceso: outProceso
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
