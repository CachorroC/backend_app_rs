import { Notificacion, rawNotificacion, The291 } from 'types/carpetas';
import { fixSingleFecha } from './idk';

export class ClassNotificacion implements Notificacion {
  constructor(
    notificacion: rawNotificacion
  ) {
    const {
      fisico, certimail, autoNotificado
    }
      = notificacion;
    this.certimail = certimail
      ? certimail === 'SI'
        ? true
        : false
      : null;
    this.fisico = fisico
      ? fisico === 'SI'
        ? true
        : false
      : null;
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
      this[ '291' ] = {
        fechaRecibido: newFechaRecibido
        , fechaAporta  : newFechaAporta
        , resultado    : newResultado
      };
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
      this[ '292' ] = {
        fechaRecibido: newFechaRecibido
        , fechaAporta  : newFechaAporta
        , resultado    : newResultado
      };
    }



  }
  certimail: boolean | null;
  fisico: boolean | null;
  autoNotificado: string | null;
  '291': The291 | null;
  '292': The291 | null;
}
