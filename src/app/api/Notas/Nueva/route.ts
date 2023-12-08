
import {  NextRequest, NextResponse } from 'next/server';
import { prisma } from '#@/lib/connection/prisma';
import { Nota, Prisma } from '@prisma/client';

export async function POST (
  request: NextRequest
) {
  const formDataMapper = new Map();

  try {

    const incomingNote = await request.formData();

    for ( const [
      key,
      value
    ] of incomingNote ) {
      formDataMapper.set(
        key, value
      );
    }

    const formDataObjectMapper = Object.fromEntries(
      formDataMapper
    );

    let nota: Prisma.NotaCreateInput;

    if ( formDataObjectMapper.carpetaNumero ) {
      nota = {
        ...formDataObjectMapper,
        carpeta: {
          connect: {
            id: formDataObjectMapper.carpetaNumero
          },
        },
      };
    } else {
      nota = {
        ...formDataObjectMapper
      };
    }

    // Pass 'user' object into query
    const inserterPrisma = await prisma.nota.create(
      {
        data: nota
      }
    );
    console.log(
      `POST en api/Notas/Nueva es ${  JSON.stringify(
        inserterPrisma, null, 2
      ) }`
    );


    return NextResponse.json(
      inserterPrisma
    );

  } catch ( error ) {
    console.log(
      `POST en api/Notas/Nueva arrojó un error ${ error }`
    );
    return NextResponse.json(
      error
    );
  }
}

export async function PUT (
  request: NextRequest
) {
  try {


    const incomingNote = ( await request.json() ) as Nota;

    const {

      // eslint-disable-next-line no-unused-vars
      id, ...note
    } = incomingNote;

    const inserterPrisma = await prisma.nota.upsert(
      {
        where: {
          id: incomingNote.id
        },
        update: incomingNote,
        create: note
      }
    );
    console.log(
      `PUT en api/Notas/Nueva es ${  JSON.stringify(
        inserterPrisma, null, 2
      ) }`
    );


    return NextResponse.json(
      inserterPrisma, {
        status: 200
      }
    );

  } catch ( error ) {
    console.log(
      `PUT en api/Notas/Nueva arrojó un error ${ error }`
    );
    return NextResponse.json(
      error as Error, {
        status: 300
      }
    );
  }
}