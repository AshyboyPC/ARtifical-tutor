"use client";

import React from "react";
import { CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent } from "./card";

interface ExpandableCardProps {
  title: string;
  subtitle: string;
  level: string;
  ages: string;
  duration: string;
  sessions: string;
  features: string[];
  tools: string[];
  color: string;
  icon: React.ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
}

const colorMap: { [key: string]: { bg: string; text: string; hover: string; border: string } } = {
  'blue': {
    bg: 'bg-blue-600',
    text: 'text-blue-100',
    hover: 'hover:bg-blue-700',
    border: 'border-blue-500'
  },
  'purple': {
    bg: 'bg-purple-600',
    text: 'text-purple-100',
    hover: 'hover:bg-purple-700',
    border: 'border-purple-500'
  },
  'green': {
    bg: 'bg-green-600',
    text: 'text-green-100',
    hover: 'hover:bg-green-700',
    border: 'border-green-500'
  },
  'pink': {
    bg: 'bg-pink-600',
    text: 'text-pink-100',
    hover: 'hover:bg-pink-700',
    border: 'border-pink-500'
  },
  'cyan': {
    bg: 'bg-cyan-600',
    text: 'text-cyan-100',
    hover: 'hover:bg-cyan-700',
    border: 'border-cyan-500'
  },
  'emerald': {
    bg: 'bg-emerald-600',
    text: 'text-emerald-100',
    hover: 'hover:bg-emerald-700',
    border: 'border-emerald-500'
  }
};

export function ExpandableCard({
  title,
  subtitle,
  level,
  ages,
  duration,
  sessions,
  features,
  tools,
  color,
  icon,
  isExpanded,
  onToggle,
}: ExpandableCardProps) {
  
  // Extract the first color from the gradient
  const gradientColors = color.split(' ');
  const firstColor = gradientColors[0];
  const colorKey = firstColor.includes('blue') ? 'blue' : 
                  firstColor.includes('purple') ? 'purple' :
                  firstColor.includes('green') ? 'green' :
                  firstColor.includes('pink') ? 'pink' :
                  firstColor.includes('cyan') ? 'cyan' :
                  firstColor.includes('emerald') ? 'emerald' : 'blue';
  
  const colors = colorMap[colorKey] || colorMap['blue'];
  

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle();
  };

  // Dynamic class names
  const buttonClass = isExpanded 
    ? `${colors.bg} text-white ${colors.hover}`
    : `text-white bg-transparent border border-gray-700 hover:bg-gray-800`;

  const iconClass = `${colors.text.replace('100', '600')}`;
  const checkClass = colors.text.replace('100', '500');
  const borderClass = colors.border;

  // CSS classes for the content container
  const contentClasses = `transition-all duration-300 ease-in-out overflow-hidden ${
    isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
  }`;

  return (
    <Card className="w-full overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className={`h-2 bg-gradient-to-r ${color}`}></div>
      
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div className={`p-3 rounded-lg ${iconClass}`}>
              {icon}
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{title}</h3>
              <p className="text-gray-400 mt-1">{subtitle}</p>
              
              <div className="flex items-center mt-3 space-x-3 text-sm text-gray-400">
                <span>{duration}</span>
                <span>•</span>
                <span>{sessions}</span>
                <span>•</span>
                <span>{ages}</span>
              </div>
              
              <div className="mt-3">
                <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-gray-900 text-gray-300">
                  {level}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className={contentClasses}>
          <div className="pt-6">
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-300 mb-3">What you'll learn:</h4>
                <ul className="space-y-2">
                  {features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle2 className={`w-4 h-4 mt-0.5 mr-2 flex-shrink-0 ${checkClass}`} />
                      <span className="text-sm text-gray-400">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-300 mb-2">Tools you'll use:</h4>
                <div className="flex flex-wrap gap-2">
                  {tools.map((tool, idx) => (
                    <span 
                      key={idx} 
                      className={`text-xs px-3 py-1 bg-gray-900 text-gray-300 rounded-full border ${borderClass} border-opacity-30`}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={toggleExpand}
          className={`mt-6 w-full py-2 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2 focus:outline-none focus:ring-0 ${buttonClass}`}
        >
          {isExpanded ? (
            <>
              <span>Show Less</span>
              <ChevronUp className="w-4 h-4" />
            </>
          ) : (
            <>
              <span>Learn More</span>
              <ChevronDown className="w-4 h-4" />
            </>
          )}
        </button>
      </CardContent>
    </Card>
  );
}
