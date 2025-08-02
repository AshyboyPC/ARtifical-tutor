import React, { useState, useEffect } from 'react';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { BlurredStagger } from '@/components/ui/blurred-stagger-text';

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Parent of 7th grader',
      content: 'Ashwindh has transformed how my daughter thinks about technology. She went from being intimidated by AI to building her own chatbot in just 8 weeks!',
      rating: 5,
      avatar: 'SC'
    },
    {
      name: 'Michael Rodriguez',
      role: 'Student, Grade 8',
      content: 'I used to think AI was just magic, but now I understand how neural networks actually work. The hands-on projects made everything click for me.',
      rating: 5,
      avatar: 'MR'
    },
    {
      name: 'Jennifer Kim',
      role: 'Parent of 6th grader',
      content: 'The personalized approach is incredible. Ashwindh adapted the lessons perfectly for my son\'s learning style. Best investment we\'ve made in his education.',
      rating: 5,
      avatar: 'JK'
    },
    {
      name: 'Alex Johnson',
      role: 'Student, Grade 9',
      content: 'Thanks to these courses, I\'m already thinking about my future in AI. The practical skills I learned here give me confidence for high school and beyond.',
      rating: 5,
      avatar: 'AJ'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-[#0a0a0a] text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500/5 rounded-full blur-2xl"></div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#0a0a0a] border border-gray-800 rounded-full mb-6">
            <Quote className="w-8 h-8 text-blue-400" />
          </div>
          
          <BlurredStagger 
            text="What Students & Parents Say"
            className="text-4xl font-bold mb-6"
          />
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Real feedback from families who've experienced the ARtificialTutor difference
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Main testimonial */}
          <div className="bg-[#0a0a0a] border border-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="flex flex-col items-center text-center">
              {/* Stars */}
              <div className="flex space-x-1 mb-6">
                {[...Array(testimonials[currentSlide].rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              {/* Quote */}
              <blockquote className="text-xl md:text-2xl leading-relaxed mb-8 italic">
                "{testimonials[currentSlide].content}"
              </blockquote>
              
              {/* Author */}
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-[#0a0a0a] border border-gray-800 rounded-full flex items-center justify-center font-bold text-xl text-blue-400">
                  {testimonials[currentSlide].avatar}
                </div>
                <div className="text-left">
                  <div className="font-semibold text-lg">{testimonials[currentSlide].name}</div>
                  <div className="text-gray-400">{testimonials[currentSlide].role}</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Navigation */}
          <div className="flex justify-center items-center mt-8 space-x-6">
            <button 
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-[#0a0a0a] border border-gray-800 hover:border-blue-500 p-3 rounded-full transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-[#0a0a0a] border border-gray-800 hover:border-blue-500 p-3 rounded-full transition-all duration-300"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
            {/* Dots */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide ? 'bg-white' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>
            
            <button 
              onClick={nextSlide}
              className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-300"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        {/* Bottom stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-center">
          <div>
            <div className="text-3xl font-bold mb-2">95%</div>
            <div className="text-blue-200">Student Satisfaction</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">50+</div>
            <div className="text-blue-200">Happy Families</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">100%</div>
            <div className="text-blue-200">Personalized Approach</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;