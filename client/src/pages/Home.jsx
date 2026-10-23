import Hero from "../components/sections/Hero";
import ServicesList from "../components/sections/ServicesList";
import PortfolioGrid from "../components/sections/PortfolioGrid";
import LeadershipBento from "../components/sections/LeadershipBento";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesList />
      <PortfolioGrid />
      <LeadershipBento />
    </>
  );
}
