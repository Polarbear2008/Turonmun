import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, ChevronDown, ChevronUp, Filter } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { cn } from '@/lib/utils';

// Define the types for our schedule data
interface ScheduleEvent {
  time: string;
  title: string;
  location?: string;
  description?: string;
  speakers?: string[];
  category?: 'general' | 'committee' | 'social' | 'workshop';
}

interface ScheduleDay {
  day: string;
  date: string;
  events: ScheduleEvent[];
}

// Sample schedule data
const scheduleData: ScheduleDay[] = [
  {
    day: 'Day 1',
    date: 'July 18, 2025',
    events: [
      { 
        time: '08:00 - 09:30', 
        title: 'Registration & Welcome Coffee', 
        location: 'Main Hall',
        category: 'general',
        description: 'Check in, receive your conference materials, and enjoy refreshments while networking with other delegates.'
      },
      { 
        time: '10:00 - 11:30', 
        title: 'Opening Ceremony', 
        location: 'Grand Auditorium',
        category: 'general',
        description: 'Official opening of turonmun 2025 with keynote speeches from distinguished guests and organizing committee.'
      },
      { 
        time: '12:00 - 13:30', 
        title: 'Lunch Break', 
        location: 'Dining Hall',
        category: 'social',
        description: 'Network with other delegates over a catered lunch featuring international cuisine.'
      },
      { 
        time: '14:00 - 17:00', 
        title: 'First Committee Session', 
        location: 'Committee Rooms',
        category: 'committee',
        description: 'Initial committee sessions begin with introductions, agenda setting, and preliminary discussions on topics.'
      },
      { 
        time: '17:30 - 19:00', 
        title: 'Networking Reception', 
        location: 'Terrace Garden',
        category: 'social',
        description: 'Informal networking reception with light refreshments and international cultural performances.'
      }
    ]
  },
  {
    day: 'Day 2',
    date: 'April 3, 2025',
    events: [
      { 
        time: '09:00 - 12:00', 
        title: 'Second Committee Session', 
        location: 'Committee Rooms',
        category: 'committee',
        description: 'Continued committee work including formal and informal debate, draft resolution development.'
      },
      { 
        time: '12:00 - 13:30', 
        title: 'Lunch Break', 
        location: 'Dining Hall',
        category: 'social',
        description: 'Delegates lunch with thematic discussion tables organized by global regions.'
      },
      { 
        time: '14:00 - 17:00', 
        title: 'Third Committee Session', 
        location: 'Committee Rooms',
        category: 'committee',
        description: 'Advanced committee work with moderated and unmoderated caucuses, working paper refinement.'
      },
      { 
        time: '19:00 - 22:00', 
        title: 'Diplomatic Dinner', 
        location: 'Grand Ballroom',
        category: 'social',
        description: 'Formal dinner with diplomatic protocol, cultural performances, and keynote address by distinguished diplomat.'
      }
    ]
  },
  {
    day: 'Day 3',
    date: 'April 4, 2025',
    events: [
      { 
        time: '09:00 - 12:00', 
        title: 'Fourth Committee Session', 
        location: 'Committee Rooms',
        category: 'committee',
        description: 'Final committee sessions focusing on resolution drafting and amendments.'
      },
      { 
        time: '12:00 - 13:30', 
        title: 'Lunch Break', 
        location: 'Dining Hall',
        category: 'social'
      },
      { 
        time: '14:00 - 16:00', 
        title: 'Resolution Voting Procedures', 
        location: 'Committee Rooms',
        category: 'committee',
        description: 'Formal voting procedures on draft resolutions and amendments.'
      },
      { 
        time: '16:30 - 18:30', 
        title: 'Closing Ceremony', 
        location: 'Grand Auditorium',
        category: 'general',
        description: 'Official closing of turonmun 2025 with awards presentation, closing speeches, and recognition of participants.'
      },
      { 
        time: '19:00 - 23:00', 
        title: 'Farewell Celebration', 
        location: 'Skyline Terrace',
        category: 'social',
        description: 'Casual celebration with music, refreshments, and opportunities to exchange contact information with fellow delegates.'
      }
    ]
  }
];

