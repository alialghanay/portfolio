"use client";
import React from "react";
import { SparklesCore } from "../ui/sparkles";
import { TextGenerateEffect } from "../ui/text-generate-effect";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function HeroSection() {
  const words = "Turning Code into Scalable Solutions 🚀";
  return (
    <div className="h-screen relative w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>
      <Avatar>
        <AvatarImage src="/profile.jpg" alt="@alialghanay" />
        <AvatarFallback>wait</AvatarFallback>
      </Avatar>

      <h1 className="md:text-7xl text-3xl lg:text-6xl font-bold text-center text-white relative z-20">
        Ali Alghanay
      </h1>
      <TextGenerateEffect
        words={words}
        className="text-center text-white"
        duration={6}
      />
    </div>
  );
}
