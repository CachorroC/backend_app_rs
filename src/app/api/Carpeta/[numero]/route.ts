import { carpetasCollection } from '#@/lib/connection/collections';
import { prisma } from '#@/lib/connection/prisma';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET (
  request: Request, {
    params
  }: { params: { numero: string } }
) {
  const numero = Number(
    params.numero
  );

  try {
    const carpeta = await prisma.carpeta.findUniqueOrThrow(
      {
        where: {
          numero: numero
        },
        include: {
          ultimaActuacion: true,
          notas          : true,
          procesos       : {
            include: {
              juzgado: true
            }
          },
          tareas: {
            include: {
              subTareas: true
            }
          }
        }
      }
    );

    const collection = await carpetasCollection();

    const mongoCarpeta = await collection.findOne(
      {
        numero: Number(
          params.numero
        )
      }
    );

    if ( !mongoCarpeta ) {
      return NextResponse.json(
        carpeta
      );
    }

    return NextResponse.json(
      {
        ...mongoCarpeta,
        ...carpeta
      }
    );
  } catch ( error ) {
    console.error(
      JSON.stringify(
        error, null, 2
      )
    );

    return NextResponse.json(
      error
    );
  }
}


export async function PUT (
  request: NextRequest, {
    params
  }: { params: { numero: string } }
) {
  const numero = Number(
    params.numero
  );

  const incomingCarpeta = await request.json();

  const updateCarpeta = await prisma.carpeta.upsert(
    {
      where: {
        numero
      },
      update: incomingCarpeta,
      create: incomingCarpeta
    }
  );

  const mapperCookies = new Map();

  const mapperHeaders = new Map();

  const cookiesList = await request.cookies.getAll();

  for ( const cookie of cookiesList ) {

    mapperCookies.set(
      cookie.name, cookie
    );
  }

  const headersList = headers();


  for ( const [
    key,
    value
  ] of headersList ) {
    mapperHeaders.set(
      key, value
    );
  }

  const domain = headersList.get(
    'next-url'
  ) ?? '';

  const [
    ,
    firstRoute,
    secondRoute
  ] = domain.split(
    '/'
  );

  const arrMap = Object.fromEntries(
    mapperCookies
  );

  const arrHeaderMap = Object.fromEntries(
    mapperHeaders
  );
  return NextResponse.json(
    {
      updateCarpeta: updateCarpeta,
      arrMap       : arrMap,
      arrHeaderMap : arrHeaderMap,
      domain       : domain,
      firstRoute   : firstRoute,
      secondRoute  : secondRoute
    }
  );
}