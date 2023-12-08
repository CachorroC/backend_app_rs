import { Actuacion, Carpeta, Demanda, Deudor, Juzgado, Nota, Proceso, SubTarea, Tarea } from '@prisma/client';

export class Convert {
  public static toCarpeta (
    json: string
  ): Carpeta {
    return JSON.parse(
      json
    );
  }

  public static carpetaToJson (
    value: Carpeta
  ): string {
    return JSON.stringify(
      value
    );
  }

  public static toDemanda (
    json: string
  ): Demanda {
    return JSON.parse(
      json
    );
  }

  public static demandaToJson (
    value: Demanda
  ): string {
    return JSON.stringify(
      value
    );
  }

  public static toDeudor (
    json: string
  ): Deudor {
    return JSON.parse(
      json
    );
  }

  public static deudorToJson (
    value: Deudor
  ): string {
    return JSON.stringify(
      value
    );
  }

  public static toJuzgado (
    json: string
  ): Juzgado {
    return JSON.parse(
      json
    );
  }

  public static juzgadoToJson (
    value: Juzgado
  ): string {
    return JSON.stringify(
      value
    );
  }

  public static toNota (
    json: string
  ): Nota {
    return JSON.parse(
      json
    );
  }

  public static notaToJson (
    value: Nota
  ): string {
    return JSON.stringify(
      value
    );
  }

  public static toProceso (
    json: string
  ): Proceso {
    return JSON.parse(
      json
    );
  }

  public static procesoToJson (
    value: Proceso
  ): string {
    return JSON.stringify(
      value
    );
  }

  public static toTarea (
    json: string
  ): Tarea {
    return JSON.parse(
      json
    );
  }

  public static tareaToJson (
    value: Tarea
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

  public static toUltimaActuacion (
    json: string
  ): Actuacion {
    return JSON.parse(
      json
    );
  }

  public static ultimaActuacionToJson (
    value: Actuacion
  ): string {
    return JSON.stringify(
      value
    );
  }
}
