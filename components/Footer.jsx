import React from 'react';
import Link from 'next/link';
import { Dumbbell } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-auto bg-[#090a0d] border-t border-[#232733] py-8 text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Left: Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-md bg-[#ccff00] text-black flex items-center justify-center font-bold">
            <Dumbbell className="w-4 h-4 stroke-[2.5]" />
          </div>
          <span className="font-extrabold text-lg tracking-wider text-white">
            FIT<span className="text-[#ccff00]">LOG</span>
          </span>
        </Link>

        {/* Right: Copyright Line */}
        <p className="text-xs text-zinc-400 text-center sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>

      </div>
    </footer>
  );
}
