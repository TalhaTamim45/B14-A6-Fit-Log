# 💪 FitLog — Workout Library & Training Planner

> **Train with Intent. Log Every Set.**  
> FitLog is a modern, dark, no-nonsense gym companion built with **Next.js (App Router)** and **Tailwind CSS**. Pick your lifts, lock them into today's plan, track duration and calories in real time, and save workouts for upcoming training sessions.

---

## 🔗 Live Deployment & Repository Links

- **Live URL**: *(Deploy to Vercel/Netlify and paste link here)*
- **GitHub Repository**: *(Paste your repository link here)*

---

## 🛠️ Technologies Used

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Server & Client Components)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management**: React Context API (`PlanContext`) + `localStorage` persistence
- **Icons**: [Lucide React](https://lucide.dev/)
- **Notifications**: [React Hot Toast](https://react-hot-toast.com/)
- **Typography**: Google Fonts (`Oswald` display & `Inter` body)

---

## 🌟 Key Features (5+ Core Features)

1. **Exercise Library with Live API Data Fetching**:
   - Fetches 12 compound and isolation lifts covering all major muscle groups from the official FitLog REST API (`https://api.abcz.workers.dev/api/fitlog`).
   - Displays workouts in a responsive 3x4 grid on large screens with category pills, equipment requirements, duration, calorie burns, and ratings.
   - Shows an animated skeleton loader while fetching data from the API.

2. **Dynamic Workout Details Page (`/workout/[id]`)**:
   - Clean two-column responsive layout: high-resolution workout visual on the left, full exercise specifications on the right.
   - Comprehensive key specs panel: Equipment, Difficulty level, Sets, Reps, Duration, Calories, and Rating.
   - Step-by-step numbered execution instructions.
   - Quick action buttons to **Add to today's plan** and **Save for later** with instant feedback and toast notifications.

3. **Real-time Live Metrics Dashboard (`/my-plan`)**:
   - Dynamically calculates and updates three live training metrics:
     - **Exercises Planned** (with 5-lift cap progress)
     - **Total Training Duration** (in minutes)
     - **Total Estimated Calories Burned** (in kcal)
   - Values start at 0 and update live as workouts are added, marked as done, or removed.

4. **Multi-Tab Workout Management & Challenge Actions**:
   - Dedicated tabs for **Today's Plan** and **Saved Workouts**.
   - **Mark as Done** toggle (Challenge C3) with completion styling (green highlights, strike-through, and celebration toast).
   - **Remove (X)** button with instantaneous plan adjustment and toast notice.
   - Moving saved workouts directly into Today's Plan with one click.
   - Clean, friendly empty state with direct navigation back to the library.

5. **Sorting, Search & Filtering (Challenge C1 & Extras)**:
   - **Sort By Dropdown**: Re-sorts the library on the fly by **Duration**, **Calories Burned**, or **Rating** (default: Duration).
   - **Live Search Bar**: Instantly filter lifts by exercise name, target muscle group, or equipment.
   - **Muscle Group Filter Chips**: Quick one-click category filtering for Chest, Arms, Back, Legs, Core, and Shoulders.

6. **Local Persistence & Limit Protection**:
   - Preserves planned workouts, saved items, and completed states in `localStorage`, so your plan survives page reloads and refreshes.
   - Enforces a 5-lift daily limit to encourage focused, high-intensity training sessions.

7. **Responsive Dark Gym Aesthetic & Custom 404**:
   - High-contrast dark gym theme (`#0d0f12`) with neon lime accent (`#ccff00`).
   - Sticky navbar with active route indicator, responsive mobile drawer menu, and live status counter badges (Plan & Saved pills).
   - Custom fitness-themed 404 page for unmatched routes.

---

## 🚀 Getting Started Locally

Follow these steps to run the project on your local machine:

### 1. Clone the repository
\`\`\`bash
git clone <your-repo-url>
cd asmnt6
\`\`\`

### 2. Install dependencies
\`\`\`bash
npm install
\`\`\`

### 3. Run the development server
\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 4. Build for production
\`\`\`bash
npm run build
npm start
\`\`\`

---

## 📁 Project Structure

\`\`\`
asmnt6/
├── app/
│   ├── globals.css          # Theme styles, color tokens & custom scrollbar
│   ├── layout.js            # Root layout with fonts, PlanProvider & Toaster
│   ├── page.js              # Home page assembling Hero & LibrarySection
│   ├── not-found.jsx        # Custom 404 Not Found page
│   ├── workout/
│   │   └── [id]/
│   │       └── page.jsx     # Dynamic Workout Details page
│   └── my-plan/
│       └── page.jsx         # My Plan page with tabs & metric counters
├── components/
│   ├── Navbar.jsx           # Sticky navigation with live Plan/Saved badges
│   ├── Footer.jsx           # Dark gym footer with brand copyright
│   ├── Hero.jsx             # Hero banner with CTA & visual graphic
│   ├── LibrarySection.jsx   # 3x4 grid, search, sort dropdown, & skeleton loader
│   └── WorkoutCard.jsx      # Reusable workout card with status indicators
├── context/
│   └── PlanContext.jsx      # Global React Context with localStorage sync
├── next.config.mjs          # Remote image domains configuration
└── README.md                # Project documentation
\`\`\`

---

## 📜 Assignment Information

- **Course**: Programming Hero Web Development (Batch 14)
- **Assignment**: Milestone 9/10 — Assignment 6 (FitLog)
- **Author**: Student Submission
- **License**: MIT
