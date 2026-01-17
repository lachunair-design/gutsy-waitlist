import { ArrowLeft, MapPin, Play } from "lucide-react";
import logoBlack from "@/assets/images/Gutsy Logomark black.svg";

export default function Story() {
  return (
    <div className="min-h-screen bg-gutsyCream text-gutsyBlack font-gutsy selection:bg-gutsyRed selection:text-white">
      {/* NAVIGATION */}
      <nav className="fixed top-0 w-full z-[100] px-6 py-4 flex justify-between items-center border-b border-black/5 bg-gutsyCream/80 backdrop-blur-md">
        <a href="/" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity">
          <ArrowLeft className="w-3 h-3" /> Back
        </a>
        <img src={logoBlack} alt="GUTSY" className="h-5 md:h-6" />
        <div className="w-12" /> {/* Spacer */}
      </nav>

      <article className="pt-32 pb-24 px-6 max-w-2xl mx-auto space-y-20 md:space-y-32">
        <header className="text-center space-y-4">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tightest leading-tight">
            Why we built <span className="text-gutsyRed">GUTSY</span>
          </h1>
          <div className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] opacity-30">
            <MapPin className="w-3 h-3" /> Dubai, UAE
          </div>
        </header>

        {/* SECTION 1 & 2 */}
        <section className="space-y-8">
          <h2 className="text-xs font-black uppercase tracking-[0.4em] text-gutsyRed">The Setup</h2>
          <div className="text-lg md:text-xl font-medium uppercase leading-relaxed opacity-80 space-y-6">
            <p>I was chronically exhausted.</p>
            <p>Got my labs done—absolute bloodbath. Everything borderline or severely deficient. Iron, B12, vitamin D. The works.</p>
            <p>I was 28 and felt 48.</p>
          </div>
          <h2 className="text-xs font-black uppercase tracking-[0.4em] text-gutsyRed pt-12">The Fix</h2>
          <div className="text-lg md:text-xl font-medium uppercase leading-relaxed opacity-80 space-y-6">
            <p>So I did what you are supposed to do.</p>
            <p>Started working out. Hit my nutrition goals. Increased protein to 100g a day. And it worked.</p>
            <p>More energy. Lifting heavier. Better sleep. I felt amazing.</p>
            <p className="font-black italic">For about three months.</p>
          </div>
        </section>

        {/* SECTION 3 & 4 */}
        <section className="space-y-8">
          <h2 className="text-xs font-black uppercase tracking-[0.4em] text-gutsyRed">The Turn</h2>
          <div className="text-lg md:text-xl font-medium uppercase leading-relaxed opacity-80 space-y-6">
            <p>Until I didn't.</p>
            <p>The bloating was constant. Every shake, every bar, every "gut-friendly" powder left me feeling like I'd swallowed a brick.</p>
            <p>Then the breakouts started. Not normal breakouts—severe, painful, across my face and back. The kind that shatter your confidence.</p>
            <p>I couldn't figure out what my body was doing. I was eating clean. Hitting my macros. Doing everything "right."</p>
            <p>But I felt worse than when I started.</p>
          </div>
          
          {/* THE DIAGNOSIS: Emotional Pivot */}
          <div className="py-20 md:py-32 border-y border-black/5 text-center">
            <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tightest leading-tight">
              And then my mum was <br /> 
              diagnosed with <span className="text-gutsyRed italic">colon cancer.</span>
            </h2>
          </div>
        </section>

        {/* SECTION 5 & 6 */}
        <section className="space-y-8">
          <h2 className="text-xs font-black uppercase tracking-[0.4em] text-gutsyRed">The Paranoia</h2>
          <div className="text-lg md:text-xl font-medium uppercase leading-relaxed opacity-80 space-y-6">
            <p>That’s when I got paranoid.</p>
            <p>Not just worried—paranoid. About everything I was eating. Everything I was putting in my body.</p>
            <p>What if the protein I’d been relying on was making things worse? What if the "clean" products I trusted weren’t actually clean?</p>
            <p>What if I had no idea what I’d been putting in my body for years?</p>
          </div>
          <h2 className="text-xs font-black uppercase tracking-[0.4em] text-gutsyRed pt-12">The Label Obsession</h2>
          <div className="text-lg md:text-xl font-medium uppercase leading-relaxed opacity-80 space-y-6">
            <p>So I started reading. Every label. Every ingredient list. Every nutrition panel.</p>
            <p>Maltodextrin. Xanthan gum. "Natural flavours" (what does that even mean?). Sucralose. Acesulfame potassium.</p>
            <p>I researched every additive, every sweetener, every thickening agent.</p>
            <p>And I realized: I’d been trusting brands to tell me the truth. But most protein powders are built for taste and margin, not digestion.</p>
            <p>The gut-friendly claims were marketing. The "clean" labels still had 15+ ingredients I couldn't pronounce.</p>
            <p>I tried everything. Vegan isolates. Whey. Fermented pea protein. Brands that cost AED 200+ per tub. Same result. Bloating. Breakouts. Discomfort.</p>
            <p className="font-black italic">So I quit protein entirely.</p>
          </div>
        </section>

        {/* VIDEO PLACEHOLDER */}
        <section className="aspect-video w-full bg-white/40 border border-black/5 rounded-[2rem] flex flex-col items-center justify-center text-center p-8 group cursor-pointer hover:bg-white/60 transition-all shadow-premium">
          <div className="w-16 h-16 rounded-full bg-gutsyRed flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
            <Play className="w-6 h-6 fill-current ml-1" />
          </div>
          <h3 className="text-xl font-black uppercase tracking-tightest">Founder Video Coming Soon</h3>
          <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mt-2">Lakshmi explains the GUTSY journey</p>
        </section>

        {/* SECTION 7 & 8 */}
        <section className="space-y-8">
          <h2 className="text-xs font-black uppercase tracking-[0.4em] text-gutsyRed">The Breakthrough</h2>
          <div className="text-lg md:text-xl font-medium uppercase leading-relaxed opacity-80 space-y-6">
            <p>For two years, I didn't touch protein powder.</p>
            <p>But I couldn't hit my goals without it. I was back to being exhausted, under-recovered, losing progress in the gym.</p>
            <p>So I started asking: what if the problem isn’t protein itself? What if it’s how it’s processed?</p>
            <p className="text-gutsyRed font-black italic">That’s when I found hydrolysed protein.</p>
            <p>Most protein powders are isolates—long chains your gut has to break down. That breakdown creates gas, fermentation, bloating.</p>
            <p>Hydrolysed protein is different. The chains are already broken down into smaller peptides before you drink it. Your gut absorbs them faster with less digestive work.</p>
            <p>It’s not magic. It’s just science.</p>
          </div>
          <h2 className="text-xs font-black uppercase tracking-[0.4em] text-gutsyRed pt-12">The 47 Samples</h2>
          <div className="text-lg md:text-xl font-medium uppercase leading-relaxed opacity-80 space-y-6">
            <p>I spent eight months working with formulators. Tested 47 samples. No exaggeration—47.</p>
            <p>Some tasted like chalk. Some still bloated me. Some had the texture of wet sand.</p>
            <p>But eventually, we got it right.</p>
            <p>Hydrolysed pea and rice protein. Actazin kiwifruit extract. No gums, no fillers, no artificial sweeteners.</p>
            <p>I tested it on myself for six months. Then on friends. Then on people with the worst gut issues I could find. The feedback was consistent: sits lighter, easier to digest, no bloat.</p>
          </div>
        </section>

        {/* SECTION 9: INVITATION */}
        <section className="py-24 border-t border-black/5 text-center space-y-10">
          <h2 className="text-xs font-black uppercase tracking-[0.4em] text-gutsyRed">The Invitation</h2>
          <div className="text-xl md:text-2xl font-medium uppercase leading-relaxed opacity-80 space-y-8">
            <p>GUTSY started with paranoia, breakouts, and 47 failed protein powders.</p>
            <p>It’s built for people who’ve quit protein because their gut couldn’t handle it. People who are tired of choosing between hitting their goals and feeling comfortable.</p>
            <p>If you’ve tried everything and nothing works, this is for you.</p>
          </div>
          <div className="pt-12">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 mb-6 italic">Made in Dubai. Built for gut-health obsessives.</p>
            <p className="text-3xl font-black uppercase tracking-widest">— Lakshmi, Founder</p>
          </div>
          <div className="pt-12">
            <a href="/#join" className="btn-pill px-12 py-4">Join the waitlist</a>
          </div>
        </section>
      </article>

      {/* SIMPLE FOOTER */}
      <footer className="py-12 border-t border-black/5 text-center">
        <p className="text-[10px] opacity-20 uppercase tracking-widest font-black">© 2026 GUTSY PROVISIONS</p>
      </footer>
    </div>
  );
}
