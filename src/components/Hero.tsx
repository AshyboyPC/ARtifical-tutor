import { ArrowRight, BookOpen, GraduationCap, Tag } from 'lucide-react';
import { motion } from 'framer-motion';
import { HeroGeometricBackground } from '@/components/ui/shape-landing-hero';
import { VerticalCutReveal } from '@/components/ui/vertical-cut-reveal';

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-[#0a0a0a] flex items-center justify-center overflow-hidden">
      {/* Geometric background elements */}
      <div className="absolute inset-0 bg-[#0a0a0a]">
        <HeroGeometricBackground />
      </div>
      
      {/* Subtle animated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-500/5 to-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-fade-in-up w-full">
          <div className="w-full flex flex-col items-center text-center py-16 md:py-24 text-white tracking-wide">
            <div className="inline-flex items-center px-4 py-2 bg-[#0a0a0a] rounded-full text-sm font-medium text-blue-400 mb-8 border border-gray-800">
              <BookOpen className="w-4 h-4 mr-2" />
              AI Tutoring Excellence
            </div>
            
            <div className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight w-full">
              <VerticalCutReveal
                staggerFrom="first"
                duration={0.8}
                staggerDuration={0.025}
              >
                {`HI 👋, I'M ASHWINDH`}
              </VerticalCutReveal>
            </div>
            
            <div className="relative w-full">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
                <span className="relative">
                  <VerticalCutReveal
                    staggerFrom="last"
                    reverse={true}
                    duration={0.8}
                    staggerDuration={0.02}
                    delay={0.5}
                    className="bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-500 bg-clip-text text-transparent"
                  >
                    AI & CODING TUTOR
                  </VerticalCutReveal>
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-indigo-600/10 rounded-lg blur-xl -z-10" />
                </span>
              </h2>
            </div>
            
            <div className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto">
              <VerticalCutReveal
                staggerFrom="center"
                duration={0.8}
                staggerDuration={0.015}
                delay={1.1}
              >
                {`Transforming students into future tech leaders`}
              </VerticalCutReveal>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
              className="flex justify-center items-center mb-12"
            >
              <a 
                href="#courses"
                className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg transform hover:scale-105 transition-all duration-300 flex items-center"
              >
                Explore Courses
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          
            {/* Quick stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.8 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto mt-12 w-full"
            >
              <div className="flex flex-col items-center group">
                <div className="w-12 h-12 bg-black/50 border border-gray-800 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-white">3</div>
                <div className="text-sm text-gray-400 text-center">Core AI Courses<br/>Designed by a High School Tutor</div>
              </div>
              
              <div className="flex flex-col items-center group">
                <div className="w-12 h-12 bg-black/50 border border-gray-800 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-white">100%</div>
                <div className="text-sm text-gray-400 text-center">Beginner-Friendly<br/>for Grades 5–9</div>
              </div>
              
              <div className="flex flex-col items-center group">
                <div className="w-12 h-12 bg-black/50 border border-gray-800 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                  <Tag className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-white">$0</div>
                <div className="text-sm text-gray-400 text-center">All Courses Are<br/>Completely Free to Join</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;