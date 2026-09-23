'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Dumbbell, Menu, X } from 'lucide-react';
import { usePlan } from '@/context/PlanContext';

export default function Navbar() {
  const pathname = usePathname();
  const { todayPlan, savedWorkouts, isLoaded } = usePlan();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Active link check helper
  const isWorkoutActive = pathname === '/' || pathname.startsWith('/workout');
  const isPlanActive = pathname === '/my-plan';

  return (
    <header className="sticky top-0 z-50 bg-[#0d0f12]/95 backdrop-blur-md border-b border-[#232733]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Left: Brand Logo */}
        <Link 
          href="/" 
          className="flex items-center gap-2.5 group"
        >
          <div className="w-9 h-9 rounded-lg bg-[#ccff00] text-black flex items-center justify-center font-bold">
            <Dumbbell className="w-5 h-5 stroke-[2.5]" />
          </div>
          <span className="font-extrabold text-xl tracking-wider text-white">
            FIT<span className="text-[#ccff00]">LOG</span>
          </span>
        </Link>

        {/* Center: Navigation Links (Workout, My Plan) */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className={`text-sm font-semibold tracking-wide transition-colors py-1 border-b-2 ${
              isWorkoutActive
                ? 'text-[#ccff00] border-[#ccff00]'
                : 'text-zinc-400 border-transparent hover:text-white hover:border-zinc-500'
            }`}
          >
            Workout
          </Link>
          <Link
            href="/my-plan"
            className={`text-sm font-semibold tracking-wide transition-colors py-1 border-b-2 ${
              isPlanActive
                ? 'text-[#ccff00] border-[#ccff00]'
                : 'text-zinc-400 border-transparent hover:text-white hover:border-zinc-500'
            }`}
          >
            My Plan
          </Link>
        </nav>

        {/* Right-side status badges (counters): Plan badge & Saved badge */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Plan badge = filled pill with accent background (#ccff00) */}
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 bg-[#ccff00] hover:bg-[#b5e600] text-black font-bold text-xs uppercase px-3.5 py-1.5 rounded-full transition active:scale-95 shadow-sm"
            title="Today's Plan Count"
          >
            <span>Plan</span>
            <span className="bg-black text-[#ccff00] rounded-full px-1.5 py-0.2 text-[11px] font-black">
              {isLoaded ? todayPlan.length : 0}
            </span>
          </Link>

          {/* Saved badge = pill with outline/border only */}
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white font-medium text-xs uppercase px-3.5 py-1.5 rounded-full transition active:scale-95"
            title="Saved Workouts Count"
          >
            <span>Saved</span>
            <span className="bg-zinc-800 text-zinc-200 rounded-full px-1.5 py-0.2 text-[11px] font-semibold">
              {isLoaded ? savedWorkouts.length : 0}
            </span>
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 ml-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#15181f] border-b border-[#232733] px-4 pt-3 pb-4 space-y-2">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2 rounded-lg text-sm font-semibold ${
              isWorkoutActive ? 'bg-[#ccff00]/10 text-[#ccff00]' : 'text-zinc-300 hover:bg-zinc-800'
            }`}
          >
            Workout
          </Link>
          <Link
            href="/my-plan"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2 rounded-lg text-sm font-semibold ${
              isPlanActive ? 'bg-[#ccff00]/10 text-[#ccff00]' : 'text-zinc-300 hover:bg-zinc-800'
            }`}
          >
            My Plan
          </Link>
        </div>
      )}
    </header>
  );
}
