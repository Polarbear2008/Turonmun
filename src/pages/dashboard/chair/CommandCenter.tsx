import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  UserPlus,
  X,
  Gavel,
  Vote,
  Timer,
  Users,
  Mic,
  MicOff,
  Radio,
  ChevronDown,
  Check,
  XCircle,
  Zap,
  Activity,
} from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import { useMunCommand } from '@/hooks/useMunCommand';
import type { SessionMode, MotionType } from '@/types/munCommand';
import { SESSION_MODE_LABELS, MOTION_TYPE_LABELS } from '@/types/munCommand';
import type { Tables } from '@/integrations/supabase/types';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export default function CommandCenter() {
  const context = useOutletContext<any>();
  const committees = context?.committees || [];
  const applications = context?.applications || [];
  const committeeId = committees[0]?.id;

  const {
    session,
    loading,
    currentSpeaker,
    waitingSpeakers,
    doneSpeakers,
    motions,
    activeMotion,
    votes,
    createSession,
    setMode,
    startTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
    addSpeaker,
    nextSpeaker,
    removeSpeaker,
    openVoting,
    closeVoting,
    loadVotes,
  } = useMunCommand({ committeeId: committeeId || '', isChair: true });

  // Local UI state
  const [showAddSpeaker, setShowAddSpeaker] = useState(false);
  const [showNewMotion, setShowNewMotion] = useState(false);
  const [customMinutes, setCustomMinutes] = useState(1);
  const [customSeconds, setCustomSeconds] = useState(30);
  const [speakerTime, setSpeakerTime] = useState(60);

  // New motion form
  const [motionType, setMotionType] = useState<MotionType>('moderated_caucus');
  const [motionDesc, setMotionDesc] = useState('');
  const [motionSpeakingTime, setMotionSpeakingTime] = useState(60);
  const [motionTotalTime, setMotionTotalTime] = useState(600);

  // Load votes for active motion
  useEffect(() => {
    if (activeMotion?.status === 'voting') {
      loadVotes(activeMotion.id);
    }
  }, [activeMotion?.id, activeMotion?.status]); // eslint-disable-line

  if (!committeeId) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center">
          <Gavel className="h-16 w-16 text-white/10 mx-auto mb-4" />
          <p className="text-white/40 text-sm uppercase tracking-widest font-bold">No committee assigned</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center">
          <Activity className="h-8 w-8 text-gold-400 animate-spin mx-auto mb-4" />
          <p className="text-white/40 text-xs uppercase tracking-widest font-bold">Loading Command Center...</p>
        </div>
      </div>
    );
  }

  // Start session if none exists
  if (!session) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-gold-400/20 to-gold-500/30 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-gold-400/30">
            <Gavel className="h-12 w-12 text-gold-400" />
          </div>
          <h2 className="text-2xl font-display font-bold text-white mb-2">MUN Command</h2>
          <p className="text-white/50 mb-8 max-w-md">Launch a live committee session to manage speakers, motions, and voting in real-time.</p>
          <motion.button
            onClick={createSession}
            className="bg-gold-400 hover:bg-gold-500 text-diplomatic-950 px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-xs shadow-[0_4px_20px_rgba(247,163,28,0.3)] transition-all"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Zap className="h-4 w-4 inline mr-2" />
            Start Session
          </motion.button>
        </motion.div>
      </div>
    );
  }

  const timerPercent = session.timer_duration > 0
    ? (session.timer_remaining / session.timer_duration) * 100
    : 0;

  const timerColor = session.timer_remaining <= 10
    ? 'text-red-400'
    : session.timer_remaining <= 30
      ? 'text-amber-400'
      : 'text-emerald-400';

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Session Status Bar */}
      <motion.div
        variants={itemVariants}
        className="glass-card p-4 border border-white/15 flex flex-wrap items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <Radio className="h-5 w-5 text-emerald-400" />
          </div>
          <span className="text-white font-bold text-sm uppercase tracking-widest">Live Session</span>
          <span className="text-white/30 mx-2">•</span>
          <span className="text-gold-400 font-bold text-xs uppercase tracking-widest">
            {SESSION_MODE_LABELS[session.current_mode]}
          </span>
        </div>

        {/* Mode Selector */}
        <div className="flex flex-wrap gap-2">
          {(Object.keys(SESSION_MODE_LABELS) as SessionMode[]).map(mode => (
            <button
              key={mode}
              onClick={() => setMode(mode)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${
                session.current_mode === mode
                  ? 'bg-gold-400/20 text-gold-400 border border-gold-400/30'
                  : 'text-white/40 hover:text-white/70 hover:bg-white/5 border border-transparent'
              }`}
            >
              {SESSION_MODE_LABELS[mode].split(' ').slice(-1)[0]}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* ─── Timer Panel ─────────────────────────────── */}
        <motion.div variants={itemVariants} className="lg:col-span-5">
          <div className="glass-card p-8 border border-white/15 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-5">
              <Timer size={140} className="text-white" />
            </div>

            <div className="relative z-10">
              <h3 className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">Session Timer</h3>

              {/* Timer Display */}
              <div className="text-center mb-8">
                <div className={`text-7xl font-mono font-black ${timerColor} transition-colors tracking-tight`}>
                  {formatTime(session.timer_remaining)}
                </div>
                {session.timer_duration > 0 && (
                  <div className="mt-4 h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${
                        session.timer_remaining <= 10
                          ? 'bg-red-400'
                          : session.timer_remaining <= 30
                            ? 'bg-amber-400'
                            : 'bg-emerald-400'
                      }`}
                      animate={{ width: `${timerPercent}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                )}
              </div>

              {/* Timer Controls */}
              <div className="flex items-center justify-center gap-3 mb-6">
                {!session.timer_running ? (
                  <motion.button
                    onClick={resumeTimer}
                    className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center hover:bg-emerald-500/30 transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Play className="h-6 w-6 ml-0.5" />
                  </motion.button>
                ) : (
                  <motion.button
                    onClick={pauseTimer}
                    className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center hover:bg-amber-500/30 transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Pause className="h-6 w-6" />
                  </motion.button>
                )}
                <motion.button
                  onClick={resetTimer}
                  className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 text-white/50 flex items-center justify-center hover:bg-white/10 transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <RotateCcw className="h-5 w-5" />
                </motion.button>
              </div>

              {/* Quick Timer Presets */}
              <div className="space-y-3">
                <p className="text-white/30 text-[9px] font-bold uppercase tracking-widest text-center">Quick Set</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {[30, 60, 90, 120, 180, 300, 600].map(sec => (
                    <button
                      key={sec}
                      onClick={() => startTimer(sec)}
                      className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 text-xs font-bold transition-all"
                    >
                      {sec >= 60 ? `${sec / 60}m` : `${sec}s`}
                    </button>
                  ))}
                </div>

                {/* Custom Timer */}
                <div className="flex items-center justify-center gap-2 mt-3">
                  <input
                    type="number"
                    min={0}
                    max={60}
                    value={customMinutes}
                    onChange={(e) => setCustomMinutes(parseInt(e.target.value) || 0)}
                    className="w-14 glass-panel px-2 py-1.5 text-white text-center border-white/10 rounded-lg text-sm"
                  />
                  <span className="text-white/30 text-xs">m</span>
                  <input
                    type="number"
                    min={0}
                    max={59}
                    value={customSeconds}
                    onChange={(e) => setCustomSeconds(parseInt(e.target.value) || 0)}
                    className="w-14 glass-panel px-2 py-1.5 text-white text-center border-white/10 rounded-lg text-sm"
                  />
                  <span className="text-white/30 text-xs">s</span>
                  <button
                    onClick={() => startTimer(customMinutes * 60 + customSeconds)}
                    className="px-3 py-1.5 bg-gold-400/20 text-gold-400 border border-gold-400/30 rounded-lg text-xs font-bold hover:bg-gold-400/30 transition-all"
                  >
                    Set
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ─── Speakers List Panel ─────────────────────── */}
        <motion.div variants={itemVariants} className="lg:col-span-7">
          <div className="glass-card p-6 border border-white/15 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-5">
              <Mic size={120} className="text-white" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em]">
                  Speakers List
                  <span className="text-gold-400 ml-2">{waitingSpeakers.length} waiting</span>
                </h3>
                <div className="flex gap-2">
                  <motion.button
                    onClick={() => setShowAddSpeaker(!showAddSpeaker)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-gold-400/20 border border-gold-400/30 text-gold-400 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-gold-400/30 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <UserPlus className="h-3.5 w-3.5" />
                    Add
                  </motion.button>
                  <motion.button
                    onClick={nextSpeaker}
                    disabled={waitingSpeakers.length === 0}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-500/30 transition-all disabled:opacity-30"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <SkipForward className="h-3.5 w-3.5" />
                    Next
                  </motion.button>
                </div>
              </div>

              {/* Add Speaker Form */}
              <AnimatePresence>
                {showAddSpeaker && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="glass-panel p-4 rounded-xl border-white/10 mb-4 space-y-3">
                      <p className="text-white/50 text-xs font-bold uppercase tracking-widest">Select Delegate</p>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min={10}
                          max={300}
                          value={speakerTime}
                          onChange={(e) => setSpeakerTime(parseInt(e.target.value) || 60)}
                          className="w-20 glass-panel px-2 py-1.5 text-white text-center border-white/10 rounded-lg text-sm"
                        />
                        <span className="text-white/30 text-xs">sec per speaker</span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                        {applications.map((app: Tables<'applications'>) => (
                          <button
                            key={app.id}
                            onClick={() => {
                              addSpeaker(app.id, app.full_name, app.country, speakerTime);
                              setShowAddSpeaker(false);
                            }}
                            className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 text-xs font-medium text-left transition-all truncate"
                          >
                            <span className="text-gold-400/80 text-[10px] block">{app.country}</span>
                            {app.full_name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Current Speaker */}
              {currentSpeaker && (
                <div className="glass-panel p-5 rounded-2xl border-emerald-500/20 bg-emerald-500/5 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                      <Mic className="h-5 w-5 text-emerald-400 animate-pulse" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest">Now Speaking</p>
                      <p className="text-white font-bold truncate">{currentSpeaker.delegate_name}</p>
                      <p className="text-white/40 text-xs">{currentSpeaker.delegate_country}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-emerald-400 font-mono font-bold text-lg">
                        {formatTime(session.timer_remaining)}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Queue */}
              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                {waitingSpeakers.length === 0 && !currentSpeaker && (
                  <div className="text-center py-8">
                    <MicOff className="h-8 w-8 text-white/10 mx-auto mb-3" />
                    <p className="text-white/30 text-xs uppercase tracking-widest font-bold">No speakers in queue</p>
                  </div>
                )}
                {waitingSpeakers.map((speaker, index) => (
                  <motion.div
                    key={speaker.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-3 glass-panel p-3 rounded-xl border-white/5 bg-white/5 hover:bg-white/10 transition-all group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-white/30 text-xs font-bold border border-white/10">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium text-sm truncate">{speaker.delegate_name}</p>
                      <p className="text-white/30 text-[10px] uppercase tracking-wider">{speaker.delegate_country}</p>
                    </div>
                    <span className="text-white/20 text-xs font-mono">{formatTime(speaker.speaking_time)}</span>
                    <button
                      onClick={() => removeSpeaker(speaker.id)}
                      className="opacity-0 group-hover:opacity-100 text-red-400/60 hover:text-red-400 transition-all p-1"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </motion.div>
                ))}
              </div>

              {/* Done speakers count */}
              {doneSpeakers.length > 0 && (
                <div className="mt-4 pt-3 border-t border-white/5">
                  <p className="text-white/20 text-[10px] font-bold uppercase tracking-widest">
                    {doneSpeakers.length} delegate{doneSpeakers.length !== 1 ? 's' : ''} have spoken
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ─── Motions Panel ─────────────────────────────── */}
      <motion.div variants={itemVariants}>
        <div className="glass-card p-6 border border-white/15 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-5">
            <Gavel size={120} className="text-white" />
          </div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em]">
                Motions & Voting
              </h3>
              <motion.button
                onClick={() => setShowNewMotion(!showNewMotion)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-diplomatic-400/20 border border-diplomatic-400/30 text-diplomatic-400 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-diplomatic-400/30 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Gavel className="h-3.5 w-3.5" />
                {showNewMotion ? 'Cancel' : 'New Motion'}
              </motion.button>
            </div>

            {/* New Motion Form (for chair to enter on behalf of delegate) */}
            <AnimatePresence>
              {showNewMotion && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="glass-panel p-5 rounded-xl border-white/10 mb-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-white/40 text-[10px] font-bold uppercase tracking-widest block mb-1.5">Motion Type</label>
                        <select
                          value={motionType}
                          onChange={(e) => setMotionType(e.target.value as MotionType)}
                          className="w-full glass-panel px-3 py-2 text-white border-white/10 rounded-lg text-sm"
                        >
                          {(Object.keys(MOTION_TYPE_LABELS) as MotionType[]).map(type => (
                            <option key={type} value={type}>{MOTION_TYPE_LABELS[type]}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-white/40 text-[10px] font-bold uppercase tracking-widest block mb-1.5">Description</label>
                        <input
                          type="text"
                          value={motionDesc}
                          onChange={(e) => setMotionDesc(e.target.value)}
                          placeholder="e.g. Topic: Climate Change"
                          className="w-full glass-panel px-3 py-2 text-white placeholder-white/20 border-white/10 rounded-lg text-sm"
                        />
                      </div>
                    </div>
                    {(motionType === 'moderated_caucus' || motionType === 'unmoderated_caucus') && (
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-white/40 text-[10px] font-bold uppercase tracking-widest block mb-1.5">Speaking Time (sec)</label>
                          <input
                            type="number"
                            value={motionSpeakingTime}
                            onChange={(e) => setMotionSpeakingTime(parseInt(e.target.value) || 60)}
                            className="w-full glass-panel px-3 py-2 text-white border-white/10 rounded-lg text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-white/40 text-[10px] font-bold uppercase tracking-widest block mb-1.5">Total Time (sec)</label>
                          <input
                            type="number"
                            value={motionTotalTime}
                            onChange={(e) => setMotionTotalTime(parseInt(e.target.value) || 600)}
                            className="w-full glass-panel px-3 py-2 text-white border-white/10 rounded-lg text-sm"
                          />
                        </div>
                      </div>
                    )}

                    <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Select Proposer</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-h-32 overflow-y-auto">
                      {applications.map((app: Tables<'applications'>) => (
                        <button
                          key={app.id}
                          onClick={async () => {
                            if (!session) return;
                            const { supabase } = await import('@/integrations/supabase/client');
                            await (supabase.from('motions') as any).insert({
                              session_id: session.id,
                              proposed_by: app.id,
                              proposer_name: app.full_name,
                              proposer_country: app.country,
                              motion_type: motionType,
                              description: motionDesc || MOTION_TYPE_LABELS[motionType],
                              speaking_time: motionSpeakingTime || null,
                              total_time: motionTotalTime || null,
                            });
                            setShowNewMotion(false);
                            setMotionDesc('');
                          }}
                          className="px-2 py-2 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 text-xs text-left transition-all truncate"
                        >
                          <span className="text-gold-400/80 text-[10px] block">{app.country}</span>
                          {app.full_name}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Active Motion - Voting */}
            {activeMotion && activeMotion.status === 'voting' && (
              <div className="glass-panel p-6 rounded-2xl border-gold-400/20 bg-gold-400/5 mb-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gold-400/20 flex items-center justify-center border border-gold-400/30">
                    <Vote className="h-5 w-5 text-gold-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gold-400 text-[10px] font-bold uppercase tracking-widest">Voting In Progress</p>
                    <p className="text-white font-bold">{activeMotion.description}</p>
                    <p className="text-white/40 text-xs">Proposed by {activeMotion.proposer_name} ({activeMotion.proposer_country})</p>
                  </div>
                </div>

                {/* Vote Counts */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="glass-panel p-3 rounded-xl border-emerald-500/20 bg-emerald-500/5 text-center">
                    <p className="text-emerald-400 text-2xl font-bold">{votes.filter(v => v.vote === 'for').length}</p>
                    <p className="text-emerald-400/60 text-[10px] font-bold uppercase tracking-widest">For</p>
                  </div>
                  <div className="glass-panel p-3 rounded-xl border-red-500/20 bg-red-500/5 text-center">
                    <p className="text-red-400 text-2xl font-bold">{votes.filter(v => v.vote === 'against').length}</p>
                    <p className="text-red-400/60 text-[10px] font-bold uppercase tracking-widest">Against</p>
                  </div>
                  <div className="glass-panel p-3 rounded-xl border-white/10 bg-white/5 text-center">
                    <p className="text-white/60 text-2xl font-bold">{votes.filter(v => v.vote === 'abstain').length}</p>
                    <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest">Abstain</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-white/30 text-xs">{votes.length} / {applications.length} delegates voted</p>
                  <motion.button
                    onClick={() => closeVoting(activeMotion.id)}
                    className="px-4 py-2 bg-gold-400 text-diplomatic-950 rounded-lg text-xs font-bold uppercase tracking-widest shadow-[0_2px_10px_rgba(247,163,28,0.3)]"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Close Voting
                  </motion.button>
                </div>
              </div>
            )}

            {/* Motions History */}
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {motions.length === 0 && (
                <div className="text-center py-6">
                  <Gavel className="h-8 w-8 text-white/10 mx-auto mb-3" />
                  <p className="text-white/30 text-xs uppercase tracking-widest font-bold">No motions yet</p>
                </div>
              )}
              {motions.filter(m => m.id !== activeMotion?.id || activeMotion?.status !== 'voting').map((m) => (
                <div
                  key={m.id}
                  className="flex items-center gap-3 glass-panel p-3 rounded-xl border-white/5 bg-white/5"
                >
                  <div className={`w-2 h-2 rounded-full ${
                    m.status === 'passed' ? 'bg-emerald-400' :
                    m.status === 'failed' ? 'bg-red-400' :
                    m.status === 'voting' ? 'bg-gold-400 animate-pulse' :
                    'bg-white/20'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-white/80 text-sm font-medium truncate">{m.description}</p>
                    <p className="text-white/30 text-[10px] uppercase tracking-wider">
                      {MOTION_TYPE_LABELS[m.motion_type]} • {m.proposer_country}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {m.status === 'passed' && <span className="text-emerald-400 text-xs font-bold">PASSED ({m.votes_for}-{m.votes_against}-{m.votes_abstain})</span>}
                    {m.status === 'failed' && <span className="text-red-400 text-xs font-bold">FAILED ({m.votes_for}-{m.votes_against}-{m.votes_abstain})</span>}
                    {(m.status === 'proposed' || m.status === 'seconded') && (
                      <button
                        onClick={() => openVoting(m.id)}
                        className="px-3 py-1 bg-gold-400/20 text-gold-400 border border-gold-400/30 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-gold-400/30 transition-all"
                      >
                        Open Vote
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
