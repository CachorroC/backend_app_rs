import clientPromise from '#@/lib/connection/mongodb';
import { IntCarpeta, carpetaConvert } from '#@/lib/types/carpetas';

export async function fetchCarpetaByNumero(
  numero: number
) {

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

  const carpeta = await collection.findOne(
    {
      numero: numero,
    }
  );

  if ( !carpeta ) {
    return null;
  }

  const Carpeta = carpetaConvert.toMonCarpeta(
    carpeta
  );

  return Carpeta;
}

export async function fetcherCarpetaByidProceso (
  idProceso: number
) {

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

  const carpeta = await collection.findOne(
    {
      idProceso: idProceso,
    },
    {
      sort: {
        fecha: 1,
      },
    },
  );

  if ( !carpeta ) {
    return null;
  }

  const Carpeta = carpetaConvert.toMonCarpeta(
    carpeta
  );

  return Carpeta;
}


export async function fetchCarpetasByllaveProceso (
  llaveProceso: string
) {
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
      {
        llaveProceso: llaveProceso,
      }
    )
    .sort(
      {
        fecha: 1,
      }
    )
    .allowDiskUse()
    .toArray();

  if ( !carpetasRaw ) {
    return null;
  }

  const carpetas = carpetaConvert.toMonCarpetas(
    carpetasRaw
  );

  return carpetas;
}

export async function fetchCarpetaByllaveProceso (
  llaveProceso: string
) {


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

  const carpetaRaw = await collection.findOne(
    {
      $or: [
        {
          llaveProceso: llaveProceso
        },
        {
          'demanda.expediente': llaveProceso
        }
      ]
    }, {
      sort: {
        fecha: 1,
      },
    },
  );

  if ( !carpetaRaw ) {
    return null;
  }

  const carpeta = carpetaConvert.toMonCarpeta(
    carpetaRaw
  );

  return carpeta;
}