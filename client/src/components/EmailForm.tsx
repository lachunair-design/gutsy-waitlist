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
  buttonText?: string;
}

export default function EmailForm({ buttonText = "Join the Waitlist" }: EmailFormProps) {
  const [referredBy, setReferredBy] = useState<string | null>(null);

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

      // SAFETY: Check content-type to avoid the "Unexpected token A" JSON error
      const contentType = res.headers.get("content-type");
      if (!res.ok) {
        if (contentType && contentType.includes("application/json")) {
          const error = await res.json();
          throw new Error(error.message || "Failed to join waitlist");
        } else {
          // If server returns HTML error (like a 404 or 500 page)
          throw new Error("Server error. Please try again later.");
        }
      }

      return res.json();
    },
    onSuccess: (data) => {
      if (data.referralCode) {
        localStorage.setItem("gutsy_referral_code", data.referralCode);
        window.location.href = `/success?code=${data.referralCode}`;
      }
    },
  });

  const onSubmit = (data: EmailFormData) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full font-gutsy">
      <div className="flex flex-col gap-3 p-3 bg-white rounded-[2.5rem] border border-black/10 shadow-premium">
        <input
          {...form.register("email")}
          type="email"
          placeholder="Enter your email"
          className="px-6 py-4 bg-transparent outline-none text-base text-gutsyBlack placeholder:text-gutsyBlack/30 font-medium"
        />
        <button
          type="submit"
          disabled={mutation.isPending}
          className="bg-gutsyRed text-white px-8 py-5 rounded-[2rem] font-black uppercase text-xs tracking-widest transition-all duration-300 hover:bg-gutsyBlack flex items-center justify-center gap-3 disabled:opacity-50"
        >
          {mutation.isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              {buttonText}
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

      {/* Editorial Styled Error Messages */}
      {(mutation.isError || form.formState.errors.email) && (
        <div className="mt-4 px-6 py-3 bg-gutsyRed/5 rounded-2xl border border-gutsyRed/10">
          <p className="text-[10px] font-black uppercase tracking-widest text-gutsyRed">
            {mutation.error?.message || form.formState.errors.email?.message}
          </p>
        </div>
      )}

      {referredBy && !mutation.isError && (
        <p className="mt-4 px-6 text-[9px] font-black uppercase tracking-[0.2em] text-gutsyBlack/40">
          Referred by a friend • You'll both skip ahead
        </p>
      )}
    </form>
  );
}
