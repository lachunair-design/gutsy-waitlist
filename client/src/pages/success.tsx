import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Check, Copy, Share2, MessageCircle, Mail, Gift, ArrowRight, Users } from "lucide-react";
import logoImg from "@/assets/images/logo-black.svg";

export default function Success() {
  const [copied, setCopied] = useState(false);
  const [referralCode, setReferralCode] = useState<string | null>(null);

  // Get referral code from URL or localStorage
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code") || localStorage.getItem("gutsy_referral_code");
    if (code) {
      setReferralCode(code);
      localStorage.setItem("gutsy_referral_code", code);
    }
  }, []);

  // Fetch user data
  const { data: userData, isLoading } = useQuery({
    queryKey: ["/api/waitlist/user", referralCode],
    queryFn: async () => {
      if (!referralCode) return null;
      const res = await fetch(`/api/waitlist/user/${referralCode}`);
      if (!res.ok) return null;
      return res.json();
    },
    enabled: !!referralCode,
  });

  const position = userData?.position || 1;
  const referralCount = userData?.referralCount || 0;
  const referralUrl = referralCode
    ? `${window.location.origin}?ref=${referralCode}`
    : "";

  const copyLink = async () => {
    await navigator.clipboard.writeText(referralUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareWhatsApp = () => {
    const text = `I just joined the Gutsy waitlist! It's a new gut-friendly protein launching in Dubai. Join using my link and we both move up the queue: ${referralUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  const shareEmail = () => {
    const subject = "Join me on the Gutsy waitlist!";
    const body = `Hey!\n\nI just joined the waitlist for Gutsy - a new gut-friendly protein powder launching in Dubai.\n\nUse my referral link to join and we both move up the queue:\n${referralUrl}\n\nSee you there!`;
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  const shareNative = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "Join the Gutsy waitlist",
        text: "I just joined the Gutsy waitlist! Use my link to join.",
        url: referralUrl,
      });
    }
  };

  // Calculate tier progress
  const getTierInfo = () => {
    if (position <= 10) return { current: "Top 10", next: null, progress: 100, color: "#f20028" };
    if (position <= 50) return { current: "Top 50", next: "Top 10", progress: ((50 - position) / 40) * 100, color: "#890eff" };
    if (position <= 100) return { current: "Top 100", next: "Top 50", progress: ((100 - position) / 50) * 100, color: "#ff5200" };
    if (position <= 500) return { current: "Top 500", next: "Top 100", progress: ((500 - position) / 400) * 100, color: "#ffb300" };
    return { current: null, next: "Top 500", progress: Math.min((referralCount / 10) * 100, 100), color: "#00b453" };
  };

  const tierInfo = getTierInfo();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f3eee4] flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-[#f20028] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3eee4] font-gutsy">
      {/* Navigation */}
      <nav className="px-6 py-4">
        <div className="max-w-2xl mx-auto flex justify-center">
          <a href="/">
            <img src={logoImg} alt="Gutsy" className="h-7" />
          </a>
        </div>
      </nav>

      <div className="px-6 py-12">
        <div className="max-w-2xl mx-auto">

          {/* Success Card */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-black/5 mb-8">

            {/* Success Icon */}
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-[#00b453] rounded-full flex items-center justify-center shadow-lg">
                <Check className="w-10 h-10 text-white" strokeWidth={3} />
              </div>
            </div>

            {/* Message */}
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-3">You're on the list!</h1>
              <p className="text-black/60 text-lg">
                You're currently <span className="font-bold text-[#f20028]">#{position}</span> in line
              </p>
            </div>

            {/* Tier Progress */}
            {tierInfo.current && (
              <div className="bg-[#f3eee4] rounded-2xl p-6 mb-8">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Gift className="w-5 h-5" style={{ color: tierInfo.color }} />
                    <span className="font-semibold">{tierInfo.current}</span>
                  </div>
                  {tierInfo.next && (
                    <span className="text-sm text-black/40">Next: {tierInfo.next}</span>
                  )}
                </div>
                <div className="h-2 bg-black/10 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${tierInfo.progress}%`, backgroundColor: tierInfo.color }}
                  ></div>
                </div>
              </div>
            )}

            {/* Referral Stats */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-[#f3eee4] rounded-2xl p-5 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Users className="w-5 h-5 text-[#f20028]" />
                  <span className="text-3xl font-bold">{referralCount}</span>
                </div>
                <p className="text-sm text-black/50">Referrals</p>
              </div>
              <div className="bg-[#f3eee4] rounded-2xl p-5 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <ArrowRight className="w-5 h-5 text-[#00b453]" />
                  <span className="text-3xl font-bold">+{referralCount * 5}</span>
                </div>
                <p className="text-sm text-black/50">Spots gained</p>
              </div>
            </div>

            {/* Referral Link */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-black/60 mb-3">
                Your referral link
              </label>
              <div className="flex gap-2">
                <div className="flex-1 bg-[#f3eee4] rounded-xl px-4 py-3 text-sm font-medium truncate">
                  {referralUrl || "Loading..."}
                </div>
                <button
                  onClick={copyLink}
                  disabled={!referralUrl}
                  className="bg-black text-white px-5 py-3 rounded-xl font-semibold text-sm hover:bg-[#f20028] transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>

            {/* Share Buttons */}
            <div>
              <label className="block text-sm font-medium text-black/60 mb-3">
                Share with friends
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={shareWhatsApp}
                  className="flex flex-col items-center gap-2 p-4 bg-[#25D366]/10 rounded-xl hover:bg-[#25D366]/20 transition-colors group"
                >
                  <MessageCircle className="w-6 h-6 text-[#25D366]" />
                  <span className="text-xs font-medium text-black/60 group-hover:text-black">WhatsApp</span>
                </button>
                <button
                  onClick={shareEmail}
                  className="flex flex-col items-center gap-2 p-4 bg-[#004eff]/10 rounded-xl hover:bg-[#004eff]/20 transition-colors group"
                >
                  <Mail className="w-6 h-6 text-[#004eff]" />
                  <span className="text-xs font-medium text-black/60 group-hover:text-black">Email</span>
                </button>
                <button
                  onClick={shareNative}
                  className="flex flex-col items-center gap-2 p-4 bg-[#890eff]/10 rounded-xl hover:bg-[#890eff]/20 transition-colors group"
                >
                  <Share2 className="w-6 h-6 text-[#890eff]" />
                  <span className="text-xs font-medium text-black/60 group-hover:text-black">More</span>
                </button>
              </div>
            </div>
          </div>

          {/* How it works */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-black/5">
            <h3 className="font-bold text-lg mb-4">How referrals work</h3>
            <div className="space-y-3 text-sm text-black/60">
              <p className="flex items-start gap-3">
                <span className="w-6 h-6 bg-[#f20028] text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
                Share your unique link with friends
              </p>
              <p className="flex items-start gap-3">
                <span className="w-6 h-6 bg-[#f20028] text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
                For every 3 friends who join, you move up 5 spots
              </p>
              <p className="flex items-start gap-3">
                <span className="w-6 h-6 bg-[#f20028] text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
                Reach the top tiers to unlock exclusive rewards
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
