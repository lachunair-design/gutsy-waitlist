import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Check, Copy, Share2, MessageCircle, Mail, Instagram, ChevronRight } from "lucide-react";
import logoImg from "@/assets/images/logo-black.svg";

export default function Success() {
  const [copied, setCopied] = useState<string | null>(null);
  const [referralCode, setReferralCode] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code") || localStorage.getItem("gutsy_referral_code");
    if (code) {
      setReferralCode(code);
      localStorage.setItem("gutsy_referral_code", code);
    }
  }, []);

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
  const referralUrl = referralCode ? `${window.location.origin}?ref=${referralCode}` : "";

  // Calculate tier and progress
  const getTierInfo = () => {
    if (position <= 10) return { current: "Top 10", next: null, nextAt: 0, color: "#f20028" };
    if (position <= 50) return { current: "Top 50", next: "Top 10", nextAt: 10, color: "#890eff" };
    if (position <= 100) return { current: "Top 100", next: "Top 50", nextAt: 50, color: "#ff5200" };
    if (position <= 500) return { current: "Top 500", next: "Top 100", nextAt: 100, color: "#ffb300" };
    return { current: null, next: "Top 500", nextAt: 500, color: "#00b453" };
  };

  const tierInfo = getTierInfo();
  const referralsNeeded = tierInfo.nextAt ? Math.ceil((position - tierInfo.nextAt) / 5) * 3 : 0;

  // Pre-written share copy
  const shareCopy = {
    whatsapp: `I just joined the waitlist for GUTSY - the first protein that won't wreck your gut. They're launching in Dubai in Jan. Join through my link and we both move up the list: ${referralUrl}`,
    email: {
      subject: "This protein powder won't destroy your stomach",
      body: `Hey,\n\nI just signed up for GUTSY - a gut-friendly protein brand launching in Dubai.\n\nIf you've ever felt bloated after a protein shake, this is for you. They use pre-broken peptides so your body actually digests it properly.\n\nJoin through my link and we both skip ahead in line:\n${referralUrl}`
    },
    instagram: `No more bloated protein. Join the GUTSY waitlist: ${referralUrl}`
  };

  const copyToClipboard = async (text: string, type: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const shareWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareCopy.whatsapp)}`, "_blank");
  };

  const shareEmail = () => {
    window.open(`mailto:?subject=${encodeURIComponent(shareCopy.email.subject)}&body=${encodeURIComponent(shareCopy.email.body)}`);
  };

  const shareNative = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "Join the Gutsy waitlist",
        text: shareCopy.whatsapp,
        url: referralUrl,
      });
    }
  };

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

      <div className="px-6 py-8">
        <div className="max-w-2xl mx-auto space-y-6">

          {/* Success Card */}
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-black/5">
            {/* Success Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-[#00b453] rounded-full flex items-center justify-center shadow-lg">
                <Check className="w-8 h-8 text-white" strokeWidth={3} />
              </div>
            </div>

            {/* Heading */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">You're on the list.</h1>
              <p className="text-xl text-black/60">
                You're currently <span className="font-bold text-[#f20028]">#{position}</span> in line.
              </p>
            </div>

            {/* Progress to next tier */}
            {tierInfo.next && (
              <div className="bg-[#f3eee4] rounded-2xl p-5 mb-6">
                <div className="flex items-center justify-between mb-2 text-sm">
                  <span className="font-medium">Progress to {tierInfo.next}</span>
                  <span className="text-black/50">{referralsNeeded} more referrals needed</span>
                </div>
                <div className="h-2 bg-white rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min(100, (referralCount / (referralsNeeded + referralCount)) * 100)}%`,
                      backgroundColor: tierInfo.color
                    }}
                  ></div>
                </div>
              </div>
            )}

            {/* Current tier badge */}
            {tierInfo.current && (
              <div className="text-center mb-6">
                <span
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white text-sm font-semibold"
                  style={{ backgroundColor: tierInfo.color }}
                >
                  You're in {tierInfo.current}!
                </span>
              </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-[#f3eee4] rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-[#f20028]">{referralCount}</div>
                <div className="text-sm text-black/50">Referrals</div>
              </div>
              <div className="bg-[#f3eee4] rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-[#00b453]">+{referralCount * 5}</div>
                <div className="text-sm text-black/50">Spots gained</div>
              </div>
            </div>

            {/* Explanation */}
            <p className="text-center text-black/60 mb-6">
              Want to jump the queue? Share your unique link. Every 3 friends who join moves you up 5 spots.
            </p>
          </div>

          {/* Referral Link Card */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-black/5">
            <h3 className="font-bold text-lg mb-4">Your referral link</h3>

            <div className="flex gap-2 mb-6">
              <div className="flex-1 bg-[#f3eee4] rounded-xl px-4 py-3 text-sm font-medium truncate">
                {referralUrl || "Loading..."}
              </div>
              <button
                onClick={() => copyToClipboard(referralUrl, "link")}
                className="bg-black text-white px-5 py-3 rounded-xl font-semibold text-sm hover:bg-[#f20028] transition-colors flex items-center gap-2"
              >
                {copied === "link" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied === "link" ? "Copied!" : "Copy"}
              </button>
            </div>

            {/* Share Buttons */}
            <div className="grid grid-cols-4 gap-3">
              <button
                onClick={shareWhatsApp}
                className="flex flex-col items-center gap-2 p-4 bg-[#25D366]/10 rounded-xl hover:bg-[#25D366]/20 transition-colors"
              >
                <MessageCircle className="w-6 h-6 text-[#25D366]" />
                <span className="text-xs font-medium text-black/60">WhatsApp</span>
              </button>
              <button
                onClick={() => copyToClipboard(shareCopy.instagram, "instagram")}
                className="flex flex-col items-center gap-2 p-4 bg-[#E4405F]/10 rounded-xl hover:bg-[#E4405F]/20 transition-colors"
              >
                <Instagram className="w-6 h-6 text-[#E4405F]" />
                <span className="text-xs font-medium text-black/60">
                  {copied === "instagram" ? "Copied!" : "Instagram"}
                </span>
              </button>
              <button
                onClick={shareEmail}
                className="flex flex-col items-center gap-2 p-4 bg-[#004eff]/10 rounded-xl hover:bg-[#004eff]/20 transition-colors"
              >
                <Mail className="w-6 h-6 text-[#004eff]" />
                <span className="text-xs font-medium text-black/60">Email</span>
              </button>
              <button
                onClick={shareNative}
                className="flex flex-col items-center gap-2 p-4 bg-[#890eff]/10 rounded-xl hover:bg-[#890eff]/20 transition-colors"
              >
                <Share2 className="w-6 h-6 text-[#890eff]" />
                <span className="text-xs font-medium text-black/60">More</span>
              </button>
            </div>
          </div>

          {/* Pre-written Copy Card */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-black/5">
            <h3 className="font-bold text-lg mb-4">Pre-written messages</h3>

            <div className="space-y-4">
              {/* WhatsApp copy */}
              <div className="bg-[#f3eee4] rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-[#25D366]" />
                    For WhatsApp
                  </span>
                  <button
                    onClick={() => copyToClipboard(shareCopy.whatsapp, "whatsapp-copy")}
                    className="text-xs font-medium text-[#f20028] hover:underline"
                  >
                    {copied === "whatsapp-copy" ? "Copied!" : "Copy"}
                  </button>
                </div>
                <p className="text-sm text-black/60 leading-relaxed">{shareCopy.whatsapp}</p>
              </div>

              {/* Email copy */}
              <div className="bg-[#f3eee4] rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#004eff]" />
                    For Email
                  </span>
                  <button
                    onClick={() => copyToClipboard(`Subject: ${shareCopy.email.subject}\n\n${shareCopy.email.body}`, "email-copy")}
                    className="text-xs font-medium text-[#f20028] hover:underline"
                  >
                    {copied === "email-copy" ? "Copied!" : "Copy"}
                  </button>
                </div>
                <p className="text-sm text-black/60 leading-relaxed whitespace-pre-line">{shareCopy.email.body}</p>
              </div>
            </div>
          </div>

          {/* Leaderboard Tease */}
          <div className="bg-black text-white rounded-3xl p-8">
            <h3 className="font-bold text-lg mb-4">Rewards breakdown</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-white/10">
                <span className="flex items-center gap-2">🥉 Top 500</span>
                <span className="text-white/60">Early access + 15% off</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-white/10">
                <span className="flex items-center gap-2">🥈 Top 100</span>
                <span className="text-white/60">Priority delivery + 20% off</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-white/10">
                <span className="flex items-center gap-2">🥇 Top 50</span>
                <span className="text-white/60">Priority delivery + 25% off + exclusive content</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="flex items-center gap-2">💎 Top 10</span>
                <span className="text-white/60">Inner Circle WhatsApp access</span>
              </div>
            </div>
          </div>

          {/* Back to home */}
          <div className="text-center">
            <a
              href="/"
              className="inline-flex items-center gap-2 text-black/40 hover:text-black transition-colors text-sm"
            >
              Back to home
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
