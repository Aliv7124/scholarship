import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import FeaturedScholarships from "../components/FeaturedScholarships";
import AIMatcher from "../components/AIMatcher";
import FieldsOfStudy from "../components/Fields";
import ClosingSoon from "../components/ClosingSoon";
import ScholarshipLists from "../components/ScholarshipLists";
import Guides from "../components/Guides";
import TrustSection from "../components/TrustSection";
import Footer from "../components/Footer";
const Home = () => {
  return (
    <>
      <Navbar />
       <Hero/>
       <Stats/>
       <FeaturedScholarships/>
        <AIMatcher/>
        <FieldsOfStudy/>
       <ClosingSoon/>
       <ScholarshipLists/>
       <Guides/>
       <TrustSection/>
       <Footer/>
      <main>
        
      </main>
    </>
  );
};

export default Home;