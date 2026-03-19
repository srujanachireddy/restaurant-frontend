import { type ReactNode } from "react";
import { Navbar } from "./Navbar";
import { ProfileNudge } from "@/components/features/profile/ProfileNudge";
import { useAuthStore } from "@/store/authStore";
import { useLocation } from "react-router-dom";

export const Layout = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuthStore();
  const { pathname } = useLocation();

  // don't show nudge on auth pages or profile page
  const hideNudge = [
    "/login",
    "/register",
    "/profile",
    "/oauth/callback",
  ].includes(pathname);

  return (
    <div
      className="min-h-screen font-body"
      style={{ background: "var(--color-bg)" }}
    >
      <Navbar />
      <main className="pt-16">
        {isAuthenticated && !hideNudge && <ProfileNudge />}
        {children}
      </main>
    </div>
  );
};
