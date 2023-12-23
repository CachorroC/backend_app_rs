import { despachosList } from '../data/despachos';
import { Demanda, DemandaDepartamento, Juzgado, MedidasCautelares, Notificacion,  TipoProceso } from '../types/carpetas';
import { intProceso } from '../types/procesos';
import { CarpetaRaw } from '../types/raw-carpeta';
import { fechaPresentacionBuilder, fixSingleFecha } from './idk';
import { ClassMedidasCautelares } from './medidasCautelares';
import { ClassNotificacion } from './notificacion';


const Despachos = despachosList();

export function tipoProcesoBuilder (
  tipoProceso?: string
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

  const isNumber = typeof rawVencimientoPagare === 'number';


  if ( isNumber ) {
    return [
      new Date(
        rawVencimientoPagare
      )
    ];
  }

  const {
    length: rawVencimientoPagareLength
  } = rawVencimientoPagare;

  if ( rawVencimientoPagareLength <= 12 ) {
    const fechaFixed = fixSingleFecha(
      rawVencimientoPagare
    );

    if ( !fechaFixed || fechaFixed.toString() === 'Invalid Date' ) {
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
  ] = rawVencimientoPagare.split(
    '//'
  );

  if ( firstFecha && firstFecha.length <= 12 ) {

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

  const juzgados = new Set<Juzgado>();

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

export class NewJuzgado implements Juzgado {
  constructor (
    proceso: intProceso
  ) {
    const matchedDespacho = Despachos.find(
      (
        despacho: { nombre: string; }
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
            `procesos despacho is in despachos ${ indexOfDesp + 1
            }`
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

export class ClassDemanda implements Demanda {
  constructor (
    carpeta: CarpetaRaw,
  ) {
    const {
      demanda: {
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
        vencimientoPagare,
      }, numero
    } = carpeta;
    this.carpetaNumero = numero;

    const obligacionesSet = new Set<string>();

    if ( obligacion ) {
      const {
        A, B
      } = obligacion;

      if ( A ) {
        obligacionesSet.add(
          String(
            A
          )
        );
      }

      if ( B ) {
        obligacionesSet.add(
          String(
            B
          )
        );
      }
    }

    this.fechaPresentacion = fechaPresentacionBuilder(
      fechaPresentacion
    );
    this.notificacion =  new ClassNotificacion(
      carpeta
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

    this.llaveProceso = llaveProceso;

    this.capitalAdeudado = capitalBuilder(
      capitalAdeudado
        ? capitalAdeudado
        : 0
    )
      .toString();

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
      ? departamento as DemandaDepartamento
      : null;
    this.medidasCautelares = new ClassMedidasCautelares(
      carpeta
    );
    this.llaveProceso = llaveProceso;
    this.despacho = null;
    this.id = numero;
  }
  departamento: string | null;
  municipio: string | null;
  capitalAdeudado: string | null;
  carpetaNumero: number;
  despacho: string | null;
  entregaGarantiasAbogado: Date | null;
  etapaProcesal: string | null;
  llaveProceso: string;
  fechaPresentacion: Date[];
  id: number;
  mandamientoPago: Date | null;
  tipoProceso: TipoProceso;
  obligacion: string[];
  radicado: string | null;
  vencimientoPagare: Date[];
  notificacion: Notificacion;
  medidasCautelares: MedidasCautelares;

}
