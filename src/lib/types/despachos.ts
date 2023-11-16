// To parse this data:
//
//   import { Convert } from "./file";
//
//   const despacho = Convert.toDespacho(json);

export interface Despacho {
  nombre: string;
  especialidad: Especialidad;
  agrupacion: string;
  url: string;
}

export type Especialidad =
  | 'OFICINA JUDICIAL'
  | 'PENAL'
  | 'SIN SECCIÓN - MIXTA'
  | 'PENAL CON FUNCIÓN DE CONTROL DE GARANTÍAS'
  | 'PENAL ESPECIALIZADO'
  | 'EJECUCIÓN DE PENAS Y MEDIDAS DE SEGURIDAD'
  | 'CIVIL'
  | 'CENTRO DE SERVICIOS JUDICIALES'
  | 'PENAL PARA ADOLESCENTES CON FUNCIÓN DE CONTROL DE GARANTÍAS'
  | 'FAMILIA ORALIDAD'
  | 'PROMISCUO / COMPETENCIA MÚLTIPLE'
  | 'CONSTITUCIONAL'
  | 'PENAL CON FUNCIÓN DE CONOCIMIENTO'
  | 'CIVIL - FAMILIA'
  | 'CIVIL - FAMILIA - LABORAL'
  | 'SIN SECCIÓN'
  | 'CENTRO DE SERVICIOS ADMINISTRATIVOS'
  | 'CENTRO DE SERVICIOS JUDICIALES PENALES ADOLESCENTES'
  | 'SIN SECCIÓN - ORAL'
  | 'PENAL ESPECIALIZADOS DE EXTINCIÓN DE DOMINIO'
  | 'SECRETARÍA GENERAL'
  | 'SALA ÚNICA'
  | 'CONSEJO SUPERIOR'
  | 'ADMINISTRATIVA'
  | 'OFICINA DE COORDINACIÓN ADMINISTRATIVA'
  | 'DISCIPLINARIA'
  | 'CIVIL RESTITUCIÓN DE TIERRAS'
  | 'LABORAL'
  | 'SECCIÓN CUARTA - ORAL'
  | 'SECCIÓN PRIMERA MIXTA - ORAL'
  | 'SECCIÓN SEGUNDA MIXTA - ORAL'
  | 'SECCIÓN TERCERA - ORAL'
  | 'SECCIÓN ÚNICA MIXTA (ESCRIT-ORAL)'
  | 'SECCIÓN CUARTA'
  | 'FAMILIA'
  | 'SECCIÓN TERCERA'
  | 'SECCIÓN TERCERA MIXTA - ORAL'
  | 'SECCIÓN PRIMERA - ORAL'
  | 'CIVIL - LABORAL'
  | 'CIVIL ORALIDAD'
  | 'PENAL PARA ADOLESCENTES CON FUNCIÓN DE CONOCIMIENTO'
  | 'PENAL MIXTO(LEYES 600, 906 Y 1098)'
  | 'PROMISCUO DE FAMILIA'
  | 'SECCIÓN SEGUNDA - ORAL'
  | 'OFICINA DE APOYO-PALOQUEMAO'
  | 'OFICINA DE SERVICIOS'
  | 'CONSULTA Y SERVICIO CIVIL'
  | 'PENAL JUSTICIA Y PAZ'
  | 'SECCIÓN PRIMERA'
  | 'SECCIÓN QUINTA'
  | 'SECCIÓN SEGUNDA';

// Converts JSON strings to/from your types
export class despachosConvert {
  public static despachoToJson(
    value: Despacho[] 
  ): string {
    return JSON.stringify(
      value 
    );
  }

  public static toDespacho(
    json: string 
  ): Despacho[] {
    return JSON.parse(
      json 
    );
  }
}
