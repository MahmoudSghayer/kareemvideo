import { Overlays } from "@/components/Overlays";
import { MagneticInit } from "@/components/MagneticInit";
import { Cursor } from "@/components/Cursor";
import { Loader } from "@/components/Loader";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { LogoMarquee } from "@/components/LogoMarquee";
import { About } from "@/components/About";
import { GradeSlider } from "@/components/GradeSlider";
import { Work } from "@/components/Work";
import { Skills } from "@/components/Skills";
import { Timeline } from "@/components/Timeline";
import { Services } from "@/components/Services";
import { Clients } from "@/components/Clients";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Page() {
  return (
    <div id="site" style={{ position: "relative", minHeight: "100vh" }}>
      <Overlays />
      <MagneticInit />
      <Cursor />
      <Loader />
      <Nav />
      <main>
        <Hero />
        <LogoMarquee />
        <About />
        <GradeSlider />
        <Work />
        <Skills />
        <Timeline />
        <Services />
        <Clients />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
