import { carpetasCollection } from '#@/lib/connection/collections';
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
              notificacion     : true,
              medidasCautelares: true
            }
          },
          procesos: {
            include: {
              juzgado    : true,
              actuaciones: true
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

    const mongoCarpetas = await collection.find()
      .toArray();

    const mergedArray = mongoCarpetas.map(
      (
        item
      ) => {
        const matchedObject = prismaCarpetas.find(
          (
            obj
          ) => {
            return obj.numero === item.numero;
          }
        );
        return {
          ...item,
          ...matchedObject
        };
      }
    );

    console.log(
      mergedArray
    );
    return NextResponse.json(
      prismaCarpetas, {
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