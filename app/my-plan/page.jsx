'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Dumbbell, 
  Clock, 
  Flame, 
  Star, 
  CheckCircle2, 
  X, 
  ArrowRight, 
  Calendar, 
  Bookmark, 
  Check, 
  Eye, 
  Plus,
  Search
} from 'lucide-react';
import { usePlan } from '@/context/PlanContext';

export default function MyPlanPage() {
  const { 
    todayPlan, 
    savedWorkouts, 
    metrics, 
    isLoaded, 
    removeFromTodayPlan, 
    removeFromSaved, 
    addToTodayPlan, 
    toggleMarkAsDone, 
    isCompleted 
  } = usePlan();

  // Active tab state: "today" for Today's Plan, "saved" for Saved
  const [activeTab, setActiveTab] = useState('today');

  // Search filter for My Plan entries
  const [planSearch, setPlanSearch] = useState('');

  // Selected list based on tab
  const rawList = activeTab === 'today' ? todayPlan : savedWorkouts;

  // Filter list by search query if typed
  const activeList = useMemo(() => {
    if (!planSearch.trim()) return rawList;
    const q = planSearch.toLowerCase();
    return rawList.filter((item) => {
      const nameMatch = item.name?.toLowerCase().includes(q);
      const tagMatch = Array.isArray(item.muscleGroups) && item.muscleGroups.some((m) => m.toLowerCase().includes(q));
      const equipMatch = item.equipment?.toLowerCase().includes(q);
      return nameMatch || tagMatch || equipMatch;
    });
  }, [rawList, planSearch]);

  return (
    <div className="py-10 md:py-16 bg-[#0d0f12] text-white min-h-[calc(100vh-140px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Title & Subtitle */}
        <div className="border-b border-[#232733] pb-6 space-y-2">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight font-display text-white">
            MY PLAN
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 font-normal">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        {/* METRICS SUMMARY ROW (3 Stat Cards): Exercises, Minutes, Calories */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          
          {/* Card 1: Exercises */}
          <div className="bg-[#15181f] border border-[#232733] rounded-2xl p-6 flex items-center justify-between shadow-sm">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Exercises
              </span>
              <div className="text-3xl sm:text-4xl font-black text-white font-display">
                {isLoaded ? metrics.exercises : 0}
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-zinc-800 text-[#ccff00] flex items-center justify-center">
              <Dumbbell className="w-6 h-6 stroke-[2.5]" />
            </div>
          </div>

          {/* Card 2: Minutes */}
          <div className="bg-[#15181f] border border-[#232733] rounded-2xl p-6 flex items-center justify-between shadow-sm">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Minutes
              </span>
              <div className="text-3xl sm:text-4xl font-black text-[#ccff00] font-display">
                {isLoaded ? metrics.minutes : 0} <span className="text-sm font-semibold text-zinc-400 font-sans">min</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-zinc-800 text-[#ccff00] flex items-center justify-center">
              <Clock className="w-6 h-6 stroke-[2.5]" />
            </div>
          </div>

          {/* Card 3: Calories */}
          <div className="bg-[#15181f] border border-[#232733] rounded-2xl p-6 flex items-center justify-between shadow-sm">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Calories
              </span>
              <div className="text-3xl sm:text-4xl font-black text-orange-400 font-display">
                {isLoaded ? metrics.calories : 0} <span className="text-sm font-semibold text-zinc-400 font-sans">kcal</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-zinc-800 text-orange-400 flex items-center justify-center">
              <Flame className="w-6 h-6 stroke-[2.5]" />
            </div>
          </div>

        </div>

        {/* TABS & SEARCH ROW */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#232733] pb-4">
          
          {/* Tabs: Today's Plan / Saved */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('today')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'today'
                  ? 'bg-[#ccff00] text-black shadow-md'
                  : 'bg-[#15181f] text-zinc-400 hover:text-white border border-[#232733]'
              }`}
            >
              <Calendar className="w-4 h-4 stroke-[2.5]" />
              <span>Today&apos;s Plan</span>
              <span className={`px-2 py-0.5 rounded-full text-[11px] font-black ${
                activeTab === 'today' ? 'bg-black text-[#ccff00]' : 'bg-zinc-800 text-zinc-300'
              }`}>
                {isLoaded ? todayPlan.length : 0}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('saved')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'saved'
                  ? 'bg-[#ccff00] text-black shadow-md'
                  : 'bg-[#15181f] text-zinc-400 hover:text-white border border-[#232733]'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span>Saved</span>
              <span className={`px-2 py-0.5 rounded-full text-[11px] font-black ${
                activeTab === 'saved' ? 'bg-black text-[#ccff00]' : 'bg-zinc-800 text-zinc-300'
              }`}>
                {isLoaded ? savedWorkouts.length : 0}
              </span>
            </button>
          </div>

          {/* Search My Plan Entries (Optional Feature) */}
          {rawList.length > 0 && (
            <div className="relative min-w-[200px]">
              <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filter entries..."
                value={planSearch}
                onChange={(e) => setPlanSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-[#15181f] border border-[#232733] focus:border-[#ccff00] rounded-lg text-xs text-white placeholder-zinc-500 outline-none transition"
              />
            </div>
          )}

        </div>

        {/* LOADING STATE: show "Loading workouts…" while fetching */}
        {!isLoaded && (
          <div className="py-20 text-center space-y-4">
            <div className="w-10 h-10 border-4 border-zinc-800 border-t-[#ccff00] rounded-full animate-spin mx-auto" />
            <p className="text-sm font-semibold text-zinc-400 uppercase tracking-widest">
              Loading workouts…
            </p>
          </div>
        )}

        {/* EMPTY STATE (when the list is empty) */}
        {isLoaded && rawList.length === 0 && (
          <div className="py-20 px-4 rounded-3xl bg-[#15181f] border border-[#232733] text-center space-y-4 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-[#ccff00]">
              <Dumbbell className="w-8 h-8 stroke-[2]" />
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-black uppercase text-white font-display">
                NOTHING HERE YET
              </h3>
              <p className="text-sm text-zinc-400 max-w-sm mx-auto">
                Browse the library and add a lift to get today moving.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-[#ccff00] hover:bg-[#b5e600] text-black font-extrabold text-xs uppercase px-7 py-3.5 rounded-xl transition active:scale-95"
              >
                <span>Go to workouts</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </Link>
            </div>
          </div>
        )}

        {/* WORKOUT CARDS LIST */}
        {isLoaded && activeList.length > 0 && (
          <div className="space-y-4">
            {activeList.map((workout) => {
              const done = isCompleted(workout.id);

              return (
                <div
                  key={workout.id}
                  className={`flex flex-col md:flex-row items-stretch md:items-center justify-between gap-5 p-4 sm:p-5 rounded-2xl bg-[#15181f] border transition-all ${
                    done
                      ? 'border-emerald-500/50 bg-[#121c16]/40'
                      : 'border-[#232733] hover:border-zinc-700'
                  }`}
                >
                  
                  {/* Left: Thumbnail & Details */}
                  <div className="flex items-center gap-4 sm:gap-5 flex-1 min-w-0">
                    
                    {/* Thumbnail */}
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-zinc-900 flex-shrink-0 border border-zinc-800">
                      <img
                        src={workout.image || 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=400&auto=format&fit=crop'}
                        alt={workout.name}
                        className="w-full h-full object-cover"
                      />
                      {done && (
                        <div className="absolute inset-0 bg-emerald-950/70 flex items-center justify-center">
                          <CheckCircle2 className="w-7 h-7 text-emerald-400 stroke-[2.5]" />
                        </div>
                      )}
                    </div>

                    {/* Title, Equipment, Stats */}
                    <div className="space-y-1.5 flex-1 min-w-0">
                      
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className={`text-base sm:text-lg font-bold uppercase truncate ${
                          done ? 'text-zinc-400 line-through' : 'text-white'
                        }`}>
                          {workout.name}
                        </h4>
                        {done && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-black text-[10px] font-black uppercase">
                            Finished
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-zinc-400 flex items-center gap-1.5 truncate">
                        <Dumbbell className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                        <span>{workout.equipment || 'Bodyweight'}</span>
                      </p>

                      {/* Stats row with duration / calories / rating icons */}
                      <div className="flex items-center gap-4 text-xs pt-1 flex-wrap">
                        <div className="flex items-center gap-1 text-zinc-300">
                          <Clock className="w-3.5 h-3.5 text-[#ccff00]" />
                          <span>{workout.duration} min</span>
                        </div>
                        <div className="flex items-center gap-1 text-zinc-300">
                          <Flame className="w-3.5 h-3.5 text-orange-400" />
                          <span>{workout.caloriesBurned} kcal</span>
                        </div>
                        <div className="flex items-center gap-1 text-zinc-300">
                          <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                          <span>{workout.rating || 4.8}</span>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Right: Action Buttons */}
                  <div className="flex items-center gap-2.5 pt-3 md:pt-0 border-t md:border-t-0 border-zinc-800/80 justify-end">
                    
                    {/* "View Details" button → opens the workout detail page */}
                    <Link
                      href={`/workout/${workout.id}`}
                      className="px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 text-zinc-200 hover:text-white text-xs font-bold uppercase transition flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Details</span>
                    </Link>

                    {/* Today Tab Actions */}
                    {activeTab === 'today' && (
                      <>
                        {/* Challenge C3: "Mark as Done" button (with check icon) */}
                        <button
                          onClick={() => toggleMarkAsDone(workout.id)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-black uppercase transition flex items-center gap-1.5 ${
                            done
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                              : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span>{done ? 'Done' : 'Mark as Done'}</span>
                        </button>

                        {/* Challenge C3: Remove (X) button */}
                        <button
                          onClick={() => removeFromTodayPlan(workout.id)}
                          className="p-2 rounded-xl bg-zinc-900 hover:bg-red-950/40 border border-zinc-800 hover:border-red-800 text-zinc-400 hover:text-red-400 transition"
                          title="Remove workout"
                          aria-label="Remove workout"
                        >
                          <X className="w-4 h-4 stroke-[2.5]" />
                        </button>
                      </>
                    )}

                    {/* Saved Tab Actions */}
                    {activeTab === 'saved' && (
                      <>
                        <button
                          onClick={() => {
                            const added = addToTodayPlan(workout);
                            if (added) {
                              removeFromSaved(workout.id);
                            }
                          }}
                          className="px-3.5 py-2 rounded-xl bg-[#ccff00] hover:bg-[#b5e600] text-black text-xs font-extrabold uppercase transition flex items-center gap-1.5"
                        >
                          <Plus className="w-3.5 h-3.5 stroke-[3]" />
                          <span>Add to Plan</span>
                        </button>

                        <button
                          onClick={() => removeFromSaved(workout.id)}
                          className="p-2 rounded-xl bg-zinc-900 hover:bg-red-950/40 border border-zinc-800 hover:border-red-800 text-zinc-400 hover:text-red-400 transition"
                          title="Remove from saved"
                          aria-label="Remove saved workout"
                        >
                          <X className="w-4 h-4 stroke-[2.5]" />
                        </button>
                      </>
                    )}

                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
