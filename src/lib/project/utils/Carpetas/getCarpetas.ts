
import clientPromise from '#@/lib/connection/mongodb';
import { prisma } from '#@/lib/connection/prisma';
import { IntCarpeta, } from '#@/lib/types/carpetas';

export async function getCarpetas() {

  const client = await clientPromise;

  if ( !client ) {
    throw new Error(
      'no hay cliente mongólico'
    );
  }

  const db = client.db(
    'RyS'
  );

  const collection = db.collection<IntCarpeta>(
    'Carpetas'
  );

  const carpetasRaw = await collection
    .find(
      {}
    )
    .toArray();


  const prismaCarpetas = await prisma.carpeta.findMany(
    {
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


  return carpetasRaw.map(
    (
      carpeta
    ) => {

      const matchedObject = prismaCarpetas.find(
        (
          obj
        ) => {
          return obj.numero === carpeta.numero;
        }
      );
      return {
        ...carpeta,
        ...matchedObject
      };
    }
  );
}
