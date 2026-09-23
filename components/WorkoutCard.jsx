'use client';

import React from 'react';
import Link from 'next/link';
import { Clock, Flame, Star, Dumbbell, CheckCircle2, Bookmark } from 'lucide-react';
import { usePlan } from '@/context/PlanContext';

export default function WorkoutCard({ workout }) {
  const { isInPlan, isSaved, isCompleted } = usePlan();

  const inPlan = isInPlan(workout.id);
  const saved = isSaved(workout.id);
  const done = isCompleted(workout.id);

  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group relative flex flex-col bg-[#15181f] hover:bg-[#1a1d26] border border-[#232733] hover:border-[#ccff00]/50 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50"
    >
      {/* Card Image Container */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-zinc-900">
        <img
          src={workout.image || 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop'}
          alt={workout.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Gradient shadow overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#15181f] via-transparent to-transparent opacity-80" />

        {/* Active status indicators (Plan / Saved / Done) */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          {done && (
            <span className="flex items-center gap-1 bg-emerald-500 text-black text-[11px] font-black uppercase px-2.5 py-1 rounded-full shadow-md">
              <CheckCircle2 className="w-3 h-3 stroke-[3]" />
              <span>Done</span>
            </span>
          )}
          {inPlan && !done && (
            <span className="bg-[#ccff00] text-black text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-md">
              Planned
            </span>
          )}
          {saved && (
            <span className="bg-zinc-800 border border-zinc-600 text-zinc-200 text-[11px] font-bold uppercase px-2 py-1 rounded-full shadow-md flex items-center gap-1">
              <Bookmark className="w-3 h-3 text-[#ccff00]" />
              <span>Saved</span>
            </span>
          )}
        </div>

        {/* Difficulty Badge (Top Left) */}
        <div className="absolute top-3 left-3">
          <span className="bg-black/75 backdrop-blur-sm border border-zinc-700/80 text-zinc-200 text-[10px] font-bold uppercase px-2.5 py-1 rounded-md tracking-wider">
            {workout.difficulty || 'All Levels'}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        <div>
          {/* Category Tag Pills (e.g. CHEST, ARMS) */}
          <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
            {Array.isArray(workout.muscleGroups) ? (
              workout.muscleGroups.map((group, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-0.5 rounded-full bg-zinc-800/80 text-zinc-300 text-[10px] font-bold tracking-wider uppercase border border-zinc-700/50"
                >
                  {group}
                </span>
              ))
            ) : (
              <span className="px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-300 text-[10px] font-bold uppercase">
                General
              </span>
            )}
          </div>

          {/* Workout Name */}
          <h3 className="text-lg font-bold text-white uppercase tracking-tight group-hover:text-[#ccff00] transition-colors leading-snug">
            {workout.name}
          </h3>

          {/* Equipment Line */}
          <p className="flex items-center gap-1.5 text-xs text-zinc-400 mt-1.5">
            <Dumbbell className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
            <span className="truncate">{workout.equipment || 'No equipment specified'}</span>
          </p>
        </div>

        {/* Stats Row with icons: duration, calories, rating */}
        <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-300">
          
          {/* Duration */}
          <div className="flex items-center gap-1.5" title="Duration">
            <Clock className="w-3.5 h-3.5 text-[#ccff00]" />
            <span className="font-semibold">{workout.duration} min</span>
          </div>

          {/* Calories */}
          <div className="flex items-center gap-1.5" title="Estimated Calories">
            <Flame className="w-3.5 h-3.5 text-orange-400" />
            <span className="font-semibold">{workout.caloriesBurned} kcal</span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1.5" title="User Rating">
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold text-white">{workout.rating || '4.8'}</span>
          </div>

        </div>

      </div>
    </Link>
  );
}
