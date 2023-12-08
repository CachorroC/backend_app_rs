import { prisma } from '#@/lib/connection/prisma';
import { NextResponse } from 'next/server';

export async function GET () {
  try {
    const carpetas = await prisma.carpeta.findMany(
      {
        include: {
          deudor         : true,
          ultimaActuacion: true,
          juzgados       : true,
          procesos       : true,
          notas          : true,
          demandas       : {
            include: {
              notificacion     : true,
              medidasCautelares: true
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
    return NextResponse.json(
      carpetas, {
        status    : 200,
        statusText: 'OK',
        headers   : {
          'Content-Type': 'application/json'
        }
      }
    );
  } catch ( error ) {
    console.error(
      error
    );
    return NextResponse.json(
      JSON.stringify(
        error, null, 2
      ), {
        statusText: 'NOT_FOUND',
        status    : 404
      }
    );
  }
}