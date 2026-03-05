import { RegisterForm } from "../components/features/auth/RegisterForm";

export const RegisterPage = () => (
  <div className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-amber-50 flex items-center justify-center px-4">
    <div className="w-full max-w-md animate-fade-up">
      <div className="text-center mb-8">
        <div className="inline-flex w-16 h-16 bg-gradient-to-br from-brand-500 to-brand-600 rounded-2xl items-center justify-center mb-4 shadow-xl shadow-brand-200">
          <span className="text-2xl">🍽️</span>
        </div>
        <h1 className="text-3xl font-black font-display text-stone-800">
          Create account
        </h1>
        <p className="text-stone-500 mt-1">
          Join Savoria and start ordering today
        </p>
      </div>
      <div className="bg-white rounded-2xl shadow-xl border border-stone-100 p-8">
        <RegisterForm />
      </div>
    </div>
  </div>
);
