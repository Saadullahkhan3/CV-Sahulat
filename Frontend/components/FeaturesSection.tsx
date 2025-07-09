"use client";

import { useState, useEffect } from 'react';
import { 
  FileText, 
  Scan, 
  Target, 
  Zap, 
  CheckCircle, 
  ArrowRight,
  Eye,
  Brain,
  Sparkles,
  Clock,
  Shield,
  TrendingUp
} from 'lucide-react';

export default function FeaturesSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('features');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const scrollToAnalysis = () => {
    const analysisSection = document.getElementById('analysis');
    analysisSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="features" className="py-20 px-4 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-800/30 to-transparent"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-12 sm:mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Powerful <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Features</span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto px-4">
            Advanced AI-powered tools to analyze, optimize, and match your CV with job requirements
          </p>
        </div>

        {/* Bento Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-7xl mx-auto transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* OCR Feature - Large Card */}
          <div className="lg:col-span-2 lg:row-span-2 backdrop-blur-xl bg-white/5 rounded-3xl p-6 sm:p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Scan className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-1 sm:mb-2">Advanced OCR Technology</h3>
                  <p className="text-cyan-400 font-medium text-sm sm:text-base">Extract text from any document format</p>
                </div>
              </div>

              <p className="text-slate-300 text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 leading-relaxed">
                Our cutting-edge Optical Character Recognition technology can read and extract text from PDFs, images, and scanned documents with 99.9% accuracy. Upload your CV in any format and let our AI do the rest.
              </p>

              <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                  <span className="text-slate-300 text-sm sm:text-base">PDF Support</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                  <span className="text-slate-300 text-sm sm:text-base">Image Recognition</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                  <span className="text-slate-300 text-sm sm:text-base">Multi-language</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                  <span className="text-slate-300 text-sm sm:text-base">99.9% Accuracy</span>
                </div>
              </div>

              {/* Demo Preview */}
              <div className="bg-white/5 rounded-xl p-3 sm:p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-3">
                  <Eye className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400" />
                  <span className="text-xs sm:text-sm text-cyan-400 font-medium">Live Preview</span>
                </div>
                <div className="space-y-2">
                  <div className="h-2 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full"></div>
                  <div className="h-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full w-4/5"></div>
                  <div className="h-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full w-3/5"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Matching Algorithm */}
          <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-4 sm:p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-xl"></div>
            
            <div className="relative z-10">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                <Target className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">Smart Matching</h3>
              <p className="text-slate-300 text-xs sm:text-sm mb-3 sm:mb-4">
                AI-powered algorithm that matches your skills with job requirements and provides actionable insights.
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-xl sm:text-2xl font-bold text-purple-400">95%</span>
                <span className="text-xs sm:text-sm text-slate-400">Match Rate</span>
              </div>
            </div>
          </div>

          {/* Speed */}
          <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-4 sm:p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full blur-xl"></div>
            
            <div className="relative z-10">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">Lightning Fast</h3>
              <p className="text-slate-300 text-xs sm:text-sm mb-3 sm:mb-4">
                Get your CV analyzed in seconds, not minutes. Our optimized processing ensures quick results.
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-xl sm:text-2xl font-bold text-green-400">5s</span>
                <span className="text-xs sm:text-sm text-slate-400">Processing Time</span>
              </div>
            </div>
          </div>

          {/* AI Analysis */}
          <div className="lg:col-span-2 backdrop-blur-xl bg-white/5 rounded-3xl p-4 sm:p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Brain className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-1">AI-Powered Analysis</h3>
                  <p className="text-orange-400 font-medium text-sm sm:text-base">Deep insights and recommendations</p>
                </div>
              </div>

              <p className="text-slate-300 mb-3 sm:mb-4 text-sm sm:text-base">
                Our advanced AI analyzes your CV against job descriptions, identifying gaps, strengths, and providing personalized recommendations to improve your chances.
              </p>

              <div className="grid grid-cols-3 gap-2 sm:gap-4">
                <div className="text-center">
                  <div className="text-sm sm:text-lg font-bold text-orange-400">Skills</div>
                  <div className="text-xs sm:text-sm text-slate-400">Gap Analysis</div>
                </div>
                <div className="text-center">
                  <div className="text-sm sm:text-lg font-bold text-orange-400">Keywords</div>
                  <div className="text-xs sm:text-sm text-slate-400">Optimization</div>
                </div>
                <div className="text-center">
                  <div className="text-sm sm:text-lg font-bold text-orange-400">Format</div>
                  <div className="text-xs sm:text-sm text-slate-400">Suggestions</div>
                </div>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-4 sm:p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-full blur-xl"></div>
            
            <div className="relative z-10">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">Secure & Private</h3>
              <p className="text-slate-300 text-xs sm:text-sm mb-3 sm:mb-4">
                Your documents are processed securely and never stored. Complete privacy guaranteed.
              </p>
              
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                <span className="text-xs sm:text-sm text-slate-400">End-to-end encrypted</span>
              </div>
            </div>
          </div>

          {/* Real-time Processing */}
          <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-4 sm:p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-cyan-500/20 to-teal-500/20 rounded-full blur-xl"></div>
            
            <div className="relative z-10">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">Real-time</h3>
              <p className="text-slate-300 text-xs sm:text-sm mb-3 sm:mb-4">
                Watch your CV being analyzed in real-time with live progress indicators and instant feedback.
              </p>
              
              <div className="w-full bg-white/10 rounded-full h-2">
                <div className="bg-gradient-to-r from-cyan-500 to-teal-500 h-2 rounded-full w-3/4"></div>
              </div>
            </div>
          </div>

          {/* Success Rate */}
          <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-4 sm:p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-full blur-xl"></div>
            
            <div className="relative z-10">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">Proven Results</h3>
              <p className="text-slate-300 text-xs sm:text-sm mb-3 sm:mb-4">
                Users see 3x higher interview rates after optimizing their CVs with our recommendations.
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-xl sm:text-2xl font-bold text-emerald-400">3x</span>
                <span className="text-xs sm:text-sm text-slate-400">Interview Rate</span>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className={`text-center mt-12 sm:mt-16 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-6 sm:p-8 border border-white/10 max-w-2xl mx-auto relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
                <h3 className="text-xl sm:text-2xl font-bold text-white">Ready to Get Started?</h3>
              </div>
              
              <p className="text-slate-300 mb-4 sm:mb-6 text-sm sm:text-base">
                Experience the power of AI-driven CV analysis. Upload your resume and job description to see the magic happen.
              </p>
              
              <button
                onClick={scrollToAnalysis}
                className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105 group inline-flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <span className="font-semibold">Try CV Analysis Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}