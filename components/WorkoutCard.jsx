'use client';

import React from 'react';
import Link from 'next/link';
import { Clock, Flame, Star, Dumbbell } from 'lucide-react';

export default function WorkoutCard({ workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group flex flex-col bg-[#15181f] hover:bg-[#1a1d26] border border-[#232733] hover:border-zinc-600 rounded-2xl overflow-hidden transition-all duration-200"
    >
      {/* 1. Illustration / Image */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-zinc-900">
        <img
          src={workout.image || 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop'}
          alt={workout.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        <div>
          {/* 2. Category tag pills (e.g. CHEST, ARMS) */}
          <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
            {Array.isArray(workout.muscleGroups) && workout.muscleGroups.map((group, idx) => (
              <span
                key={idx}
                className="px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-300 text-[10px] font-bold uppercase tracking-wider border border-zinc-700/60"
              >
                {group}
              </span>
            ))}
          </div>

          {/* 3. Workout Name (e.g. BARBELL BENCH PRESS) */}
          <h3 className="text-lg font-bold text-white uppercase tracking-tight group-hover:text-[#ccff00] transition-colors leading-snug">
            {workout.name}
          </h3>

          {/* 4. Equipment line (e.g. Barbell, Bench) */}
          <p className="flex items-center gap-1.5 text-xs text-zinc-400 mt-2 truncate">
            <Dumbbell className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
            <span>{workout.equipment || 'Bodyweight'}</span>
          </p>
        </div>

        {/* 5. Stats row with icons: duration (25 min), calories (180 kcal), rating (4.8) */}
        <div className="pt-3 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-300">
          
          {/* Duration */}
          <div className="flex items-center gap-1.5" title="Duration">
            <Clock className="w-3.5 h-3.5 text-[#ccff00]" />
            <span className="font-semibold">{workout.duration} min</span>
          </div>

          {/* Calories */}
          <div className="flex items-center gap-1.5" title="Calories Burned">
            <Flame className="w-3.5 h-3.5 text-orange-400" />
            <span className="font-semibold">{workout.caloriesBurned} kcal</span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1.5" title="Rating">
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold text-white">{workout.rating || '4.8'}</span>
          </div>

        </div>

      </div>
    </Link>
  );
}
