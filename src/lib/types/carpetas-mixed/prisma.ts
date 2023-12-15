// To parse this data:
//
//   import { Convert } from "./file";
//
//   const prismaMapMongoFind = Convert.toPrismaMapMongoFind(json);

export interface PrismaMapMongoFind {
    _id:             number;
    actuaciones:     Actuacione[];
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
    procesos:        Proceso[];
    revisado:        boolean;
    tareas:          any[];
    terminado:       boolean;
    tipoProceso:     TipoProceso;
    ultimaActuacion: Actuacione | null;
    updatedAt:       Date;
}

export interface Actuacione {
    actuacion:      string;
    anotacion:      null | string;
    cant:           number;
    codRegla:       CodRegla;
    conDocumentos:  boolean;
    consActuacion:  number;
    createdAt?:     Date;
    fechaActuacion: Date;
    fechaFinal:     Date | null;
    fechaInicial:   Date | null;
    fechaRegistro:  Date;
    idProceso:      number;
    idRegActuacion: number;
    isUltimaAct:    boolean;
    llaveProceso:   string;
}

export type CodRegla = '00                              ';

export type Category = 'Terminados' | 'Bancolombia' | 'Insolvencia' | 'Reintegra' | 'LiosJuridicos';

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
    carpetaNumero:           null;
    departamento:            DemandaDepartamento;
    despacho:                null;
    entregaGarantiasAbogado: Date | null;
    etapaProcesal:           null | string;
    expediente:              string;
    fechaPresentacion:       Date[];
    id:                      null;
    mandamientoPago:         Date | null;
    municipio:               string;
    radicado:                null | string;
    tipoProceso:             TipoProceso;
    vencimientoPagare:       string[];
}

export type DemandaDepartamento = 'CUNDINAMARCA' | 'BOYACÁ' | 'CUN DINAMARCA' | 'CUNDINNAMARCA' | 'ATLANTICO' | 'CNDINAMARCA' | 'TOLIMA' | 'CUNDINAMRCA';

export interface MedidasCautelares {
    fechaOrdenaMedida: null | string;
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

export type TipoProceso = 'HIPOTECARIO' | 'SINGULAR' | 'PRENDARIO' | 'ACUMULADO';

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
    idProceso:            number;
    idConexion:           number;
    llaveProceso:         string;
    fechaProceso:         Date | null;
    fechaUltimaActuacion: Date | null;
    despacho:             string;
    departamento:         ProcesoDepartamento;
    sujetosProcesales:    string;
    esPrivado:            boolean;
    cantFilas:            number;
    juzgado:              Juzgado;
}

export type ProcesoDepartamento = 'BOGOTÁ' | 'CUNDINAMARCA' | 'META' | 'ANTIOQUIA';

export interface Juzgado {
    id:   number;
    tipo: string;
    url:  string;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toPrismaMapMongoFind(
    json: string
  ): PrismaMapMongoFind {
    return JSON.parse(
      json
    );
  }

  public static prismaMapMongoFindToJson(
    value: PrismaMapMongoFind
  ): string {
    return JSON.stringify(
      value
    );
  }

  public static toActuacione(
    json: string
  ): Actuacione {
    return JSON.parse(
      json
    );
  }

  public static actuacioneToJson(
    value: Actuacione
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
}
