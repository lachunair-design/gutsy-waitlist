import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  Check, 
  Copy, 
  Share2, 
  MessageCircle, 
  Mail, 
  Instagram, 
  ChevronRight, 
  MapPin, 
  Calendar, 
  Clock, 
  Truck,
  TrendingUp,
  Award
} from "lucide-react";
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
  const referralUrl = referralCode ? `${window.location.origin}?ref=${referralCode}` : "gutsyprotein.com";

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
    <div className="min-h-screen bg-gutsyCream text-gutsyBlack font-gutsy antialiased selection:bg-gutsyRed selection:text-white relative">
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[9999] bg-noise" />
      
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

          {/* STATUS CARD */}
          <div className="bg-white rounded-[2.5rem] p-10 shadow-premium border border-black/5 text-center relative overflow-hidden">
            <div className="relative z-10">
              <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tightest mb-4 leading-none">Status: Confirmed.</h1>
              <p className="text-xl uppercase font-black opacity-70 mb-8">
                Your spot in the queue is <span className="text-gutsyRed">#{position}</span>
              </p>

              {/* Progress Tracker */}
              <div className="bg-gutsyCream rounded-2xl p-6 mb-8 text-left border border-black/5">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gutsyBlack/40">Priority Sequencing</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-gutsyRed flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> Move up 5 spots
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
                <p className="mt-4 text-[9px] font-black uppercase tracking-widest opacity-40 text-center">
                  Invite {referralsToNextJump} friend{referralsToNextJump !== 1 ? 's' : ''} to jump ahead
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-black uppercase tracking-widest text-gutsyRed">Help someone else quit the bloat.</p>
                <p className="text-[10px] font-medium uppercase opacity-50 max-w-xs mx-auto">
                  Batch 01 is limited to 500 Founder spots. Sharing your link ensures your circle gets early access.
                </p>
              </div>
            </div>
          </div>

          {/* SHARING OPTIONS */}
          <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-black/5 shadow-premium">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 opacity-40">Your Priority Link</h3>
            
            <div className="flex flex-col md:flex-row gap-3 mb-10">
              <div className="flex-1 bg-gutsyCream rounded-2xl px-6 py-4 text-sm font-black truncate border border-black/5 font-mono">
                {referralUrl}
              </div>
              <button
                onClick={() => copyToClipboard(referralUrl, "link")}
                className="btn-pill"
              >
                {copied === "link" ? <Check className="w-4 h-4" /> : "Copy Link"}
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(`I just joined the waitlist for GUTSY—the lightest protein in the world. Use my link to get on the list: ${referralUrl}`)}`)} className="flex flex-col items-center gap-3 p-6 bg-gutsyCream rounded-3xl hover:bg-gutsyRed hover:text-white transition-all group border border-black/5">
                <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span className="text-[9px] font-black uppercase tracking-widest">WhatsApp</span>
              </button>
              <button onClick={() => copyToClipboard(referralUrl, "ig")} className="flex flex-col items-center gap-3 p-6 bg-gutsyCream rounded-3xl hover:bg-gutsyRed hover:text-white transition-all group border border-black/5">
                <Instagram className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span className="text-[9px] font-black uppercase tracking-widest">Stories</span>
              </button>
              <button onClick={() => window.open(`mailto:?subject=Join the GUTSY Waitlist&body=Use my link to join: ${referralUrl}`)} className="flex flex-col items-center gap-3 p-6 bg-gutsyCream rounded-3xl hover:bg-gutsyRed hover:text-white transition-all group border border-black/5">
                <Mail className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span className="text-[9px] font-black uppercase tracking-widest">Email</span>
              </button>
              <button onClick={() => navigator.share && navigator.share({ url: referralUrl })} className="flex flex-col items-center gap-3 p-6 bg-gutsyCream rounded-3xl hover:bg-gutsyRed hover:text-white transition-all group border border-black/5">
                <Share2 className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span className="text-[9px] font-black uppercase tracking-widest">More</span>
              </button>
            </div>
          </div>

          {/* FOUNDER REWARD TIER */}
          <div className="bg-gutsyRed text-white rounded-[2.5rem] p-10 relative overflow-hidden shadow-premium">
             <div className="relative z-10 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-[9px] font-black uppercase tracking-widest">
                  <Award className="w-3 h-3" /> Founder Status
                </div>
                <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tightest leading-none">The 500 Club.</h3>
                <p className="text-sm font-bold uppercase opacity-90 leading-relaxed max-w-sm">
                  First 500 to order on April 1st lock in 25% off for life. 
                </p>
             </div>
             <div className="absolute -bottom-12 -right-12 opacity-10">
                <img src={logoBlack} alt="" className="w-64 invert" />
             </div>
          </div>

          {/* TIMELINE */}
          <div className="bg-white rounded-[2.5rem] p-10 border border-black/5 shadow-premium">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-10 opacity-40">Next Milestones</h3>
            <div className="space-y-8">
              <div className="flex gap-6 items-start">
                <div className="bg-gutsyCream p-3 rounded-2xl text-gutsyRed border border-black/5"><Clock className="w-5 h-5" /></div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1">Late March 2026</p>
                  <p className="text-sm font-black uppercase">Early access link sent via email</p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="bg-gutsyCream p-3 rounded-2xl text-gutsyRed border border-black/5"><Calendar className="w-5 h-5" /></div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1">April 1, 2026</p>
                  <p className="text-sm font-black uppercase">Batch 01 Public Release</p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="bg-gutsyCream p-3 rounded-2xl text-gutsyRed border border-black/5"><Truck className="w-5 h-5" /></div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1">Early April 2026</p>
                  <p className="text-sm font-black uppercase">Dubai / UAE dispatch begins</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center pt-8">
            <a href="/" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest opacity-30 hover:opacity-100 transition-opacity">
              <ChevronRight className="w-3 h-3 rotate-180" /> Exit to home
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
