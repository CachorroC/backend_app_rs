export function stringToDateArray (
  rawDate?: string | number
) {
  if ( !rawDate ) {
    return [];
  }

  const isNumber = typeof rawDate === 'number';

  if ( isNumber ) {
    return [
      new Date(
        rawDate
      )
    ];
  }

  const {
    length: rawDateLength
  }= rawDate;
  console.log(
    rawDateLength
  );

  if ( rawDateLength <= 12 ) {
    //* Hay solamente una fecha
    const fechaFixed = fixSingleFecha(
      rawDate
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
  ] = rawDate.split(
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
