'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Plus, 
  Bookmark, 
  Check, 
  Dumbbell 
} from 'lucide-react';
import { usePlan } from '@/context/PlanContext';

export default function WorkoutDetailPage({ params }) {
  // Unwrap params in Next.js App Router
  const resolvedParams = typeof params?.then === 'function' ? use(params) : params;
  const workoutId = resolvedParams?.id;

  const { addToTodayPlan, addToSaved, isInPlan, isSaved, todayPlan } = usePlan();

  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch workout details by ID
  useEffect(() => {
    if (!workoutId) return;

    const fetchWorkoutDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch from the single item endpoint
        const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${workoutId}`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.id) {
            setWorkout(data);
            return;
          }
        }

        // Fallback: If single endpoint fails, fetch all data and filter by ID
        const allRes = await fetch('https://api.abcz.workers.dev/api/fitlog');
        if (allRes.ok) {
          const allData = await allRes.json();
          const match = allData.find((item) => String(item.id) === String(workoutId));
          if (match) {
            setWorkout(match);
            return;
          }
        }

        setError('Workout not found');
      } catch (err) {
        console.error('Error fetching workout:', err);
        setError('Failed to load workout details');
      } finally {
        setLoading(false);
      }
    };

    fetchWorkoutDetails();
  }, [workoutId]);

  // Loading state
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="w-10 h-10 border-4 border-zinc-800 border-t-[#ccff00] rounded-full animate-spin mx-auto mb-4" />
        <p className="text-zinc-400 text-sm uppercase tracking-wider">Loading workout details…</p>
      </div>
    );
  }

  // Not found or error state
  if (error || !workout) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white uppercase font-display">Workout Not Found</h2>
        <p className="text-zinc-400 text-sm">We couldn&apos;t find the workout you were looking for.</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#ccff00] text-black font-bold text-xs uppercase"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Library</span>
        </Link>
      </div>
    );
  }

  // Check state helpers
  const inPlan = isInPlan(workout.id);
  const saved = isSaved(workout.id);
  const planIsFull = todayPlan.length >= 5 && !inPlan;

  // Key Specs list matching the README requirements:
  // EQUIPMENT / DIFFICULTY / SETS / REPS / DURATION / CALORIES / RATING
  const specs = [
    { label: 'EQUIPMENT', value: workout.equipment || 'None' },
    { label: 'DIFFICULTY', value: workout.difficulty || 'Intermediate' },
    { label: 'SETS', value: workout.sets || '4' },
    { label: 'REPS', value: workout.reps || '8-12' },
    { label: 'DURATION', value: `${workout.duration} min` },
    { label: 'CALORIES', value: `${workout.caloriesBurned} kcal` },
    { label: 'RATING', value: `${workout.rating || 4.8}` },
  ];

  return (
    <div className="py-8 md:py-14 bg-[#0d0f12] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-[#ccff00] transition uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Library</span>
        </Link>

        {/* Two-Column Layout (follow the design) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT SIDE — Visual/Media: Large image/illustration fills the column */}
          <div className="lg:col-span-6">
            <div className="w-full aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden bg-[#15181f] border border-[#232733] shadow-xl">
              <img
                src={workout.image || 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop'}
                alt={workout.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* RIGHT SIDE — Sections */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white font-display">
              {workout.name}
            </h1>

            {/* Subtitle / Description */}
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              {workout.description}
            </p>

            {/* Category Tags */}
            <div className="flex flex-wrap items-center gap-2">
              {Array.isArray(workout.muscleGroups) && workout.muscleGroups.map((group, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-200 text-xs font-bold uppercase tracking-wider border border-zinc-700"
                >
                  {group}
                </span>
              ))}
            </div>

            {/* KEY SPECS TABLE/PANEL with label + value rows */}
            <div className="bg-[#15181f] border border-[#232733] rounded-2xl overflow-hidden divide-y divide-[#232733]">
              {specs.map((item, index) => (
                <div 
                  key={index}
                  className="px-5 py-3.5 flex items-center justify-between text-xs sm:text-sm"
                >
                  <span className="font-bold text-zinc-400 uppercase tracking-wider text-xs">
                    {item.label}
                  </span>
                  <span className="font-bold text-white text-right">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            {/* INSTRUCTIONS SECTION: ordered list of 4 steps (number + text) */}
            <div className="bg-[#15181f] border border-[#232733] rounded-2xl p-5 space-y-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-[#ccff00]">
                INSTRUCTIONS
              </h3>

              <ol className="space-y-2.5">
                {Array.isArray(workout.instructions) && workout.instructions.length > 0 ? (
                  workout.instructions.map((step, index) => (
                    <li key={index} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-zinc-800 border border-zinc-700 text-[#ccff00] font-bold text-xs flex items-center justify-center">
                        {index + 1}
                      </span>
                      <span className="pt-0.5">{step}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-xs text-zinc-400">Follow proper exercise guidelines.</li>
                )}
              </ol>
            </div>

            {/* CALL-TO-ACTION BUTTONS */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              
              {/* Primary button: "Add to today's plan" (with icon) */}
              <button
                onClick={() => addToTodayPlan(workout)}
                disabled={inPlan || planIsFull}
                className={`flex-1 flex items-center justify-center gap-2 text-xs font-black uppercase px-6 py-4 rounded-xl transition-all shadow-md active:scale-95 ${
                  inPlan
                    ? 'bg-zinc-800 text-zinc-400 border border-zinc-700 cursor-not-allowed'
                    : planIsFull
                    ? 'bg-zinc-800 text-zinc-400 border border-zinc-700 cursor-not-allowed'
                    : 'bg-[#ccff00] hover:bg-[#b5e600] text-black shadow-sm'
                }`}
              >
                {inPlan ? (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Added to plan</span>
                  </>
                ) : planIsFull ? (
                  <span>Plan Full (5 Max)</span>
                ) : (
                  <>
                    <Plus className="w-4 h-4 stroke-[3]" />
                    <span>Add to today&apos;s plan</span>
                  </>
                )}
              </button>

              {/* Secondary button: "Save for later" (with icon) */}
              <button
                onClick={() => addToSaved(workout)}
                disabled={saved}
                className={`flex-1 flex items-center justify-center gap-2 text-xs font-bold uppercase px-6 py-4 rounded-xl border transition-all active:scale-95 ${
                  saved
                    ? 'bg-zinc-900 border-zinc-800 text-zinc-400 cursor-not-allowed'
                    : 'bg-[#15181f] hover:bg-zinc-800 border-zinc-700 text-zinc-200'
                }`}
              >
                {saved ? (
                  <>
                    <Check className="w-4 h-4 text-[#ccff00]" />
                    <span>Saved for later</span>
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
