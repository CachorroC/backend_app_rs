import { intJuzgado } from 'types/carpetas';
import { DemandaRaw, IntDemanda,  TipoProceso, TipoProcesoRaw, intNotificacion,  rawNotificacion } from 'types/int-carpeta';
import { despachosList } from '../data/despachos';
import { Juzgado } from '@prisma/client';
import { intProceso } from 'types/procesos';


const Despachos = despachosList();

export function tipoProcesoBuilder (
  tipoProceso?: TipoProcesoRaw
): TipoProceso {
  if ( !tipoProceso ) {
    return 'SINGULAR';
  }

  const tipoProcesoMatchAcumulado = tipoProceso.match(
    /[Aa][Cc][Uu][Mm]...../g
  );

  const isAcumulado = tipoProcesoMatchAcumulado !== null;

  const tipoProcesoMatchHipotecario = tipoProceso.match(
    /[Hh][Ii][Pp][Oo][Tt][Ee]..../g,
  );

  const isHipotecario = tipoProcesoMatchHipotecario !== null;

  const tipoProcesoMatchPrendario = tipoProceso.match(
    /[Pp][Rr][Ee][Nn]...../g
  );

  const isPrendario = tipoProcesoMatchPrendario !== null;

  const tipoProcesoMatchSingular = tipoProceso.match(
    /[Ss][Ii][Nn][Gg]...../g
  );

  const isSingular = tipoProcesoMatchSingular !== null;

  if ( isAcumulado ) {
    return 'ACUMULADO';
  } else if ( isHipotecario ) {
    return 'HIPOTECARIO';
  } else if ( isPrendario ) {
    return 'PRENDARIO';
  } else if ( isSingular ) {
    return 'SINGULAR';
  }

  return 'SINGULAR';
}

function vencimientoPagareFixer (
  rawVencimientoPagare?: string | number
) {
  if ( !rawVencimientoPagare ) {
    return [];
  }

  let stringPagare;

  if ( typeof rawVencimientoPagare === 'number' ) {
    stringPagare = rawVencimientoPagare.toString();
  } else {
    stringPagare = rawVencimientoPagare;
  }

  const pagaresDateSet = new Set<Date>();

  const matcherPagare = stringPagare.split(
    '//'
  );
  /* console.log(
    `hay ${ matcherPagare?.length } pagarés en este proceso`
  ); */

  for ( const pagare of matcherPagare ) {
    const newPagareString = pagare.trim()
      .replace(
        '/', '-'
      );

    const regexMatchStringYear = newPagareString.match(
      /\d{4}/g
    );

    const regexMatchStringMonth = newPagareString.match(
      /-\d{1,2}-/g
    );
    console.log(
      regexMatchStringYear
    );

    const monthConGuiones = regexMatchStringMonth
      ? regexMatchStringMonth[ 0 ]
      : '-01-';

    const month = monthConGuiones.replaceAll(
      '-', ''
    );

    const year = regexMatchStringYear
      ? regexMatchStringYear[ 0 ]
      : '2015';

    const stringDate = new Date(
      Number(
        year
      ), Number(
        month
      ) - 1
    );

    /*  console.log(
      `la nueva fecha del pagaré arrojó: ${ stringDate.toDateString() }`,
    ); */

    if ( !stringDate || stringDate.toString() === 'Invalid Date' ) {
      console.log(
        `stringDate is ${ stringDate.toLocaleDateString() } es ${ newPagareString }`
      );
    }

    pagaresDateSet.add(
      stringDate
    );
  }

  return Array.from(
    pagaresDateSet
  );
}

function capitalBuilder (
  capitalAdeudado: string | number
) {
  let moneyBuilder;

  if ( typeof capitalAdeudado === 'number' ) {
    moneyBuilder = capitalAdeudado.toString();
  } else {
    moneyBuilder = capitalAdeudado;
  }

  const copTaker = moneyBuilder.replaceAll(
    /\sCOP/gi, ''
  );

  const dotTaker = copTaker.replaceAll(
    '.', ''
  );

  const commaTaker = dotTaker.replaceAll(
    ',', ''
  );
  /* console.log(
    commaTaker
  ); */

  return Number(
    commaTaker
  );
}

export function juzgadosByProceso (
  procesos: intProceso[]
) {
  if ( procesos.length === 0 ) {
    return [];
  }

  const juzgados = new Set<intJuzgado>();

  for ( const proceso of procesos ) {
    const newJ = new NewJuzgado(
      proceso
    );
    juzgados.add(
      newJ
    );
  }

  return Array.from(
    juzgados
  );
}