// Category colors and icons mapping
const categoryConfig: Record<string, { color: string; background: string; }> = {
  general: { color: 'bg-blue-500', background: 'bg-blue-50' },
  committee: { color: 'bg-diplomatic-600', background: 'bg-diplomatic-50' },
  social: { color: 'bg-gold-500', background: 'bg-gold-50' },
  workshop: { color: 'bg-green-500', background: 'bg-green-50' }
};

const Schedule = () => {
  const [expandedDay, setExpandedDay] = useState<number | null>(null);
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);
  const [filter, setFilter] = useState<string | null>(null);
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleDay = (index: number) => {
    setExpandedDay(expandedDay === index ? null : index);
  };

  const toggleEvent = (eventId: string) => {
    setExpandedEvent(expandedEvent === eventId ? null : eventId);
  };
  
  const filterEvents = (category: string | null) => {
    setFilter(filter === category ? null : category);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="page-transition-container min-h-screen flex flex-col bg-diplomatic-800 overflow-hidden">
      <Navbar />
      <main className="flex-grow pt-20">
        {/* Hero section */}
        <div className="relative bg-gradient-to-b from-diplomatic-700 to-diplomatic-800 text-white py-20">
          <div className="absolute inset-0 bg-hero-pattern opacity-10"></div>
          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration:.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Conference Schedule</h1>
              <p className="text-xl text-diplomatic-100 max-w-2xl">
                Plan your turonmun experience with our comprehensive schedule of committee sessions, 
                workshops, and social events from April 2-4, 2025.
              </p>
            </motion.div>
          </div>
          
          {/* Decorative wave */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
              <path d="M0 0L48 8.875C96 17.75 192 35.5 288 44.375C384 53.25 480 53.25 576 44.375C672 35.5 768 17.75 864 26.625C960 35.5 1056 71 1152 80C1248 89 1344 71 1392 62.125L1440 53.25V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V0Z" fill="white"/>
            </svg>
          </div>
        </div>
        
        {/* Filtering options */}
        <div className="bg-white py-8 border-b border-neutral-100">
          <div className="container">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center">
                <Filter size={18} className="text-diplomatic-500 mr-2" />
                <span className="text-sm font-medium text-neutral-700">Filter by:</span>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => filterEvents('general')}
                  className={cn(
                    "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors",
                    filter === 'general' 
                      ? "bg-blue-500 text-white" 
                      : "bg-blue-50 text-blue-700 hover:bg-blue-100"
                  )}
                >
                  General Sessions
                </button>
                <button 
                  onClick={() => filterEvents('committee')}
                  className={cn(
                    "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors",
                    filter === 'committee' 
                      ? "bg-diplomatic-600 text-white" 
                      : "bg-diplomatic-50 text-diplomatic-700 hover:bg-diplomatic-100"
                  )}
                >
                  Committee Work
                </button>
                <button 
                  onClick={() => filterEvents('social')}
                  className={cn(
                    "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors",
                    filter === 'social' 
                      ? "bg-gold-500 text-white" 
                      : "bg-gold-50 text-gold-700 hover:bg-gold-100"
                  )}
                >
                  Social Events
                </button>
                <button 
                  onClick={() => filterEvents('workshop')}
                  className={cn(
                    "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors",
                    filter === 'workshop' 
                      ? "bg-green-500 text-white" 
                      : "bg-green-50 text-green-700 hover:bg-green-100"
                  )}
                >
                  Workshops
                </button>
                {filter && (
                  <button 
                    onClick={() => setFilter(null)}
                    className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition-colors"
                  >
                    Clear Filter
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Schedule content */}
        <section className="py-16 bg-neutral-50">
          <div className="container">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="max-w-4xl mx-auto"
            >
              {scheduleData.map((day, dayIndex) => (
                <motion.div 
                  key={dayIndex}
                  variants={itemVariants}
                  className="mb-10"
                >
                  <div 
                    className={cn(
                      "bg-white rounded-xl shadow-subtle border border-neutral-100 overflow-hidden transition-all duration-300",
                      expandedDay === dayIndex ? "ring-2 ring-diplomatic-300 ring-opacity-50" : ""
                    )}
                  >
                    {/* Day header */}
                    <div 
                      className="p-6 flex justify-between items-center cursor-pointer hover:bg-neutral-50 transition-colors"
                      onClick={() => toggleDay(dayIndex)}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 rounded-xl bg-diplomatic-600 text-white flex flex-col items-center justify-center flex-shrink-0">
                          <span className="text-xs font-medium">DAY</span>
                          <span className="text-xl font-bold">{dayIndex + 1}</span>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-diplomatic-900">{day.day}</h3>
                          <div className="flex items-center text-neutral-500 text-sm mt-1">
                            <Calendar size={14} className="mr-1" />
                            {day.date}
                          </div>
                        </div>
                      </div>
                      <div className="text-diplomatic-500">
                        {expandedDay === dayIndex ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                      </div>
                    </div>
                    
                    {/* Day events */}
                    {expandedDay === dayIndex && (
                      <div className="px-6 pb-6">
                        <div className="border-t border-neutral-100 pt-4 mt-2">
                          {day.events
                            .filter(event => !filter || event.category === filter)
                            .map((event, eventIndex) => {
                              const eventId = `${dayIndex}-${eventIndex}`;
                              return (
                                <div 
                                  key={eventIndex}
                                  className={cn(
                                    "mb-4 last:mb-0 rounded-lg border border-neutral-100 overflow-hidden transition-all duration-300",
                                    expandedEvent === eventId ? "shadow-md" : "shadow-sm"
                                  )}
                                >
                                  <div 
                                    className={cn(
                                      "px-4 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 cursor-pointer hover:bg-neutral-50 transition-colors",
                                      event.category ? `hover:${categoryConfig[event.category].background}` : ""
                                    )}
                                    onClick={() => toggleEvent(eventId)}
                                  >
                                    <div className="flex items-start gap-3">
                                      {/* Time */}
                                      <div className="flex items-center gap-1 text-sm text-neutral-500 min-w-[120px]">
                                        <Clock size={14} className="flex-shrink-0" />
                                        <span>{event.time}</span>
                                      </div>
                                      
                                      {/* Title and location */}
                                      <div>
                                        <h4 className="text-base font-semibold">{event.title}</h4>
                                        {event.location && (
                                          <div className="flex items-center text-sm text-neutral-500 mt-1">
                                            <MapPin size={14} className="mr-1" />
                                            {event.location}
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                    
                                    {/* Category tag */}
                                    {event.category && (
                                      <div className="sm:flex items-center gap-2">
                                        <span className={cn(
                                          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                                          categoryConfig[event.category].background,
                                          `text-${event.category === 'general' ? 'blue' : event.category === 'committee' ? 'diplomatic' : event.category === 'social' ? 'gold' : 'green'}-700`
                                        )}>
                                          {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                                        </span>
                                        <div className="hidden sm:block text-diplomatic-500 ml-2">
                                          {expandedEvent === eventId ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                  
                                  {/* Event details */}
                                  {expandedEvent === eventId && event.description && (
                                    <div className={cn(
                                      "px-4 py-4 border-t border-neutral-100",
                                      event.category ? `bg-${categoryConfig[event.category].background}` : "bg-neutral-50"
                                    )}>
                                      <p className="text-sm text-neutral-600">{event.description}</p>
                                      
                                      {event.speakers && event.speakers.length > 0 && (
                                        <div className="mt-3">
                                          <h5 className="text-xs font-semibold text-neutral-500 uppercase mb-2">Featured Speakers</h5>
                                          <div className="flex flex-wrap gap-2">
                                            {event.speakers.map((speaker, speakerIndex) => (
                                              <span 
                                                key={speakerIndex}
                                                className="inline-flex items-center rounded-full bg-white px-2.5 py-0.5 text-xs font-medium shadow-sm border border-neutral-200"
                                              >
                                                {speaker}
                                              </span>
                                            ))}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                            
                          {day.events.filter(event => !filter || event.category === filter).length === 0 && (
                            <div className="text-center py-8">
                              <p className="text-neutral-500">No events match the selected filter. <button onClick={() => setFilter(null)} className="text-diplomatic-600 hover:underline">View all events</button></p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Print and download options */}
            <div className="flex justify-center mt-12">
              <button className="btn-secondary mx-2">
                Download PDF Schedule
              </button>
              <button className="btn-outline mx-2">
                Add to Calendar
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Schedule;
