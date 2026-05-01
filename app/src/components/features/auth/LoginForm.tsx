import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "../../ui/Input";
import { Button } from "../../ui/Button";
import { useLogin } from "../../../hooks/useAuth";

export const LoginForm = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { mutate: login, isPending } = useLogin();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        login(form);
      }}
      className="space-y-5"
    >
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
        placeholder="••••••••"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <Button type="submit" size="lg" loading={isPending} className="w-full">
        Sign In
      </Button>
      <p className="text-center text-sm text-stone-500">
        No account?{" "}
        <Link
          to="/register"
          className="text-brand-600 font-semibold hover:underline"
        >
          Sign up
        </Link>
      </p>
    </form>
  );
};
