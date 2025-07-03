import About from "@/components/about/ui";
import Contact from "@/components/contact/ui";
import HeroSection from "@/components/herosection/ui";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <About />
      <Contact />
    </main>
  );
}
