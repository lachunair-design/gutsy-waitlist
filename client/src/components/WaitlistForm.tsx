import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, Loader2, MapPin, MessageCircle, Twitter } from "lucide-react";
import { useJoinWaitlist } from "../hooks/useWaitlist";
import type { WaitlistEmail } from "@shared/schema";

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

type EmailForm = z.infer<typeof emailSchema>;

interface WaitlistFormProps {
  referralCode?: string | null;
  onSuccess?: (user: WaitlistEmail) => void;
}

export function WaitlistForm({ referralCode, onSuccess }: WaitlistFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [user, setUser] = useState<WaitlistEmail | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<EmailForm>({
    resolver: zodResolver(emailSchema),
  });

  const joinMutation = useJoinWaitlist();

  const onSubmit = async (data: EmailForm) => {
    try {
      const result = await joinMutation.mutateAsync({
        email: data.email,
        referredBy: referralCode || undefined,
      });
      setUser(result);
      setSubmitted(true);
      onSuccess?.(result);
    } catch (error) {
      // Error is captured by joinMutation.error
    }
  };

  if (submitted && user) {
    return <SuccessState user={user} />;
  }

  return (
    <div className="w-full max-w-lg font-gutsy">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col gap-3 p-3 bg-white rounded-[2.5rem] border border-black/10 shadow-premium">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-6 py-4 bg-transparent outline-none text-base text-gutsyBlack placeholder:text-gutsyBlack/30 font-medium"
            {...register("email")}
          />
          <button 
            type="submit" 
            disabled={joinMutation.isPending}
            className="bg-gutsyRed text-white px-8 py-5 rounded-[2rem] font-black uppercase text-xs tracking-widest transition-all duration-300 hover:bg-gutsyBlack flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {joinMutation.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                Join the Waitlist
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {/* Branded Error Handling */}
        {(errors.email || joinMutation.error) && (
          <div className="mt-4 px-6 py-3 bg-gutsyRed/5 rounded-2xl border border-gutsyRed/10">
            <p className="text-[10px] font-black uppercase tracking-widest text-gutsyRed text-center">
              {errors.email?.message || joinMutation.error?.message || "Server error. Please try again later."}
            </p>
          </div>
        )}
      </form>
    </div>
  );
}

function SuccessState({ user }: { user: WaitlistEmail }) {
  const referralLink = `${window.location.origin}?ref=${user.referralCode}`;

  const shareOnWhatsApp = () => {
    const text = `I just joined the waitlist for GUTSY - the first protein that won't wreck your gut. They're launching in Dubai in Jan. Join through my link and we both move up the list: ${referralLink}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  const shareOnTwitter = () => {
    const text = `I just joined the @gutsyprotein waitlist! No bloat. No regret. Just clean fuel. Join me:`;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(referralLink)}`,
      "_blank"
    );
  };

  return (
    <div className="bg-white rounded-[2.5rem] p-10 shadow-premium border border-black/5 text-center font-gutsy">
      <h3 className="text-4xl font-black uppercase tracking-tightest mb-4">You're on the list.</h3>
      <p className="text-xl uppercase font-black opacity-70 mb-8">
        You're currently <span className="text-gutsyRed">#{user.position}</span> in line.
      </p>
      
      <p className="text-sm font-black uppercase tracking-tight opacity-50 mb-6">
        Want to jump the queue? Share your unique link. Every 3 friends who join moves you up 5 spots.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button 
          onClick={shareOnWhatsApp}
          className="flex items-center justify-center gap-2 px-6 py-4 bg-gutsyCream rounded-2xl hover:bg-gutsyBlack hover:text-white transition-all text-[10px] font-black uppercase tracking-widest"
        >
          <MessageCircle className="w-4 h-4 text-[#25D366]" />
          WhatsApp
        </button>
        <button 
          onClick={shareOnTwitter}
          className="flex items-center justify-center gap-2 px-6 py-4 bg-gutsyCream rounded-2xl hover:bg-gutsyBlack hover:text-white transition-all text-[10px] font-black uppercase tracking-widest"
        >
          <Twitter className="w-4 h-4 text-[#1DA1F2]" />
          Twitter
        </button>
      </div>

      <div className="mt-8 pt-8 border-t border-black/5">
        <p className="text-[10px] font-black uppercase tracking-widest opacity-30 mb-2">Your Referral Link</p>
        <p className="text-xs font-medium opacity-60 break-all bg-gutsyCream p-4 rounded-xl">
          {referralLink}
        </p>
      </div>
    </div>
  );
}
