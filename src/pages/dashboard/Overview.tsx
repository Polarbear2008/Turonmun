import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Calendar,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  Flag,
  Users
} from 'lucide-react';
import CountdownTimer from '@/components/CountdownTimer';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

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
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

function Overview() {
  const { user } = useAuth();
  const [application, setApplication] = useState<Tables<'applications'> | null>(null);
  const [committee, setCommittee] = useState<any | null>(null);
  const [assignment, setAssignment] = useState<any>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [flagError, setFlagError] = useState(false);
  const [resources, setResources] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      if (!user?.email) {
        setLoading(false);
        return;
      }

      try {
        console.log('Overview querying applications for email:', user.email);
        const { data: app, error } = await (supabase as any)
          .from('applications')
          .select('*')
          .eq('email', user.email)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (!error && app) {
          setApplication(app as any);

          if (app.assigned_committee_id) {
            const { data: comm } = await supabase
              .from('committees')
              .select('*')
              .eq('id', app.assigned_committee_id)
              .single();
            if (comm) setCommittee(comm);
          }

          // Fetch country assignment
          const { data: assign } = await supabase
            .from('country_assignments')
            .select('*')
            .eq('application_id', app.id)
            .single();

          if (assign) setAssignment(assign);
        }

        const { data: upcoming } = await supabase
          .from('schedule_events')
          .select('*')
          .order('event_date', { ascending: true })
          .order('start_time', { ascending: true })
          .limit(5);


        setEvents(upcoming || []);

        // Fetch all resources as requested (global visibility)
        const { data: res } = await (supabase as any)
          .from('resources')
          .select('*');

        setResources(res || []);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user]);

  const displayName = (application?.full_name || (user?.user_metadata as any)?.full_name || user?.email || 'Delegate');
  const displayCountry = assignment?.country_name || 'Not assigned yet';
  const committeeName = committee?.name || 'Not assigned yet';
  const badgeNumber = application?.id || 'Pending';
  const status = application?.status || 'pending';

  const applicationSteps = [
    { name: 'Submitted', status: status ? 'completed' : 'pending', date: application?.created_at || null },
    { name: 'Reviewed', status: status && status !== 'pending' ? 'completed' : 'pending', date: application?.reviewed_at || null },
    { name: 'Payment', status: application?.payment_status === 'paid' ? 'completed' : 'pending', date: null },
    { name: 'Confirmed', status: status === 'approved' ? 'current' : 'pending', date: null },
    { name: 'Allocated', status: assignment ? 'completed' : 'pending', date: null },
  ];

  const conferenceDate = new Date('2025-03-15T09:00:00');

  return (
    <motion.div
      className="space-y-6 pb-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Welcome Header */}
      <motion.div
        variants={itemVariants}
        className="glass-card p-6 md:p-8 relative overflow-hidden border border-white/15"
      >
        {/* Background halo + noise for premium feel */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -left-24 w-56 h-56 bg-gold-400/10 blur-3xl rounded-full" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-diplomatic-400/15 blur-3xl rounded-full" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5" />
          <div className="absolute inset-0 bg-noise opacity-10 mix-blend-soft-light" />
        </div>

        <div className="relative z-10 flex items-center justify-between gap-6">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">Delegate Dashboard</span>
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-white mb-2 leading-tight">
              Welcome back, <span className="text-gold-400">{displayName}</span>! 👋
            </h1>
            <p className="text-white/60 text-sm md:text-base max-w-xl">
              Ready to make your mark at TuronMUN Season 6? Your diplomatic journey continues here.
            </p>
          </div>
          <div className="hidden md:block flex-shrink-0">
            <div className="relative">
              <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-gold-400/40 via-transparent to-diplomatic-400/40 blur-xl" />
              <div className="relative w-20 h-20 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 shadow-glow">
                <User className="h-10 w-10 text-white/90" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Top Row - Profile & Countdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Profile Card */}
        <motion.div variants={itemVariants} className="glass-card p-6 lg:col-span-5 flex flex-col h-full">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-diplomatic-400/20 to-diplomatic-500/30 rounded-xl flex items-center justify-center border border-white/10">
              <User className="h-6 w-6 text-gold-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Delegate Profile</h3>
              <p className="text-white/50 text-xs">Your official conference identity</p>
            </div>
          </div>

          <div className="flex-1 space-y-3">
            {[
              { label: 'Name', value: displayName, color: 'text-white' },
              { label: 'Committee', value: committeeName, color: 'text-gold-400' },
              { label: 'Badge #', value: badgeNumber, color: 'text-white/80 mono' },
            ].map((row, idx) => (
              <div key={idx} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                <span className="text-white/50 text-xs font-medium uppercase tracking-wider">{row.label}</span>
                <span className={`text-sm font-semibold ${row.color} ${row.color.includes('mono') ? 'font-mono' : ''}`}>{row.value}</span>
              </div>
            ))}

            <div className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
              <span className="text-white/50 text-xs font-medium uppercase tracking-wider">Country</span>
              <div className="flex items-center space-x-2">
                {assignment?.country_code && !flagError ? (
                  <img
                    src={`https://flagcdn.com/w40/${assignment.country_code.toLowerCase()}.png`}
                    alt="Flag"
                    className="w-5 h-auto rounded-sm shadow-sm ring-1 ring-white/10"
                    onError={() => setFlagError(true)}
                    loading="lazy"
                  />
                ) : (
                  <Flag className="h-4 w-4 text-white/70" />
                )}
                <span className="text-sm font-semibold text-white">{displayCountry}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
                <span className="text-white/80 text-xs font-bold uppercase tracking-widest">Status: {status}</span>
              </div>
              <button className="text-[10px] text-gold-400 hover:text-gold-300 font-bold uppercase tracking-wider transition-colors">
                View All Details
              </button>
            </div>
          </div>
        </motion.div>

        {/* Countdown Timer */}
        <motion.div variants={itemVariants} className="glass-card p-6 lg:col-span-7 hidden md:flex flex-col h-full bg-gradient-to-br from-diplomatic-900/80 to-diplomatic-950/90">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-gold-400/20 to-gold-500/30 rounded-xl flex items-center justify-center border border-white/10">
              <Clock className="h-6 w-6 text-gold-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Conference Countdown</h3>
              <p className="text-white/50 text-xs">Time remaining until the opening ceremony</p>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <div className="w-full">
              <CountdownTimer targetDate={conferenceDate} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Middle Row - Application Status & Committee Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Application Status Tracker */}
        <motion.div variants={itemVariants} className="glass-card p-6">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400/20 to-blue-500/30 rounded-xl flex items-center justify-center border border-white/10">
              <FileText className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Application Journey</h3>
              <p className="text-white/50 text-xs">Current status and next steps</p>
            </div>
          </div>

          <div className="relative pl-8 space-y-8 before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10">
            {applicationSteps.map((step, index) => (
              <div key={step.name} className="relative flex items-center group">
                <div className={`absolute -left-[25px] w-4 h-4 rounded-full border-4 border-diplomatic-900 z-10 transition-colors duration-300 ${step.status === 'completed'
                  ? 'bg-emerald-500'
                  : step.status === 'current'
                    ? 'bg-gold-500 animate-pulse'
                    : 'bg-white/20'
                  }`}>
                  {step.status === 'completed' && <div className="absolute inset-0 bg-emerald-500/40 blur-sm rounded-full" />}
                  {step.status === 'current' && <div className="absolute inset-0 bg-gold-500/40 blur-md rounded-full" />}
                </div>

                <div className="flex-1 ml-4 bg-white/5 hover:bg-white/10 p-3 rounded-lg border border-white/5 transition-all cursor-default">
                  <div className="flex items-center justify-between gap-4">
                    <p className={`text-sm font-bold tracking-tight ${step.status === 'completed' || step.status === 'current'
                      ? 'text-white'
                      : 'text-white/30'
                      }`}>
                      {step.name}
                    </p>
                    {step.date && (
                      <span className="text-[10px] font-mono text-white/40">{step.date}</span>
                    )}
                  </div>
                  {step.status === 'current' && (
                    <p className="text-[10px] text-gold-400 mt-1 font-medium">Action required may be needed</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Committee & Country Assignment */}
        <motion.div variants={itemVariants} className="glass-card p-6 flex flex-col">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400/20 to-purple-500/30 rounded-xl flex items-center justify-center border border-white/10">
              <Users className="h-6 w-6 text-purple-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Academic Allocation</h3>
              <p className="text-white/50 text-xs">Research guidance and resources</p>
            </div>
          </div>

          <div className="space-y-4 flex-1">
            <div className="glass-panel p-5 bg-white/5 hover:bg-white/10 transition-all border-white/10 group">
              <div className="flex items-center justify-between mb-3">
                <span className="text-white/50 text-[10px] font-bold uppercase tracking-widest">Allocated Committee</span>
                <span className="text-gold-400 font-bold text-sm tracking-tight">{committeeName}</span>
              </div>
              <p className="text-white/70 text-xs leading-relaxed line-clamp-3 mb-4 italic">
                {committee?.description || 'Your committee assignment and detailed background guide will appear here shortly.'}
              </p>
              <div className="flex flex-wrap gap-2">
                {resources.length > 0 ? (
                  resources.map((res) => (
                    <a
                      key={res.id}
                      href={res.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] bg-white/10 hover:bg-gold-400 hover:text-diplomatic-900 border border-white/10 font-bold uppercase tracking-wider px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5"
                    >
                      <FileText size={12} />
                      {res.title}
                    </a>
                  ))
                ) : (
                  <>
                    <button className="text-[10px] bg-white/10 hover:bg-gold-400 hover:text-diplomatic-900 border border-white/10 font-bold uppercase tracking-wider px-3 py-1.5 rounded-md transition-all">
                      Background Guide
                    </button>
                    <button className="text-[10px] bg-white/10 hover:bg-gold-400 hover:text-diplomatic-900 border border-white/10 font-bold uppercase tracking-wider px-3 py-1.5 rounded-md transition-all">
                      Rules of Procedure
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="glass-panel p-5 bg-white/5 hover:bg-white/10 transition-all border-white/10 flex items-center justify-between">
              <div className="flex-1">
                <span className="text-white/50 text-[10px] font-bold uppercase tracking-widest block mb-1">Representing</span>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-diplomatic-800 flex items-center justify-center border border-white/10">
                    <Flag className="h-4 w-4 text-gold-400" />
                  </div>
                  <span className="text-white font-bold text-base tracking-tight">{displayCountry}</span>
                </div>
              </div>
              <button className="text-[10px] bg-gold-400 text-diplomatic-900 font-bold uppercase tracking-wider px-4 py-2 rounded-md hover:scale-105 transition-all shadow-lg hover:shadow-gold/20">
                Research Docs
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Row - Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Events */}
        <motion.div variants={itemVariants} className="glass-card p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-400/20 to-red-500/30 rounded-xl flex items-center justify-center border border-white/10">
                <Calendar className="h-6 w-6 text-red-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Agenda & Timeline</h3>
                <p className="text-white/50 text-xs">Stay synchronized with the conference flow</p>
              </div>
            </div>
            <button className="hidden sm:block text-xs text-gold-400 hover:text-gold-300 font-bold uppercase tracking-wider transition-colors">
              Full Schedule →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map((event) => (
              <div key={event.id} className="glass-panel p-4 bg-white/5 hover:bg-white/10 transition-all border-white/10 relative group overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-gold-400 scale-y-0 group-hover:scale-y-100 transition-transform origin-top" />
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-bold text-sm tracking-tight truncate mr-2">{event.title}</span>
                  <div className="flex items-center space-x-1 whitespace-nowrap px-2 py-0.5 bg-white/10 rounded-full">
                    <Clock className="w-3 h-3 text-gold-400" />
                    <span className="text-gold-400 text-[10px] font-bold">{event.start_time}</span>
                  </div>
                </div>
                <div className="flex items-center text-white/50 text-[10px] font-medium uppercase tracking-widest">
                  <Calendar className="w-3 h-3 mr-1.5" />
                  {event.event_date}
                </div>
              </div>
            ))}
            {!loading && events.length === 0 && (
              <div className="col-span-full border border-dashed border-white/10 rounded-xl p-8 text-center bg-white/5">
                <p className="text-white/40 text-sm italic">The conference agenda is currently being finalized. Please check back later.</p>
              </div>
            )}
          </div>

          <div className="mt-6 sm:hidden">
            <button className="w-full text-center text-gold-400 hover:text-gold-300 text-xs font-bold uppercase tracking-widest py-3 bg-white/5 rounded-lg border border-white/10 transition-colors">
              View Master Schedule
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default React.memo(Overview);
