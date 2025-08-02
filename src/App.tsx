import { useEffect } from 'react';
import AnimatedGradientBackground from '@/components/ui/animated-gradient-background';
import { ScrollNavigationMenu } from '@/components/ui/scroll-navigation-menu';
import SocialCard from '@/components/ui/SocialCard';
import Hero from './components/Hero';
import Introduction from './components/Introduction';
import CurvedLoop from './components/ui/curved-loop';
import Courses from './components/Courses';
import Highlights from './components/Highlights';
import Testimonials from './components/Testimonials';
import CallToAction from './components/CallToAction';

function App() {
  useEffect(() => {
    // Add smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Add fade-in animation class
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .animate-fade-in-up {
        animation: fadeInUp 0.8s ease-out forwards;
      }
      
      .animate-fade-in {
        animation: fadeIn 1s ease-out forwards;
      }
      
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      .animate-bounce-slow {
        animation: bounce 2s infinite;
      }
      
      .animate-pulse-slow {
        animation: pulse 3s infinite;
      }
      
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
      
      .animate-float {
        animation: float 3s ease-in-out infinite;
      }
      
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
      }
      
      .animate-slide-in-left {
        animation: slideInLeft 0.8s ease-out forwards;
      }
      
      @keyframes slideInLeft {
        from {
          opacity: 0;
          transform: translateX(-50px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      
      .animate-slide-in-right {
        animation: slideInRight 0.8s ease-out forwards;
      }
      
      @keyframes slideInRight {
        from {
          opacity: 0;
          transform: translateX(50px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      
      .animate-scale-in {
        animation: scaleIn 0.5s ease-out forwards;
      }
      
      @keyframes scaleIn {
        from {
          opacity: 0;
          transform: scale(0.9);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }
      
      /* Intersection Observer animations */
      .section-animate {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.8s ease-out;
      }
      
      .section-animate.in-view {
        opacity: 1;
        transform: translateY(0);
      }
    `;
    document.head.appendChild(style);
    
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, observerOptions);
    
    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      section.classList.add('section-animate');
      observer.observe(section);
    });
    
    return () => {
      observer.disconnect();
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <ScrollNavigationMenu />
      <main className="bg-[#0a0a0a]">
        <section id="home" className="min-h-screen pb-20 bg-[#0a0a0a]">
          <Hero />
        </section>
        <section id="about" className="min-h-screen py-16 bg-[#0a0a0a]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
            <Introduction />
          </div>
        </section>
        <section id="marquee" className="py-16 bg-[#0a0a0a] relative overflow-hidden">
          <div className="relative z-10">
            <CurvedLoop 
              marqueeText="✦ LEARN AI FROM A REAL STUDENT ✦ AI CONCEPTS MADE SIMPLE ✦ INTERACTIVE ONLINE PROJECTS ✦ EXPLORE NEURAL NETWORKS & GENAI ✦ PERSONALIZED AI LESSONS FOR GRADES 5–9 ✦ DEEP LEARNING, NOT JUST BUZZWORDS ✦ TAUGHT BY ASHWINDH — HIGH SCHOOL TUTOR FOR AI ✦ BUILD REAL UNDERSTANDING, NOT JUST FUN DEMOS✦"
              speed={3.5}
              curveAmount={200}
              interactive={true}
              className="text-center font-mono tracking-wider"
            />
          </div>
        </section>
        
        <section id="courses" className="min-h-screen py-16 bg-[#0a0a0a]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
            <Courses />
          </div>
        </section>
        <section id="highlights" className="min-h-screen py-16 bg-[#0a0a0a]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
            <Highlights />
          </div>
        </section>
        <section id="testimonials" className="min-h-screen py-16 bg-[#0a0a0a]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
            <Testimonials />
          </div>
        </section>
      </main>
      
      {/* Combined Gradient Background for CTA and Footer */}
      <div className="relative bg-[#0a0a0a]">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0">
          <AnimatedGradientBackground 
            startingGap={150}
            Breathing={true}
            animationSpeed={0.015}
            breathingRange={10}
            topOffset={20}
            containerClassName="opacity-20"
            gradientColors={[
              "#0A0A0A",
              "#2979FF",
              "#FF80AB",
              "#FF6D00",
              "#FFD600",
              "#00E676",
              "#3D5AFE"
            ]}
          />
        </div>
        
        <section id="contact" className="min-h-screen py-16 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
            <CallToAction />
          </div>
        </section>
        
        <footer className="text-white py-12 relative z-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="col-span-2">
                <div className="font-bold text-2xl mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  ARtificialTutor
                </div>
                <p className="text-gray-300 mb-4 max-w-md">
                  Empowering young minds with personalized AI education. 
                  Learn from Ashwindh and master the future of technology.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-gray-300">
                  <li><a href="#home" className="hover:text-blue-400 transition-colors duration-300">Home</a></li>
                  <li><a href="#courses" className="hover:text-blue-400 transition-colors duration-300">Courses</a></li>
                  <li><a href="#about" className="hover:text-blue-400 transition-colors duration-300">About</a></li>
                  <li><a href="#testimonials" className="hover:text-blue-400 transition-colors duration-300">Reviews</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">Connect</h3>
                <div className="flex justify-center md:justify-start">
                  <SocialCard />
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-8 text-center text-gray-300">
              <p>&copy; 2025 ARtificialTutor. All rights reserved. Built with passion for AI education.</p>
            </div>
          </div>
        </footer>
      </div>

    </div>
  );
}

export default App;