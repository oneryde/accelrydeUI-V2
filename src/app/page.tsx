import Navbar from "@/components/Navbar";
import CinematicHero from "@/components/CinematicHero";
import StorySection from "@/components/StorySection";
import SolutionSection from "@/components/SolutionSection";
import Features from "@/components/Features";
import Waitlist from "@/components/Waitlist";
import Footer from "@/components/Footer";
import HashScroll from "@/components/HashScroll";

export default function Home() {
  return (
    <>
      <HashScroll />
      <Navbar />
      <main>
        <CinematicHero />
        <div id="story" className="scroll-mt-24">
          <StorySection />
        </div>
        <SolutionSection />
        <Features />
        <Waitlist />
      </main>
      <Footer />
    </>
  );
}
