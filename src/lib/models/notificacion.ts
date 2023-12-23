
import { fixSingleFecha } from './idk';
import { CarpetaRaw } from '../types/raw-carpeta';
import { Notificacion, Notifier } from '../types/carpetas';

export class ClassNotificacion implements Notificacion {
  constructor (
    {
      demanda, numero
    }: CarpetaRaw
  ) {
    this.id = numero;
    this.demandaId = numero;

    const {
      notificacion
    } = demanda;

    if ( !notificacion ) {

      this.certimail = false;
      this.autoNotificado = null,
      this.fisico = false;
      return;
    }

    const {
      fisico, certimail, autoNotificado
    }
      = notificacion;
    this.certimail = certimail
      ? certimail === 'SI'
        ? true
        : false
      : false;
    this.fisico = fisico
      ? fisico === 'SI'
        ? true
        : false
      : false;
    this.autoNotificado = autoNotificado
      ? typeof autoNotificado === 'number'
        ? autoNotificado.toString()
        : autoNotificado
      : null;


    const the291 = notificacion[ '291' ];

    if ( the291 ) {
      const {
        fechaRecibido, resultado, fechaAporta
      }
        = the291;

      const newFechaRecibido = fechaRecibido
        ? fixSingleFecha(
          typeof fechaRecibido === 'number'
            ? fechaRecibido.toString()
            : fechaRecibido
        )
        : null;

      const newFechaAporta = fechaAporta
        ? fixSingleFecha(
          typeof fechaAporta === 'number'
            ? fechaAporta.toString()
            : fechaAporta
        )
        : null;

      const newResultado = resultado
        ? resultado === 'POSITIVO'
          ? true
          : false
        : null;
      this.notifiers.push(
        {
          tipo          : '291',
          notificacionId: numero,
          fechaRecibido : newFechaRecibido
          , fechaAporta   : newFechaAporta
          , resultado     : newResultado
        }
      );
    }

    const the292 = notificacion[ '292' ];

    if ( the292 ) {
      const {
        fechaRecibido, resultado, fechaAporta
      }
        = the292;

      const newFechaRecibido = fechaRecibido
        ? fixSingleFecha(
          fechaRecibido
        )
        : null;

      const newFechaAporta = fechaAporta
        ? fixSingleFecha(
          typeof fechaAporta === 'number'
            ? fechaAporta.toString()
            : fechaAporta
        )
        : null;

      const newResultado = resultado
        ? resultado === 'POSITIVO'
          ? true
          : false
        : null;
      this.notifiers.push(
        {
          tipo          : '292',
          notificacionId: numero,
          fechaRecibido : newFechaRecibido
          , fechaAporta   : newFechaAporta
          , resultado     : newResultado
        }
      );
    }


  }
  autoNotificado: string | null;
  demandaId: number;
  certimail: boolean;
  fisico: boolean;
  id: number;
  notifiers: Notifier[] = [];
}
