import React from 'react';
import Link from 'next/link';
import { Dumbbell, ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 text-center">
      <div className="max-w-md w-full bg-[#15181f] border border-[#232733] rounded-3xl p-8 sm:p-10 space-y-6 shadow-2xl shadow-black/80">
        
        {/* Large 404 & Gym Icon */}
        <div className="relative inline-flex items-center justify-center">
          <span className="text-7xl sm:text-8xl font-black text-zinc-800 font-display select-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-2xl bg-[#ccff00] text-black flex items-center justify-center shadow-lg shadow-[#ccff00]/20 -rotate-6">
              <Dumbbell className="w-8 h-8 stroke-[2.5]" />
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="space-y-2">
          <h2 className="text-2xl font-black uppercase text-white font-display">
            MISSED THE REP?
          </h2>
          <p className="text-sm text-zinc-400 font-normal">
            The page you are looking for doesn&apos;t exist or was moved to another locker room.
          </p>
        </div>

        {/* CTA Button */}
        <div className="pt-2">
          <Link
            href="/"
            className="w-full inline-flex items-center justify-center gap-2 bg-[#ccff00] hover:bg-[#b5e600] text-black font-extrabold text-xs uppercase px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-[#ccff00]/10 active:scale-95"
          >
            <Home className="w-4 h-4" />
            <span>RETURN TO WORKOUTS</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
