import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Check, Copy, Share2, MessageCircle, Mail, Instagram, ChevronRight, MapPin } from "lucide-react";
import logoBlack from "@/assets/images/Gutsy Logomark black.svg";

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

  const position = userData?.position || 1280;
  const referralCount = userData?.referralCount || 0;
  const referralUrl = referralCode ? `${window.location.origin}?ref=${referralCode}` : "gutsyprotein.com/join?ref=CHAMP";

  // Calculate tier and progress based on Copy Doc milestones
  const getTierInfo = () => {
    if (position <= 10) return { current: "Inner Circle", next: null, nextAt: 0, color: "#f20028" };
    if (position <= 50) return { current: "Top 50", next: "Top 10", nextAt: 10, color: "#890eff" };
    if (position <= 100) return { current: "Top 100", next: "Top 50", nextAt: 50, color: "#ff5200" };
    if (position <= 500) return { current: "Top 500", next: "Top 100", nextAt: 100, color: "#ffb300" };
    return { current: null, next: "Top 500", nextAt: 500, color: "#000000" };
  };

  const tierInfo = getTierInfo();
  // Based on Copy Doc: Every 3 successful referrals moves you up 5 spots
  const spotsToMove = tierInfo.nextAt ? position - tierInfo.nextAt : 0;
  const referralsToMilestone = Math.ceil(spotsToMove / 5) * 3;

  const copyToClipboard = async (text: string, type: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gutsyCream flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-gutsyRed border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gutsyCream text-gutsyBlack font-gutsy selection:bg-gutsyRed selection:text-white">
      {/* HEADER */}
      <nav className="fixed top-0 w-full z-[100] px-6 py-4 flex justify-between items-center border-b border-gutsyBlack/5 bg-gutsyCream/80 backdrop-blur-md">
        <div className="flex flex-col">
          <img src={logoBlack} alt="GUTSY" className="h-6 md:h-7" />
          <span className="text-[8px] font-black uppercase tracking-[0.2em] opacity-40 mt-1 flex items-center gap-1">
            <MapPin className="w-2 h-2" /> Born in Dubai
          </span>
        </div>
      </nav>

      <div className="pt-32 pb-20 px-6">
        <div className="max-w-2xl mx-auto space-y-6">

          {/* MAIN STATUS CARD */}
          <div className="bg-white rounded-[2.5rem] p-10 shadow-premium border border-black/5 text-center">
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tightest mb-4">You're on the list.</h1>
            <p className="text-xl uppercase font-black opacity-70 mb-8">
              You're currently <span className="text-gutsyRed">#{position}</span> in line.
            </p>

            {/* PROGRESS BAR */}
            <div className="bg-gutsyCream rounded-2xl p-6 mb-8 text-left border border-black/5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-black uppercase tracking-widest">Next Milestone: {tierInfo.next}</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-gutsyRed">{referralsToMilestone} more referrals to reach</span>
              </div>
              <div className="h-2 bg-white rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gutsyBlack transition-all duration-1000" 
                  style={{ width: `${Math.max(15, 100 - (spotsToMove / position * 100))}%` }}
                />
              </div>
            </div>

            <p className="text-sm font-black uppercase tracking-tight opacity-50 max-w-md mx-auto leading-relaxed">
              Want to jump the queue? Share your unique link. Every 3 friends who join moves you up 5 spots.
            </p>
          </div>

          {/* REFERRAL LINK SECTION */}
          <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-black/5 shadow-premium">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 opacity-40">Your unique referral link</h3>
            
            <div className="flex flex-col md:flex-row gap-3 mb-10">
              <div className="flex-1 bg-gutsyCream rounded-2xl px-6 py-4 text-sm font-black truncate border border-black/5">
                {referralUrl}
              </div>
              <button
                onClick={() => copyToClipboard(referralUrl, "link")}
                className="btn-pill"
              >
                {copied === "link" ? "Copied!" : "Copy Link"}
              </button>
            </div>

            {/* SOCIAL GRID */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(referralUrl)}`)} className="flex flex-col items-center gap-3 p-6 bg-gutsyCream rounded-3xl hover:bg-black hover:text-white transition-all group">
                <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-black uppercase tracking-widest">WhatsApp</span>
              </button>
              <button onClick={() => copyToClipboard(referralUrl, "ig")} className="flex flex-col items-center gap-3 p-6 bg-gutsyCream rounded-3xl hover:bg-black hover:text-white transition-all group">
                <Instagram className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-black uppercase tracking-widest">Stories</span>
              </button>
              <button onClick={() => window.open(`mailto:?subject=Join GUTSY&body=${referralUrl}`)} className="flex flex-col items-center gap-3 p-6 bg-gutsyCream rounded-3xl hover:bg-black hover:text-white transition-all group">
                <Mail className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-black uppercase tracking-widest">Email</span>
              </button>
              <button onClick={() => navigator.share && navigator.share({ url: referralUrl })} className="flex flex-col items-center gap-3 p-6 bg-gutsyCream rounded-3xl hover:bg-black hover:text-white transition-all group">
                <Share2 className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-black uppercase tracking-widest">More</span>
              </button>
            </div>
          </div>

          {/* REWARDS BREAKDOWN */}
          <div className="bg-gutsyBlack text-gutsyCream rounded-[2.5rem] p-10 overflow-hidden relative">
             <div className="relative z-10">
                <h3 className="text-3xl font-black uppercase tracking-tightest mb-8">Leaderboard Rewards</h3>
                <div className="space-y-4 opacity-80 text-[10px] font-black uppercase tracking-[0.2em]">
                  <div className="flex justify-between items-center py-4 border-b border-white/10">
                    <span>🥉 Top 500</span>
                    <span className="text-right">Early Access + 15% Off</span>
                  </div>
                  <div className="flex justify-between items-center py-4 border-b border-white/10">
                    <span>🥈 Top 100</span>
                    <span className="text-right">Priority Delivery + 20% Off</span>
                  </div>
                  <div className="flex justify-between items-center py-4 border-b border-white/10">
                    <span>🥇 Top 50</span>
                    <span className="text-right">25% Off + Exclusive Content</span>
                  </div>
                  <div className="flex justify-between items-center py-4">
                    <span className="text-gutsyRed">💎 Top 10</span>
                    <span className="text-right">Inner Circle WhatsApp</span>
                  </div>
                </div>
             </div>
             <div className="absolute -bottom-10 -right-10 opacity-10">
                <img src={logoBlack} alt="" className="w-64 invert" />
             </div>
          </div>

          {/* FOOTER NAV */}
          <div className="text-center pt-8">
            <a href="/" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest opacity-30 hover:opacity-100 transition-opacity">
              <ChevronRight className="w-3 h-3 rotate-180" /> Back to home
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
