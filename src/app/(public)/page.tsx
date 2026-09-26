import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Services } from "@/components/sections/Services";
import { WhySkyBuilds } from "@/components/sections/WhySkyBuilds";
import { About } from "@/components/sections/About";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Process } from "@/components/sections/Process";
import { CTA } from "@/components/sections/CTA";

export default function Home() {
  return (
    <main id="main-content">
      <Hero />
      <Marquee />
      <Services />
      <WhySkyBuilds />
      <About />
      <SelectedWork />
      <Process />
      <CTA />
    </main>
  );
}
