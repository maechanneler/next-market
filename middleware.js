// middleware.js

import { NextResponse } from "next/server"
import { jwtVerify } from "jose"

export async function middleware(request){
  // const token = await request.headers.get("Authorization")?.split(" ")[1]
  const token = "eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImR1bW15QGdtYWlsLmNvbSIsImV4cCI6MTczMTI4OTgyNX0.SpDhBY2V_T6eVYyh8uvezVFiI2IJqS7p9V7pBYEnne0"
  console.log(token)

  if(!token){
    return NextResponse.json({message: "トークンがありません"})
  }

  try{
    const secretKey = new TextEncoder().encode("next-market-app-book")
    const decodedJwt = jwtVerify(token, secretKey)
    return NextResponse.next()
  }catch(err){
    return NextResponse.json({message: "トークンが正しくないので、ログインしてください"})
  }
}

export const config = {
  matcher: ["/api/item/create", "/api/item/update/:path*", "/api/item/delete/:path*"],
}