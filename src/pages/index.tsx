import Head from "next/head";
import HeroSection from "@/components/organism/HeroSection";
import WhatTheySaid from "@/components/organism/WhatTheySaid";
import ThemeOverview from "@/components/organism/ThemeOverview";
import RoomOverview from "@/components/organism/RoomOverview";
import AboutHome from "@/components/organism/AboutHome";
import Teaser from "@/components/organism/Teaser";
import LetsJoin from "@/components/organism/LetsJoin";
import Sponsor from "@/components/organism/Sponsor";
import Navbar from "@/components/molekul/Navbar";
import Footer from "@/components/molekul/Footer";
export default function Home() {
  return (
    <>
      <Navbar activeLink="Home" />
      <HeroSection />
      <AboutHome />
      <Teaser />
      <LetsJoin />
      <Sponsor />
      <Footer
        data={[
          {
            title: "Quick Link",
            links: [
              { label: "Home", link: "/" },
              { label: "About", link: "/About" },
              { label: "Program", link: "/Program" },
            ],
          },
        ]}
      />
    </>
  );
}
