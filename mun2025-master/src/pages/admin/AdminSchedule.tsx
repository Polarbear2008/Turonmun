import React, { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { PlusCircle, Edit, Trash2, Clock, ChevronRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ScheduleDay {
  id: string;
  day: string;
  date: string;
  events: ScheduleEvent[];
}

interface ScheduleEvent {
  id: string;
  schedule_id: string;
  time: string;
  title: string;
  location: string;
}

const AdminSchedule = () => {
  const [scheduleDays, setScheduleDays] = useState<ScheduleDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingDay, setEditingDay] = useState<ScheduleDay | null>(null);
  const [editingEvent, setEditingEvent] = useState<ScheduleEvent | null>(null);
  const [isSubmittingDay, setIsSubmittingDay] = useState(false);
  const [isSubmittingEvent, setIsSubmittingEvent] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchSchedule();
  }, []);

  const fetchSchedule = async () => {
    try {
      setLoading(true);
      
      // Fetch schedule days
      const { data: days, error: daysError } = await supabase
        .from('schedule_events')
        .select('*')
        .order('date');
        
      if (daysError) throw daysError;
      
      // Fetch all events
      const { data: events, error: eventsError } = await supabase
        .from('events')
        .select('*')
        .order('time');
        
      if (eventsError) throw eventsError;
      
      // Combine the data
      const scheduleWithEvents = days.map((day: any) => ({
        ...day,
        events: events.filter((event: any) => event.schedule_id === day.id)
      }));
      
      setScheduleDays(scheduleWithEvents);
    } catch (error) {
      console.error('Error fetching schedule:', error);
      toast({
        title: "Error",
        description: "Failed to load schedule",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Day form handlers
  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditingDay(prev => prev ? { ...prev, [name]: value } : null);
  };

  const handleCreateDay = () => {
    setEditingDay({
      id: '',
      day: '',
      date: '',
      events: []
    });
  };

  const handleEditDay = (day: ScheduleDay) => {
    setEditingDay(day);
  };

  const handleDeleteDay = async (id: string) => {
    if (!confirm('Are you sure you want to delete this day? All events for this day will also be deleted.')) return;
    
    try {
      const { error } = await supabase
        .from('schedule_events')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      setScheduleDays(prev => prev.filter(day => day.id !== id));
      toast({
        title: "Success",
        description: "Schedule day deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting day:', error);
      toast({
        title: "Error",
        description: "Failed to delete schedule day",
        variant: "destructive",
      });
    }
  };

  const handleSubmitDay = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingDay) return;
    
    try {
      setIsSubmittingDay(true);
      
      if (editingDay.id) {
        // Update
        const { error } = await supabase
          .from('schedule_events')
          .update({
            day: editingDay.day,
            date: editingDay.date,
            updated_at: new Date().toISOString(), // Convert Date to ISO string
          })
          .eq('id', editingDay.id);
          
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Schedule day updated successfully",
        });
      } else {
        // Create
        const { error } = await supabase
          .from('schedule_events')
          .insert({
            day: editingDay.day,
            date: editingDay.date,
          });
          
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Schedule day created successfully",
        });
      }
      
      setEditingDay(null);
      fetchSchedule();
    } catch (error) {
      console.error('Error saving day:', error);
      toast({
        title: "Error",
        description: "Failed to save schedule day",
        variant: "destructive",
      });
    } finally {
      setIsSubmittingDay(false);
    }
  };

  // Event form handlers
  const handleEventChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditingEvent(prev => prev ? { ...prev, [name]: value } : null);
  };

  const handleCreateEvent = (dayId: string) => {
    setEditingEvent({
      id: '',
      schedule_id: dayId,
      time: '',
      title: '',
      location: ''
    });
  };

  const handleEditEvent = (event: ScheduleEvent) => {
    setEditingEvent(event);
  };

  const handleDeleteEvent = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    
    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      setScheduleDays(prev => 
        prev.map(day => ({
          ...day,
          events: day.events.filter(event => event.id !== id)
        }))
      );
      
      toast({
        title: "Success",
        description: "Event deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting event:', error);
      toast({
        title: "Error",
        description: "Failed to delete event",
        variant: "destructive",
      });
    }
  };

  const handleSubmitEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingEvent) return;
    
    try {
      setIsSubmittingEvent(true);
      
      if (editingEvent.id) {
        // Update
        const { error } = await supabase
          .from('events')
          .update({
            time: editingEvent.time,
            title: editingEvent.title,
            location: editingEvent.location,
            updated_at: new Date().toISOString(), // Convert Date to ISO string
          })
          .eq('id', editingEvent.id);
          
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Event updated successfully",
        });
      } else {
        // Create
        const { error } = await supabase
          .from('events')
          .insert({
            schedule_id: editingEvent.schedule_id,
            time: editingEvent.time,
            title: editingEvent.title,
            location: editingEvent.location,
          });
          
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Event created successfully",
        });
      }
      
      setEditingEvent(null);
      fetchSchedule();
    } catch (error) {
      console.error('Error saving event:', error);
      toast({
        title: "Error",
        description: "Failed to save event",
        variant: "destructive",
      });
    } finally {
      setIsSubmittingEvent(false);
    }
  };

  return (
    <AdminLayout title="Schedule Management">
      {loading && !editingDay && !editingEvent ? (
        <div className="flex items-center justify-center h-64">
          <div className="loader w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : editingDay ? (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-6">
            {editingDay.id ? 'Edit Schedule Day' : 'Create Schedule Day'}
          </h2>
          
          <form onSubmit={handleSubmitDay} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Day Name</label>
                <input
                  type="text"
                  name="day"
                  value={editingDay.day}
                  onChange={handleDayChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  placeholder="e.g. Day 1, Monday, Opening Day"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="text"
                  name="date"
                  value={editingDay.date}
                  onChange={handleDayChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  placeholder="e.g. March 15, 2023"
                  required
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setEditingDay(null)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                disabled={isSubmittingDay}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-diplomatic-700 text-white rounded-md hover:bg-diplomatic-800"
                disabled={isSubmittingDay}
              >
                {isSubmittingDay ? 'Saving...' : editingDay.id ? 'Update Day' : 'Create Day'}
              </button>
            </div>
          </form>
        </div>
      ) : editingEvent ? (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-6">
            {editingEvent.id ? 'Edit Event' : 'Create Event'}
          </h2>
          
          <form onSubmit={handleSubmitEvent} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                <input
                  type="text"
                  name="time"
                  value={editingEvent.time}
                  onChange={handleEventChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  placeholder="e.g. 09:00 AM"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  name="location"
                  value={editingEvent.location || ''}
                  onChange={handleEventChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  placeholder="e.g. Main Hall"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
              <input
                type="text"
                name="title"
                value={editingEvent.title}
                onChange={handleEventChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="e.g. Opening Ceremony"
                required
              />
            </div>
            
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setEditingEvent(null)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                disabled={isSubmittingEvent}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-diplomatic-700 text-white rounded-md hover:bg-diplomatic-800"
                disabled={isSubmittingEvent}
              >
                {isSubmittingEvent ? 'Saving...' : editingEvent.id ? 'Update Event' : 'Create Event'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Schedule</h2>
            <button
              onClick={handleCreateDay}
              className="btn bg-diplomatic-700 text-white py-2 px-4 rounded-md hover:bg-diplomatic-800 flex items-center"
            >
              <PlusCircle size={18} className="mr-2" /> Add Schedule Day
            </button>
          </div>
          
          {scheduleDays.length === 0 ? (
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <p className="text-gray-500 mb-4">No schedule days found</p>
              <button
                onClick={handleCreateDay}
                className="text-diplomatic-600 hover:text-diplomatic-800 font-medium"
              >
                Create your first schedule day
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {scheduleDays.map((day) => (
                <div key={day.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="bg-diplomatic-50 p-4 flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold">{day.day}</h3>
                      <p className="text-sm text-gray-500">{day.date}</p>
                    </div>
                    <div className="flex items-center">
                      <button
                        onClick={() => handleCreateEvent(day.id)}
                        className="mr-2 p-2 rounded-md text-diplomatic-600 hover:bg-diplomatic-50"
                        title="Add Event"
                      >
                        <PlusCircle size={18} />
                      </button>
                      <button
                        onClick={() => handleEditDay(day)}
                        className="mr-2 p-2 rounded-md text-diplomatic-600 hover:bg-diplomatic-50"
                        title="Edit Day"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteDay(day.id)}
                        className="p-2 rounded-md text-red-600 hover:bg-red-50"
                        title="Delete Day"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  
                  {day.events.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                      No events for this day.{' '}
                      <button
                        onClick={() => handleCreateEvent(day.id)}
                        className="text-diplomatic-600 hover:text-diplomatic-800 font-medium"
                      >
                        Add event
                      </button>
                    </div>
                  ) : (
                    <div className="divide-y divide-gray-100">
                      {day.events.map((event) => (
                        <div key={event.id} className="p-4 hover:bg-gray-50">
                          <div className="flex justify-between items-start">
                            <div className="flex">
                              <div className="bg-diplomatic-100 rounded-full p-2 mr-3">
                                <Clock size={16} className="text-diplomatic-700" />
                              </div>
                              <div>
                                <div className="flex items-center">
                                  <span className="font-medium text-diplomatic-800">{event.time}</span>
                                  {event.location && (
                                    <>
                                      <ChevronRight size={14} className="mx-1 text-gray-400" />
                                      <span className="text-gray-500">{event.location}</span>
                                    </>
                                  )}
                                </div>
                                <p className="mt-1">{event.title}</p>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <button
                                onClick={() => handleEditEvent(event)}
                                className="mr-2 p-2 rounded-md text-diplomatic-600 hover:bg-diplomatic-50"
                                title="Edit Event"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() => handleDeleteEvent(event.id)}
                                className="p-2 rounded-md text-red-600 hover:bg-red-50"
                                title="Delete Event"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </AdminLayout>
  );
};

export default AdminSchedule;