export class NewJuzgado implements intJuzgado {
  constructor (
    proceso: intProceso
  ) {
    const matchedDespacho = Despachos.find(
      (
        despacho
      ) => {
        const nDesp = despacho.nombre
          .toLowerCase()
          .normalize(
            'NFD'
          )
          .replace(
            /\p{Diacritic}/gu, ''
          )
          .trim();

        const pDesp = proceso.despacho
          .toLowerCase()
          .normalize(
            'NFD'
          )
          .replace(
            /\p{Diacritic}/gu, ''
          )
          .trim();

        const indexOfDesp = nDesp.indexOf(
          pDesp
        );

        if ( indexOfDesp >= 0 ) {
          console.log(
            `procesos despacho is in despachos ${ indexOfDesp + 1 }`
          );
        }

        return nDesp === pDesp;
      }
    );

    const nameN = matchedDespacho
      ? matchedDespacho.nombre
      : proceso.despacho;

    const matchedId = nameN.match(
      /\d+/g
    );

    this.id = Number(
      matchedId?.toString()
    );
    ( this.tipo = matchedDespacho
      ? matchedDespacho.nombre
      : proceso.despacho ),
    ( this.url = matchedDespacho
      ? `https://www.ramajudicial.gov.co${ matchedDespacho.url }`
      : `https://www.ramajudicial.gov.co${ proceso.despacho
        .replaceAll(
          ' ', '-'
        )
        .toLowerCase() }` );
  }
  id: number;
  tipo: string;
  url: string;
}

export class ClassDemanda implements IntDemanda {
  constructor(
    {
      capitalAdeudado,
      entregaGarantiasAbogado,
      etapaProcesal,
      departamento,
      fechaPresentacion,
      tipoProceso,
      mandamientoPago,
      municipio,
      obligacion,
      radicado,
      llaveProceso,
      medidasCautelares,
      notificacion,
      vencimientoPagare,
    }: DemandaRaw,
    numero: number,
    proceso?: intProceso
  ) {
    const obligacionesSet = new Set<string | number>();

    if ( obligacion ) {
      const {
        A, B
      } = obligacion;

      if ( A ) {
        obligacionesSet.add(
          A
        );
      }

      if ( B ) {
        obligacionesSet.add(
          B
        );
      }
    }

    this.fechaPresentacion = fechaPresentacionBuilder(
      fechaPresentacion
    );

    const dateMandamientoPago = mandamientoPago
      ? new Date(
        mandamientoPago
      )
      : null;

    if ( !dateMandamientoPago ) {
      this.mandamientoPago = null;
    } else {
      const isValidDate
        = dateMandamientoPago.toString() !== 'Invalid Date';

      if ( !isValidDate ) {
        this.mandamientoPago = null;
      } else {
        this.mandamientoPago = dateMandamientoPago;
      }
    }

    const dateEntregaGarantiasAbogado
      = entregaGarantiasAbogado
        ? new Date(
          entregaGarantiasAbogado
        )
        : null;

    if ( !dateEntregaGarantiasAbogado ) {
      this.entregaGarantiasAbogado = null;
    } else {
      const isValidDate
        = dateEntregaGarantiasAbogado.toString()
        !== 'Invalid Date';

      if ( !isValidDate ) {
        this.entregaGarantiasAbogado = null;
      } else {
        this.entregaGarantiasAbogado
          = dateEntregaGarantiasAbogado;
      }
    }

    this.llaveProceso = llaveProceso
      ? llaveProceso
      : null;

    this.capitalAdeudado = capitalBuilder(
      capitalAdeudado
        ? capitalAdeudado
        : 0
    );

    this.tipoProceso = tipoProcesoBuilder(
      tipoProceso
    );
    this.etapaProcesal = etapaProcesal
      ? `${ etapaProcesal }`
      : null;
    this.municipio = municipio
      ? municipio
      : null;
    this.obligacion = Array.from(
      obligacionesSet
    );
    this.radicado = radicado
      ? `${ radicado }`
      : null;
    this.vencimientoPagare = vencimientoPagareFixer(
      vencimientoPagare
    );
    this.departamento = departamento
      ? departamento
      : null;
    this.juzgado = proceso
      ? new NewJuzgado(
        proceso
      )
      : null;
    this.idProceso = proceso
      ? proceso.idProceso
      : numero;
    this.idConexion = proceso
      ? proceso.idConexion
      : null;
    this.fechaProceso = proceso
      ? proceso.fechaProceso
        ? new Date(
          proceso.fechaProceso
        )
        : null
      : null;
    this.fechaUltimaActuacion = proceso
      ? proceso.fechaUltimaActuacion
        ? new Date(
          proceso.fechaUltimaActuacion
        )
        : null
      : null;
    this.sujetosProcesales = proceso
      ? proceso.sujetosProcesales
      : null;
    this.esPrivado = proceso
      ? proceso.esPrivado
      : null;
    this.cantFilas = proceso
      ? proceso.cantFilas
      : null;

    this.medidasCautelares = medidasCautelares
      ? {
          fechaOrdenaMedida: medidasCautelares.fechaOrdenaMedidas
            ? new Date(
              medidasCautelares.fechaOrdenaMedidas
            )
            : null
          , medidaSolicitada: medidasCautelares.medidaSolicitada
            ? medidasCautelares.medidaSolicitada
            : null
        }
      : null;

    this.notificacion = notificacion
      ? new ClassNotificacion(
        notificacion
      )
      : null;
  }
  capitalAdeudado: number | null;
  departamento: string | null;
  entregaGarantiasAbogado: Date | null;
  tipoProceso: TipoProceso;
  mandamientoPago: Date | null;
  etapaProcesal: string | null;
  fechaPresentacion: Date[];
  municipio: string | null;
  obligacion: ( string | number )[];
  radicado: string | null;
  vencimientoPagare: ( Date | null )[];
  juzgado: Juzgado | null;
  idProceso: number;
  idConexion: number | null;
  llaveProceso: string | null;
  fechaProceso: Date | null;
  fechaUltimaActuacion: Date | null;
  sujetosProcesales: string | null;
  esPrivado: boolean | null;
  cantFilas: number | null;
  notificacion: intNotificacion | null;
  medidasCautelares: { fechaOrdenaMedida: Date | null; medidaSolicitada: string | null; } | null;
}

