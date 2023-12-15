import { CarpetaBuilder } from '#@/lib/models/carpeta';
import { NextResponse } from 'next/server';
import { sleep } from 'project/helper';
import * as fs from 'fs/promises';
import { carpetasCollection } from '#@/lib/connection/collections';
import carpetas from '#@/lib/data/carpetas';

export const dynamic = 'force-dynamic';

// https://developer.mozilla.org/docs/Web/API/ReadableStream#convert_async_iterator_to_stream
function iteratorToStream (
  iterator: any
) {
  return new ReadableStream(
    {
      async pull (
        controller
      ) {
        const {
          value, done
        } = await iterator.next();

        if ( done ) {
          controller.close();
        } else {
          controller.enqueue(
            value
          );
        }
      },
    }
  );
}



export async function GET () {
  const newCarpetasMap = new Map<number, CarpetaBuilder>();

  try {/*
    const request = await fetch(
      `https://${ prefix }.rsasesorjuridico.com/raw-carpetas.json`, {
        headers: {
          'CF-Access-Client-Id'    : 'dac874230dcfcd71de02b41f5e78083c.access',
          'CF-Access-Client-Secret': 'cd9f43a4ea535037f9a1d03fc82e2477020438e462bb076d7926c53ebbadeaf8'
        }
      }
    );

    if ( !request.ok ) {
      throw new Error(
        'no pudimos obtener las carpetas en crudo del servidor'
      );

    }


    const rawCarpetas = ( await request.json() ) as CarpetaRaw[]; */

    for await ( const rawCarpeta of carpetas ) {
      const carpeta = new CarpetaBuilder(
        rawCarpeta
      );
      await sleep(
        200
      );
      await carpeta.getProcesos();
      await carpeta.getActuaciones();

      newCarpetasMap.set(
        carpeta.numero, carpeta
      );

      continue;
    }

    const rslt = Array.from(
      newCarpetasMap.values()
    );

    const collection = await carpetasCollection();

    await collection.updateMany(
      {}, {
        $set: rslt
      }, {
        upsert: true
      }
    );



    await fs.writeFile(
      'carpetasBuilder.json', JSON.stringify(
        rslt
      )
    );

    const stream = iteratorToStream(
      newCarpetasMap
    );
    return new NextResponse(
      stream
    );
  } catch ( error ) {
    console.log(
      error
    );
    return NextResponse.json(
      null, {
        status: 404
      }
    );
  }
}