import 'server-only';
import { Category, MonCarpeta } from '../types/carpetas';

export interface intAction {
  type: ActionType;
  name: ActionName;
  sortDirection: boolean;
  search?: string;
  category?: Category;
}

export type ActionName = keyof MonCarpeta;

export type ActionType = 'filter' | 'sort' | 'compare' | 'find'


export function carpetasSorter(
  carpetas: MonCarpeta[], action: intAction
): MonCarpeta[] {
  const categoriesSorter: Category[] = [
    'todos',
    'Bancolombia',
    'Reintegra',
    'sinEspecificar',
    'LiosJuridicos',
    'Insolvencia',
    'Terminados',
  ];

  const {
    sortDirection, name
  } = action;

  const asc = [
    -1,
    0,
    1
  ];

  const dsc = [
    1,
    0,
    -1
  ];

  const sorter = sortDirection
    ? asc
    : dsc;


  switch ( name ) {
      case 'fecha': {
        return [
          ...carpetas
        ].sort(
          (
            a, b
          ) => {
            if ( !a.fecha || a.fecha === undefined ) {
              return sorter[ 2 ];
            }

            if ( !b.fecha || b.fecha === undefined ) {
              return sorter[ 0 ];
            }

            const x = a.fecha;

            const y = b.fecha;

            if ( x < y ) {
              return sorter[ 2 ];
            }

            if ( x > y ) {
              return sorter[ 0 ];
            }

            return sorter[ 1 ];
          }
        );
      }

      case 'category': {
        return [
          ...carpetas
        ].sort(
          (
            a, b
          ) => {
            const x = categoriesSorter.indexOf(
              a.category
            );

            const y = categoriesSorter.indexOf(
              b.category
            );

            if ( x < y ) {
              return sorter[ 2 ];
            }

            if ( x > y ) {
              return sorter[ 0 ];
            }

            return sorter[ 1 ];
          }
        );
      }

      case 'numero': {
        return [
          ...carpetas
        ].sort(
          (
            a, b
          ) => {
            const x = a.numero;

            const y = b.numero;

            const idk = sortDirection
              ? x - y
              : y - x;

            return idk;
          }
        );
      }

      case 'nombre': {
        return [
          ...carpetas
        ].sort(
          (
            a, b
          ) => {
            const x = a.nombre;

            const y = b.nombre;

            if ( x < y ) {
              return sorter[ 2 ];
            }

            if ( x > y ) {
              return sorter[ 0 ];
            }

            return sorter[ 1 ];
          }
        );
      }

      default: {
        return [
          ...carpetas
        ].sort(
          (
            a, b
          ) => {
            const x = a[ name ];

            const y = b[ name ];

            if ( !x || x === undefined ) {
              return sorter[ 2 ];
            }

            if ( !y || y === undefined ) {
              return sorter[ 0 ];
            }

            if ( x < y ) {
              return sorter[ 2 ];
            }

            if ( x > y ) {
              return sorter[ 0 ];
            }

            return 0;
          }
        );
      }
  }
}
