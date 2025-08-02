import { Zap, Sparkles } from 'lucide-react';
import { TextArcEffect } from './ui/TextArcEffect';
import { CardBody, CardContainer, CardItem } from './ui/3d-card-effect';
import { NeonGradientCard } from './ui/neon-gradient-card';

const Introduction = () => {
  return (
    <section className="py-20 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Image with Adjusted Text Arc */}
        <div className="relative mb-16 flex justify-center">
          <div className="w-[600px] h-[600px] md:w-[700px] md:h-[700px] mx-auto -mt-28 -mb-12">
            <TextArcEffect 
              className="w-full h-full"
              diameter={600}
              text="• AI TUTOR • MACHINE LEARNING • GENERATIVE AI • NEURAL NETWORKS •"
            >
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-gray-700 shadow-2xl bg-[#0a0a0a] mx-auto">
                <img 
                  src="/WhatsApp Image 2025-07-03 at 17.40.26_c89cf05f.jpg" 
                  alt="Ashwindh" 
                  className="w-full h-full object-cover object-center"
                  style={{
                    objectPosition: '50% 30%',
                    imageRendering: '-webkit-optimize-contrast',
                    backfaceVisibility: 'hidden',
                    transform: 'translateZ(0)',
                    willChange: 'transform'
                  }}
                  loading="eager"
                />
              </div>
            </TextArcEffect>
          </div>
          

        </div>
        
        <div className="grid lg:grid-cols-2 gap-16 items-start mt-10">
          {/* About Me Card with 3D Effect */}
          <CardContainer className="w-full">
            <CardBody className="bg-[#0f0f0f] relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:border-white/[0.2] border-black/[0.1] w-full h-auto rounded-2xl p-8 border border-gray-800">
              <CardItem
                translateZ="50"
                className="text-3xl font-bold text-white mb-6"
              >
                About Me
              </CardItem>
              <CardItem
                as="div"
                translateZ="60"
                className="space-y-4 text-gray-300 leading-relaxed"
              >
                <p>I'm a junior at Campbell High School in the IB program, and I really enjoy learning and building things with Artificial Intelligence. I've taken AP Computer Science and I'm currently part of the Karim Kharbouch Coding Fellowship at The Knowledge House, where I'm learning more about tech and coding.</p>
                
                <p>I started a project called <span className="text-blue-400">SenseMate</span>, a startup where I'm building five different apps to support people with disabilities in each of the five senses. One of these apps is <span className="text-blue-400">Vision AI</span>, which helps people with vision-related challenges. I've also worked on other projects like <span className="text-blue-400">Ecosphere</span> and <span className="text-blue-400">RuralConnect</span>.</p>
                
                <p>I hold certifications from <span className="text-blue-400">Google Cloud</span> in Introduction to Generative AI and Introduction to Large Language Models. I also earned the <span className="text-blue-400">AWS Skill Builder</span> certification for Fundamentals of Machine Learning and Artificial Intelligence.</p>
                
                <p>Right now, I'm starting an <span className="text-blue-400">AI and Machine Learning club</span> at my school to help other students learn how AI works and how it can solve real-life problems.</p>
              </CardItem>
            </CardBody>
          </CardContainer>
          
          {/* Right side - Content */}
          <div className="space-y-8">
            {/* Header Section with Neon Gradient */}
            <div className="w-full flex justify-center">
              <NeonGradientCard 
                className="w-full max-w-2xl p-8 mx-4"
                neonColors={{
                  firstColor: "#00FFF1",
                  secondColor: "#ff00aa"
                }}
                borderSize={2}
                borderRadius={16}
              >
                <div className="text-center w-full">
                  <h2 className="pointer-events-none z-10 whitespace-pre-wrap bg-gradient-to-br from-[#ff2975] from-35% to-[#00FFF1] bg-clip-text text-4xl md:text-5xl font-bold leading-tight tracking-tighter text-transparent dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
                    Hi, I'm Ashwindh
                  </h2>
                  <p className="mt-4 text-xl md:text-2xl font-medium text-gray-200">High School Student Passionate About Teaching AI</p>
                  <p className="mt-4 text-base md:text-lg text-gray-300 leading-relaxed">
                    I created this platform to help students from 5th to 9th grade learn real Artificial Intelligence in a way that is clear, meaningful, and engaging. My goal is to make AI understandable and exciting, not just a set of buzzwords.
                  </p>
                </div>
              </NeonGradientCard>
            </div>
            
            {/* Two-Column Layout for Key Points */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* First Column */}
              <div className="space-y-4">
                <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-800 hover:border-blue-500/30 transition-all duration-300">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-8 h-8 bg-blue-900/30 rounded-lg flex-shrink-0 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-blue-400" />
                    </div>
                    <h3 className="font-semibold text-white text-base">Personalized Learning</h3>
                  </div>
                  <p className="text-gray-400 text-xs leading-tight">
                    Lessons tailored to your pace and interests, whether you're new to AI or looking to deepen your knowledge.
                  </p>
                </div>

                <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-800 hover:border-indigo-500/30 transition-all duration-300">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-8 h-8 bg-indigo-900/30 rounded-lg flex-shrink-0 flex items-center justify-center">
                      <Zap className="w-4 h-4 text-indigo-400" />
                    </div>
                    <h3 className="font-semibold text-white text-base">Real AI Topics</h3>
                  </div>
                  <p className="text-gray-400 text-xs leading-tight">
                    Explore neural networks, generative AI, and machine learning concepts that power today's technology.
                  </p>
                </div>
              </div>

              {/* Second Column */}
              <div className="space-y-4">
                <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-800 hover:border-purple-500/30 transition-all duration-300">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-8 h-8 bg-purple-900/30 rounded-lg flex-shrink-0 flex items-center justify-center">
                      <Zap className="w-4 h-4 text-purple-400" />
                    </div>
                    <h3 className="font-semibold text-white text-base">Interactive Projects</h3>
                  </div>
                  <p className="text-gray-400 text-xs leading-tight">
                    Hands-on learning with coding exercises and AI model experiments to apply your knowledge.
                  </p>
                </div>

                <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-800 hover:border-green-500/30 transition-all duration-300">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-8 h-8 bg-green-900/30 rounded-lg flex-shrink-0 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-400">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                    </div>
                    <h3 className="font-semibold text-white text-base">Clear Teaching</h3>
                  </div>
                  <p className="text-gray-400 text-xs leading-tight">
                    Simple explanations with real-world examples to make complex AI concepts easy to understand.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Introduction;