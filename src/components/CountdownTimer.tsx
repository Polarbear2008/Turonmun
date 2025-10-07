import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: Date;
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      
      if (difference <= 0) {
        // If the target date has passed
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      
      // Calculate days, hours, minutes and seconds
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      });
    };
    
    // Calculate initial time left
    calculateTimeLeft();
    
    // Update time every second
    const timer = setInterval(calculateTimeLeft, 1000);
    
    // Clean up interval on component unmount
    return () => clearInterval(timer);
  }, [targetDate]);
  
  return (
    <div className="grid grid-cols-4 gap-1 xs:gap-2 sm:gap-4">
      {[
        { value: timeLeft.days, label: 'Days' },
        { value: timeLeft.hours, label: 'Hours' },
        { value: timeLeft.minutes, label: 'Minutes' },
        { value: timeLeft.seconds, label: 'Seconds' }
      ].map((item, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="w-full aspect-square bg-neutral-50 rounded-lg sm:rounded-xl border border-neutral-100 flex items-center justify-center shadow-subtle mb-1 sm:mb-2 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-white to-neutral-50"></div>
            <span className="text-base xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-bold text-diplomatic-600 relative">
              {String(item.value).padStart(2, '0')}
            </span>
          </div>
          <span className="text-[8px] xs:text-[10px] sm:text-xs text-neutral-500 font-medium">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
