'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowDown, Flame, Trophy, Activity } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 border-b border-[#232733] bg-gradient-to-b from-[#13161c] via-[#0d0f12] to-[#0d0f12]">
      {/* Background ambient lighting/glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#ccff00]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hero Text & Call to Action */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Eyebrow text */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/30 text-[#ccff00] text-xs font-bold tracking-widest uppercase">
              <Activity className="w-3.5 h-3.5" />
              <span>WORKOUT LIBRARY</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white uppercase font-display leading-[1.05]">
              TRAIN WITH INTENT.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-[#ccff00]">
                LOG EVERY SET.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-zinc-400 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
            </p>

            {/* CTA Button & Quick Stats */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href="#library"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#ccff00] hover:bg-[#b5e600] text-black font-extrabold text-sm uppercase px-8 py-4 rounded-xl transition-all shadow-lg shadow-[#ccff00]/20 hover:shadow-[#ccff00]/30 active:scale-95 group"
              >
                <span>BROWSE WORKOUTS</span>
                <ArrowDown className="w-4 h-4 stroke-[3] group-hover:translate-y-0.5 transition-transform" />
              </a>

              <div className="flex items-center gap-4 text-xs font-semibold text-zinc-400 px-4 py-3 bg-zinc-900/60 border border-zinc-800 rounded-xl">
                <div className="flex items-center gap-1.5 text-zinc-300">
                  <Flame className="w-4 h-4 text-orange-400" />
                  <span>12 Pro Lifts</span>
                </div>
                <div className="w-px h-4 bg-zinc-700" />
                <div className="flex items-center gap-1.5 text-zinc-300">
                  <Trophy className="w-4 h-4 text-yellow-400" />
                  <span>Track & Crush</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual / Banner Image */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md aspect-[4/3] sm:aspect-square rounded-2xl overflow-hidden border border-zinc-800 bg-[#15181f] shadow-2xl shadow-black/80 group">
              
              {/* Image */}
              <img
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop"
                alt="FitLog Gym Training"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f12] via-transparent to-transparent opacity-90" />

              {/* Floating Stat Card Badge inside hero visual */}
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-[#15181f]/90 backdrop-blur-md border border-zinc-700/60 shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#ccff00]">Daily Target</div>
                    <div className="text-white font-extrabold text-base">5 Compound Lifts Max</div>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-xs font-bold text-zinc-200">
                    High Intensity
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
