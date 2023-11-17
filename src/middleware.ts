import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
CF - Access - Client - Id: <Client ID >

  CF - Access - Client - Secret: <Client Secret >
export function middleware ( request: NextRequest )
{
  // Clone the request headers and set a new header `x-hello-from-middleware1`
  const requestHeaders = new Headers( request.headers )
  requestHeaders.set( 'CF-Access-Client-Id', process.env.CLIENT_ID )

  // You can also set request headers in NextResponse.rewrite
  const response = NextResponse.next( {
    request: {
      // New request headers
      headers: requestHeaders,
    },
  } )

  // Set a new response header `x-hello-from-middleware2`
  response.headers.set( 'x-hello-from-middleware2', 'hello' )
  return response
}