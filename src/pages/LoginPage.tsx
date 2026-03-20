import { useState, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { useSendOtp, useVerifyOtp } from "@/hooks/useAuth";
import logo from "@/assets/download.svg";

type Step = "email" | "otp" | "name";

export const LoginPage = () => {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [name, setName] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);
  const [resendTimer, setTimer] = useState(0);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const { mutate: sendOtp, isPending: sending } = useSendOtp();
  const { mutate: verifyOtp, isPending: verifying } = useVerifyOtp();

  // ── Start resend timer ─────────────────────────────────────
  const startTimer = () => {
    setTimer(30);
    const interval = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) {
          clearInterval(interval);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  };

  // ── Handle send OTP ────────────────────────────────────────
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    sendOtp(
      { email },
      {
        onSuccess: (data) => {
          setIsNewUser(data.isNewUser);
          setStep("otp");
          startTimer();
          inputRefs.current[0]?.focus();
        },
      },
    );
  };

  // ── Handle OTP input ───────────────────────────────────────
  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    const newOtp = [...otp];
    pasted.split("").forEach((char, i) => {
      newOtp[i] = char;
    });
    setOtp(newOtp);
    inputRefs.current[Math.min(pasted.length, 5)]?.focus();
  };

  // ── Handle verify OTP ──────────────────────────────────────
  const handleVerifyOtp = () => {
    const otpString = otp.join("");
    if (otpString.length < 6) return;

    if (isNewUser && !name.trim()) {
      setStep("name");
      return;
    }

    verifyOtp({
      email,
      otp: otpString,
      name: isNewUser ? name : undefined,
    });
  };

  // ── Handle name submit ─────────────────────────────────────
  // const handleNameSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!name.trim()) return;
  //   verifyOtp({
  //     email,
  //     otp: otp.join(""),
  //     name,
  //   });
  // };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left — Visual */}
      <div className="hidden lg:flex hero-warm grain relative overflow-hidden flex-col items-center justify-center p-12">
        <div className="relative z-10 text-center animate-fade-up">
          <div className="w-20 h-20 bg-white/10 backdrop-blur rounded-3xl flex items-center justify-center mx-auto mb-8 border border-white/20">
            <img
              src={logo}
              alt="Mithila"
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="font-display text-5xl font-700 text-white mb-4 leading-tight">
            Welcome to
            <br />
            <span className="text-cream-400 italic">Mithila</span>
          </h1>
          <p className="text-cream-300 text-lg max-w-sm mx-auto leading-relaxed">
            Where every meal is crafted with love and served with warmth.
          </p>
          <div className="mt-12 grid grid-cols-3 gap-6 max-w-xs mx-auto">
            {["🥗", "🍝", "🍮"].map((emoji, i) => (
              <div
                key={i}
                className={`w-16 h-16 bg-white/10 backdrop-blur rounded-2xl flex items-center justify-center border border-white/10 animate-fade-up-d${i + 1}`}
              >
                <span className="text-2xl">{emoji}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute top-20 right-20 w-64 h-64 bg-terra-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-48 h-48 bg-cream-400/10 rounded-full blur-3xl" />
      </div>

      {/* Right — Form */}
      <div className="flex items-center justify-center p-8 bg-cream-50 overflow-y-auto">
        <div className="w-full max-w-md animate-fade-up">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2.5 mb-8">
            <div className="w-9 h-9 bg-gradient-to-br from-terra-400 to-terra-600 rounded-xl flex items-center justify-center">
              <img
                src={logo}
                alt="Mithila"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-display font-700 text-xl text-charcoal">
              Mithila
            </span>
          </div>

          {/* ── Step: Email ──────────────────────────────────── */}
          {step === "email" && (
            <>
              <h2 className="font-display text-4xl font-700 text-charcoal mb-2">
                Sign in
              </h2>
              <p className="text-warm-500 mb-8 font-body">
                Enter your email to receive a verification code
              </p>

              <form onSubmit={handleSendOtp} className="space-y-5">
                <div>
                  <label className="block text-sm font-body font-700 text-charcoal mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-cream-200 bg-white focus:outline-none focus:ring-2 focus:ring-terra-400 text-sm font-body text-charcoal placeholder-warm-300 transition-all"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  loading={sending}
                  className="w-full"
                >
                  Send Verification Code →
                </Button>
              </form>

              {/* OAuth divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-cream-200" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-cream-50 px-4 text-sm text-warm-400 font-body">
                    or continue with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`${import.meta.env.VITE_FRONTEND_BASE_URL}/api/auth/google`}
                  className="flex items-center justify-center gap-2.5 px-4 py-3 bg-white border border-cream-200 rounded-2xl text-sm font-body font-semibold text-charcoal hover:bg-cream-50 transition-all shadow-warm-sm"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    ></path>
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    ></path>
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    ></path>
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    ></path>
                  </svg>
                  Google
                </a>
                <a
                  href={`${import.meta.env.VITE_FRONTEND_BASE_URL}/api/auth/github`}
                  className="flex items-center justify-center gap-2.5 px-4 py-3 bg-white border border-cream-200 rounded-2xl text-sm font-body font-semibold text-charcoal hover:bg-cream-50 transition-all shadow-warm-sm"
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"></path>
                  </svg>
                  GitHub
                </a>
              </div>
            </>
          )}

          {/* ── Step: OTP ────────────────────────────────────── */}
          {step === "otp" && (
            <>
              <button
                onClick={() => {
                  setStep("email");
                  setOtp(["", "", "", "", "", ""]);
                }}
                className="flex items-center gap-2 text-sm text-warm-400 hover:text-charcoal font-body mb-6 transition-colors"
              >
                ← Back
              </button>

              <h2 className="font-display text-4xl font-700 text-charcoal mb-2">
                {isNewUser ? "Verify your email" : "Enter your code"}
              </h2>
              <p className="text-warm-500 mb-2 font-body">
                We sent a 6-digit code to
              </p>
              <p className="text-terra-500 font-body font-700 mb-8">{email}</p>

              {/* OTP inputs */}
              <div className="flex gap-3 mb-6" onPaste={handleOtpPaste}>
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => {
                      inputRefs.current[i] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    className={`w-full aspect-square text-center text-2xl font-display font-700 rounded-2xl border-2 transition-all focus:outline-none focus:ring-0 ${
                      digit
                        ? "border-terra-400 bg-terra-50 text-charcoal"
                        : "border-cream-200 bg-white text-charcoal"
                    }`}
                  />
                ))}
              </div>

              {/* Name input for new users */}
              {isNewUser && (
                <div className="mb-5">
                  <label className="block text-sm font-body font-700 text-charcoal mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="What should we call you?"
                    className="w-full px-4 py-3 rounded-xl border border-cream-200 bg-white focus:outline-none focus:ring-2 focus:ring-terra-400 text-sm font-body text-charcoal placeholder-warm-300 transition-all"
                  />
                </div>
              )}

              <Button
                size="lg"
                loading={verifying}
                disabled={
                  otp.join("").length < 6 || (isNewUser && !name.trim())
                }
                className="w-full mb-4"
                onClick={handleVerifyOtp}
              >
                {isNewUser ? "Create Account →" : "Sign In →"}
              </Button>

              {/* Resend */}
              <div className="text-center">
                {resendTimer > 0 ? (
                  <p className="text-sm text-warm-400 font-body">
                    Resend code in{" "}
                    <span className="font-700 text-terra-500">
                      {resendTimer}s
                    </span>
                  </p>
                ) : (
                  <button
                    onClick={() => {
                      sendOtp(
                        { email },
                        {
                          onSuccess: () => {
                            startTimer();
                            setOtp(["", "", "", "", "", ""]);
                            inputRefs.current[0]?.focus();
                          },
                        },
                      );
                    }}
                    disabled={sending}
                    className="text-sm text-terra-500 font-body font-700 hover:underline transition-colors"
                  >
                    {sending ? "Sending..." : "Resend code"}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
