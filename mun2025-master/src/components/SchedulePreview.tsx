
import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ScheduleItem {
  day: string;
  date: string;
  events: {
    time: string;
    title: string;
    location?: string;
  }[];
}

const scheduleData: ScheduleItem[] = [
  {
    day: 'Day 1',
    date: 'Friday, November 10',
    events: [
      { time: '08:00 - 09:30', title: 'Registration', location: 'Main Hall' },
      { time: '10:00 - 11:30', title: 'Opening Ceremony', location: 'Auditorium' },
      { time: '12:00 - 13:30', title: 'Lunch Break' },
      { time: '14:00 - 17:00', title: 'First Committee Session', location: 'Committee Rooms' }
    ]
  },
  {
    day: 'Day 2',
    date: 'Saturday, November 11',
    events: [
      { time: '09:00 - 12:00', title: 'Second Committee Session', location: 'Committee Rooms' },
      { time: '12:00 - 13:30', title: 'Lunch Break' },
      { time: '14:00 - 17:00', title: 'Third Committee Session', location: 'Committee Rooms' },
      { time: '19:00 - 22:00', title: 'Diplomatic Dinner', location: 'Grand Ballroom' }
    ]
  }
];

export default function SchedulePreview() {
  return (
    <section className="section bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <span className="chip mb-2">Event Schedule</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Conference Agenda</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Here's a preview of our event schedule. For the complete agenda and details, please visit the Schedule page.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {scheduleData.map((day, dayIndex) => (
            <div 
              key={dayIndex}
              className="mb-8 animate-fade-in opacity-0" 
              style={{ animationDelay: `${0.2 * dayIndex}s`, animationFillMode: 'forwards' }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-diplomatic-50 rounded-md text-diplomatic-600">
                  <Calendar size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-xl">{day.day}</h3>
                  <p className="text-neutral-500 text-sm">{day.date}</p>
                </div>
              </div>
              
              <div className="border-l-2 border-diplomatic-100 pl-6 ml-3 space-y-6">
                {day.events.map((event, eventIndex) => (
                  <div 
                    key={eventIndex} 
                    className="relative before:content-[''] before:absolute before:w-3 before:h-3 before:bg-diplomatic-500 before:rounded-full before:-left-[32px] before:top-2"
                  >
                    <div className="flex items-start gap-2 mb-1">
                      <Clock size={16} className="text-neutral-400 mt-1 flex-shrink-0" />
                      <p className="text-neutral-500 text-sm">{event.time}</p>
                    </div>
                    <h4 className="text-lg font-medium mb-1">{event.title}</h4>
                    {event.location && (
                      <p className="text-neutral-600 text-sm">{event.location}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          <div className="text-center mt-8">
            <Link to="/schedule" className="btn-secondary">
              View Full Schedule
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
