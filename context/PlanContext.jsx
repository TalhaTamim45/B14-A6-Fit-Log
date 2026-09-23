'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

// Create Context for managing workout plans and saved items globally
const PlanContext = createContext();

export function PlanProvider({ children }) {
  // State for Today's Plan list (maximum 5 lifts)
  const [todayPlan, setTodayPlan] = useState([]);

  // State for Saved for later list
  const [savedWorkouts, setSavedWorkouts] = useState([]);

  // State for tracking completed workouts (Mark as Done)
  const [completedWorkouts, setCompletedWorkouts] = useState([]);

  // Loading flag to wait for localStorage data on client
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved data from localStorage on first mount
  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem('fitlog_today_plan');
      const storedSaved = localStorage.getItem('fitlog_saved_workouts');
      const storedDone = localStorage.getItem('fitlog_completed_workouts');

      if (storedPlan) setTodayPlan(JSON.parse(storedPlan));
      if (storedSaved) setSavedWorkouts(JSON.parse(storedSaved));
      if (storedDone) setCompletedWorkouts(JSON.parse(storedDone));
    } catch (err) {
      console.error('Error reading from localStorage:', err);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save Today's Plan to localStorage when updated
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('fitlog_today_plan', JSON.stringify(todayPlan));
    }
  }, [todayPlan, isLoaded]);

  // Save Saved Workouts to localStorage when updated
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('fitlog_saved_workouts', JSON.stringify(savedWorkouts));
    }
  }, [savedWorkouts, isLoaded]);

  // Save Completed Workouts to localStorage when updated
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('fitlog_completed_workouts', JSON.stringify(completedWorkouts));
    }
  }, [completedWorkouts, isLoaded]);

  // 1. Add to Today's Plan
  const addToTodayPlan = (workout) => {
    // Check if workout is already in Today's Plan
    const isAlreadyInPlan = todayPlan.some((item) => item.id === workout.id);
    if (isAlreadyInPlan) {
      toast.error("Already added to today's plan");
      return false;
    }

    // Check plan cap (limit of 5 lifts)
    if (todayPlan.length >= 5) {
      toast.error('Plan limit reached! Maximum 5 lifts for today.');
      return false;
    }

    setTodayPlan((prev) => [...prev, workout]);
    toast.success("Added to today's plan");
    return true;
  };

  // 2. Remove from Today's Plan
  const removeFromTodayPlan = (id) => {
    setTodayPlan((prev) => prev.filter((item) => item.id !== id));
    setCompletedWorkouts((prev) => prev.filter((cId) => cId !== id));
    toast.success("Removed from today's plan");
  };

  // 3. Add to Saved for later
  const addToSaved = (workout) => {
    const isAlreadySaved = savedWorkouts.some((item) => item.id === workout.id);
    if (isAlreadySaved) {
      toast.error('Already in your saved list');
      return false;
    }

    setSavedWorkouts((prev) => [...prev, workout]);
    toast.success('Saved for later');
    return true;
  };

  // 4. Remove from Saved list
  const removeFromSaved = (id) => {
    setSavedWorkouts((prev) => prev.filter((item) => item.id !== id));
    toast.success('Removed from saved list');
  };

  // 5. Toggle Mark as Done (Challenge C3)
  const toggleMarkAsDone = (id) => {
    if (completedWorkouts.includes(id)) {
      setCompletedWorkouts((prev) => prev.filter((cId) => cId !== id));
      toast('Marked as incomplete', { icon: 'ℹ️' });
    } else {
      setCompletedWorkouts((prev) => [...prev, id]);
      toast.success('Marked as done');
    }
  };

  // Helper check functions
  const isCompleted = (id) => completedWorkouts.includes(id);
  const isInPlan = (id) => todayPlan.some((item) => item.id === id);
  const isSaved = (id) => savedWorkouts.some((item) => item.id === id);

  // Metrics summary calculation for Today's Plan: Exercises, Minutes, Calories
  const exercisesCount = todayPlan.length;
  const totalMinutes = todayPlan.reduce((acc, curr) => acc + (Number(curr.duration) || 0), 0);
  const totalCalories = todayPlan.reduce((acc, curr) => acc + (Number(curr.caloriesBurned) || 0), 0);

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
          exercises: exercisesCount,
          minutes: totalMinutes,
          calories: totalCalories,
        },
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

// Hook to access the context easily
export function usePlan() {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error('usePlan must be used within a PlanProvider');
  }
  return context;
}
