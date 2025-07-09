"use client";

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

// Lazy load Lottie component
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

// Lightweight resume/data animation JSON
const resumeAnimation = {
  "v": "5.7.4",
  "fr": 30,
  "ip": 0,
  "op": 90,
  "w": 800,
  "h": 600,
  "nm": "Resume Animation",
  "ddd": 0,
  "assets": [],
  "layers": [
    {
      "ddd": 0,
      "ind": 1,
      "ty": 4,
      "nm": "Document",
      "sr": 1,
      "ks": {
        "o": { "a": 0, "k": 100 },
        "r": { "a": 1, "k": [
          { "i": { "x": [0.42], "y": [1] }, "o": { "x": [0.58], "y": [0] }, "t": 0, "s": [0] },
          { "t": 90, "s": [360] }
        ]},
        "p": { "a": 0, "k": [400, 300] },
        "a": { "a": 0, "k": [0, 0] },
        "s": { "a": 1, "k": [
          { "i": { "x": [0.42, 0.42], "y": [1, 1] }, "o": { "x": [0.58, 0.58], "y": [0, 0] }, "t": 0, "s": [0, 0] },
          { "t": 30, "s": [100, 100] }
        ]}
      },
      "ao": 0,
      "shapes": [
        {
          "ty": "gr",
          "it": [
            {
              "ty": "rc",
              "d": 1,
              "s": { "a": 0, "k": [200, 280] },
              "p": { "a": 0, "k": [0, 0] },
              "r": { "a": 0, "k": 12 }
            },
            {
              "ty": "fl",
              "c": { "a": 0, "k": [0.024, 0.663, 0.831, 1] },
              "o": { "a": 0, "k": 80 }
            }
          ]
        }
      ],
      "ip": 0,
      "op": 90,
      "st": 0
    }
  ]
};

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToAnalysis = () => {
    const analysisSection = document.getElementById('analysis');
    analysisSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-4 pt-40 sm:pt-36 lg:pt-32 pb-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-blue-500/10"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Content */}
          <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Title */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-cyan-400 font-medium">
                <Sparkles size={20} />
                <span>Professional CV Solutions</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                CV <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Sahulat</span>
              </h1>
            </div>

            {/* Subheader */}
            <div className="space-y-4 text-lg md:text-xl text-slate-300 leading-relaxed">
              <p>Create and manage your CV effortlessly with our intuitive tools and modern templates.</p>
              <p>CV Sahulat streamlines resume writing with personalized guidance and professional designs.</p>
              <p>Stand out from the competition and take your career to the next level.</p>
              <p className="text-cyan-400 font-medium">Transform your professional story today.</p>
            </div>

            {/* CTA Button - Hidden on mobile, shown on desktop */}
            <div className="pt-4 hidden lg:block">
              <Button 
                onClick={scrollToAnalysis}
                size="lg" 
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-6 text-lg rounded-xl shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105 group"
              >
                Let's Analyze
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>

          {/* Right Side - Lottie Animation */}
          <div className={`flex justify-center lg:justify-end transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="relative">
              {/* Glassmorphism container */}
              <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-8 shadow-2xl border border-white/10">
                <div className="w-80 h-80 md:w-96 md:h-96">
                  <Lottie 
                    animationData={resumeAnimation}
                    loop={true}
                    autoplay={true}
                    className="w-full h-full"
                  />
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-cyan-400 rounded-full blur-sm animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-400 rounded-full blur-sm animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>

        {/* CTA Button - Shown on mobile below the animation */}
        <div className={`pt-8 lg:hidden flex justify-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Button 
            onClick={scrollToAnalysis}
            size="lg" 
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-6 text-lg rounded-xl shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105 group"
          >
            Let's Analyze
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}