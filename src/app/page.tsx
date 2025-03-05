import About from "@/components/about/ui";
import Contact from "@/components/contact/ui";
import HeroSection from "@/components/herosection/ui";
import PageContiner from "@/components/ui/page-continer";

export default function Home() {
  return (
    <PageContiner>
      <HeroSection />
      <About />
      <Contact />
    </PageContiner>
  );
}
