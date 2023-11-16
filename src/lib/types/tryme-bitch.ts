// To parse this data:
//
//   import { Convert } from "./file";
//
//   const intCarpeta = Convert.toIntCarpeta(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface IntCarpeta {
  _id: string;
  category: Category;
  deudor: Deudor;
  numero: number;
  tipoProceso: TipoProceso;
  idProceso?: number;
  llaveProceso: string;
  categoryTag: number;
  demanda: Demanda;
  fecha?: Date;
  ultimaActuacion?: UltimaActuacion;
  nombre?: string;
}

export type Category =
  | 'Terminados'
  | 'Bancolombia'
  | 'Reintegra'
  | 'Insolvencia'
  | 'LiosJuridicos';

export interface Demanda {
  departamento: Departamento | null;
  juzgados: Juzgado[];
  capitalAdeudado: number | null | string;
  entregaGarantiasAbogado: Date | null;
  etapaProcesal?: string;
  fechaPresentacion: null | string;
  municipio: string;
  obligacion: Obligacion;
  radicado: string;
  vencimientoPagare: Array<Date | null> | Date | null;
  expediente: string;
  entregagarantiasAbogado?: string;
}

export type Departamento =
  | 'CUNDINAMARCA'
  | 'TOLIMA'
  | 'CUNDINAMARCA '
  | 'CUNDINNAMARCA'
  | 'CUN DINAMARCA'
  | 'CUNDINNAMARCA '
  | 'BOYACÁ'
  | 'CNDINAMARCA';

export interface Juzgado {
  id: number;
  tipo: string;
  url: string;
}

export interface Obligacion {
  '0'?: number | string;
  '1': number | string;
  '2'?: number | string;
}

export interface Deudor {
  tel: Tel;
  primerNombre: string;
  segundoNombre?: string;
  primerApellido: string;
  segundoApellido?: string;
  cedula: number | null;
  direccion: string;
  email: string;
}

export interface Tel {
  fijo?: number | string;
  celular?: number;
}

export type TipoProceso =
  | 'HIPOTECARIO'
  | 'PRENDARIO'
  | 'SINGULAR'
  | 'ACUMULADO'
  | 'HIPOTECARIA';

export interface UltimaActuacion {
  idRegActuacion: number;
  llaveProceso: string;
  consActuacion: number;
  fechaActuacion: Date;
  actuacion: string;
  anotacion: null | string;
  fechaInicial: Date | null;
  fechaFinal: Date | null;
  fechaRegistro: Date;
  codRegla: CodRegla;
  conDocumentos: boolean;
  cant: number;
}

export type CodRegla = '00                              ';

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
  public static demandaToJson(
    value: Demanda 
  ): string {
    return JSON.stringify(
      uncast(
        value, r(
          'Demanda' 
        ) 
      ), null, 2 
    );
  }

  public static deudorToJson(
    value: Deudor 
  ): string {
    return JSON.stringify(
      uncast(
        value, r(
          'Deudor' 
        ) 
      ), null, 2 
    );
  }

  public static intCarpetaToJson(
    value: IntCarpeta 
  ): string {
    return JSON.stringify(
      uncast(
        value, r(
          'IntCarpeta' 
        ) 
      ), null, 2 
    );
  }

  public static juzgadoToJson(
    value: Juzgado 
  ): string {
    return JSON.stringify(
      uncast(
        value, r(
          'Juzgado' 
        ) 
      ), null, 2 
    );
  }

  public static obligacionToJson(
    value: Obligacion 
  ): string {
    return JSON.stringify(
      uncast(
        value, r(
          'Obligacion' 
        ) 
      ), null, 2 
    );
  }

  public static telToJson(
    value: Tel 
  ): string {
    return JSON.stringify(
      uncast(
        value, r(
          'Tel' 
        ) 
      ), null, 2 
    );
  }

  public static toDemanda(
    json: string 
  ): Demanda {
    return cast(
      JSON.parse(
        json 
      ), r(
        'Demanda' 
      ) 
    );
  }

  public static toDeudor(
    json: string 
  ): Deudor {
    return cast(
      JSON.parse(
        json 
      ), r(
        'Deudor' 
      ) 
    );
  }

  public static toIntCarpeta(
    json: string 
  ): IntCarpeta {
    return cast(
      JSON.parse(
        json 
      ), r(
        'IntCarpeta' 
      ) 
    );
  }

  public static toJuzgado(
    json: string 
  ): Juzgado {
    return cast(
      JSON.parse(
        json 
      ), r(
        'Juzgado' 
      ) 
    );
  }

  public static toObligacion(
    json: string 
  ): Obligacion {
    return cast(
      JSON.parse(
        json 
      ), r(
        'Obligacion' 
      ) 
    );
  }

  public static toTel(
    json: string 
  ): Tel {
    return cast(
      JSON.parse(
        json 
      ), r(
        'Tel' 
      ) 
    );
  }

  public static toUltimaActuacion(
    json: string 
  ): UltimaActuacion {
    return cast(
      JSON.parse(
        json 
      ), r(
        'UltimaActuacion' 
      ) 
    );
  }

  public static ultimaActuacionToJson(
    value: UltimaActuacion 
  ): string {
    return JSON.stringify(
      uncast(
        value, r(
          'UltimaActuacion' 
        ) 
      ), null, 2 
    );
  }
}

