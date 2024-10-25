"use client";
import { UserProvider } from "@/context/user";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return <UserProvider><SessionProvider>{children}</SessionProvider></UserProvider> ;
}
