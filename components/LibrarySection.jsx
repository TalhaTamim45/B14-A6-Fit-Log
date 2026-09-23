'use client';

import React, { useState, useEffect, useMemo } from 'react';
import WorkoutCard from './WorkoutCard';
import { Search, ChevronDown, SlidersHorizontal, AlertCircle, RefreshCw } from 'lucide-react';

export default function LibrarySection() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState('ALL');

  // Challenge C1: Sort By state (default: 'Duration')
  const [sortBy, setSortBy] = useState('Duration');

  // Fetch all workouts from FitLog API
  const fetchWorkouts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('https://api.abcz.workers.dev/api/fitlog');
      if (!res.ok) {
        throw new Error(`Failed to fetch workouts: ${res.status}`);
      }
      const data = await res.json();
      setWorkouts(data);
    } catch (err) {
      console.error('Error fetching workouts:', err);
      setError('Unable to load workouts from the live server. Please check your internet or retry.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  // Filter & Sort computation
  const filteredAndSortedWorkouts = useMemo(() => {
    let result = [...workouts];

    // Filter by search query (name or muscle group)
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter((w) => {
        const nameMatch = w.name?.toLowerCase().includes(q);
        const muscleMatch = Array.isArray(w.muscleGroups) && w.muscleGroups.some((m) => m.toLowerCase().includes(q));
        const equipMatch = w.equipment?.toLowerCase().includes(q);
        return nameMatch || muscleMatch || equipMatch;
      });
    }

    // Filter by selected muscle group
    if (selectedMuscle !== 'ALL') {
      result = result.filter((w) => 
        Array.isArray(w.muscleGroups) && 
        w.muscleGroups.some((m) => m.toLowerCase() === selectedMuscle.toLowerCase())
      );
    }

    // Challenge C1: Sort By (Duration, Calories, Rating)
    result.sort((a, b) => {
      if (sortBy === 'Duration') {
        return (Number(b.duration) || 0) - (Number(a.duration) || 0); // descending duration
      }
      if (sortBy === 'Calories') {
        return (Number(b.caloriesBurned) || 0) - (Number(a.caloriesBurned) || 0); // descending calories
      }
      if (sortBy === 'Rating') {
        return (Number(b.rating) || 0) - (Number(a.rating) || 0); // descending rating
      }
      return 0;
    });

    return result;
  }, [workouts, searchQuery, selectedMuscle, sortBy]);

  // List of distinct muscle groups for quick filter chips
  const muscleChips = ['ALL', 'Chest', 'Arms', 'Back', 'Legs', 'Core', 'Shoulders'];

  return (
    <section id="library" className="py-16 md:py-24 bg-[#0d0f12] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Heading & Subtitle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#232733] pb-8">
          <div>
            <div className="text-xs font-black tracking-widest text-[#ccff00] uppercase mb-2">
              EXERCISE CATALOG
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight font-display">
              THE LIBRARY
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 mt-2 font-normal">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          {/* Controls: Search and Challenge C1 Sort Dropdown */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            
            {/* Search Input */}
            <div className="relative min-w-[240px]">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search lifts or muscles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#15181f] border border-[#232733] focus:border-[#ccff00] rounded-xl text-sm text-white placeholder-zinc-500 outline-none transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Challenge C1: Sort Dropdown */}
            <div className="relative flex items-center">
              <div className="flex items-center gap-2 bg-[#15181f] border border-[#232733] rounded-xl px-3.5 py-2.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#ccff00]" />
                <span className="text-xs font-semibold text-zinc-400">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-xs font-bold text-white uppercase outline-none cursor-pointer pr-1"
                >
                  <option value="Duration" className="bg-[#15181f] text-white">Duration</option>
                  <option value="Calories" className="bg-[#15181f] text-white">Calories</option>
                  <option value="Rating" className="bg-[#15181f] text-white">Rating</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-zinc-400 pointer-events-none" />
              </div>
            </div>

          </div>
        </div>

        {/* Muscle Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {muscleChips.map((muscle) => (
            <button
              key={muscle}
              onClick={() => setSelectedMuscle(muscle)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase transition tracking-wider whitespace-nowrap ${
                selectedMuscle.toLowerCase() === muscle.toLowerCase()
                  ? 'bg-[#ccff00] text-black shadow-md shadow-[#ccff00]/10'
                  : 'bg-[#15181f] text-zinc-400 hover:text-white border border-[#232733] hover:border-zinc-700'
              }`}
            >
              {muscle}
            </button>
          ))}
        </div>

        {/* Loading State Animation */}
        {loading && (
          <div className="py-16">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
              <div className="w-12 h-12 border-4 border-[#232733] border-t-[#ccff00] rounded-full animate-spin" />
              <p className="text-sm font-semibold text-zinc-400 uppercase tracking-widest animate-pulse">
                Loading workouts from FitLog API...
              </p>
            </div>

            {/* Skeleton Grid (3x4 responsive) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-[#15181f] border border-[#232733] rounded-2xl overflow-hidden animate-pulse p-4 space-y-4"
                >
                  <div className="aspect-[16/10] bg-zinc-800/60 rounded-xl" />
                  <div className="h-4 bg-zinc-800 rounded w-1/3" />
                  <div className="h-6 bg-zinc-800 rounded w-3/4" />
                  <div className="h-3 bg-zinc-800 rounded w-1/2" />
                  <div className="pt-4 border-t border-zinc-800/60 flex justify-between">
                    <div className="h-4 bg-zinc-800 rounded w-16" />
                    <div className="h-4 bg-zinc-800 rounded w-16" />
                    <div className="h-4 bg-zinc-800 rounded w-12" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="p-8 rounded-2xl bg-red-950/20 border border-red-900/50 text-center space-y-4 max-w-lg mx-auto">
            <AlertCircle className="w-10 h-10 text-red-400 mx-auto" />
            <h3 className="text-lg font-bold text-white uppercase">Failed to Load Library</h3>
            <p className="text-sm text-zinc-400">{error}</p>
            <button
              onClick={fetchWorkouts}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold uppercase transition"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Retry</span>
            </button>
          </div>
        )}

        {/* Empty Search Result State */}
        {!loading && !error && filteredAndSortedWorkouts.length === 0 && (
          <div className="py-20 text-center space-y-3 bg-[#15181f] border border-[#232733] rounded-2xl p-8">
            <p className="text-zinc-300 font-bold text-lg uppercase">No Lifts Found</p>
            <p className="text-sm text-zinc-500 max-w-sm mx-auto">
              No workouts matched your search &quot;{searchQuery}&quot; or filter. Try a different muscle group or keyword.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedMuscle('ALL'); }}
              className="mt-3 px-4 py-2 rounded-lg bg-zinc-800 text-xs font-bold text-[#ccff00] hover:bg-zinc-700 uppercase"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Main 3x4 Responsive Grid */}
        {!loading && !error && filteredAndSortedWorkouts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedWorkouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
