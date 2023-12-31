
import { prisma } from '#@/lib/connection/prisma';
import { NextResponse } from 'next/server';

export async function GET () {
  try {
    const prismaCarpetas = await prisma.carpeta.findMany(
      {
        include: {
          ultimaActuacion: true,
          deudor         : true,
          codeudor       : true,
          notas          : true,
          demanda        : {
            include: {
              notificacion: {
                include: {
                  notifiers: true
                }
              },
              medidasCautelares: true
            }
          },
          procesos: {
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

    const newCarpetas = prismaCarpetas.map(
      (
        carpeta
      ) => {
        const {
          id, ...newCarpeta
        } = carpeta;
        return {
          ...newCarpeta,
          _id: id
        };
      }
    );
    return NextResponse.json(
      newCarpetas, {
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