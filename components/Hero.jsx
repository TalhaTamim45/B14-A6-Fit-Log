'use client';

import React from 'react';
import { ArrowDown } from 'lucide-react';

// Hero component for the top of the Home page
export default function Hero() {
  return (
    <section className="relative overflow-hidden py-14 md:py-20 border-b border-[#232733] bg-[#0d0f12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Eyebrow, Heading, Subtitle, and CTA Button */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Eyebrow text */}
            <p className="text-xs font-black tracking-widest text-[#ccff00] uppercase">
              WORKOUT LIBRARY
            </p>

            {/* Main Heading: uppercase, bold display font */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase font-display leading-tight">
              TRAIN WITH INTENT.<br />
              LOG EVERY SET.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-zinc-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
            </p>

            {/* Primary CTA button with icon (scrolls to #library on the same page) */}
            <div className="pt-2">
              <a
                href="#library"
                className="inline-flex items-center gap-3 bg-[#ccff00] hover:bg-[#b5e600] text-black font-extrabold text-sm uppercase px-8 py-4 rounded-xl transition-all shadow-md active:scale-95"
              >
                <span>BROWSE WORKOUTS</span>
                <ArrowDown className="w-4 h-4 stroke-[3]" />
              </a>
            </div>

          </div>

          {/* Right Column: Banner / Hero Image */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md aspect-[4/3] sm:aspect-square rounded-2xl overflow-hidden border border-zinc-800 bg-[#15181f]">
              <img
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop"
                alt="FitLog Workout Hero"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
