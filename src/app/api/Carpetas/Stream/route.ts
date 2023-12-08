import { CarpetaBuilder } from '#@/lib/models/carpeta';
import { NextResponse } from 'next/server';
import { RawCarpeta } from 'types/raw-carpeta';

const prefix
  = process.env.NODE_ENV === 'development'
    ? 'betapi'
    : 'api';

// https://developer.mozilla.org/docs/Web/API/ReadableStream#convert_async_iterator_to_stream
function iteratorToStream(
  iterator: any
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

async function* makeIterator(
  rawCarpeta: RawCarpeta
) {
  const newCarpeta = new CarpetaBuilder(
    rawCarpeta
  );
  await sleep(
    1000
  );
  yield JSON.stringify(
    newCarpeta
  );
  await sleep(
    1000
  );
  await newCarpeta.getProcesos();
  await sleep(
    1000
  );
  yield JSON.stringify(
    newCarpeta
  );
  await sleep(
    1000
  );
  await newCarpeta.getActuaciones();
  await sleep(
    1000
  );
  yield JSON.stringify(
    newCarpeta
  );
}

export async function GET() {
  const iterator = makeIterator(
    {
      category: 'Terminados',
      codeudor: {
        direccion: 45026,
      },
      demanda: {
        capitalAdeudado        : '$ 42.965',
        departamento           : 'CUNDINAMARCA',
        entregaGarantiasAbogado: 'CUNDINAMARCA',
        etapaProcesal          : 42965,
        expediente             : '25754418900120170077400',
        fechaPresentacion      : '5/09/2017',
        mandamientoPago        : 'FISICO',
        medidasCautelares      : {
          fechaOrdenaMedidas: 'INMUEBLE',
          medidaSolicitada  : 1064,
        },
        municipio   : 'SOACHA',
        notificacion: {
          '291': {
            resultado: '17/09/2018',
          },
          '292': {
            fechaAporta: 43404,
            resultado  : 'FISICO',
          },
          autoNotificado: 42983,
          tipo          : 43413,
        },
        obligacion: {
          B: 16924662,
        },
        radicado         : '2017 - 00774',
        tipoProceso      : 'HIPOTECARIO',
        vencimientoPagare: '15/12/2192',
      },
      deudor: {
        cedula   : 52830770,
        email    : 'CARRERA 9 ESTE # 36 - 40 CASA 34',
        nombre   : 'ROCIO ALEIDA ORTIZ BARRETO',
        telefonos: 'rachiy_26@hotmail.com',
      },
      numero: 131,
    }
  );

  const stream = iteratorToStream(
    iterator
  );

  return new NextResponse(
    stream
  );
}
