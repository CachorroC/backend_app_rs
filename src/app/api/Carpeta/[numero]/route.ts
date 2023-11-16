import { prisma } from '#@/lib/connection/prisma';
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
          demanda        : true,
          deudor         : true,
          ultimaActuacion: true,
          juzgados       : true,
          procesos       : true,
          notas          : true,
          tareas         : {
            include: {
              subTareas: true
            }
          }
        }
      }
    );
    return NextResponse.json(
      carpeta
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
  return NextResponse.json(
    updateCarpeta
  );
}