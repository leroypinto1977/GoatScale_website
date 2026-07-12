import Hero from "@/components/sections/Hero";
import Marquee from "@/components/ui/Marquee";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Manifesto from "@/components/sections/Manifesto";
import Work from "@/components/sections/Work";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Services />
      <Process />
      <Manifesto />
      <Work />
      <Testimonials />
      <Contact />
    </>
  );
}
