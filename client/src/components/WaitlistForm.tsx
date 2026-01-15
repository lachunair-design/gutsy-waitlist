import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "./Button";
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailForm>({
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
      // Error handled by mutation
    }
  };

  if (submitted && user) {
    return <SuccessState user={user} />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
      <div className="flex flex-col gap-4 sm:flex-row">
        <input
          type="email"
          placeholder="Enter your email"
          className="input-brutalist flex-1"
          {...register("email")}
        />
        <Button type="submit" disabled={joinMutation.isPending}>
          {joinMutation.isPending ? "Joining..." : "Join Waitlist"}
        </Button>
      </div>
      {errors.email && (
        <p className="mt-2 text-sm text-gutsy-red">{errors.email.message}</p>
      )}
      {joinMutation.error && (
        <p className="mt-2 text-sm text-gutsy-red">{joinMutation.error.message}</p>
      )}
    </form>
  );
}

function SuccessState({ user }: { user: WaitlistEmail }) {
  const referralLink = `${window.location.origin}?ref=${user.referralCode}`;

  const shareOnWhatsApp = () => {
    const text = `Join GUTSY - The Lightest Protein in the World! ${referralLink}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  const shareOnTwitter = () => {
    const text = `I just joined the @gutsyprotein waitlist! The lightest protein, built for your gut. Join me:`;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(referralLink)}`,
      "_blank"
    );
  };

  return (
    <div className="card-brutalist w-full max-w-md text-center">
      <h3 className="mb-2 text-2xl font-bold uppercase">You're In!</h3>
      <p className="mb-4 text-lg">
        Position <span className="font-bold text-gutsy-red">#{user.position}</span>
      </p>
      <p className="mb-6 text-sm">Share to move up the list:</p>
      <div className="flex gap-4 justify-center">
        <Button variant="secondary" size="sm" onClick={shareOnWhatsApp}>
          WhatsApp
        </Button>
        <Button variant="outline" size="sm" onClick={shareOnTwitter}>
          Twitter
        </Button>
      </div>
      <p className="mt-4 text-xs text-gray-600 break-all">
        Your referral code: <strong>{user.referralCode}</strong>
      </p>
    </div>
  );
}
