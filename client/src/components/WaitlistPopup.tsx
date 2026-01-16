import { useState, useEffect } from "react";
import { X } from "lucide-react";
import EmailForm from "./EmailForm";

export default function WaitlistPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if the user has already seen the popup this session
    const hasSeenPopup = sessionStorage.getItem("gutsy_popup_viewed");
    
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 3000); // Opens 3 seconds after landing
      return () => clearTimeout(timer);
    }
  }, []);

  const closePopup = () => {
    setIsOpen(false);
    sessionStorage.setItem("gutsy_popup_viewed", "true");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-6 font-gutsy">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gutsyBlack/40 backdrop-blur-sm transition-opacity" 
        onClick={closePopup}
      />

      {/* Popup Card */}
      <div className="relative w-full max-w-lg bg-gutsyCream rounded-[3rem] p-10 shadow-premium border border-black/5 animate-in fade-in zoom-in duration-500">
        <button 
          onClick={closePopup}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-black/5 transition-colors"
        >
          <X className="w-5 h-5 opacity-40" />
        </button>

        <div className="text-center space-y-6">
          <span className="inline-block bg-gutsyYellow px-3 py-1 rounded-sm text-[10px] font-black uppercase tracking-widest">
            Waitlist Exclusive
          </span>
          
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tightest leading-[0.9]">
            Be first. <br />
            <span className="text-gutsyRed">Save more.</span>
          </h2>

          <p className="text-sm font-black uppercase tracking-tight opacity-50 leading-relaxed max-w-xs mx-auto">
            Join the waitlist and lock in launch pricing + early access before we go live in Dubai.
          </p>

          <div className="pt-4">
            <EmailForm buttonText="Count me in" />
          </div>

          <p className="text-[9px] font-black uppercase tracking-[0.2em] opacity-30">
            Launching January 1, 2026
          </p>
        </div>
      </div>
    </div>
  );
}
