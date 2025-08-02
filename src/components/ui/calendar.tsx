"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const CalendarDay: React.FC<{ day: number | string; isHeader?: boolean }> = ({
  day,
  isHeader,
}) => {
  const randomBgWhite =
    !isHeader && Math.random() < 0.3
      ? "bg-indigo-500 text-white "
      : "text-gray-400";

  return (
    <div
      className={`col-span-1 row-span-1 flex h-8 w-8 items-center justify-center ${
        isHeader ? "" : "rounded-xl"
      } ${randomBgWhite}`}
    >
      <span className={`font-medium ${isHeader ? "text-xs" : "text-sm"}`}>
        {day}
      </span>
    </div>
  );
};

export function Calendar() {
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString("default", { month: "long" });
  const currentYear = currentDate.getFullYear();
  const firstDayOfMonth = new Date(currentYear, currentDate.getMonth(), 1);
  const firstDayOfWeek = firstDayOfMonth.getDay();
  const daysInMonth = new Date(
    currentYear,
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const bookingLink = `https://cal.com/ashwindhuu25/artificial-tutor-meeting?overlayCalendar=true`;

  const renderCalendarDays = () => {
    let days: React.ReactNode[] = [];
    
    // Add day headers
    dayNames.forEach((day, i) => {
      days.push(<CalendarDay key={`header-${day}`} day={day} isHeader />);
    });
    
    // Add empty cells for days before the first of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(<div key={`empty-start-${i}`} className="col-span-1 row-span-1 h-8 w-8" />);
    }
    
    // Add the days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(<CalendarDay key={`date-${i}`} day={i} />);
    }

    return days;
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="rounded-2xl border border-gray-800 p-6 bg-[#0a0a0a] shadow-lg">
        <div className="mb-6 text-center">
          <h3 className="text-2xl font-bold text-white mb-2">Schedule a Free Consultation</h3>
          <p className="text-gray-400">
            Pick a time that works for you
          </p>
        </div>
        
        <div className="mb-6">
          <div className="rounded-xl border border-gray-800 p-3 bg-[#0a0a0a]">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-white">
                {currentMonth}, {currentYear}
              </p>
              <p className="text-xs text-gray-400">30 min call</p>
            </div>
            <div className="grid grid-cols-7 gap-1 px-2">
              {renderCalendarDays()}
            </div>
          </div>
        </div>
        
        <a 
          href={bookingLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block w-full"
        >
          <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
            Book Free Consultation
          </Button>
        </a>
      </div>
    </div>
  );
}
