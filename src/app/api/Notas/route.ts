import 'server-only';
import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '#@/lib/connection/mongodb';
import { prisma } from '#@/lib/connection/prisma';
import { Nota } from '@prisma/client';
/*
export async function GET () {
  const collection = await notasCollection();

  const notasRaw = await collection.find()
    .sort(
      {
        cod: 1
      }
    )
    .toArray();

  const notas = notasConvert.toMonNotas(
    notasRaw
  );

  return new NextResponse(
    JSON.stringify(
      notas
    ), {
      status : 200,
      headers: {
        'content-type': 'application/json',
      },
    }
  );
}
*/

export async function GET (
  request: NextRequest
) {
  try {

    let notas;

    const {
      searchParams
    } = new URL(
      request.url
    );

    const carpetaNumero = searchParams.get(
      'carpetaNumero'
    );

    if ( carpetaNumero ) {
      notas = await prisma.nota.findMany(
        {
          where: {
            carpetaNumero: Number(
              carpetaNumero
            )
          }
        }
      );
    } else {
      notas = await prisma.nota.findMany();
    }

    return NextResponse.json(
      notas
    );
  } catch ( error ) {
    return NextResponse.json(
      null
    );
  }
}

export async function POST (
  request: NextRequest
) {
  try {


    const incomingNote = ( await request.json() ) as Nota;




    const client = await clientPromise;

    if ( !client ) {
      throw new Error(
        'no hay cliente mongólico'
      );
    }

    const db = client.db(
      'RyS'
    );

    const collection = db.collection<Nota>(
      'Notas'
    );

    const updatedNote = await collection.insertOne(
      incomingNote
    );

    if ( !updatedNote ) {
      throw new Error(
        'no se actualizó la notas'
      );
    }

    const json = JSON.stringify(
      updatedNote, null, 2
    );
    console.log(
      `POST en api/Notas es ${ json }`
    );
    return NextResponse.json(
      updatedNote
    );

  } catch ( error ) {
    console.log(
      `POST en api/Notas arrojó un error ${ JSON.stringify(
        error, null, 2
      ) }`
    );
    return NextResponse.json(
      error, {
        status: 300
      }
    );
  }
}

export async function PUT (
  request: NextRequest
) {
  try {


    const incomingNote = ( await request.json() ) as Nota;

    const updatedNote = await prisma.nota.upsert(
      {
        where: {
          id: incomingNote.id
        },
        create: incomingNote,
        update: incomingNote
      }
    );

    if ( !updatedNote ) {
      throw new Error(
        'no se actualizó la notas'
      );
    }

    const json = JSON.stringify(
      updatedNote, null, 2
    );
    console.log(
      `PUT en api/Notas es ${ json }`
    );
    return NextResponse.json(
      updatedNote
    );

  } catch ( error ) {
    console.log(
      `PUT en api/Notas arrojó un error ${ JSON.stringify(
        error, null, 2
      ) }`
    );
    return NextResponse.json(
      error, {
        status: 300
      }
    );
  }
}
/*
export async function DELETE(
  Request: NextRequest
) {
  const notas = await notasCollection();

  const {
    searchParams
  } = new URL(
    Request.url
  );

  const id = searchParams.get(
    'id'
  );

  if ( id ) {
    const query = {
      _id: new ObjectId(
        id
      ),
    };

    const Result = await notas.deleteOne(
      query
    );

    if ( Result.acknowledged ) {
      const count = Result.deletedCount;

      const response = {
        isOk        : true,
        deletedCount: count,
        deletedId   : id,
      };

      return new NextResponse(
        JSON.stringify(
          response
        ), {
          status : 202,
          headers: {
            'content-type': 'application/json',
          },
        }
      );
    }

    if ( !Result.acknowledged ) {
      throw new Error(
        'no pudimos eliminar esta nota, inténtalo de nuevo'
      );
    }

    return new NextResponse(
      JSON.stringify(
        Result
      ), {
        status: 200,
      }
    );
  }

  return new NextResponse(
    null, {
      status: 405,
    }
  );
} */