import { CarpetaBuilder } from '#@/lib/models/carpeta';
import { NextResponse } from 'next/server';
import { sleep } from 'project/helper';
import { RawCarpeta } from 'types/raw-carpeta';
import * as fs from 'fs/promises';
import { carpetasCollection } from '#@/lib/connection/collections';

const prefix = process.env.NODE_ENV === 'development'
  ? 'betapi'
  : 'api';

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

  try {
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

    const collection = await carpetasCollection();

    const rawCarpetas = ( await request.json() ) as RawCarpeta[];

    for ( const rawCarpeta of rawCarpetas ) {
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