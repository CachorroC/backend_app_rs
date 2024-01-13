import { prisma } from '../connection/prisma';
import { ConsultaActuacion, outActuacion } from '../types/actuaciones';
import { Category, Codeudor, Demanda, Deudor, IntCarpeta,  Nota,  Tarea,  TipoProceso,  } from '../types/carpetas';
import { ConsultaNumeroRadicacion, outProceso } from '../types/procesos';
import { CarpetaRaw } from '../types/raw-carpeta';
import { ClassDemanda, NewJuzgado, tipoProcesoBuilder } from './demanda';
import { ClassDeudor } from './deudor';

export class CarpetaBuilder implements IntCarpeta {

  constructor (
    carpeta: CarpetaRaw
  ) {
    const {
      numero, deudor, category, codeudor, demanda
    } = carpeta;
    this.numero = numero;
    this._id = String(
      deudor.cedula
    );
    this.idRegUltimaAct = null;
    this.nombre = deudor.nombre;
    this.category = category as Category;
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
      carpeta
    );
    this.demanda = new ClassDemanda(
      carpeta
    );
    this.terminado = category === 'Terminados'
      ? true
      : false;
    this.ultimaActuacion = null;
    this.fecha = null;
    this.updatedAt = new Date();
    this.llaveProceso = demanda.llaveProceso;
  }
  category: Category;
  fecha: Date | null;
  idProcesos: number[] = [];
  idRegUltimaAct: number | null;
  llaveProceso: string;
  nombre: string;
  numero: number;
  revisado: boolean;
  terminado: boolean;
  tipoProceso: TipoProceso;
  updatedAt: Date;
  ultimaActuacion: outActuacion | null;
  deudor: Deudor | null;
  codeudor: Codeudor | null;
  notas: Nota[] = [];
  demanda: Demanda | null;
  procesos: outProceso[] = [];
  tareas: Tarea[] = [];
  actuaciones: outActuacion[] = [];
  _id: string;
  set _llaveProceso (
    expediente: string
  ) {
    if ( expediente.length === 23 ) {
      this.llaveProceso = expediente;
    }
  }

  async getProcesos () {

    try {
      if ( this.llaveProceso === 'SinEspecificar' ) {
        throw new Error(
          'no hay llaveProceso en esta carpeta, aborting'
        );
      }

      const request = await fetch(
        `https://consultaprocesos.ramajudicial.gov.co:448/api/v2/Procesos/Consulta/NumeroRadicacion?numero=${ this.llaveProceso }&SoloActivos=false&pagina=1`
      );

      if ( !request.ok ) {
        const json = await request.json();

        const message = `Error
        Judicial.getProcesos.fetchError(${
  this.numero
}) =>
  ${ JSON.stringify(
    json, null, 2
  ) }
  ${ json }
  ${ request.status }
  ${ request.statusText }
  `;
        throw new Error(
          message
        );
      }

      const consultaProcesos
        = ( await request.json() ) as ConsultaNumeroRadicacion;

      const {
        procesos
      } = consultaProcesos;

      for ( const proceso of procesos ) {
        const newProceso
          = {
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
            , juzgado: new NewJuzgado(
              proceso
            )
          };
        this.idProcesos.push(
          proceso.idProceso
        );
        this.procesos.push(
          newProceso
        );

        try {

          let idBuilder;

          const cedulaAsNumber = Number(
            this.deudor?.cedula
          );

          if ( isNaN(
            cedulaAsNumber
          ) ) {
            idBuilder = Number(
              this.numero
            );
          } else {
            idBuilder = cedulaAsNumber;
          }

          const prismaUpdateProceso = await prisma.proceso.upsert(
            {
              where: {
                idProceso: proceso.idProceso
              }
              , create: {
                ...newProceso
                , juzgado: {
                  connectOrCreate: {
                    where: {
                      tipo: newProceso.juzgado.tipo
                    }
                    , create: newProceso.juzgado
                  }
                }
                , carpeta: {
                  connectOrCreate: {
                    where: {
                      numero: this.numero
                    }
                    , create: {
                      llaveProceso: this.llaveProceso,
                      id          : idBuilder
                      , nombre      : this.nombre
                      , fecha       : this.fecha
                      , numero      : this.numero
                      , category    : this.category
                      , idProcesos  : this.idProcesos
                      , revisado    : this.revisado
                      , terminado   : this.terminado
                      , updatedAt   : new Date()
                    }
                  }
                }
              }
              , update: {

                ...newProceso
                , juzgado: {
                  connectOrCreate: {
                    where: {
                      tipo: newProceso.juzgado.tipo
                    }
                    , create: newProceso.juzgado
                  }
                }
                , carpeta: {
                  connectOrCreate: {
                    where: {
                      numero: this.numero
                    }
                    , create: {
                      id          : idBuilder,
                      llaveProceso: this.llaveProceso
                      , nombre      : this.nombre
                      , fecha       : this.fecha
                      , numero      : this.numero
                      , category    : this.category
                      , idProcesos  : this.idProcesos
                      , revisado    : this.revisado
                      , terminado   : this.terminado
                    }
                  }
                }
              }
            }
          );
          console.log(
            prismaUpdateProceso
          );
        } catch ( e ) {
          console.log(
            `error al insertar el proceso en prisma: ${ e }`
          );
        }
      }
    } catch ( error ) {
      console.log(
        `${ this.numero } => error en CarpetaBuilder.getProcesos(${ this.numero }) => ${ error }`
      );
    }

    return this.procesos;
  }
  async getActuaciones () {
    for ( const idProceso of this.idProcesos ) {
      try {
        const request = await fetch(
          `https://consultaprocesos.ramajudicial.gov.co:448/api/v2/Proceso/Actuaciones/${ idProceso }`,
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

        const {
          fecha
        } = await prisma.carpeta.findFirstOrThrow(
          {
            where: {
              numero: this.numero
            }
          }
        );
        console.log(
          `la fecha guardada en prisma es: ${ fecha }`
        );
        console.log(
          `${ fecha && fecha  < incomingDate
            ? 'la fecha en prisma  es menor que incoming date'
            : 'la fecha en prisma es mayor que incoming dt¡ate ' }`
        );

        if ( !this.fecha
          ||!fecha
          || fecha < incomingDate
          || fecha.toString() === 'Invalid Date'
        ) {
          this.fecha = new Date(
            ultimaActuacion.fechaActuacion
          );
          this.ultimaActuacion = {
            ...ultimaActuacion
            , idProceso     : idProceso
            , fechaActuacion: new Date(
              ultimaActuacion.fechaActuacion
            )
            , fechaRegistro: new Date(
              ultimaActuacion.fechaRegistro
            )
            , fechaFinal: ultimaActuacion.fechaFinal
              ? new Date(
                ultimaActuacion.fechaFinal
              )
              : null
            , fechaInicial: ultimaActuacion.fechaInicial
              ? new Date(
                ultimaActuacion.fechaInicial
              )
              : null
            , isUltimaAct: ultimaActuacion.cant === ultimaActuacion.consActuacion
              ? true
              : false
          };
          this.idRegUltimaAct = ultimaActuacion.idRegActuacion;
        }

        for ( const actuacion of actuaciones ) {
          const newActuacion
            = {
              ...actuacion
              , idProceso: idProceso
              , isUltimaAct:
                    actuacion.cant === actuacion.consActuacion
                      ? true
                      : false
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
            };

          this.actuaciones.push(
            newActuacion
          );

          try {
            await prisma.actuacion.upsert(

              {
                where: {
                  idRegActuacion: newActuacion.idRegActuacion
                }
                , create: {
                  ...newActuacion
                  , carpetaNumero: this.numero
                }
                , update: {
                  ...newActuacion
                  , carpetaNumero: this.numero
                }
              }
            );
          } catch ( e ) {
            console.log(
              `error al insertar las actuaciones en prisma ${ e }`
            );
          }
        }


      } catch ( error ) {
        console.log(
          error, null, 2
        );
        continue;
      }
    }

    return this.actuaciones;
  }
}
