import { Juzgado, Category, TipoProceso, Codeudor } from '@prisma/client';
import { intActuacion, ConsultaActuacion } from '../types/actuaciones';
import { intProceso, Data } from '../types/procesos';
import { ClassDemanda, NewJuzgado, tipoProcesoBuilder } from './demanda';
import { ClassDeudor } from './deudor';
import { CarpetaRaw, DemandaRaw, IntCarpeta, IntDemanda, IntDeudor } from 'types/int-carpeta';


export class CarpetaBuilder implements IntCarpeta {
  actuaciones: { carpetaNumero: number | null; isUltimaAct: boolean; createdAt: Date; idRegActuacion: number; llaveProceso: string; consActuacion: number; fechaActuacion: Date; actuacion: string; anotacion: string | null; fechaInicial: Date | null; fechaRegistro: Date; fechaFinal: Date | null; codRegla: string; conDocumentos: boolean; cant: number; idProceso: number; }[] | null;
  juzgados: Juzgado[] | null;
  codeudor: Codeudor | null;
  demanda: DemandaRaw;
  demandas: IntDemanda[];
  numero: number;
  llaveProceso: string;
  fecha: Date | null;
  ultimaActuacion: intActuacion | null;
  category: Category;
  revisado: boolean;
  terminado: boolean;
  tipoProceso: TipoProceso;
  deudor: IntDeudor;
  cc: number;
  procesos: intProceso[] | null;
  idProcesos: number[] ;
  nombre: string;

  constructor (
    {
      numero, deudor, category, codeudor, demanda
    }: CarpetaRaw
  ) {
    const newDemanda = new ClassDemanda(
      demanda, numero
    );
    this.numero = numero;
    this.nombre = deudor.nombre;
    this.category = category;
    this.revisado = category === 'Terminados'
      ? true
      : false;
    this.codeudor = codeudor
      ?{
          nombre: codeudor.nombre
            ? String(
              codeudor.nombre
            )
            : null
          , cedula: codeudor.cedula
            ? String(
              codeudor.cedula
            )
            : null
          , direccion: codeudor.direccion
            ? String(
              codeudor.direccion
            )
            : null
          , telefono: codeudor.telefono
            ? String(
              codeudor.telefono
            )
            : null
          , id           : this.numero
          , carpetaNumero: this.numero
        }
      : null;
    this.tipoProceso = demanda.tipoProceso
      ? tipoProcesoBuilder(
        demanda.tipoProceso
      )
      : 'SINGULAR';
    this.deudor = new ClassDeudor(
      deudor
    );
    this.demanda = demanda;
    this.demandas = [
      newDemanda
    ];
    this.terminado = category === 'Terminados'
      ? true
      : false;
    this.cc = Number(
      deudor.cedula
    );
    this.actuaciones = null;
    this.juzgados = null;
    this.idProcesos = [];
    this.procesos = null;
    this.ultimaActuacion = null;
    this.fecha = null;
    this.llaveProceso = demanda.llaveProceso;
  }
  set _llaveProceso (
    expediente: string
  ) {
    if ( expediente.length === 23 ) {
      this.llaveProceso = expediente;
    }
  }

