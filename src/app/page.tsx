import React from "react";
import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/HeroSlider";
import StatsSection from "@/components/StatsSection";
import ServicesSection from "@/components/ServicesSection";
import PsychologistSection from "@/components/PsychologistSection";
import AppsSection from "@/components/AppsSection";
import GallerySection from "@/components/GallerySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ArticlesSection from "@/components/ArticlesSection";
import LocationMapSection from "@/components/LocationMapSection";
import PopUpBannerModal from "@/components/PopUpBannerModal";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-white">
      {/* Automatic Pop-Up Banner Modal */}
      <PopUpBannerModal />

      {/* Header and Navigation */}
      <Navbar />

      {/* Main Flow Content */}
      <main className="flex-grow">
        {/* Hero Section Carousel */}
        <HeroSlider />

        {/* Verification and Stats Bar */}
        <StatsSection />

        {/* Counseling Services Section */}
        <ServicesSection />

        {/* Psychologist Catalog and Booking */}
        <PsychologistSection />

        {/* Recent Activity Gallery Preview */}
        <GallerySection />

        {/* Sincere Testimonials from Parents */}
        <TestimonialsSection />

        {/* Latest Parenting Articles Preview */}
        <ArticlesSection />

        {/* Google Maps Location Section */}
        <LocationMapSection />

        {/* App promotion and Premium Info */}
        <AppsSection />
      </main>

      {/* Footer Navigation */}
      <Footer />
    </div>
  );
}
