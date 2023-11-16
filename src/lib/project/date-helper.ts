export function InputDateHelper(
  incomingDate?: string | Date | null | undefined,
): string {
  if ( !incomingDate || incomingDate === null || incomingDate === undefined ) {
    return 'sin especificar';
  }

  let daterBuilder;

  if ( typeof incomingDate === 'string' ) {
    daterBuilder = new Date(
      incomingDate 
    );
  } else {
    daterBuilder = incomingDate;
  }

  const yearBuilder = daterBuilder.getFullYear();

  const inputMonth = String(
    daterBuilder.getMonth() + 1 
  )
    .padStart(
      2, '0' 
    );

  const inputDate = String(
    daterBuilder.getDate() 
  )
    .padStart(
      2, '0' 
    );

  return `${ yearBuilder }-${ inputMonth }-${ inputDate }`;
}

// !prints the output of the datehelper
export function OutputDateHelper(
  incomingDate?: string | Date | null | undefined,
): string {
  if ( !incomingDate || incomingDate === null || incomingDate === undefined ) {
    return 'sin especificar';
  }

  let daterBuilder;

  if ( typeof incomingDate === 'string' ) {
    daterBuilder = new Date(
      incomingDate 
    );
  } else {
    daterBuilder = incomingDate;
  }

  return daterBuilder.toLocaleString(
    'es-CO', {
      timeZone: 'UTC',
      year    : 'numeric',
      weekday : 'short',
      month   : 'long',
      day     : 'numeric',
    } 
  );
}
