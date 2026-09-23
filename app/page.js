import Hero from '@/components/Hero';
import LibrarySection from '@/components/LibrarySection';

export default function Home() {
  return (
    <div className="flex-1">
      {/* 1. Hero / Banner (Top of Home Page) */}
      <Hero />

      {/* 2. The Library Section (Home Page 3x4 Grid) */}
      <LibrarySection />
    </div>
  );
}
