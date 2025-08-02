import React from 'react';
import { ArrowRight, Calendar, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CallToAction = () => {
  const navigate = useNavigate();
  
  const handleButtonClick = (action: string) => {
    switch(action) {
      case 'courses':
        navigate('/#courses');
        break;
      case 'book':
        window.open('https://cal.com/ashwindhuu25/artificial-tutor-meeting?overlayCalendar=true', '_blank');
        break;
      case 'contact':
        window.location.href = 'tel:+14709262583';
        break;
    }
  };
  return (
    <section className="py-20 relative">
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your AI Journey?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Join students worldwide who are mastering AI fundamentals with personalized tutoring from Ashwindh
          </p>
        </div>
        
        <div className="flex justify-center items-center flex-wrap py-10">
          {[
            {
              title: 'Quick Enrollment',
              desc: 'Browse courses and enroll directly online',
              buttonText: 'Explore Courses',
              gradientFrom: '#ffbc00',
              gradientTo: '#ff0058',
              icon: <ArrowRight className="w-8 h-8 text-white" />
            },
            {
              title: 'Free Consultation',
              desc: 'Schedule a 15-minute chat to discuss your goals',
              buttonText: 'Book Call',
              gradientFrom: '#03a9f4',
              gradientTo: '#ff0058',
              icon: <Calendar className="w-8 h-8 text-white" />
            },
            {
              title: 'Ask Questions',
              desc: "Have questions? Let's chat about the best fit",
              buttonText: 'Contact Me',
              gradientFrom: '#4dff03',
              gradientTo: '#00d0ff',
              icon: <MessageCircle className="w-8 h-8 text-white" />
            },
          ].map(({ title, desc, buttonText, gradientFrom, gradientTo, icon }, idx) => (
            <div
              key={idx}
              className="group relative w-[320px] h-[400px] m-[20px] transition-all duration-500"
            >
              {/* Skewed gradient panels */}
              <span
                className="absolute top-0 left-[50px] w-1/2 h-full rounded-lg transform skew-x-[15deg] transition-all duration-500 group-hover:skew-x-0 group-hover:left-[20px] group-hover:w-[calc(100%-90px)]"
                style={{
                  background: `linear-gradient(315deg, ${gradientFrom}, ${gradientTo})`,
                }}
              />
              <span
                className="absolute top-0 left-[50px] w-1/2 h-full rounded-lg transform skew-x-[15deg] blur-[30px] transition-all duration-500 group-hover:skew-x-0 group-hover:left-[20px] group-hover:w-[calc(100%-90px)]"
                style={{
                  background: `linear-gradient(315deg, ${gradientFrom}, ${gradientTo})`,
                }}
              />

              {/* Animated blurs */}
              <span className="pointer-events-none absolute inset-0 z-10">
                <span className="absolute top-0 left-0 w-0 h-0 rounded-lg opacity-0 bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] shadow-[0_5px_15px_rgba(0,0,0,0.08)] transition-all duration-100 animate-blob group-hover:top-[-50px] group-hover:left-[50px] group-hover:w-[100px] group-hover:h-[100px] group-hover:opacity-100" />
                <span className="absolute bottom-0 right-0 w-0 h-0 rounded-lg opacity-0 bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] shadow-[0_5px_15px_rgba(0,0,0,0.08)] transition-all duration-500 animate-blob animation-delay-1000 group-hover:bottom-[-50px] group-hover:right-[50px] group-hover:w-[100px] group-hover:h-[100px] group-hover:opacity-100" />
              </span>

              {/* Content */}
              <div className="relative z-20 left-0 p-[20px_40px] bg-[rgba(255,255,255,0.05)] backdrop-blur-[10px] shadow-lg rounded-lg text-white transition-all duration-500 group-hover:left-[-25px] group-hover:p-[60px_40px] h-full flex flex-col">
                <div className="w-16 h-16 bg-[#0a0a0a] border border-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  {icon}
                </div>
                <h2 className="text-2xl mb-2">{title}</h2>
                <p className="text-lg leading-relaxed mb-6 flex-grow">{desc}</p>
                <button 
                  onClick={() => handleButtonClick(
                    title === 'Quick Enrollment' ? 'courses' : 
                    title === 'Free Consultation' ? 'book' : 'contact'
                  )}
                  className="inline-block text-lg font-bold text-black bg-white px-6 py-3 rounded hover:bg-[#ffcf4d] hover:border hover:border-[rgba(255,0,88,0.4)] hover:shadow-md transition-all duration-300"
                >
                  {buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Contact Info */}
        <div className="text-center mt-12">
          <p className="text-gray-400 text-sm">
            Questions? Email me at{' '}
            <a href="mailto:ashwindh.ramesh2325@gmail.com" className="text-blue-400 font-semibold hover:underline">
              ashwindh.ramesh2325@gmail.com
            </a>
          </p>
        </div>
      </div>
      
      {/* Tailwind custom utilities for animation and shadows */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes blob {
            0%, 100% { transform: translateY(10px); }
            50% { transform: translate(-10px); }
          }
          .animate-blob { animation: blob 2s ease-in-out infinite; }
          .animation-delay-1000 { animation-delay: -1s; }
          .shadow-\[0_5px_15px_rgba\(0\,0\,0\,0\.08\) { box-shadow: 0 5px 15px rgba(0,0,0,0.08); }
        `
      }} />
    </section>
  );
};

export default CallToAction;