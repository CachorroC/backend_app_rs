import { prisma } from '#@/lib/connection/prisma';
import { NextResponse } from 'next/server';

export async function GET () {
  try {
    const carpetas = await prisma.carpeta.findMany(
      {
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
      carpetas
    );
  } catch ( error ) {
    console.error(
      error
    );
    return NextResponse.json(
      error
    );
  }
}