// To parse this data:
//
//   import { Convert } from "./file";
//
//   const tarea = Convert.toTarea(json);

export interface IntTarea
{
  id: number;
  creationDate: Date;
  dueDate?: Date;
  carpetaId?: number;
  text: string;
  isComplete: boolean;
  subTareas: SubTarea[];
}

export interface SubTarea
{
  text: string;
  date?: Date;
  isComplete: boolean;
}

// Converts JSON strings to/from your types
export class tareaConvert {
  public static toTarea (
    json: string
  ): IntTarea {
    return JSON.parse(
      json
    );
  }

  public static tareaToJson (
    value: IntTarea
  ): string {
    return JSON.stringify(
      value
    );
  }

  public static toSubTarea (
    json: string
  ): SubTarea {
    return JSON.parse(
      json
    );
  }

  public static subTareaToJson (
    value: SubTarea
  ): string {
    return JSON.stringify(
      value
    );
  }
}
