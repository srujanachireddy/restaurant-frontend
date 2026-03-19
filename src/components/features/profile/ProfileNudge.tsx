import { useState } from "react";
import { Link } from "react-router-dom";
import { useProfile } from "@/hooks/useProfile";
import { useAuthStore } from "@/store/authStore";

const DISMISSED_KEY = "profile_nudge_dismissed";

export const ProfileNudge = () => {
  const { user } = useAuthStore();
  const { data: profile } = useProfile();
  const [dismissed, setDismissed] = useState(
    () => localStorage.getItem(DISMISSED_KEY) === "true",
  );

  // only show for customers
  if (user?.role !== "Customer") return null;

  // hide if dismissed
  if (dismissed) return null;

  // hide if profile is complete
  if (profile?.phone && profile?.phone.trim() !== "") return null;

  const handleDismiss = () => {
    localStorage.setItem(DISMISSED_KEY, "true");
    setDismissed(true);
  };

  return (
    <div className="mx-4 sm:mx-6 mt-4 animate-fade-up">
      <div
        className="rounded-2xl border p-4 flex items-center justify-between gap-4"
        style={{
          background: "var(--color-surface)",
          borderColor: "var(--color-primary)",
        }}
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">👋</span>
          <div>
            <p
              className="text-sm font-700"
              style={{ color: "var(--color-text)" }}
            >
              Complete your profile
            </p>
            <p
              className="text-xs mt-0.5"
              style={{ color: "var(--color-text-muted)" }}
            >
              Add your phone and address for faster checkout
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Link
            to="/profile"
            className="px-3 py-1.5 rounded-xl text-xs font-700 text-white transition-all"
            style={{ background: "var(--color-primary)" }}
          >
            Complete
          </Link>
          <button
            onClick={handleDismiss}
            className="p-1.5 rounded-xl transition-all"
            style={{ color: "var(--color-text-muted)" }}
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};
