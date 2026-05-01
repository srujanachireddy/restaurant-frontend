import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "../../ui/Input";
import { Button } from "../../ui/Button";
import { useRegister } from "../../../hooks/useAuth";

export const RegisterForm = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const { mutate: register, isPending } = useRegister();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        register(form);
      }}
      className="space-y-5"
    >
      <Input
        id="name"
        label="Full Name"
        type="text"
        required
        placeholder="John Doe"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <Input
        id="email"
        label="Email"
        type="email"
        required
        placeholder="you@example.com"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <Input
        id="password"
        label="Password"
        type="password"
        required
        placeholder="Min. 8 characters"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <Button type="submit" size="lg" loading={isPending} className="w-full">
        Create Account
      </Button>
      <p className="text-center text-sm text-stone-500">
        Have an account?{" "}
        <Link
          to="/login"
          className="text-brand-600 font-semibold hover:underline"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
};
