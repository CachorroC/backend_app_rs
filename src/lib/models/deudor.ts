import { intDeudor } from 'types/carpetas';
import { DeudorRaw } from 'types/int-carpeta';


export class Tel {
  fijo: number | null;
  celular: number | null;
  constructor (
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

    this.fijo = fijoNumber
      ? fijoNumber[ 0 ]
      : null;
    this.celular = celularNumber
      ? celularNumber[ 0 ]
      : null;
  }
}

export class ClassDeudor implements intDeudor {
  constructor (
    {
      cedula, direccion, email, nombre, telefono = ''
    }: DeudorRaw
  ) {
    this.cedula = Number(
      cedula
    );
    this.direccion = direccion
      ? direccion.toString()
      : null;
    this.email = email
      ? email.toString()
      : null;
    this.tel = new Tel(
      String(
        telefono
      )
    );
    this.nombre = nombre;

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
  nombre: string;
  telefono?: { fijo?: number | undefined; celular?: number | undefined; } | undefined;
  tel: {
    fijo: number | null;
    celular: number | null
  };
  primerNombre: string;
  segundoNombre: string | null;
  primerApellido: string;
  segundoApellido: string | null;
  cedula: number;
  direccion: string | null;
  email: string | null;
}
