import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Preview from "./components/Preview";
import Features from "./components/Features";
import Commands from "./components/Commands";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Preview />
        <Features />
        <Commands />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
