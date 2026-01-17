import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Check, Copy, Share2, MessageCircle, Mail, Instagram, ChevronRight, MapPin, Calendar, Clock, Truck } from "lucide-react";
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

  const progressInCurrentSet = referralCount % 3;
  const referralsToNextJump = 3 - progressInCurrentSet;

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
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tightest mb-4">You are on the list.</h1>
            <p className="text-xl uppercase font-black opacity-70 mb-8">
              Your current spot is <span className="text-gutsyRed">#{position}</span>
            </p>

            <div className="bg-gutsyCream rounded-2xl p-6 mb-8 text-left border border-black/5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-gutsyBlack/40">Next Queue Jump</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-gutsyRed">
                  {referralsToNextJump} more friend{referralsToNextJump !== 1 ? 's' : ''} to join
                </span>
              </div>
              <div className="h-3 flex gap-2">
                {[1, 2, 3].map((step) => (
                  <div 
                    key={step}
                    className={`h-full flex-1 rounded-full transition-all duration-500 ${
                      progressInCurrentSet >= step ? 'bg-gutsyBlack' : 'bg-white border border-black/5'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* 1. EMOTIONAL REFERRAL PITCH */}
            <div className="space-y-2 mb-4">
              <p className="text-lg font-black uppercase tracking-tight">Know someone who quit protein because of bloat?</p>
              <p className="text-sm font-medium uppercase opacity-60">This helps both of you.</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-gutsyRed mt-4">Every 3 friends who join = you move up 5 spots.</p>
            </div>
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

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(`Know someone who quit protein because of bloat? This helps both of you. Join the GUTSY waitlist: ${referralUrl}`)}`)} className="flex flex-col items-center gap-3 p-6 bg-gutsyCream rounded-3xl hover:bg-black hover:text-white transition-all group">
                <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-black uppercase tracking-widest">WhatsApp</span>
              </button>
              <button onClick={() => copyToClipboard(referralUrl, "ig")} className="flex flex-col items-center gap-3 p-6 bg-gutsyCream rounded-3xl hover:bg-black hover:text-white transition-all group">
                <Instagram className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-black uppercase tracking-widest">Stories</span>
              </button>
              <button onClick={() => window.open(`mailto:?subject=Join the GUTSY Waitlist&body=I just joined the waitlist for GUTSY. The lightest protein in the world. Use my link to join: ${referralUrl}`)} className="flex flex-col items-center gap-3 p-6 bg-gutsyCream rounded-3xl hover:bg-black hover:text-white transition-all group">
                <Mail className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-black uppercase tracking-widest">Email</span>
              </button>
              <button onClick={() => navigator.share && navigator.share({ url: referralUrl })} className="flex flex-col items-center gap-3 p-6 bg-gutsyCream rounded-3xl hover:bg-black hover:text-white transition-all group">
                <Share2 className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-black uppercase tracking-widest">More</span>
              </button>
            </div>
          </div>

          {/* 2. SIMPLIFIED REWARDS */}
          <div className="bg-gutsyBlack text-gutsyCream rounded-[2.5rem] p-10 relative overflow-hidden">
             <div className="relative z-10">
                <h3 className="text-3xl font-black uppercase tracking-tightest mb-8">Waitlist Rewards</h3>
                <p className="text-[11px] font-black uppercase tracking-[0.2em] leading-loose">
                  First 500 get founder pricing (25% off). Everyone else gets 15%.
                </p>
             </div>
             <div className="absolute -bottom-10 -right-10 opacity-10">
                <img src={logoBlack} alt="" className="w-64 invert" />
             </div>
          </div>

          {/* 3. WHAT HAPPENS NEXT (TIMELINE) */}
          <div className="bg-white rounded-[2.5rem] p-10 border border-black/5 shadow-premium">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-10 opacity-40">What happens next</h3>
            <div className="space-y-8">
              <div className="flex gap-6 items-start">
                <div className="bg-gutsyCream p-3 rounded-2xl text-gutsyRed"><Clock className="w-5 h-5" /></div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1">Late March 2026</p>
                  <p className="text-sm font-black uppercase">Early access email sent</p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="bg-gutsyCream p-3 rounded-2xl text-gutsyRed"><Calendar className="w-5 h-5" /></div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1">April 1, 2026</p>
                  <p className="text-sm font-black uppercase">Public launch</p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="bg-gutsyCream p-3 rounded-2xl text-gutsyRed"><Truck className="w-5 h-5" /></div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1">April 2026</p>
                  <p className="text-sm font-black uppercase">Orders ship (delivery timing varies by location)</p>
                </div>
              </div>
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
