import carpetas from '#@/lib/data/carpetas';
import { CarpetaBuilder } from '#@/lib/models/carpeta';
import { outActuacion } from 'types/actuaciones';
import { outProceso } from 'types/procesos';

export const dynamic = 'force-dynamic';

// https://developer.mozilla.org/docs/Web/API/ReadableStream#convert_async_iterator_to_stream
function iteratorToStream(
  iterator: AsyncGenerator<string | CarpetaBuilder | outProceso[] | outActuacion[], void, unknown>
) {
  return new ReadableStream(
    {
      async pull(
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


async function* generateSequence() {
  for ( const rawCarpeta of carpetas ) {
    const carpeta = new CarpetaBuilder(
      rawCarpeta
    );
    yield carpeta;
    yield await carpeta.getProcesos();

    yield await carpeta.getActuaciones();


    yield JSON.stringify(
      carpeta
    );

  }

}

export async function GET () {
  const generator = generateSequence();

  const stream = iteratorToStream(
    generator
  );

  return new Response(
    stream, {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
}