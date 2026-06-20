import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Manifesto from "@/components/sections/Manifesto";
import Work from "@/components/sections/Work";
import Contact from "@/components/sections/Contact";
import Marquee from "@/components/ui/Marquee";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Marquee />
      <Process />
      <Manifesto />
      <Work />
      <Contact />
    </>
  );
}
