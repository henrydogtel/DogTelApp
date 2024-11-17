import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { useContext } from "react";
import { UserContext } from "./context/user";

export function middleware(request:NextRequest) {
  const requestUrl = request.nextUrl.pathname
  const user = request.cookies.get('user')

  if((requestUrl.startsWith('/login') || requestUrl.startsWith('/registerOwner') || requestUrl.startsWith('/registerSitter')) && user){
    return NextResponse.redirect(new URL('/home', request.url))
  }

  if(requestUrl.startsWith('/home') && !user) {
    return NextResponse.redirect(new URL('/login',request.url))
  } 
  
}

export const config = {
  matcher: [
  '/login',
  '/registerOwner',
  '/registerSitter',
  '/home'
  ],
};
