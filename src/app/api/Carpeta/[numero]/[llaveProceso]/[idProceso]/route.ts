import { carpetasCollection } from '#@/lib/connection/collections';
import { prisma } from '#@/lib/connection/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { Data, intActuacion } from 'types/actuaciones';

export async function GET (
  req: NextRequest, {
    params
  }: {
    params: {
      numero: string; llaveProceso: string; idProceso: string
    }
  }
) {
  try {
    const request = await fetch(
      `https://consultaprocesos.ramajudicial.gov.co:448/api/v2/Proceso/Actuaciones/${ params.idProceso }`, {
        next: {
          tags: [
            'actuaciones'
          ]
        }
      }
    );

    if ( !request.ok ) {
      throw new Error(
        `Fetch failed in get Actuaciones.
        message: ${ request.statusText }`
      );

    }

    const data = ( await request.json() ) as Data;

    const {
      actuaciones
    } = data;

    await updateActuaciones(
      actuaciones, Number(
        params.idProceso
      )
    );
    return NextResponse.json(
      actuaciones, {
        status : 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  } catch ( error ) {
    const errorResponse = {
      StatusCode: 404,
      Message   : `error al realizar la consulta de estas actuaciones ${ JSON.stringify(
        error, null, 2
      ) }`,

    };
    return NextResponse.json(
      null, {
        status    : 500,
        statusText: errorResponse.Message
      }
    );
  }
}



async function updateActuaciones (
  actuaciones: intActuacion[], idProceso: number
) {
  try {
    if ( actuaciones.length === 0 ) {
      throw new Error(
        'no hay actuaciones en el array updateActuaciones'
      );
    }

    const [
      ultimaActuacion,
      penUltimaActuacion
    ] = actuaciones;

    const carpeta = await prisma.carpeta.findFirst(
      {
        where: {
          idProcesos: {
            has: idProceso
          }
        }
      }
    );

    if ( !carpeta ) {
      throw new Error(
        'no hay carpeta por actualizar'
      );
    }

    try {
      for ( const actuacion of actuaciones ) {
        await prisma.actuacion.upsert(
          {
            where: {
              idRegActuacion: actuacion.idRegActuacion
            },
            create: {
              ...actuacion,
              fechaActuacion: new Date(
                actuacion.fechaActuacion
              ),
              fechaRegistro: new Date(
                actuacion.fechaRegistro
              ),
              fechaInicial: actuacion.fechaInicial
                ? new Date(
                  actuacion.fechaInicial
                )
                : null,
              fechaFinal: actuacion.fechaFinal
                ? new Date(
                  actuacion.fechaFinal
                )
                : null,
              isUltimaAct: actuacion.cant === actuacion.consActuacion
                ? true
                : false,
              idProceso: idProceso,

            },
            update: {
              idProceso  : idProceso,
              isUltimaAct: actuacion.cant === actuacion.consActuacion
                ? true
                : false,
            }


          }
        );
      }

    } catch ( createError ) {
      console.log(
        createError
      );
    }

    const incomingDate = new Date(
      ultimaActuacion.fechaActuacion
    );

    const incomingYear = incomingDate.getFullYear();

    const incomingMonth = incomingDate.getMonth();

    const incomingDay = incomingDate.getDate();
    console.log(
      `${ carpeta.numero } => la nueva fecha de la actuacion es: ${ new Date(
        incomingYear, incomingMonth, incomingDay
      ) } y el timezone offset es  ${ incomingDate.getTimezoneOffset() }
          raw: ${ ultimaActuacion.fechaActuacion }`
    );

    const savedDate = carpeta.fecha
      ? new Date(
        carpeta.fecha
      )

      : null;

    const savedYear = savedDate?.getFullYear();

    const savedMonth = savedDate?.getMonth();

    const savedDay = savedDate?.getDate();
    console.log(
      `${ carpeta.numero } => la fecha guardada en el servidor de LINK -  actuacion es: ${ new Date(
        savedYear ?? 0, savedMonth ?? 0, savedDay
      ) }`
    );

    const carpetasColl = await carpetasCollection();

    if ( !savedDate || savedDate < incomingDate ) {

      const updateCarpetawithActuaciones = await carpetasColl.updateOne(
        {
          $or: [
            {
              llaveProceso: carpeta
                ? carpeta.llaveProceso
                : ultimaActuacion.llaveProceso
            },
            {
              idProcesos: idProceso

            }
          ]
        },
        {
          $set: {
            fecha: new Date(
              ultimaActuacion.fechaActuacion
            )
            ,
            ultimaActuacion: ultimaActuacion.actuacion === 'Fijacion estado'
              ? penUltimaActuacion
              : ultimaActuacion,
          },
        },
        {
          upsert: false,
        },
      );

      const updateCarpetaWithActuacionesToPrisma = await prisma.carpeta.update(
        {
          where: {
            numero: carpeta.numero
          },
          data: {
            fecha: new Date(
              incomingYear, incomingMonth, incomingDay
            ),
            revisado       : false,
            ultimaActuacion: {
              connectOrCreate: {
                where: {
                  idRegActuacion: ultimaActuacion.idRegActuacion
                },
                create: {
                  ...ultimaActuacion,
                  fechaActuacion: new Date(
                    ultimaActuacion.fechaActuacion
                  ),
                  fechaRegistro: new Date(
                    ultimaActuacion.fechaRegistro
                  ),
                  fechaInicial: ultimaActuacion.fechaInicial
                    ? new Date(
                      ultimaActuacion.fechaInicial
                    )
                    : null,
                  fechaFinal: ultimaActuacion.fechaFinal
                    ? new Date(
                      ultimaActuacion.fechaFinal
                    )
                    : null,
                  anotacion: ultimaActuacion.anotacion
                    ? ultimaActuacion.anotacion
                    : null,
                  isUltimaAct: ( ultimaActuacion.cant === ultimaActuacion.consActuacion )
                    ? true
                    : false,
                  idProceso: idProceso
                }
              }
            }
          }
        }
      );

      console.log(
        updateCarpetaWithActuacionesToPrisma
      );


      if ( !updateCarpetawithActuaciones ) {
        return;
      }

      if (
        updateCarpetawithActuaciones.modifiedCount > 0
        || updateCarpetawithActuaciones.upsertedCount > 0
      ) {
        console.log(
          `Actuaciones in Mongo:
            - se modificaron ${ updateCarpetawithActuaciones.modifiedCount } carpetas
            - se insertaron ${ updateCarpetawithActuaciones.upsertedCount }
            - para un total de carpetas: ${ updateCarpetawithActuaciones.matchedCount }

            Actuaciones in Prisma: ${ updateCarpetaWithActuacionesToPrisma }`
        );

      }
    }

    return;
  } catch ( error ) {
    console.log(
      `ocurrio un error en updateActuaciones ${ JSON.stringify(
        error, null, 2
      ) }`
    );
    return;
  }
}
