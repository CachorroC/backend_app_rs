// To parse this data:
//
//   import { Convert, IntDepartamentos } from "./file";
//
//   const intDepartamentos = Convert.toIntDepartamentos(json);

export interface IntDepartamentos {
  data: boolean;
  result: Result[];
}

export interface Result {
  idCatalogoDetalle: number;
  descripcion: string;
  valor: Valor;
  codigo: string;
  idCatalogoDetallePadre: number;
  valor1: null;
  departamento: null;
  ciudad: null;
  idDepartamento: number;
  idCiudad: number;
  errorxmail: null;
  lEmail: null;
  registro: boolean;
  idError: number;
  textError: null;
  especialidad: null;
  paraEspecialidad: null;
  confirmarCorreoElectronico: null;
}

export type Valor =
  | 'framosg@deaj.ramajudicial.gov.co'
  | 'gruizh@deaj.ramajudicial.gov.co'
  | ' ';

// Converts JSON strings to/from your types
export class Convert {
  public static intDepartamentosToJson(
    value: IntDepartamentos 
  ): string {
    return JSON.stringify(
      value 
    );
  }

  public static resultToJson(
    value: Result 
  ): string {
    return JSON.stringify(
      value 
    );
  }

  public static toIntDepartamentos(
    json: string 
  ): IntDepartamentos {
    return JSON.parse(
      json 
    );
  }

  public static toResult(
    json: string 
  ): Result {
    return JSON.parse(
      json 
    );
  }
}
