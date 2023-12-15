
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

  if ( rawFechaPresentacionLength <= 12 ) {
    //* Hay solamente una fecha
    const fechaFixed = fixSingleFecha(
      rawFechaPresentacion
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
  ] = rawFechaPresentacion.split(
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

  if ( stringDate.toString() === 'Invalid Date' ) {
    return null;
  }

  return stringDate;
}
