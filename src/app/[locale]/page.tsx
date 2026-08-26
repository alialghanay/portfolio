import About from "@/components/about/ui";
import Certifications from "@/components/certifications/ui";
import Contact from "@/components/contact/ui";
import Experience from "@/components/experience/ui";
import HeroSection from "@/components/herosection/ui";
import NotesTeaser from "@/components/notes/teaser";
import Projects from "@/components/projects/ui";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <Projects />
      <Experience />
      <About />
      <Certifications />
      <NotesTeaser />
      <Contact />
    </main>
  );
}
