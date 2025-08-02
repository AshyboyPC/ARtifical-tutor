import React from 'react';
import { BookOpen, Users, Trophy, Clock, Code, Brain, Bot, GraduationCap } from 'lucide-react';
import { HighlightsCarousel } from './ui/HighlightsCarousel';
import { ModernAnimatedText } from './ui/modern-animated-text';

const Highlights = () => {
  const highlights = [
    {
      id: 'ai-education',
      icon: Brain,
      title: 'AI Education',
      description: 'Build real knowledge in AI through interactive and beginner-friendly courses designed for students in grades 5–9.',
      color: 'pink' as const
    },
    {
      id: 'ai-python',
      icon: Code,
      title: 'AI Python Programs',
      description: 'Focused courses that teach foundational AI and machine learning using beginner-friendly tools and Python-based projects.',
      color: 'indigo' as const
    },
    {
      id: 'interactive',
      icon: Bot,
      title: 'Interactive Learning',
      description: 'Online projects and tools like Teachable Machine, Scratch for AI, and Google\'s MakerSuite to make learning AI hands-on and engaging.',
      color: 'orange' as const
    },
    {
      id: 'curriculum',
      icon: BookOpen,
      title: 'Comprehensive Curriculum',
      description: 'Covers everything from the basics of AI and generative models to the inner workings of neural networks and model training.',
      color: 'green' as const
    },
    {
      id: 'individual',
      icon: Users,
      title: 'Individualized Attention',
      description: 'Small group classes designed to give each student personal support and space to grow confidently.',
      color: 'pink' as const
    },
    {
      id: 'outcomes',
      icon: Trophy,
      title: 'Meaningful Outcomes',
      description: 'Students complete real projects, gain certifications, and build a strong foundation in AI they can continue developing.',
      color: 'indigo' as const
    },
    {
      id: 'skills',
      icon: GraduationCap,
      title: 'Skill Building',
      description: 'Each course includes structured progression, concept mastery, and guided project creation to help students apply what they learn.',
      color: 'orange' as const
    },
    {
      id: 'scheduling',
      icon: Clock,
      title: 'Flexible Scheduling',
      description: 'Classes are offered after school and on weekends to easily fit into students\' existing commitments.',
      color: 'pink' as const
    }
  ];

  return (
    <section className="py-20 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Why Learn With Us
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Our structured approach ensures students not only learn AI concepts but also apply them through hands-on projects and real-world applications
          </p>
        </div>
        
        <HighlightsCarousel highlights={highlights} />
      </div>
    </section>
  );
};

export default Highlights;