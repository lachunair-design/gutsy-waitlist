import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { ArrowRight, Loader2 } from "lucide-react";

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  referredBy: z.string().optional(),
});

type EmailFormData = z.infer<typeof emailSchema>;

interface EmailFormProps {
  variant?: "light" | "dark";
}

export default function EmailForm({ variant = "light" }: EmailFormProps) {
  const [referredBy, setReferredBy] = useState<string | null>(null);

  // Check for referral code in URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref) {
      setReferredBy(ref);
      localStorage.setItem("gutsy_referred_by", ref);
    } else {
      const storedRef = localStorage.getItem("gutsy_referred_by");
      if (storedRef) setReferredBy(storedRef);
    }
  }, []);

  const form = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "", referredBy: "" },
  });

  const mutation = useMutation({
    mutationFn: async (data: EmailFormData) => {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          referredBy: referredBy || undefined,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to join waitlist");
      }

      return res.json();
    },
    onSuccess: (data) => {
      // Store the user's referral code
      if (data.referralCode) {
        localStorage.setItem("gutsy_referral_code", data.referralCode);
      }
      // Redirect to success page with their code
      window.location.href = `/success?code=${data.referralCode}`;
    },
  });

  const onSubmit = (data: EmailFormData) => {
    mutation.mutate(data);
  };

  const isDark = variant === "dark";

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-lg">
      <div
        className={`flex flex-col sm:flex-row gap-3 p-2 rounded-2xl transition-all duration-300 ${
          isDark
            ? "bg-white/10 border border-white/20"
            : "bg-white shadow-xl border border-black/5"
        }`}
      >
        <input
          {...form.register("email")}
          type="email"
          placeholder="Enter your email"
          className={`flex-1 px-5 py-4 bg-transparent outline-none text-base ${
            isDark
              ? "text-white placeholder:text-white/50"
              : "text-black placeholder:text-black/40"
          }`}
        />
        <button
          type="submit"
          disabled={mutation.isPending}
          className={`px-8 py-4 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 ${
            isDark
              ? "bg-white text-black hover:bg-[#ffb300]"
              : "bg-[#f20028] text-white hover:bg-black"
          }`}
        >
          {mutation.isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Joining...
            </>
          ) : (
            <>
              Join Waitlist
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

      {/* Error message */}
      {mutation.isError && (
        <p className={`mt-3 text-sm ${isDark ? "text-white/80" : "text-[#f20028]"}`}>
          {mutation.error.message}
        </p>
      )}

      {/* Form validation error */}
      {form.formState.errors.email && (
        <p className={`mt-3 text-sm ${isDark ? "text-white/80" : "text-[#f20028]"}`}>
          {form.formState.errors.email.message}
        </p>
      )}

      {/* Referral indicator */}
      {referredBy && (
        <p className={`mt-3 text-sm ${isDark ? "text-white/60" : "text-black/40"}`}>
          Referred by a friend? You'll both move up when you join!
        </p>
      )}
    </form>
  );
}
