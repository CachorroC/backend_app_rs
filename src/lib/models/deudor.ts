import { Deudor } from '../types/carpetas';
import { CarpetaRaw } from '../types/raw-carpeta';


function telefonoFixer (
  telefono: string
) {
  const celularStringArray = telefono.match(
    /\d{10}/g
  );

  const fijoStringArray = telefono.match(
    /\d{7}\s/g
  );

  const celularNumber = celularStringArray?.map(
    (
      f
    ) => {
      return Number(
        f
      );
    }
  );

  const fijoNumber = fijoStringArray?.map(
    (
      f
    ) => {
      return Number(
        f
      );
    }
  );

  return {
    telFijo: fijoNumber
      ? String(
        fijoNumber[ 0 ]
      )
      : null,
    telCelular: celularNumber
      ? String(
        celularNumber[ 0 ]
      )
      : null
  };
}


export class ClassDeudor implements Deudor {
  constructor (
    {
      deudor: deudorRaw, numero
    } : CarpetaRaw
  ) {

    this.id = numero;
    this.carpetaNumero = numero;

    const {
      cedula, direccion, email, nombre, telefono = ''
    } = deudorRaw;

    const {
      telFijo, telCelular
    } = telefonoFixer(
      String(
        telefono
      )
    );
    this.telFijo = telFijo;
    this.telCelular = telCelular;
    this.cedula = String(
      cedula
    );
    this.direccion = direccion
      ? direccion.toString()
      : null;
    this.email = email
      ? email.toString()
      : null;

    const nameStringArray = nombre.split(
      ' '
    );

    const nameArrayLength = nameStringArray.length;

    switch ( nameArrayLength ) {
        case 4:
          [
            this.primerNombre,
            this.segundoNombre,
            this.primerApellido,
            this.segundoApellido,
          ] = nameStringArray;

          break;

        case 2:
          [
            this.primerNombre,
            this.primerApellido
          ] = nameStringArray;

          this.segundoApellido = null;
          this.segundoNombre = null;

          break;

        case 1:
          [
            this.primerNombre
          ] = nameStringArray;
          this.primerApellido = 'sinEspecificar';
          this.segundoApellido = null;
          this.segundoNombre = null;

          break;

        case 3:
          [
            this.primerNombre,
            this.segundoNombre,
            this.primerApellido
          ]
          = nameStringArray;
          this.segundoApellido = null;

          break;

        default:{

          const [
            primerNombre,
            segundoNombre,
            primerApellido,
            ...segundoApellido
          ] = nameStringArray;
          this.primerNombre = primerNombre;
          this.primerApellido = primerApellido;
          this.segundoNombre = segundoNombre;
          this.segundoApellido = segundoApellido.toString();
          break;
        }

    }
  }
  carpetaNumero: number;
  cedula: string;
  direccion: string | null;
  email: string | null;
  id: number;
  primerApellido: string;
  primerNombre: string;
  segundoApellido: string | null;
  segundoNombre: string | null;
  telCelular: string | null;
  telFijo: string | null;
}
