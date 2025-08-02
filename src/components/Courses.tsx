import React, { useState } from 'react';
import { Cpu, BrainCircuit, Code } from 'lucide-react';
import { AnimatedText } from '@/components/ui/animated-text';
import { ExpandableCard } from '@/components/ui/expandable-card';
import { Calendar } from '@/components/ui/calendar';

export function Courses() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const courses = [
    {
      id: 1,
      title: "Introduction to AI and Generative Tools",
      subtitle: "Explore the world of AI and create with powerful generative tools",
      level: "Beginner",
      ages: "Ages 10–13",
      duration: "4 weeks",
      sessions: "8 sessions",
      features: [
        "What is Artificial Intelligence",
        "Difference between AI and traditional programming",
        "Introduction to generative AI and large language models",
        "How tools like ChatGPT and DALL·E function at a basic level",
        "Using ChatGPT for text generation",
        "Using DALL·E or Google ImageFX for text-to-image",
        "Using Google's AI Studio for code generation",
        "Final Project: Create a short project using any one generative AI tool"
      ],
      tools: ["ChatGPT", "DALL·E", "Google AI Studio"],
      color: "from-blue-500 to-cyan-500",
      icon: <Cpu className="w-6 h-6 text-white" />
    },
    {
      id: 2,
      title: "Neural Networks and Computer Vision",
      subtitle: "Dive into the world of neural networks and image recognition",
      level: "Beginner",
      ages: "Ages 11–14",
      duration: "6 weeks",
      sessions: "12 sessions",
      features: [
        "What is a neural network",
        "How machines learn from data",
        "Basics of image recognition",
        "How classification models work",
        "Training a model using labeled data",
        "Using Teachable Machine to create a working model",
        "Exporting and testing the trained model",
        "Final Project: Train a model and test it on real-time input"
      ],
      tools: ["Google Teachable Machine"],
      color: "from-purple-500 to-pink-500",
      icon: <BrainCircuit className="w-6 h-6" />
    },
    {
      id: 3,
      title: "Build AI Models with Python",
      subtitle: "Learn to create and train your own AI models using Python",
      level: "Beginner",
      ages: "Ages 12–15",
      duration: "8 weeks",
      sessions: "16 sessions",
      features: [
        "Introduction to Python programming",
        "What is machine learning",
        "Understanding datasets",
        "Writing basic code to train a model",
        "Using Google Colab to run code",
        "Evaluating model performance",
        "Improving and re-running models",
        "Final Project: Train and evaluate a model using Python in Colab"
      ],
      tools: ["Google Colab", "Python", "Scikit-learn"],
      color: "from-green-500 to-emerald-500",
      icon: <Code className="w-6 h-6" />
    }
  ];

  const handleToggleCard = (cardId: number) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  return (
    <section className="py-20 bg-[#0a0a0a]" id="courses">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="mb-6">
            <AnimatedText 
              text="AI Courses"
              textClassName="text-4xl font-bold text-white"
              underlineGradient="from-blue-600 to-purple-600"
              underlineHeight="h-1.5"
              underlineOffset="-bottom-2"
            />
          </div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Progressive learning paths that take students from AI curious to AI confident
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <ExpandableCard
              key={course.id}
              title={course.title}
              subtitle={course.subtitle}
              level={course.level}
              ages={course.ages}
              duration={course.duration}
              sessions={course.sessions}
              features={[
                ...course.features,
                "Timing is flexible and will be scheduled based on both student and tutor availability"
              ]}
              tools={course.tools}
              color={course.color}
              icon={course.icon}
              isExpanded={expandedCard === course.id}
              onToggle={() => handleToggleCard(course.id)}
            />
          ))}
        </div>
        
        {/* Private Tutoring Note */}
        <div className="text-center mt-8 mb-16">
          <p className="text-gray-400">
            <span className="font-semibold text-white">Private tutoring available:</span> $25–$40 per hour (pricing may vary based on demand)
          </p>
        </div>
        
        {/* Consultation Section with Calendar */}
        <div className="mt-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">
                Not sure which course is right?
              </h3>
              <p className="text-gray-400">
                Schedule a free 15-minute consultation to discuss your learning goals and find the perfect fit.
              </p>
            </div>
            <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-8">
              <Calendar />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Courses;