import carpetas from '#@/lib/data/carpetas';
import { CarpetaBuilder } from '#@/lib/models/carpeta';

// https://developer.mozilla.org/docs/Web/API/ReadableStream#convert_async_iterator_to_stream
function iteratorToStream(
  iterator: AsyncGenerator<string, void, unknown>
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

function sleep(
  time: number
) {
  return new Promise(
    (
      resolve
    ) => {
      setTimeout(
        resolve, time
      );
    }
  );
}


async function* generateSequence() {
const carpetasBuilder = new Set();
  for ( const rawCarpeta of carpetas ) {
    const carpeta = new CarpetaBuilder(
      rawCarpeta
    );
    await sleep(
      1000
    );
    await carpeta.getProcesos();
    await carpeta.getActuaciones();
    carpetasBuilder.add(carpeta)

    yield JSON.stringify(
      Array.from(carpetasBuilder)
    );

  }>

}

export async function GET () {
  const generator = generateSequence();

  const stream = iteratorToStream(
    generator
  );

  return new Response(
    stream
  );
}