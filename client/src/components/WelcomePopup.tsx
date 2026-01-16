import { useState, useEffect } from "react";
import { X } from "lucide-react";
import EmailForm from "./EmailForm";

export default function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show popup after a short delay for better UX
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />

      {/* Modal */}
      <div className="relative bg-[#f3eee4] rounded-3xl p-8 md:p-12 max-w-lg w-full shadow-2xl animate-popup">
        {/* Close button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 w-10 h-10 bg-black/5 hover:bg-black/10 rounded-full flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-[#f20028] text-white px-4 py-1.5 rounded-full text-xs font-semibold mb-6">
            🚀 Launching January 2026
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Don't miss out on launch day perks
          </h2>

          <p className="text-black/60 text-lg">
            Join the waitlist now and get <span className="font-semibold text-[#f20028]">early access</span> + <span className="font-semibold text-[#f20028]">up to 25% off</span> your first order.
          </p>
        </div>

        {/* Email Form */}
        <EmailForm />

        {/* Benefits */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl mb-1">🥉</div>
            <p className="text-xs text-black/50">Top 500 get 15% off</p>
          </div>
          <div>
            <div className="text-2xl mb-1">🥈</div>
            <p className="text-xs text-black/50">Top 100 get 20% off</p>
          </div>
          <div>
            <div className="text-2xl mb-1">🥇</div>
            <p className="text-xs text-black/50">Top 50 get 25% off</p>
          </div>
        </div>

        {/* Skip link */}
        <button
          onClick={() => setIsOpen(false)}
          className="mt-6 text-sm text-black/40 hover:text-black/60 transition-colors mx-auto block"
        >
          Maybe later
        </button>
      </div>

      {/* Animation styles */}
      <style>{`
        @keyframes popup {
          0% {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-popup {
          animation: popup 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
