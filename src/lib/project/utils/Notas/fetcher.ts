import { prisma } from '#@/lib/connection/prisma';
import { Nota } from '@prisma/client';

export async function fetchNotaById (
  id:number
) {
  try {
    const nota = await prisma.nota.findFirst(
      {
        where: {
          id: Number(
            id
          ),
        }
      }
    );

    return nota;
  } catch ( error ) {
    console.error(
      `Error fetchNotaById ${ id } ==> ${ JSON.stringify(
        error, null, 2
      ) } & ${ error }`
    );
    return null;
  }
}

export async function fetchNotasByPathname (
  path: string
) {
  try {
    const notas = await prisma.nota.findMany(
      {
        where: {
          pathname: path
        }
      }
    );

    if ( notas.length === 0 ) {
      throw new Error(
        `noexisten notas con este pathname ${ path }`
      );

    }

    return notas;
  } catch ( error ) {
    console.error(
      `Error fetchNotasByPathname ${ path } ==> ${ JSON.stringify(
        error, null, 2
      ) } & ${ error }`
    );
    return [];
  }
}

export async function fetchNotasByNumero (
  carpetaNumero: number
) {
  try {

    const notas = await prisma.nota.findMany(
      {
        where: {
          carpetaNumero: carpetaNumero,
        },
      }
    );
    return notas;
  } catch ( error ) {

    console.error(
      `Error fetchNotaSByCarpetaNumero ${ carpetaNumero } ==> ${ JSON.stringify(
        error, null, 2
      ) } & ${ error }`
    );
    return [];
  }
}


export async function fetchNotas (
  carpetaId?: number
) {

  try {
    let notas: Nota[];

    if ( carpetaId ) {
      notas = await prisma.nota.findMany(
        {
          where: {
            carpetaNumero: carpetaId,
          },
        }
      );
    } else {
      notas = await prisma.nota.findMany();
    }

    return notas;
  } catch ( error ) {
    console.log(
      `error en getNotas ${ JSON.stringify(
        error, null, 2
      ) }`
    );
    return [];
  }
}