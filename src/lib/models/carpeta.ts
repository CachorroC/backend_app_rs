import { intJuzgado } from 'types/carpetas';
import { intActuacion, intCarpeta, intCategory, intCodeudor, intDemanda, intDeudor, intProceso, intTipoProceso } from 'types/int-carpeta';
import { RawCarpeta } from 'types/raw-carpeta';
import { ClassDemanda, NewJuzgado } from './demanda';
import { ClassDeudor } from './deudor';
import { ConsultaNumeroRadicacion } from 'types/procesos';
import { ConsultaActuacion } from 'types/actuaciones';

export class CarpetaBuilder implements intCarpeta {
  procesos?: intProceso[];
  revisado: boolean;
  updatedAt: Date;
  terminado: boolean;
  ultimaActuacion?: intActuacion;
  actuaciones?: intActuacion[];
  juzgados?: intJuzgado[];
  category: intCategory;
  demanda: intDemanda;
  deudor: intDeudor;
  numero: number;
  llaveProceso: string = 'SinEspecificar';
  nombre: string;
  idProcesos?: number[];
  fecha?: Date;
  codeudor?: intCodeudor;
  constructor (
    {
      demanda, deudor, numero, category, codeudor
    }: RawCarpeta
  ) {
    this.nombre = deudor.nombre;
    this.numero = numero;
    this.category = category;
    this.updatedAt = new Date();
    this.revisado = category === 'Terminados'
      ? true
      : false;
    this.terminado = category === 'Terminados'
      ? true
      : false;
    this.llaveProceso = demanda.expediente
      ? String(
        demanda.expediente
      )
      : 'SinEspecificar';
    this.demanda = new ClassDemanda(
      demanda
    );
    this.deudor = new ClassDeudor(
      deudor
    );
    this.tipoProceso = demanda.tipoProceso as intTipoProceso;

    if ( codeudor ) {
      this.codeudor = {
        cedula: codeudor.cedula
          ? String(
            codeudor.cedula
          )
          : null,
        direccion: codeudor.direccion
          ? String(
            codeudor.direccion
          )
          : null,
        nombre: codeudor.nombre
          ? String(
            codeudor.nombre
          )
          : null,
        telefonos: codeudor.telefonos
          ? String(
            codeudor.telefonos
          )
          : null,
        id           : this.numero,
        carpetaNumero: this.numero
      };
    }
  }
  idRegUltimaAct?: number | undefined;
  tipoProceso: intTipoProceso;

  async  next () {

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
      console.log(
        request
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
        = ( await request.json() ) as ConsultaNumeroRadicacion;

      const {
        procesos
      } = consultaProcesos;

      if ( procesos ) {

        this.procesos = procesos.map(
          (
            proceso
          ) => {
            return {
              ...proceso,
              fechaProceso: proceso.fechaProceso
                ? new Date(
                  proceso.fechaProceso
                )
                : null,
              fechaUltimaActuacion: proceso.fechaUltimaActuacion
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
      }

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
            console.log(
              `${ this.numero } => la nueva fecha de la actuacion es: ${ new Date(
                incomingYear,
                incomingMonth,
                incomingDay,
              ) } y el timezone offset es  ${ new Date(
                incomingYear,
                incomingMonth,
                incomingDay,
              )
                .getTimezoneOffset() }
          raw: ${ ultimaActuacion.fechaActuacion }`,
            );



            this.fecha = new Date(
              ultimaActuacion.fechaActuacion
            );

          }

          this.ultimaActuacion = {
            ...ultimaActuacion,
            createdAt     : new Date(),
            fechaActuacion: new Date(
              ultimaActuacion.fechaActuacion
            ),
            fechaRegistro: new Date(
              ultimaActuacion.fechaRegistro
            ),
            fechaFinal: ultimaActuacion.fechaFinal
              ? new Date(
                ultimaActuacion.fechaFinal
              )
              : null,
            fechaInicial: ultimaActuacion.fechaInicial
              ? new Date(
                ultimaActuacion.fechaInicial
              )
              : null,
            idProceso  : proceso.idProceso,
            isUltimaAct: ultimaActuacion.cant === ultimaActuacion.consActuacion
              ? true
              : false
          };
          actuaciones.forEach(
            (
              actuacion
            ) => {
              actuacionesMap.add(
                {
                  ...actuacion,
                  idProceso: proceso.idProceso,
                  isUltimaAct:
                    actuacion.cant === actuacion.consActuacion
                      ? true
                      : false,
                  createdAt     : new Date,
                  fechaActuacion: new Date(
                    actuacion.fechaActuacion
                  ),
                  fechaRegistro: new Date(
                    actuacion.fechaRegistro
                  ),
                  fechaInicial: actuacion.fechaInicial
                    ? new Date(
                      actuacion.fechaInicial
                    )
                    : null,
                  fechaFinal: actuacion.fechaFinal
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