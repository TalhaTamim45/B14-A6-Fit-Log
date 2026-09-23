'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Plus, 
  Bookmark, 
  Check, 
  Clock, 
  Flame, 
  Star, 
  Dumbbell, 
  Activity, 
  CheckCircle2,
  ListOrdered
} from 'lucide-react';
import { usePlan } from '@/context/PlanContext';

export default function WorkoutDetailPage({ params }) {
  // In Next.js 15+ App Router, params can be a Promise or object.
  const resolvedParams = typeof params?.then === 'function' ? use(params) : params;
  const workoutId = resolvedParams?.id;

  const router = useRouter();
  const { addToTodayPlan, addToSaved, isInPlan, isSaved, isCompleted, todayPlan } = usePlan();

  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!workoutId) return;

    const fetchSingleWorkout = async () => {
      setLoading(true);
      setError(null);
      try {
        // Try fetching directly from the single item endpoint
        const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${workoutId}`);
        if (res.ok) {
          const data = await res.json();
          // Check if data is valid
          if (data && data.id) {
            setWorkout(data);
            return;
          }
        }

        // Fallback: If single endpoint fails or returns non-standard format, fetch all workouts and find
        const allRes = await fetch('https://api.abcz.workers.dev/api/fitlog');
        if (allRes.ok) {
          const allData = await allRes.json();
          const found = allData.find((w) => String(w.id) === String(workoutId));
          if (found) {
            setWorkout(found);
            return;
          }
        }

        setError('Workout not found in the library.');
      } catch (err) {
        console.error('Error fetching workout details:', err);
        setError('Failed to load workout details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchSingleWorkout();
  }, [workoutId]);

  // Loading skeleton state
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="h-6 w-36 bg-zinc-800 rounded animate-pulse mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-6 aspect-[4/3] bg-zinc-800/60 rounded-2xl animate-pulse" />
          <div className="lg:col-span-6 space-y-6">
            <div className="h-8 bg-zinc-800 rounded w-3/4 animate-pulse" />
            <div className="h-4 bg-zinc-800 rounded w-full animate-pulse" />
            <div className="h-32 bg-zinc-800/50 rounded-xl animate-pulse" />
            <div className="h-28 bg-zinc-800/50 rounded-xl animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  // Error or Not Found State
  if (error || !workout) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-red-950/40 border border-red-800 flex items-center justify-center mx-auto text-red-400">
          <Dumbbell className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-extrabold uppercase text-white font-display">Workout Not Found</h1>
        <p className="text-zinc-400 text-sm max-w-md mx-auto">
          {error || "We couldn't locate this workout in the library catalog."}
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#ccff00] text-black font-extrabold text-xs uppercase hover:bg-[#b5e600] transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Library</span>
          </Link>
        </div>
      </div>
    );
  }

  const inPlan = isInPlan(workout.id);
  const saved = isSaved(workout.id);
  const done = isCompleted(workout.id);
  const planIsFull = todayPlan.length >= 5 && !inPlan;

  return (
    <div className="py-8 md:py-16 bg-[#0d0f12] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Navigation Breadcrumb / Back button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-[#ccff00] transition uppercase tracking-wider group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Library</span>
        </Link>

        {/* Main Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-start">
          
          {/* LEFT SIDE — Visual / Media */}
          <div className="lg:col-span-6">
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden bg-[#15181f] border border-[#232733] shadow-2xl shadow-black/80">
              <img
                src={workout.image || 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop'}
                alt={workout.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f12]/80 via-transparent to-transparent pointer-events-none" />

              {/* Status Badges Overlay */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <span className="bg-black/80 backdrop-blur-md border border-zinc-700 text-zinc-200 text-xs font-bold uppercase px-3 py-1 rounded-lg">
                  {workout.difficulty || 'Intermediate'}
                </span>
                {done && (
                  <span className="flex items-center gap-1.5 bg-emerald-500 text-black text-xs font-black uppercase px-3 py-1 rounded-lg shadow-lg">
                    <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />
                    <span>Completed Today</span>
                  </span>
                )}
                {inPlan && !done && (
                  <span className="bg-[#ccff00] text-black text-xs font-black uppercase px-3 py-1 rounded-lg shadow-lg">
                    In Today&apos;s Plan
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE — Details, Specs, Instructions, Actions */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Category Tags */}
            <div className="flex flex-wrap items-center gap-2">
              {Array.isArray(workout.muscleGroups) && workout.muscleGroups.map((group, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/30 text-[#ccff00] text-xs font-bold uppercase tracking-wider"
                >
                  {group}
                </span>
              ))}
            </div>

            {/* Title & Subtitle/Description */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white font-display leading-tight">
                {workout.name}
              </h1>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-normal">
                {workout.description}
              </p>
            </div>

            {/* KEY SPECS TABLE / PANEL with label + value rows */}
            <div className="bg-[#15181f] border border-[#232733] rounded-2xl overflow-hidden divide-y divide-[#232733]">
              <div className="px-5 py-3 bg-zinc-900/60 flex items-center justify-between">
                <span className="text-xs font-black tracking-widest uppercase text-[#ccff00] flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5" />
                  Key Specifications
                </span>
                <span className="text-[11px] text-zinc-400 font-medium">Standard Protocol</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-[#232733]">
                {/* Equipment */}
                <div className="p-4 bg-[#15181f] space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">EQUIPMENT</div>
                  <div className="text-xs font-bold text-white truncate">{workout.equipment || 'Bodyweight'}</div>
                </div>

                {/* Difficulty */}
                <div className="p-4 bg-[#15181f] space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">DIFFICULTY</div>
                  <div className="text-xs font-bold text-white">{workout.difficulty || 'Intermediate'}</div>
                </div>

                {/* Sets */}
                <div className="p-4 bg-[#15181f] space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">SETS</div>
                  <div className="text-xs font-bold text-white">{workout.sets || 4} Sets</div>
                </div>

                {/* Reps */}
                <div className="p-4 bg-[#15181f] space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">REPS</div>
                  <div className="text-xs font-bold text-white">{workout.reps || '8-12'}</div>
                </div>

                {/* Duration */}
                <div className="p-4 bg-[#15181f] space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">DURATION</div>
                  <div className="text-xs font-bold text-[#ccff00] flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{workout.duration} min</span>
                  </div>
                </div>

                {/* Calories */}
                <div className="p-4 bg-[#15181f] space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">CALORIES</div>
                  <div className="text-xs font-bold text-orange-400 flex items-center gap-1">
                    <Flame className="w-3 h-3" />
                    <span>{workout.caloriesBurned} kcal</span>
                  </div>
                </div>
              </div>

              {/* Rating Row */}
              <div className="px-5 py-3 flex items-center justify-between bg-[#15181f]">
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">OVERALL RATING</span>
                <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                  <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  <span>{workout.rating || 4.8} / 5.0</span>
                </div>
              </div>
            </div>

            {/* INSTRUCTIONS SECTION: Ordered list of 4 steps (number + text) */}
            <div className="bg-[#15181f] border border-[#232733] rounded-2xl p-5 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-white">
                <ListOrdered className="w-4 h-4 text-[#ccff00]" />
                <span>EXECUTION INSTRUCTIONS</span>
              </div>

              <ol className="space-y-3">
                {Array.isArray(workout.instructions) && workout.instructions.length > 0 ? (
                  workout.instructions.map((step, index) => (
                    <li key={index} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-zinc-800 border border-zinc-700 text-[#ccff00] font-black text-xs flex items-center justify-center">
                        {index + 1}
                      </span>
                      <p className="pt-0.5 leading-relaxed font-normal">{step}</p>
                    </li>
                  ))
                ) : (
                  <p className="text-xs text-zinc-500">Perform exercise following standard form and controlled tempo.</p>
                )}
              </ol>
            </div>

            {/* CALL TO ACTION BUTTONS */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              
              {/* Primary button: "Add to today's plan" */}
              <button
                onClick={() => addToTodayPlan(workout)}
                disabled={inPlan || planIsFull}
                className={`flex-1 flex items-center justify-center gap-2.5 font-black text-xs uppercase px-6 py-4 rounded-xl transition-all shadow-lg active:scale-95 ${
                  inPlan
                    ? 'bg-zinc-800 text-zinc-400 border border-zinc-700 cursor-not-allowed'
                    : planIsFull
                    ? 'bg-zinc-800/80 text-zinc-400 border border-zinc-700 cursor-not-allowed'
                    : 'bg-[#ccff00] hover:bg-[#b5e600] text-black shadow-[#ccff00]/20 hover:shadow-[#ccff00]/30'
                }`}
              >
                {inPlan ? (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>In Today&apos;s Plan</span>
                  </>
                ) : planIsFull ? (
                  <>
                    <span>Plan Full (5/5)</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 stroke-[3]" />
                    <span>Add to today&apos;s plan</span>
                  </>
                )}
              </button>

              {/* Secondary button: "Save for later" */}
              <button
                onClick={() => addToSaved(workout)}
                disabled={saved}
                className={`flex-1 flex items-center justify-center gap-2.5 font-bold text-xs uppercase px-6 py-4 rounded-xl border transition-all active:scale-95 ${
                  saved
                    ? 'bg-zinc-900 border-zinc-800 text-zinc-400 cursor-not-allowed'
                    : 'bg-zinc-900/60 hover:bg-zinc-800 border-zinc-700 text-zinc-200 hover:text-white'
                }`}
              >
                {saved ? (
                  <>
                    <Check className="w-4 h-4 text-[#ccff00]" />
                    <span>Saved in List</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="w-4 h-4" />
                    <span>Save for later</span>
                  </>
                )}
              </button>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
