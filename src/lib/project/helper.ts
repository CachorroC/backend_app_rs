export const getBaseUrl = () => {
  const isDev = process.env.NODE_ENV === 'development';

  const isProd = process.env.NODE_ENV === 'production';

  const portToUse = process.env.PORT ?? '3000';

  if ( isProd ) {
    return 'https://app.rsasesorjuridico.com';
  }

  if ( isDev ) {
    return 'https://beta.rsasesorjuridico.com';
  }

  return `http://localhost:${ portToUse }`;
};

export const fixFechas = (
  rawDate?: string | Date | null | undefined
) => {
  if ( !rawDate || rawDate === null || rawDate === undefined ) {
    return 'sin especificar';
  }

  if ( typeof rawDate === 'string' ) {
    return new Date(
      rawDate
    )
      .toLocaleString(
        'es-CO', {
          timeZone: 'UTC',
          year    : 'numeric',
          weekday : 'short',
          month   : 'long',
          day     : 'numeric',
        }
      );
  }

  return rawDate.toLocaleString(
    'es-CO', {
      timeZone: 'UTC',
      year    : 'numeric',
      weekday : 'short',
      month   : 'long',
      day     : 'numeric',
    }
  );
};

export const sleep = (
  ms: number
) => {
  console.log(
    `timein: ${ ms }`
  );
  return new Promise(
    (
      resolve
    ) => {
      console.log(
        `timeout: ${ ms }`
      );

      return setTimeout(
        resolve, ms
      );
    }
  );
};

export const trimmer = (
  sujetosProcesales: string
) => {
  const locateDemandado = sujetosProcesales.search(
    /(demandado|causante)+:(?:\s*?|'\s*?')/gi,
  );

  const extractDemandado = sujetosProcesales
    .slice(
      locateDemandado + 10
    )
    .toLowerCase();

  const trimDemandado = extractDemandado.replace(
    /^\s+|\s+$/gm, ''
  );

  const splitDemandado = trimDemandado.split(
    ' '
  );

  const splitDemandadotoUnify = splitDemandado.map(
    (
      nombreOapellido: string, index: number
    ) => {
      if ( index >= 5 ) {
        return '';
      }

      if ( nombreOapellido === '|' ) {
        return '';
      }

      if ( nombreOapellido.includes(
        's.a.s'
      ) ) {
        return '';
      }

      if ( nombreOapellido.includes(
        'sas'
      ) ) {
        return '';
      }

      if ( nombreOapellido.includes(
        '(emplazado)'
      ) ) {
        return '';
      }

      return nombreOapellido.replace(
        /^./, (
          str: string
        ) => {
          return str.toUpperCase();
        }
      );
    },
  );

  const unifyDemandado = splitDemandadotoUnify.join(
    ' '
  );

  return unifyDemandado;
};

export const fixDemandado = (
  sujetosProcesales: string
): string => {
  const count = sujetosProcesales.split(
    '|'
  );

  for ( const stringerCount of count ) {
    const hasDemandante = stringerCount.includes(
      'Demandante'
    );

    if ( hasDemandante ) {
      continue;
    }

    return stringerCount;
  }


  return sujetosProcesales;
};

export const toNameString = (
  {
    nameRaw
  }: { nameRaw: string }
): string => {
  const str = nameRaw.toLowerCase();

  const arr = str.split(
    ' '
  );

  for ( let i = 0; i < arr.length; i++ ) {
    arr[ i ] = arr[ i ].charAt(
      0
    )
      .toUpperCase() + arr[ i ].slice(
      1
    );
  }

  const str2 = arr.join(
    ' '
  );

  return str2;
};

export function fixMoney(
  {
    valor
  }: { valor: number | bigint }
) {
  return new Intl.NumberFormat(
    'es-CO', {
      style          : 'currency',
      currency       : 'COP',
      currencyDisplay: 'name',
    }
  )
    .format(
      valor
    );
}
