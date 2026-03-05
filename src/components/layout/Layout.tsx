import { type ReactNode } from "react";
import { Navbar } from "./Navbar";

export const Layout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen bg-stone-50 font-body">
    <Navbar />
    <main className="pt-10">{children}</main>
  </div>
);
