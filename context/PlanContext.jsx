'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

// Create the context for Workout Plan and Saved Workouts
const PlanContext = createContext();

export function PlanProvider({ children }) {
  // State for Today's Plan (max 5 lifts)
  const [todayPlan, setTodayPlan] = useState([]);

  // State for Saved Workouts (Save for later)
  const [savedWorkouts, setSavedWorkouts] = useState([]);

  // State for completed workout IDs (Mark as Done)
  const [completedWorkouts, setCompletedWorkouts] = useState([]);

  // Loading state to ensure localStorage data is loaded before rendering
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved data from localStorage when the app loads in the browser
  useEffect(() => {
    try {
      const savedPlan = localStorage.getItem('fitlog_today_plan');
      const savedList = localStorage.getItem('fitlog_saved_workouts');
      const savedDone = localStorage.getItem('fitlog_completed_workouts');

      if (savedPlan) setTodayPlan(JSON.parse(savedPlan));
      if (savedList) setSavedWorkouts(JSON.parse(savedList));
      if (savedDone) setCompletedWorkouts(JSON.parse(savedDone));
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save today's plan to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('fitlog_today_plan', JSON.stringify(todayPlan));
    }
  }, [todayPlan, isLoaded]);

  // Save saved workouts to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('fitlog_saved_workouts', JSON.stringify(savedWorkouts));
    }
  }, [savedWorkouts, isLoaded]);

  // Save completed workouts to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('fitlog_completed_workouts', JSON.stringify(completedWorkouts));
    }
  }, [completedWorkouts, isLoaded]);

  // 1. Add workout to Today's Plan
  const addToTodayPlan = (workout) => {
    // Check if workout is already in today's plan
    const alreadyExists = todayPlan.some((item) => item.id === workout.id);
    if (alreadyExists) {
      toast.error('Already added to today\'s plan!');
      return false;
    }

    // Check 5-lift cap requirement
    if (todayPlan.length >= 5) {
      toast.error('Plan limit reached! Maximum 5 lifts for today.');
      return false;
    }

    setTodayPlan((prev) => [...prev, workout]);
    toast.success('Added to today\'s plan! 🏋️');
    return true;
  };

  // 2. Remove workout from Today's Plan
  const removeFromTodayPlan = (id) => {
    setTodayPlan((prev) => prev.filter((item) => item.id !== id));
    // Also remove from completed if it was marked done
    setCompletedWorkouts((prev) => prev.filter((cId) => cId !== id));
    toast.success('Removed from today\'s plan');
  };

  // 3. Add workout to Saved for later
  const addToSaved = (workout) => {
    const alreadyExists = savedWorkouts.some((item) => item.id === workout.id);
    if (alreadyExists) {
      toast.error('Already in your saved list!');
      return false;
    }

    setSavedWorkouts((prev) => [...prev, workout]);
    toast.success('Saved for later! 📌');
    return true;
  };

  // 4. Remove workout from Saved list
  const removeFromSaved = (id) => {
    setSavedWorkouts((prev) => prev.filter((item) => item.id !== id));
    toast.success('Removed from saved list');
  };

  // 5. Toggle "Mark as Done" for a workout
  const toggleMarkAsDone = (id) => {
    if (completedWorkouts.includes(id)) {
      setCompletedWorkouts((prev) => prev.filter((cId) => cId !== id));
      toast('Workout marked as incomplete', { icon: 'ℹ️' });
    } else {
      setCompletedWorkouts((prev) => [...prev, id]);
      toast.success('Workout marked as done! Great job! 🎉');
    }
  };

  // Helper check functions
  const isCompleted = (id) => completedWorkouts.includes(id);
  const isInPlan = (id) => todayPlan.some((item) => item.id === id);
  const isSaved = (id) => savedWorkouts.some((item) => item.id === id);

  // Live Metrics Summary calculation for Today's Plan
  const totalExercises = todayPlan.length;
  const totalMinutes = todayPlan.reduce((sum, item) => sum + (Number(item.duration) || 0), 0);
  const totalCalories = todayPlan.reduce((sum, item) => sum + (Number(item.caloriesBurned) || 0), 0);

  return (
    <PlanContext.Provider
      value={{
        todayPlan,
        savedWorkouts,
        completedWorkouts,
        isLoaded,
        addToTodayPlan,
        removeFromTodayPlan,
        addToSaved,
        removeFromSaved,
        toggleMarkAsDone,
        isCompleted,
        isInPlan,
        isSaved,
        metrics: {
          exercises: totalExercises,
          minutes: totalMinutes,
          calories: totalCalories,
        },
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

// Custom hook to easily use the PlanContext in any component
export function usePlan() {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error('usePlan must be used within a PlanProvider');
  }
  return context;
}
