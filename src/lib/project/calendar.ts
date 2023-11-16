

export interface calendarData {
  href: string;
  className: string;
  current: boolean;
  dayOfWeek: number;
}

export const nombresDeMeses = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

export function CalendarBuilder(
  date: Date,
) {
  const rows = new Set<calendarData>();


  const incomingMonth = date.getMonth();

  const incomingYear = date.getFullYear();

  const today = new Date()
    .getDate();

  const firstWeekDayofIncomingMonth = new Date(
    incomingYear,
    incomingMonth,
    1,
  )
    .getDay();

  const lastDateofIncomingMonth = new Date(
    incomingYear, incomingMonth + 1, 0
  )
    .getDate();

  const lastWeekDayofIncomingMonth = new Date(
    incomingYear,
    incomingMonth,
    lastDateofIncomingMonth,
  )
    .getDay();

  const lastDateofIncomingPastMonth = new Date(
    incomingYear, incomingMonth, 0
  )
    .getDate();

  for ( let dayBefore = firstWeekDayofIncomingMonth; dayBefore > 0; dayBefore-- ) {
    const href = `${ incomingYear }/${ incomingMonth }/${
      lastDateofIncomingPastMonth - dayBefore + 1
    }`;
    rows.add(
      {
        href     : href,
        className: 'disabled',
        current  : false,
        dayOfWeek: new Date(
          href
        )
          .getDay(),
      }
    );
  }

  for ( let dayInMonth = 1; dayInMonth <= lastDateofIncomingMonth; dayInMonth++ ) {
    const isToday = today === dayInMonth;

    const href = `${ incomingYear }/${ incomingMonth === 12
      ? 0
      : incomingMonth + 1 }/${ dayInMonth }`;

    rows.add(
      {
        href     : href,
        current  : true,
        dayOfWeek: new Date(
          href
        )
          .getDay(),
        className: isToday
          ? 'today'
          : 'inactive',
      }
    );
  }

  for ( let dayAfterMonth = lastWeekDayofIncomingMonth; dayAfterMonth < 6; dayAfterMonth++ ) {
    const href = `${ incomingYear }/${ incomingMonth === 11
      ? 0
      : incomingMonth + 2 }/${ dayAfterMonth }`;

    rows.add(
      {
        href     : href,
        current  : false,
        dayOfWeek: new Date(
          href
        )
          .getDay(),
        className: 'disabled',
      }
    );
  }

  return Array.from(
    rows
  );
}
