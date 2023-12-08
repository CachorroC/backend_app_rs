import { intJuzgado } from 'types/carpetas';
import { intDemanda, intDepartamento, intMedidasCautelares, intNotificacion, intObligacion, intProceso, intTipoProceso } from 'types/int-carpeta';
import { RawDemanda, RawTipoProceso } from 'types/raw-carpeta';
import { despachosList } from '../data/despachos';


const Despachos = despachosList();

export function tipoProcesoBuilder (
  tipoProceso?: RawTipoProceso
): intTipoProceso {
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

export class ClassDemanda implements intDemanda {
  constructor (
    {
      capitalAdeudado,
      entregaGarantiasAbogado,
      etapaProcesal,
      departamento,
      notificacion, medidasCautelares,
      fechaPresentacion,
      tipoProceso,
      mandamientoPago,
      municipio,
      obligacion,
      radicado,
      expediente,
      vencimientoPagare,
    }: RawDemanda,
  ) {
    const dateFechaPresentacion = fechaPresentacion
      ? new Date(
        fechaPresentacion
      )
      : null;

    if ( dateFechaPresentacion ) {
      const isValidDate = dateFechaPresentacion.toString() !== 'Invalid Date';

      if ( isValidDate ) {
        this.fechaPresentacion = dateFechaPresentacion;
      }
    }

    const dateMandamientoPago = mandamientoPago
      ? new Date(
        mandamientoPago
      )
      : null;

    if ( dateMandamientoPago ) {

      const isValidDate = dateMandamientoPago.toString() !== 'Invalid Date';

      if ( isValidDate ) {
        this.mandamientoPago = dateMandamientoPago;
      }
    }

    const dateEntregaGarantiasAbogado = entregaGarantiasAbogado
      ? new Date(
        entregaGarantiasAbogado
      )
      : null;

    if ( dateEntregaGarantiasAbogado ) {

      const isValidDate
        = dateEntregaGarantiasAbogado.toString() !== 'Invalid Date';

      if ( isValidDate ) {

        this.entregaGarantiasAbogado = dateEntregaGarantiasAbogado;
      }
    }

    if ( expediente ) {
      this.expediente = String(
        expediente
      );
    }

    this.capitalAdeudado = capitalBuilder(
      capitalAdeudado
        ? capitalAdeudado
        : 0,
    );

    this.tipoProceso = tipoProcesoBuilder(
      tipoProceso
    );

    if ( etapaProcesal ) {
      this.etapaProcesal = String(
        etapaProcesal
      );
    }

    this.municipio = String(
      municipio
    );

    if ( obligacion ) {

      this.obligacion = obligacion;
    }

    if ( radicado ) {
      this.radicado = String(
        radicado
      );
    }

    this.vencimientoPagare = vencimientoPagareFixer(
      vencimientoPagare
    );
    this.departamento = String(
      departamento
    ) as intDepartamento;

    if ( notificacion ) {
      const {
        autoNotificado, tipo,  certimail, fisico
      } = notificacion;

      const notif: intNotificacion = {
        autoNotificado: autoNotificado
          ? new Date(
            autoNotificado
          )
          : null,
        tipo: tipo
          ? String(
            tipo
          )
          : null,
        291: {
          fechaAporta: notificacion[ '291' ]?.fechaAporta
            ? new Date(
              notificacion[ '291' ].fechaAporta
            )
            : null,
          fechaRecibido: notificacion[ '291' ]?.fechaRecibido
            ? new Date(
              notificacion[ '291' ].fechaRecibido
            )
            : null,
          resultado: notificacion[ '291' ]?.resultado
            ?  notificacion[ '291' ].resultado === 'POSITIVO'
              ? true
              : false
            : null
        },
        292: {
          fechaAporta: notificacion[ '292' ]?.fechaAporta
            ? new Date(
              notificacion[ '292' ].fechaAporta
            )
            : null,
          fechaRecibido: notificacion[ '292' ]?.fechaRecibido
            ? new Date(
              notificacion[ '292' ].fechaRecibido
            )
            : null,
          resultado: notificacion[ '292' ]?.resultado
            ? notificacion[ '292' ].resultado === 'POSITIVO'
              ? true
              : false
            : null
        },
        certimail: certimail
          ? certimail === 'SI'
            ? true
            : false
          : false,
        fisico: fisico
          ? fisico === 'SI'
            ? true
            : false
          : false,
      };
      this.notificacion = notif;
    }

    if ( medidasCautelares ) {
      this.medidasCautelares = {
        fechaOrdenaMedidas: medidasCautelares.fechaOrdenaMedidas
          ? new Date(
            medidasCautelares.fechaOrdenaMedidas
          )
          : null,
        medidaSolicitada: medidasCautelares.medidaSolicitada
          ? String(
            medidasCautelares.medidaSolicitada
          )
          : null
      };
    }
  }
  capitalAdeudado: number;
  departamento: intDepartamento;
  entregaGarantiasAbogado?: Date ;
  etapaProcesal?: string ;
  expediente?: string ;
  fechaPresentacion?: Date ;
  mandamientoPago?: Date ;
  medidasCautelares?: intMedidasCautelares ;
  municipio: string;
  notificacion?: intNotificacion ;
  obligacion?: intObligacion;
  radicado?: string ;
  tipoProceso: intTipoProceso;
  vencimientoPagare?: Date[] ;

  set despachos (
    desp: string[]
  ) {
    if ( desp.length === 0 ) {
      return;
    }

    this.despachos = desp;
  }
  get despachos () {
    return this.despachos;
  }

  set sujetosProcesales (
    suj: string[]
  ) {
    if ( suj.length === 0 ) {
      return;
    }

    this.sujetosProcesales = suj;
  }
  get sujetosProcesales () {
    return this.sujetosProcesales;
  }
}
