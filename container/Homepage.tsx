import React from "react";
import { HeroCarousel } from "@/components/hero-carousel";
import { BlogFeed } from "@/components/blog-feed";
import {Sidebar} from "@/components/sidebar";

const Homepage = () => {
  return (
    <div className="container min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <HeroCarousel />

      <div className="min-h-screen bg-white px-[3rem]  ">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 py-12 pl-[7rem] pr-[3rem]">
              <BlogFeed />
            </div>
            <div className="lg:col-span-1 ">
              <Sidebar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
