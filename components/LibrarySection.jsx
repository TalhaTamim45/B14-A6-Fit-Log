'use client';

import React, { useState, useEffect, useMemo } from 'react';
import WorkoutCard from './WorkoutCard';
import { Search, ChevronDown, SlidersHorizontal, AlertCircle, RefreshCw } from 'lucide-react';

export default function LibrarySection() {
  // 1. State for workouts fetched from the API
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. Search input state (Optional Feature from README)
  const [searchQuery, setSearchQuery] = useState('');

  // 3. Challenge C1: Sort By state (default: "Duration")
  const [sortBy, setSortBy] = useState('Duration');

  // Fetch all workouts from the FitLog API
  const fetchWorkouts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://api.abcz.workers.dev/api/fitlog');
      if (!response.ok) {
        throw new Error('Failed to load workouts from server');
      }
      const data = await response.json();
      setWorkouts(data);
    } catch (err) {
      console.error('API Fetch Error:', err);
      setError('Could not load workouts from API. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  // Filter and Sort the workouts
  const displayedWorkouts = useMemo(() => {
    let result = [...workouts];

    // Filter by search query if user types anything
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter((item) => {
        const nameMatch = item.name?.toLowerCase().includes(query);
        const tagMatch = Array.isArray(item.muscleGroups) && item.muscleGroups.some((m) => m.toLowerCase().includes(query));
        const equipMatch = item.equipment?.toLowerCase().includes(query);
        return nameMatch || tagMatch || equipMatch;
      });
    }

    // Challenge C1: Sort By Duration, Calories, or Rating
    result.sort((a, b) => {
      if (sortBy === 'Duration') {
        return (Number(b.duration) || 0) - (Number(a.duration) || 0);
      }
      if (sortBy === 'Calories') {
        return (Number(b.caloriesBurned) || 0) - (Number(a.caloriesBurned) || 0);
      }
      if (sortBy === 'Rating') {
        return (Number(b.rating) || 0) - (Number(a.rating) || 0);
      }
      return 0;
    });

    return result;
  }, [workouts, searchQuery, sortBy]);

  return (
    <section id="library" className="py-16 md:py-24 bg-[#0d0f12] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header: Heading & Subtitle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#232733] pb-8">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight font-display text-white">
              THE LIBRARY
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 mt-2 font-normal">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          {/* Controls: Search & Challenge C1 Sort Dropdown */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            
            {/* Search Input (Optional Feature) */}
            <div className="relative min-w-[220px]">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search workouts..."
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

            {/* Challenge C1: Sort By Dropdown */}
            <div className="flex items-center gap-2 bg-[#15181f] border border-[#232733] rounded-xl px-3.5 py-2.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#ccff00]" />
              <label htmlFor="sort-dropdown" className="text-xs font-semibold text-zinc-400">
                Sort By:
              </label>
              <select
                id="sort-dropdown"
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

        {/* Loading Animation while fetching API data */}
        {loading && (
          <div className="py-20 text-center space-y-4">
            <div className="w-10 h-10 border-4 border-zinc-800 border-t-[#ccff00] rounded-full animate-spin mx-auto" />
            <p className="text-sm font-semibold text-zinc-400 uppercase tracking-widest animate-pulse">
              Loading workouts…
            </p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="py-12 px-6 rounded-2xl bg-[#15181f] border border-red-900/50 text-center space-y-4 max-w-md mx-auto">
            <AlertCircle className="w-8 h-8 text-red-400 mx-auto" />
            <h3 className="text-base font-bold text-white uppercase">Failed to load workouts</h3>
            <p className="text-xs text-zinc-400">{error}</p>
            <button
              onClick={fetchWorkouts}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold uppercase transition"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry</span>
            </button>
          </div>
        )}

        {/* Empty search results */}
        {!loading && !error && displayedWorkouts.length === 0 && (
          <div className="py-16 text-center space-y-3 bg-[#15181f] border border-[#232733] rounded-2xl p-6">
            <p className="text-white font-bold text-base uppercase">No workouts found</p>
            <p className="text-xs text-zinc-400">
              No results found for &quot;{searchQuery}&quot;. Try another search term.
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-2 px-4 py-1.5 rounded-lg bg-zinc-800 text-xs font-bold text-[#ccff00] hover:bg-zinc-700 uppercase"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* 3x4 Grid on Large Screens (Responsive) */}
        {!loading && !error && displayedWorkouts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedWorkouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
