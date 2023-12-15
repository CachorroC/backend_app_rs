import { cache } from 'react';
import { sleep } from 'project/helper';
import { IntCarpeta } from 'types/carpetas';
import { Despacho } from 'types/despachos';
import { intProceso, ConsultaNumeroRadicacion, Data, Message } from 'types/procesos';
import clientPromise from '../connection/mongodb';
import { Juzgado } from 'types/int-carpeta';

export const getDespachos = cache(
  async () => {
    try {
      const request = await fetch(
        'https://app.rsasesorjuridico.com/despachos.json'
      );

      if ( !request.ok ) {
        throw new Error(
          'error en los despachos'
        );
      }

      const response = ( await request.json() ) as Despacho[];

      return response;
    } catch ( e ) {
      if ( e instanceof Error ) {
        console.log(
          ` error en la conexion network del getDespacxhos ${ e.name } : ${ e.message }`,
        );
      }

      console.log(
        ` error en la conexion network del getDespacxho  =>  ${ e }`
      );

      return [];
    }
  }
);

export async function newJuzgado(
  proceso: intProceso
) {

  const Despachos = await getDespachos();


  const matchedDespacho = Despachos.find(
    (
      despacho
    ) => {
      const nDesp = despacho.nombre
        .toLowerCase()
        .normalize(
          'NFD'
        )
        .replace(
          /\p{Diacritic}/gu, ''
        )
        .trim();

      const pDesp = proceso.despacho
        .toLowerCase()
        .normalize(
          'NFD'
        )
        .replace(
          /\p{Diacritic}/gu, ''
        )
        .trim();


      return nDesp === pDesp;
    }
  );

  const nameN = matchedDespacho
    ? matchedDespacho.nombre
    : proceso.despacho;

  const matchedId = nameN.match(
    /\d+/g
  );

  const newId = Number(
    matchedId?.toString()
  );

  const newJuzgado: Juzgado = {
    id  : newId ?? 0,
    tipo: matchedDespacho
      ? matchedDespacho.nombre
      : proceso.despacho,
    url: matchedDespacho
      ? `https://www.ramajudicial.gov.co${ matchedDespacho.url }`
      : `https://www.ramajudicial.gov.co${ proceso.despacho.replaceAll(
        ' ', '-'
      )
        .toLowerCase() }`,
  };

  return newJuzgado;

}



export async function fetchProceso(
  llaveProceso: string, index: number
) {
  try {
    await sleep(
      index
    );

    const req = await fetch(
      `https://consultaprocesos.ramajudicial.gov.co:448/api/v2/Procesos/Consulta/NumeroRadicacion?numero=${ llaveProceso }&SoloActivos=false&pagina=1`

    );

    if ( !req.ok ) {
      const jsonError = ( await req.json() ) as Data;
      return jsonError;
    }

    const json = ( await req.json() ) as ConsultaNumeroRadicacion;

    const {
      procesos
    } = json;

    await updateProcesos(
      procesos
    );

    const responseReturn: Data = {
      StatusCode: req.status,
      Message   : req.statusText as Message,
      procesos  : procesos
    };

    return responseReturn;
  } catch ( e ) {
    if ( e instanceof Error ) {
      console.log(
        `Expediente: ${ llaveProceso }: error en la conexion network del fetchProceso ${ e.name } : ${ e.message }`,
      );

    }

    console.log(
      `Expediente: ${ llaveProceso }: : error en la conexion network del fetchProceso  =>  ${ e }`,
    );

    return {
      StatusCode: 404,
      Message   : JSON.stringify(
        e
      ) as Message
    };
  }
}

export const getProceso = cache(
  async(
    {
      llaveProceso, index
    }:
  {  llaveProceso: string, index: number}
  ) => {
    try {
      const fetchP = await fetchProceso(
        llaveProceso, index
      );


      if ( !fetchP.procesos || fetchP.procesos.length === 0 ) {
        return null;
      }

      const {
        procesos
      } = fetchP;

      return procesos;


    } catch ( error ) {
      console.log(
        `error en getProcesos ${ JSON.stringify(
          error, null, 2
        )
        }`
      );
      return null;
    }
  }
);


export async function updateProcesos(
  procesos: intProceso[]
) {
  try {
    if ( procesos.length === 0 ) {
      throw new Error(
        'no hay procesos en el array updateProcesos'
      );
    }


    for ( const proceso of procesos ) {
      const {
        llaveProceso, idProceso, esPrivado, departamento, sujetosProcesales, despacho
      } = proceso;

      if ( esPrivado ) {
        console.log(
          'el proceso es privado'
        );
        continue;
      }


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

      const juzgado = await newJuzgado(
        proceso
      );

      const updateProceso = await collection.updateOne(
        {
          $or: [
            {
              llaveProceso: llaveProceso
            },
            {
              idProcesos: idProceso

            }
          ]
        }, {
          $addToSet: {
            idProcesos: idProceso,
            procesos  : {
              ...proceso,
              juzgado     : juzgado,
              fechaProceso: proceso.fechaProceso
                ? new Date(
                  proceso.fechaProceso
                )
                : null,
              fechaUltimaActuacion: proceso.fechaUltimaActuacion
                ? new Date(
                  proceso.fechaUltimaActuacion
                )
                : null,
            },
            'demanda.juzgados': juzgado
          },
          $set: {
            'demanda.departamento'     : departamento,
            'demanda.expediente'       : llaveProceso,
            'demanda.sujetosProcesales': sujetosProcesales,
            'demanda.despacho'         : despacho
          },
        }, {
          upsert: false
        }
      );

      if ( updateProceso.modifiedCount > 0 || updateProceso.matchedCount > 0 ) {
        console.log(
          `Procesos:
          - se actualizaron ${ updateProceso.modifiedCount } procesos
          - se insertaron ${ updateProceso.upsertedCount } procesosn nuevos;
          - matchedCount : ${ updateProceso.matchedCount }`
        );
        continue;
      }

      continue;
    }

    return;
  } catch ( error ) {
    console.log(
      `error en updateProcesos ${    JSON.stringify(
        error, null, 2
      ) }`
    );
  }

}
