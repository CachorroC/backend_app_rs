
import clientPromise from '#@/lib/connection/mongodb';
import { IntCarpeta, MonCarpeta } from '#@/lib/types/carpetas';

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


  return carpetasRaw.map(
    (
      carpeta
    ) => {
      return ( {
        ...carpeta,
        _id   : carpeta._id.toString(),
        nombre: `${ carpeta.deudor.primerNombre } ${ carpeta.deudor.segundoNombre } ${ carpeta.deudor.primerApellido } ${ carpeta.deudor.segundoApellido }`
      } ) as MonCarpeta;
    }
  );
}