  async getProcesos () {
    try {
      if ( !this.llaveProceso ) {
        throw new Error(
          'no hay llaveProceso en esta carpeta, aborting'
        );
      }

      const request = await fetch(
        `https://consultaprocesos.ramajudicial.gov.co:448/api/v2/Procesos/Consulta/NumeroRadicacion?numero=${ this.llaveProceso }&SoloActivos=false&pagina=1`,
      );

      if ( !request.ok ) {
        const json = await request.json();

        const message = `Error CarpetaBuilder.getProcesos.fetchError(${ this.numero
        }) => ${ JSON.stringify(
          json, null, 2
        ) }`;
        throw new Error(
          message
        );
      }

      const consultaProcesos
        = ( await request.json() ) as Data;

      const {
        procesos
      } = consultaProcesos;

      this.procesos = procesos.map(
        (
          proceso
        ) => {
          return {
            ...proceso
            , fechaProceso: proceso.fechaProceso
              ? new Date(
                proceso.fechaProceso
              )
              : null
            , fechaUltimaActuacion: proceso.fechaUltimaActuacion
              ? new Date(
                proceso.fechaUltimaActuacion
              )
              : null
          };
        }
      );
      this.idProcesos = procesos.map(
        (
          prc
        ) => {
          return prc.idProceso;
        }
      );
      this.juzgados = procesos.map(
        (
          proceso
        ) => {
          return new NewJuzgado(
            proceso
          );
        }
      );
      this.demandas = procesos.map(
        (
          proceso
        ) => {
          return new ClassDemanda(
            this.demanda, this.numero, proceso
          );
        }
      );
      return this.procesos;
    } catch ( error ) {
      console.log(
        `${ this.numero } => error en CarpetaBuilder.getProcesos(${ this.numero }) => ${ error }`,
      );
      return null;
    }
  }
  async getActuaciones () {
    try {
      if ( !this.procesos || this.procesos.length === 0 ) {
        throw new Error(
          'no hay idProcesos en esta carpeta'
        );
      }

      const actuacionesMap = new Set<intActuacion>();

      for ( const proceso of this.procesos ) {
        try {
          if ( proceso.esPrivado ) {
            continue;
          }

          const request = await fetch(
            `https://consultaprocesos.ramajudicial.gov.co:448/api/v2/Proceso/Actuaciones/${ proceso.idProceso }`,
          );

          if ( !request.ok ) {
            const json = await request.json();
            throw new Error(
              JSON.stringify(
                json
              )
            );
          }

          const consultaActuaciones
            = ( await request.json() ) as ConsultaActuacion;

          const {
            actuaciones
          } = consultaActuaciones;

          const [
            ultimaActuacion
          ] = actuaciones;

          const incomingDate = new Date(
            ultimaActuacion.fechaActuacion
          );

          const incomingYear = incomingDate.getFullYear();

          const incomingMonth = incomingDate.getMonth();

          const incomingDay = incomingDate.getDate();
          console.log(
            `${ this.numero } => la nueva fecha de la actuacion es: ${ new Date(
              incomingYear,
              incomingMonth,
              incomingDay,
            ) } y el timezone offset es  ${ incomingDate.getTimezoneOffset() }
          raw: ${ ultimaActuacion.fechaActuacion }`,
          );



          const savedYear = this.fecha?.getFullYear();

          const savedMonth = this.fecha?.getMonth();

          const savedDay = this.fecha?.getDate();
          console.log(
            `${ this.numero
            } => la fecha guardada en el servidor de LINK -  actuacion es: ${ new Date(
              savedYear ?? 0,
              savedMonth ?? 0,
              savedDay,
            ) }`,
          );

          if (
            !this.fecha
            || this.fecha < incomingDate
            || this.fecha.toString() === 'Invalid Date'
          ) {
            this.fecha = new Date(
              ultimaActuacion.fechaActuacion
            );
            this.ultimaActuacion = {
              ...ultimaActuacion
              , idProceso  : proceso.idProceso
              , isUltimaAct: ultimaActuacion.cant === ultimaActuacion.consActuacion
                ? true
                : false
            };

          }

          actuaciones.forEach(
            (
              actuacion
            ) => {
              actuacionesMap.add(
                {
                  ...actuacion
                  , idProceso: proceso.idProceso
                  , isUltimaAct:
                    actuacion.cant === actuacion.consActuacion
                      ? true
                      : false
                  , carpetaNumero : this.numero
                  , createdAt     : new Date
                  , fechaActuacion: new Date(
                    actuacion.fechaActuacion
                  )
                  , fechaRegistro: new Date(
                    actuacion.fechaRegistro
                  )
                  , fechaInicial: actuacion.fechaInicial
                    ? new Date(
                      actuacion.fechaInicial
                    )
                    : null
                  , fechaFinal: actuacion.fechaFinal
                    ? new Date(
                      actuacion.fechaFinal
                    )
                    : null,
                }
              );
            }
          );
        } catch ( error ) {
          console.log(
            `${ this.numero } => Error CarpetaBuilder.getActuaciones.fetchError(${ this.numero } : ${ proceso.idProceso }) => ${ error }`,
          );
          continue;
        }

        console.log(
          `${ this.numero } => hay ${ actuacionesMap.size } en la carpeta numero (${ this.numero })`,
        );
        continue;
      }

      this.actuaciones = Array.from(
        actuacionesMap
      );


      return this.actuaciones;
    } catch ( error ) {
      console.log(
        `${ this.numero } => error en CarpetaBuilder.getActuaciones(${ this.numero })=> ${ error }`,
      );
      return null;
    }
  }
}