function invalidValue(
  typ: any, val: any, key: any, parent: any = '' 
): never {
  const prettyTyp = prettyTypeName(
    typ 
  );

  const parentText = parent
    ? ` on ${ parent }`
    : '';

  const keyText = key
    ? ` for key "${ key }"`
    : '';

  throw Error(
    `Invalid value${ keyText }${ parentText }. Expected ${ prettyTyp } but got ${ JSON.stringify(
      val,
    ) }`,
  );
}

function prettyTypeName(
  typ: any 
): string {
  if ( Array.isArray(
    typ 
  ) ) {
    if ( typ.length === 2 && typ[ 0 ] === undefined ) {
      return `an optional ${ prettyTypeName(
        typ[ 1 ] 
      ) }`;
    }

    return `one of [${ typ
      .map(
        (
          a 
        ) => {
          return prettyTypeName(
            a 
          );
        } 
      )
      .join(
        ', ' 
      ) }]`;
  } else if ( typeof typ === 'object' && typ.literal !== undefined ) {
    return typ.literal;
  }

  return typeof typ;
}

function jsonToJSProps(
  typ: any 
): any {
  if ( typ.jsonToJS === undefined ) {
    const map: any = {};
    typ.props.forEach(
      (
        p: any 
      ) => {
        map[ p.json ] = {
          key: p.js,
          typ: p.typ,
        };
      } 
    );
    typ.jsonToJS = map;
  }

  return typ.jsonToJS;
}

function jsToJSONProps(
  typ: { jsToJSON: {} | undefined; props: any[] } 
) {
  if ( typ.jsToJSON === undefined ) {
    const map: any = {};
    typ.props.forEach(
      (
        p: any 
      ) => {
        map[ p.js ] = {
          key: p.json,
          typ: p.typ,
        };
      } 
    );
    typ.jsToJSON = map;
  }

  return typ.jsToJSON;
}

function transform(
  val: any,
  typ: any,
  getProps: any,
  key: any = '',
  parent: any = '',
): any {
  function transformPrimitive(
    typ: string, val: any 
  ): any {
    if ( typeof typ === typeof val ) {
      return val;
    }

    return invalidValue(
      typ, val, key, parent 
    );
  }

  function transformUnion(
    typs: any[], val: any 
  ): any {
    // val must validate against one typ in typs
    const l = typs.length;

    for ( let i = 0; i < l; i++ ) {
      const typ = typs[ i ];

      try {
        return transform(
          val, typ, getProps 
        );
      } catch ( _ ) {
        /* empty */
      }
    }

    return invalidValue(
      typs, val, key, parent 
    );
  }

  function transformEnum(
    cases: string[], val: any 
  ): any {
    if ( cases.indexOf(
      val 
    ) !== -1 ) {
      return val;
    }

    return invalidValue(
      cases.map(
        (
          a 
        ) => {
          return l(
            a 
          );
        } 
      ),
      val,
      key,
      parent,
    );
  }

  function transformArray(
    typ: any, val: any 
  ): any {
    // val must be an array with no invalid elements
    if ( !Array.isArray(
      val 
    ) ) {
      return invalidValue(
        l(
          'array' 
        ), val, key, parent 
      );
    }

    return val.map(
      (
        el 
      ) => {
        return transform(
          el, typ, getProps 
        );
      } 
    );
  }

  function transformDate(
    val: any 
  ): any {
    if ( val === null ) {
      return null;
    }

    const d = new Date(
      val 
    );

    if ( isNaN(
      d.valueOf() 
    ) ) {
      return invalidValue(
        l(
          'Date' 
        ), val, key, parent 
      );
    }

    return d;
  }

  function transformObject(
    props: { [k: string]: any },
    additional: any,
    val: any,
  ): any {
    if ( val === null || typeof val !== 'object' || Array.isArray(
      val 
    ) ) {
      return invalidValue(
        l(
          ref || 'object' 
        ), val, key, parent 
      );
    }

    const result: any = {};
    Object.getOwnPropertyNames(
      props 
    )
      .forEach(
        (
          key 
        ) => {
          const prop = props[ key ];

          const v = Object.prototype.hasOwnProperty.call(
            val, key 
          )
            ? val[ key ]
            : undefined;
          result[ prop.key ] = transform(
            v, prop.typ, getProps, key, ref 
          );
        } 
      );
    Object.getOwnPropertyNames(
      val 
    )
      .forEach(
        (
          key 
        ) => {
          if ( !Object.prototype.hasOwnProperty.call(
            props, key 
          ) ) {
            result[ key ] = val[ key ];
          }
        } 
      );

    return result;
  }

  if ( typ === 'any' ) {
    return val;
  }

  if ( typ === null ) {
    if ( val === null ) {
      return val;
    }

    return invalidValue(
      typ, val, key, parent 
    );
  }

  if ( typ === false ) {
    return invalidValue(
      typ, val, key, parent 
    );
  }

  let ref: any = undefined;

  while ( typeof typ === 'object' && typ.ref !== undefined ) {
    let {
      ref 
    } = typ;
    typ = typeMap[ ref ];
  }

  if ( Array.isArray(
    typ 
  ) ) {
    return transformEnum(
      typ, val 
    );
  }

  if ( typeof typ === 'object' ) {
    return Object.prototype.hasOwnProperty.call(
      typ, 'unionMembers' 
    )
      ? transformUnion(
        typ.unionMembers, val 
      )
      : Object.prototype.hasOwnProperty.call(
        typ, 'arrayItems' 
      )
        ? transformArray(
          typ.arrayItems, val 
        )
        : Object.prototype.hasOwnProperty.call(
          typ, 'props' 
        )
          ? transformObject(
            getProps(
              typ 
            ), typ.additional, val 
          )
          : invalidValue(
            typ, val, key, parent 
          );
  }

  // Numbers can be parsed by Date but shouldn't be.
  if ( typ === Date && typeof val !== 'number' ) {
    return transformDate(
      val 
    );
  }

  return transformPrimitive(
    typ, val 
  );
}

