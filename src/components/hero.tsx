import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";

const HeroSection = () => {
  return (
    <section className="my-10 mx-2 flex justify-center">
      <div className="flex justify-center items-center relative 2xl:w-[1300px] 2xl:h-[650px] lg:w-[1200px] lg:h-[500px]">
        <Image
          src="/hero-section/hero-img.png"
          alt="hero-img"
          width={1216}
          height={650}
          className="2xl:w-[1300px] 2xl:h-[650px] lg:w-[1200px] lg:h-[500px] dark:brightness-150"
        />
        <div className="absolute lg:-bottom-10 lg:left-20 -bottom-12 left-5 flex items-center flex-col">
          <div className="w-[500px] h-[260px] hidden lg:block bg-white dark:bg-background shadow-bottom rounded-lg ring-1 ring-slate-50 ring-opacity-10 lg:px-8 lg:py-8">
            <Button className="text-xs">Technology</Button>
            <h1 className="text-3xl font-semibold mt-4">
              The Impact of Technology on the Workplace: How Technology is
              Changing
            </h1>
            <div className="mt-4 flex items-center gap-x-4">
              <Image
                src="/hero-section/profile-img.png"
                alt="profile"
                width={36}
                height={36}
                className="w-auto h-auto"
              />
              <p className="text-accent-foreground text-sm font-medium">
                Jason Fransisco
              </p>
              <p className="text-accent-foreground text-sm ">Augest 20, 2022</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
