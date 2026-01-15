{/* THE REBELLION: FOUNDER STORY */}
<section id="story" className="py-24 px-6 bg-white rounded-[3rem] mx-4 my-12 shadow-premium">
  <div className="max-w-6xl mx-auto">
    <div className="flex flex-col items-center mb-16">
      <div className="bg-gutsyYellow text-black px-4 py-1 rounded-full text-[10px] font-black tracking-widest mb-4">
        FOUNDER STORY
      </div>
      <h2 className="text-5xl md:text-7xl font-black text-center italic tracking-tightest leading-none">
        FROM PAIN TO <span className="text-gutsyRed">PURPOSE.</span>
      </h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* CHAPTER 1 */}
      <div className="group relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-lg">
        <img src="/assets/story/story-chapter-1.jpg" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="Chapter 1" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent p-8 flex flex-col justify-end">
          <span className="text-[10px] font-black text-gutsyYellow mb-2 tracking-widest uppercase">Chapter 01 / The Result</span>
          <p className="text-white text-xs font-bold leading-relaxed uppercase">No bloat. Skin cleared. Energy stayed steady.</p>
        </div>
      </div>

      {/* CHAPTER 2 */}
      <div className="group relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-lg md:translate-y-8">
        <img src="/assets/story/story-chapter-2.jpg" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="Chapter 2" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent p-8 flex flex-col justify-end">
          <span className="text-[10px] font-black text-gutsyYellow mb-2 tracking-widest uppercase">Chapter 02 / The Breaking Point</span>
          <p className="text-white text-xs font-bold leading-relaxed uppercase">47+ proteins tested. Gums, fillers, and gut pain everywhere.</p>
        </div>
      </div>

      {/* CHAPTER 3 */}
      <div className="group relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-lg">
        <img src="/assets/story/story-chapter-3.jpg" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="Chapter 3" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent p-8 flex flex-col justify-end">
          <span className="text-[10px] font-black text-gutsyRed mb-2 tracking-widest uppercase">Chapter 03 / Why We Built This</span>
          <p className="text-white text-xs font-bold leading-relaxed uppercase">Formula perfected for anyone tired of choosing protein over comfort.</p>
        </div>
      </div>
    </div>
  </div>
</section>