function cast<T>(
  val: any, typ: any 
): T {
  return transform(
    val, typ, jsonToJSProps 
  );
}

function uncast<T>(
  val: T, typ: any 
): any {
  return transform(
    val, typ, jsToJSONProps 
  );
}

function l(
  typ: any 
) {
  return {
    literal: typ,
  };
}

function a(
  typ: any 
) {
  return {
    arrayItems: typ,
  };
}

function u(
  ...typs: any[] 
) {
  return {
    unionMembers: typs,
  };
}

function o(
  props: any[], additional: any 
) {
  return {
    props,
    additional,
  };
}

function r(
  name: string 
) {
  return {
    ref: name,
  };
}

const typeMap: any = {
  IntCarpeta: o(
    [
      {
        json: '_id',
        js  : '_id',
        typ : '',
      },
      {
        json: 'category',
        js  : 'category',
        typ : r(
          'Category' 
        ),
      },
      {
        json: 'deudor',
        js  : 'deudor',
        typ : r(
          'Deudor' 
        ),
      },
      {
        json: 'numero',
        js  : 'numero',
        typ : 0,
      },
      {
        json: 'tipoProceso',
        js  : 'tipoProceso',
        typ : r(
          'TipoProceso' 
        ),
      },
      {
        json: 'idProceso',
        js  : 'idProceso',
        typ : u(
          undefined, 0 
        ),
      },
      {
        json: 'llaveProceso',
        js  : 'llaveProceso',
        typ : '',
      },
      {
        json: 'categoryTag',
        js  : 'categoryTag',
        typ : 0,
      },
      {
        json: 'demanda',
        js  : 'demanda',
        typ : r(
          'Demanda' 
        ),
      },
      {
        json: 'fecha',
        js  : 'fecha',
        typ : u(
          undefined, Date 
        ),
      },
      {
        json: 'ultimaActuacion',
        js  : 'ultimaActuacion',
        typ : u(
          undefined, r(
            'UltimaActuacion' 
          ) 
        ),
      },
      {
        json: 'nombre',
        js  : 'nombre',
        typ : u(
          undefined, '' 
        ),
      },
    ],
    false,
  ),
  Demanda: o(
    [
      {
        json: 'departamento',
        js  : 'departamento',
        typ : u(
          r(
            'Departamento' 
          ), null 
        ),
      },
      {
        json: 'juzgados',
        js  : 'juzgados',
        typ : a(
          r(
            'Juzgado' 
          ) 
        ),
      },
      {
        json: 'capitalAdeudado',
        js  : 'capitalAdeudado',
        typ : u(
          3.14, null, '' 
        ),
      },
      {
        json: 'entregaGarantiasAbogado',
        js  : 'entregaGarantiasAbogado',
        typ : u(
          Date, null 
        ),
      },
      {
        json: 'etapaProcesal',
        js  : 'etapaProcesal',
        typ : u(
          undefined, '' 
        ),
      },
      {
        json: 'fechaPresentacion',
        js  : 'fechaPresentacion',
        typ : u(
          null, '' 
        ),
      },
      {
        json: 'municipio',
        js  : 'municipio',
        typ : '',
      },
      {
        json: 'obligacion',
        js  : 'obligacion',
        typ : r(
          'Obligacion' 
        ),
      },
      {
        json: 'radicado',
        js  : 'radicado',
        typ : '',
      },
      {
        json: 'vencimientoPagare',
        js  : 'vencimientoPagare',
        typ : u(
          a(
            u(
              Date, null 
            ) 
          ), Date, null 
        ),
      },
      {
        json: 'expediente',
        js  : 'expediente',
        typ : '',
      },
      {
        json: 'entregagarantiasAbogado',
        js  : 'entregagarantiasAbogado',
        typ : u(
          undefined, '' 
        ),
      },
    ],
    false,
  ),
  Juzgado: o(
    [
      {
        json: 'id',
        js  : 'id',
        typ : 0,
      },
      {
        json: 'tipo',
        js  : 'tipo',
        typ : '',
      },
      {
        json: 'url',
        js  : 'url',
        typ : '',
      },
    ],
    false,
  ),
  Obligacion: o(
    [
      {
        json: '0',
        js  : '0',
        typ : u(
          undefined, u(
            3.14, '' 
          ) 
        ),
      },
      {
        json: '1',
        js  : '1',
        typ : u(
          3.14, '' 
        ),
      },
      {
        json: '2',
        js  : '2',
        typ : u(
          undefined, u(
            0, '' 
          ) 
        ),
      },
    ],
    false,
  ),
  Deudor: o(
    [
      {
        json: 'tel',
        js  : 'tel',
        typ : r(
          'Tel' 
        ),
      },
      {
        json: 'primerNombre',
        js  : 'primerNombre',
        typ : '',
      },
      {
        json: 'segundoNombre',
        js  : 'segundoNombre',
        typ : u(
          undefined, '' 
        ),
      },
      {
        json: 'primerApellido',
        js  : 'primerApellido',
        typ : '',
      },
      {
        json: 'segundoApellido',
        js  : 'segundoApellido',
        typ : u(
          undefined, '' 
        ),
      },
      {
        json: 'cedula',
        js  : 'cedula',
        typ : u(
          0, null 
        ),
      },
      {
        json: 'direccion',
        js  : 'direccion',
        typ : '',
      },
      {
        json: 'email',
        js  : 'email',
        typ : '',
      },
    ],
    false,
  ),
  Tel: o(
    [
      {
        json: 'fijo',
        js  : 'fijo',
        typ : u(
          undefined, u(
            0, '' 
          ) 
        ),
      },
      {
        json: 'celular',
        js  : 'celular',
        typ : u(
          undefined, 0 
        ),
      },
    ],
    false,
  ),
  UltimaActuacion: o(
    [
      {
        json: 'idRegActuacion',
        js  : 'idRegActuacion',
        typ : 0,
      },
      {
        json: 'llaveProceso',
        js  : 'llaveProceso',
        typ : '',
      },
      {
        json: 'consActuacion',
        js  : 'consActuacion',
        typ : 0,
      },
      {
        json: 'fechaActuacion',
        js  : 'fechaActuacion',
        typ : Date,
      },
      {
        json: 'actuacion',
        js  : 'actuacion',
        typ : '',
      },
      {
        json: 'anotacion',
        js  : 'anotacion',
        typ : u(
          null, '' 
        ),
      },
      {
        json: 'fechaInicial',
        js  : 'fechaInicial',
        typ : u(
          Date, null 
        ),
      },
      {
        json: 'fechaFinal',
        js  : 'fechaFinal',
        typ : u(
          Date, null 
        ),
      },
      {
        json: 'fechaRegistro',
        js  : 'fechaRegistro',
        typ : Date,
      },
      {
        json: 'codRegla',
        js  : 'codRegla',
        typ : r(
          'CodRegla' 
        ),
      },
      {
        json: 'conDocumentos',
        js  : 'conDocumentos',
        typ : true,
      },
      {
        json: 'cant',
        js  : 'cant',
        typ : 0,
      },
    ],
    false,
  ),
  Category: [
    'Bancolombia',
    'Insolvencia',
    'LiosJuridicos',
    'Reintegra',
    'Terminados',
  ],
  Departamento: [
    'BOYACÁ',
    'CNDINAMARCA',
    'CUN DINAMARCA',
    'CUNDINAMARCA',
    'CUNDINNAMARCA',
    'CUNDINAMARCA ',
    'CUNDINNAMARCA ',
    'TOLIMA',
  ],
  TipoProceso: [
    'ACUMULADO',
    'HIPOTECARIA',
    'HIPOTECARIO',
    'PRENDARIO',
    'SINGULAR',
  ],
  CodRegla: [
    '00                              '
  ],
};
