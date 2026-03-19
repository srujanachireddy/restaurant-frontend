import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAuthStore } from "@/store/authStore";
import { useThemeStore, type Theme } from "@/store/themeStore";
import {
  useProfile,
  useUpdateProfile,
  useAddresses,
  useAddAddress,
  useUpdateAddress,
  useDeleteAddress,
} from "@/hooks/useProfile";
import type { AddressRequest, AddressResponse } from "@/types";

const LABELS = ["Home", "Work", "Other"];

const THEMES: { id: Theme; label: string; emoji: string; desc: string }[] = [
  { id: "warm", label: "Warm", emoji: "🍂", desc: "Cozy terracotta & cream" },
  { id: "dark", label: "Dark", emoji: "🌙", desc: "Elegant dark mode" },
  { id: "fresh", label: "Fresh", emoji: "🌿", desc: "Clean green & white" },
];

const AddressForm = ({
  initial,
  onSave,
  onCancel,
  isPending,
}: {
  initial?: AddressResponse;
  onSave: (data: AddressRequest) => void;
  onCancel: () => void;
  isPending: boolean;
}) => {
  const [label, setLabel] = useState(initial?.label ?? "Home");
  const [fullAddress, setAddress] = useState(initial?.fullAddress ?? "");
  const [isDefault, setIsDefault] = useState(initial?.isDefault ?? false);

  return (
    <div className="space-y-3 p-4 bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)]">
      <div className="flex gap-2">
        {LABELS.map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => setLabel(l)}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
              label === l
                ? "bg-[var(--color-primary)] text-white"
                : "bg-[var(--color-bg-card)] text-[var(--color-text-muted)] border border-[var(--color-border)]"
            }`}
          >
            {l}
          </button>
        ))}
      </div>
      <textarea
        value={fullAddress}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter full address..."
        rows={3}
        className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] text-[var(--color-text)] text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
      />
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="default"
          checked={isDefault}
          onChange={(e) => setIsDefault(e.target.checked)}
          className="w-4 h-4"
        />
        <label
          htmlFor="default"
          className="text-sm text-[var(--color-text-muted)]"
        >
          Set as default address
        </label>
      </div>
      <div className="flex gap-2">
        <Button
          type="button"
          variant="secondary"
          className="flex-1"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          type="button"
          className="flex-1"
          loading={isPending}
          disabled={!fullAddress.trim()}
          onClick={() => onSave({ label, fullAddress, isDefault })}
        >
          Save Address
        </Button>
      </div>
    </div>
  );
};

export const ProfilePage = () => {
  const { user } = useAuthStore();
  const { theme, setTheme } = useThemeStore();
  const { data: profile } = useProfile();
  const { data: addresses = [], isLoading: addressLoading } = useAddresses();
  const { mutate: updateProfile, isPending: updatingProfile } =
    useUpdateProfile();
  const { mutate: addAddress, isPending: addingAddress } = useAddAddress();
  const { mutate: updateAddress, isPending: updatingAddress } =
    useUpdateAddress();
  const { mutate: deleteAddress } = useDeleteAddress();

  const [name, setName] = useState(profile?.name ?? user?.name ?? "");
  const [phone, setPhone] = useState(profile?.phone ?? "");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editAddress, setEditAddress] = useState<AddressResponse | null>(null);

  const handleProfileSave = () => {
    updateProfile({ name, phone });
  };

  return (
    <div
      className="min-h-screen py-8"
      style={{ background: "var(--color-bg)" }}
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6 space-y-6">
        {/* Header */}
        <div className="animate-fade-up">
          <h1
            className="font-display text-4xl font-700"
            style={{ color: "var(--color-text)" }}
          >
            My Profile
          </h1>
          <p className="mt-1" style={{ color: "var(--color-text-muted)" }}>
            Manage your details and preferences
          </p>
        </div>

        {/* Profile Info */}
        <div
          className="rounded-3xl p-6 border shadow-sm animate-fade-up"
          style={{
            background: "var(--color-bg-card)",
            borderColor: "var(--color-border)",
          }}
        >
          <h2
            className="font-display text-xl font-700 mb-5"
            style={{ color: "var(--color-text)" }}
          >
            Personal Information
          </h2>

          {/* Avatar */}
          <div className="flex items-center gap-4 mb-6">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-display font-700 text-white"
              style={{ background: "var(--color-primary)" }}
            >
              {(profile?.name ?? user?.name ?? "U")[0].toUpperCase()}
            </div>
            <div>
              <p
                className="font-700 text-lg"
                style={{ color: "var(--color-text)" }}
              >
                {profile?.name ?? user?.name}
              </p>
              <p
                className="text-sm"
                style={{ color: "var(--color-text-muted)" }}
              >
                {profile?.email ?? user?.email}
              </p>
              {profile?.isOAuthUser && (
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-semibold"
                  style={{
                    background: "var(--color-surface)",
                    color: "var(--color-primary)",
                  }}
                >
                  GitHub Account
                </span>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <Input
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
            <Input
              label="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 234 567 8900"
            />
            <Button
              loading={updatingProfile}
              onClick={handleProfileSave}
              className="w-full"
            >
              Save Changes
            </Button>
          </div>
        </div>

        {/* Addresses */}
        <div
          className="rounded-3xl p-6 border shadow-sm animate-fade-up"
          style={{
            background: "var(--color-bg-card)",
            borderColor: "var(--color-border)",
          }}
        >
          <div className="flex items-center justify-between mb-5">
            <h2
              className="font-display text-xl font-700"
              style={{ color: "var(--color-text)" }}
            >
              Saved Addresses
            </h2>
            {!showAddForm && (
              <button
                onClick={() => setShowAddForm(true)}
                className="text-sm font-semibold px-3 py-1.5 rounded-xl transition-all"
                style={{
                  background: "var(--color-surface)",
                  color: "var(--color-primary)",
                }}
              >
                + Add New
              </button>
            )}
          </div>

          {/* Add form */}
          {showAddForm && (
            <div className="mb-4">
              <AddressForm
                onSave={(data) => {
                  addAddress(data, { onSuccess: () => setShowAddForm(false) });
                }}
                onCancel={() => setShowAddForm(false)}
                isPending={addingAddress}
              />
            </div>
          )}

          {/* Address list */}
          {addressLoading ? (
            <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
              Loading addresses...
            </p>
          ) : addresses.length === 0 && !showAddForm ? (
            <div className="text-center py-8">
              <p className="text-3xl mb-2">📍</p>
              <p
                className="text-sm"
                style={{ color: "var(--color-text-muted)" }}
              >
                No saved addresses yet
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {addresses.map((addr) => (
                <div key={addr.id}>
                  {editAddress?.id === addr.id ? (
                    <AddressForm
                      initial={addr}
                      onSave={(data) => {
                        updateAddress(
                          { id: addr.id, data },
                          { onSuccess: () => setEditAddress(null) },
                        );
                      }}
                      onCancel={() => setEditAddress(null)}
                      isPending={updatingAddress}
                    />
                  ) : (
                    <div
                      className="flex items-start justify-between p-4 rounded-2xl border transition-all"
                      style={{
                        background: addr.isDefault
                          ? "var(--color-surface)"
                          : "var(--color-bg-card)",
                        borderColor: addr.isDefault
                          ? "var(--color-primary)"
                          : "var(--color-border)",
                      }}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className="text-xs font-700 px-2 py-0.5 rounded-full"
                            style={{
                              background: "var(--color-surface)",
                              color: "var(--color-primary)",
                            }}
                          >
                            {addr.label}
                          </span>
                          {addr.isDefault && (
                            <span className="text-xs font-700 text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                              Default
                            </span>
                          )}
                        </div>
                        <p
                          className="text-sm"
                          style={{ color: "var(--color-text)" }}
                        >
                          {addr.fullAddress}
                        </p>
                      </div>
                      <div className="flex gap-2 ml-3">
                        <button
                          onClick={() => setEditAddress(addr)}
                          className="text-xs px-3 py-1.5 rounded-xl font-semibold transition-all"
                          style={{
                            background: "var(--color-surface)",
                            color: "var(--color-text-muted)",
                          }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm("Delete this address?"))
                              deleteAddress(addr.id);
                          }}
                          className="text-xs px-3 py-1.5 rounded-xl font-semibold bg-red-50 text-red-500 transition-all"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Theme Selection */}
        <div
          className="rounded-3xl p-6 border shadow-sm animate-fade-up"
          style={{
            background: "var(--color-bg-card)",
            borderColor: "var(--color-border)",
          }}
        >
          <h2
            className="font-display text-xl font-700 mb-2"
            style={{ color: "var(--color-text)" }}
          >
            App Theme
          </h2>
          <p
            className="text-sm mb-5"
            style={{ color: "var(--color-text-muted)" }}
          >
            Choose your preferred look
          </p>

          <div className="grid grid-cols-3 gap-3">
            {THEMES.map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`p-4 rounded-2xl border-2 text-left transition-all ${
                  theme === t.id
                    ? "border-[var(--color-primary)]"
                    : "border-[var(--color-border)]"
                }`}
                style={{
                  background:
                    theme === t.id
                      ? "var(--color-surface)"
                      : "var(--color-bg-card)",
                }}
              >
                <p className="text-2xl mb-2">{t.emoji}</p>
                <p
                  className="font-700 text-sm"
                  style={{ color: "var(--color-text)" }}
                >
                  {t.label}
                </p>
                <p
                  className="text-xs mt-0.5"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {t.desc}
                </p>
                {theme === t.id && (
                  <p
                    className="text-xs mt-2 font-700"
                    style={{ color: "var(--color-primary)" }}
                  >
                    ✓ Active
                  </p>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