export class ClassNotificacion implements intNotificacion {
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

    const notifiersBuilder = new Map<number, {
      tipo: '291' | '292';
      fechaRecibido: Date | null;
      resultado: boolean | null;
      fechaAporta: Date | null;
    }>();

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
      notifiersBuilder.set(
        291,
        {
          tipo         : '291'
          , fechaRecibido: newFechaRecibido
          , fechaAporta  : newFechaAporta
          , resultado    : newResultado,
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
      notifiersBuilder.set(
        292,
        {
          tipo         : '292'
          , fechaRecibido: newFechaRecibido
          , fechaAporta  : newFechaAporta
          , resultado    : newResultado,
        }
      );
    }

    this.notifiers = Array.from(
      notifiersBuilder.values()
    );
  }
  certimail: boolean | null;
  fisico: boolean | null;
  autoNotificado: string | null;
  notifiers: {
    tipo: '291' | '292';
    fechaRecibido: Date | null;
    resultado: boolean | null;
    fechaAporta: Date | null;
  }[];
}



export function fechaPresentacionBuilder(
  rawFechaPresentacion?: string | number
) {
  if ( !rawFechaPresentacion ) {
    return [];
  }

  const isNumber = typeof rawFechaPresentacion === 'number';

  if ( isNumber ) {
    return [
      new Date(
        rawFechaPresentacion
      )
    ];
  }

  const {
    length: rawFechaPresentacionLength
  }= rawFechaPresentacion;
  console.log(
    rawFechaPresentacionLength
  );

  if ( rawFechaPresentacionLength <= 12 ) {
    //* Hay solamente una fecha
    const fechaFixed = fixSingleFecha(
      rawFechaPresentacion
    );

    if ( !fechaFixed ) {
      return [];
    }

    return [
      fechaFixed
    ];
  }

  const fechasSet = new Set<Date>();

  const [
    firstFecha,
    secondFecha,
    thirdFecha,
    fourthFecha,
  ] = rawFechaPresentacion.split(
    '//'
  );



  if ( firstFecha && firstFecha.length <= 12 ) {
    console.log(
      firstFecha.length
    );

    //* Es una la primer fecha de presentacion
    const fechaFixed = fixSingleFecha(
      firstFecha
    );

    if ( fechaFixed ) {
      fechasSet.add(
        fechaFixed
      );
    }
  }

  if ( secondFecha && secondFecha.length <= 12 ) {
    console.log(
      secondFecha.length
    );

    //* Es una la primer fecha de presentacion
    const fechaFixed = fixSingleFecha(
      secondFecha
    );

    if ( fechaFixed ) {
      fechasSet.add(
        fechaFixed
      );
    }
  }

  if ( thirdFecha && thirdFecha.length <= 12 ) {
    console.log(
      thirdFecha.length
    );

    //* Es una la primer fecha de presentacion
    const fechaFixed = fixSingleFecha(
      thirdFecha
    );

    if ( fechaFixed ) {
      fechasSet.add(
        fechaFixed
      );
    }
  }


  if ( fourthFecha && fourthFecha.length <= 12 ) {
    console.log(
      fourthFecha.length
    );

    //* Es una la primer fecha de presentacion
    const fechaFixed = fixSingleFecha(
      fourthFecha
    );

    if ( fechaFixed ) {
      fechasSet.add(
        fechaFixed
      );
    }
  }

  return Array.from(
    fechasSet
  );
}

export function fixSingleFecha(
  rawFecha: string
) {
  const [
    rawDay,
    rawMonth,
    rawYear
  ] = rawFecha
    .trim()
    .split(
      '/'
    );

  if ( !rawYear || !rawMonth ) {
    return null;
  }

  console.log(
    rawDay.padStart(
      2, '0'
    )
  );
  console.log(
    rawMonth
  );
  console.log(
    `rawYear ${ rawYear } es ${ rawYear.padStart(
      4, '20'
    ) }`
  );

  const stringDate = new Date(
    Number(
      rawYear.padStart(
        4, '20'
      )
    ),
    Number(
      rawMonth
    ) - 1,
    Number(
      rawDay.padStart(
        2, '0'
      )
    )
  );

  console.log(
    `la nueva fecha del pagaré arrojó: ${ stringDate.toDateString() }`
  );

  if ( stringDate.toString() === 'Invalid Date' ) {
    return null;
  }

  return stringDate;
}
