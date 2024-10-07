import Card from "../components/ui/Card";
import CTA from "../components/ui/CTA";
import Features from "../components/ui/Features";
import Hero from "../components/ui/Hero";
import Pricing from "../components/ui/Pricing";
import Testimonial from "../components/ui/Testimonial";

export default function Home() {
  return (
    <>
      <Hero />
      <CTA />
      <Features />
      <Card />
      <Testimonial />
      {/* <Pricing /> */}
    </>
  );
}
