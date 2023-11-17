import {  NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';

export async function POST (
  request:NextRequest
) {
  const requestMapper = new Map();

  const requestFormData = await request.formData();

  for ( const formField of requestFormData ) {
    const [
      key,
      value
    ] = formField;
    requestMapper.set(
      key, value
    );
  }

  const mapperCookies = new Map();

  const mapperHeaders = new Map();

  const cookiesList = await request.cookies.getAll();

  for ( const cookie of cookiesList ) {

    mapperCookies.set(
      cookie.name, cookie
    );
  }

  const headersList = headers();

  for ( const [
    key,
    value
  ] of headersList ) {
    mapperHeaders.set(
      key, value
    );
  }

  const domain = headersList.get(
    'next-url'
  ) ?? '';

  const [
    ,
    firstRoute,
    secondRoute
  ] = domain.split(
    '/'
  );

  const arrMap = Object.fromEntries(
    mapperCookies
  );

  const requestMap = Object.fromEntries(
    requestMapper
  );

  const arrHeaderMap = Object.fromEntries(
    mapperHeaders
  );
  return NextResponse.json(
    {
      firstRoute  : firstRoute,
      secondRoute : secondRoute,
      arrMap      : arrMap,
      requestMap  : requestMap,
      arrHeaderMap: arrHeaderMap
    }
  );
}