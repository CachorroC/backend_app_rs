// To parse this data:
//
//   import { Convert, ContactoForm } from "./file";
//
//   const contactoForm = Convert.toContactoForm(json);

export type Grupo = 'Abogado' | 'Aliado' | 'Demandado' | 'otros';

export interface RawContactoFormValues {
  nombre: string;
  grupo: Grupo;
  newsLetter: boolean;
  email: string;
  telefono: number;
  comentario: string;
}

export interface ContactoForm extends RawContactoFormValues {
  fecha: Date;
}

// Converts JSON strings to/from your types
export class Convert {
  public static contactoFormToJson(
    value: ContactoForm 
  ): string {
    return JSON.stringify(
      value 
    );
  }

  public static toContactoForm(
    json: string 
  ): ContactoForm {
    return JSON.parse(
      json 
    );
  }
}
