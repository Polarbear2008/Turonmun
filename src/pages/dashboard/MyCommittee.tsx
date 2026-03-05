import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  FileText,
  Upload,
  Calendar,
  MapPin,
  Clock,
  User,
  Send,
  Edit3,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
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

interface PositionPaperRow {
  id?: string;
  application_id: string;
  committee_id: string | null;
  content: string | null;
  file_url?: string | null;
  status: string | null;
  feedback?: string | null;
  score?: number | null;
  chair_feedback?: string | null;
  reviewed_by?: string | null;
  reviewed_at?: string | null;
}

function MyCommittee() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [positionPaperText, setPositionPaperText] = useState('');
  const [application, setApplication] = useState<Tables<'applications'> | null>(null);
  const [committee, setCommittee] = useState<Tables<'committees'> | null>(null);
  const [scheduleEvents, setScheduleEvents] = useState<Tables<'schedule_events'>[]>([]);
  const [loading, setLoading] = useState(true);
  const [positionPaperRecord, setPositionPaperRecord] = useState<PositionPaperRow | null>(null);
  const [savingDraft, setSavingDraft] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  console.log('Position Paper state:', { application, committee, positionPaperRecord });

  useEffect(() => {
    const loadCommitteeData = async () => {
      if (!user?.email) {
        setLoading(false);
        return;
      }

      try {
        const { data: app, error } = await supabase
          .from('applications')
          .select('*')
          .eq('email', user.email)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        console.log('MyCommittee - Application:', app, 'Error:', error);

        if (!error && app) {
          setApplication(app);

          if (app.assigned_committee_id) {
            console.log('MyCommittee - Fetching committee with ID:', app.assigned_committee_id);

            const { data: comm, error: commError } = await supabase
              .from('committees')
              .select('*')
              .eq('id', app.assigned_committee_id)
              .single();

            console.log('MyCommittee - Committee data:', comm, 'Error:', commError);

            if (comm) setCommittee(comm);

            const { data: events } = await supabase
              .from('schedule_events')
              .select('*')
              .eq('committee_id', app.assigned_committee_id)
              .order('event_date', { ascending: true })
              .order('start_time', { ascending: true });
            setScheduleEvents(events || []);

            const { data: paper, error: paperError } = await supabase
              .from('position_papers')
              .select('*')
              .eq('application_id', app.id)
              .eq('committee_id', app.assigned_committee_id)
              .order('created_at', { ascending: false })
              .limit(1)
              .single();

            console.log('MyCommittee - Position Paper:', paper, 'Error:', paperError);

            if (paper) {
              setPositionPaperRecord(paper as PositionPaperRow);
              setPositionPaperText(paper.content || '');
            }
          } else {
            console.warn('MyCommittee - No committee assigned to this application yet');
          }
        }
      } finally {
        setLoading(false);
      }
    };

    loadCommitteeData();
  }, [user]);

  const committeeName = committee?.name || 'Committee not assigned yet';
  const committeeAbbr = committee?.abbreviation || '';
  const committeeDescription = committee?.description || 'Once your committee is assigned, details will appear here.';
  const topics = committee?.topics || [];
  const chairName = committee?.chair || 'To be announced';
  const coChairName = committee?.co_chair || 'To be announced';

  const positionPaperStatus = {
    submitted: positionPaperRecord?.status === 'submitted',
    deadline: '2024-03-10',
    feedback: null,
    status: (positionPaperRecord?.status as 'draft' | 'submitted' | 'reviewed' | undefined) || 'draft'
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: Users },
    { id: 'position-paper', name: 'Position Paper', icon: FileText },
    { id: 'schedule', name: 'Schedule', icon: Calendar }
  ];

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
          My Committee
        </h1>
        <p className="text-white/70">
          Everything you need to know about your assigned committee
        </p>
      </motion.div>

      {/* Committee Header Card */}
      <motion.div variants={itemVariants} className="glass-card p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center">
            <Users className="h-8 w-8 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{committeeName}</h2>
            {committeeAbbr && (
              <p className="text-gold-400 font-medium">{committeeAbbr}</p>
            )}
            {!committee && application?.assigned_committee_id && (
              <p className="text-red-400 text-xs mt-1">
                ⚠️ Committee ID exists but committee not found in database
              </p>
            )}
          </div>
        </div>
        <p className="text-white/80 leading-relaxed">{committeeDescription}</p>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div variants={itemVariants} className="glass-panel p-1 rounded-lg">
        <div className="flex space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id
                ? 'bg-gold-400/20 text-gold-300 shadow-lg'
                : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.name}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Committee Topics */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Committee Topics</h3>
              {topics.length > 0 ? (
                <div className="space-y-4">
                  {topics.map((topic, index) => (
                    <div key={index} className="glass-panel p-4 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gold-400/20 text-gold-400 rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        <p className="text-white font-medium">{topic}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-white/60 text-sm">Topics for your committee will appear here once assigned.</p>
              )}
            </div>

            {/* Committee Leadership */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-card p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{chairName}</h4>
                    <p className="text-gold-400 text-sm">Committee Chair</p>
                  </div>
                </div>
                <p className="text-white/70 text-sm">Chair biography will be provided by the Secretariat.</p>
              </div>

              <div className="glass-card p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{coChairName}</h4>
                    <p className="text-gold-400 text-sm">Co-Chair</p>
                  </div>
                </div>
                <p className="text-white/70 text-sm">Co-chair biography will be provided by the Secretariat.</p>
              </div>
            </div>
          </div>
        )}



        {activeTab === 'position-paper' && (
          <div className="space-y-6">
            {/* Position Paper Status */}
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Position Paper</h3>
                <div className="flex items-center space-x-2">
                  {positionPaperStatus.submitted ? (
                    <div className="flex items-center space-x-2 text-green-400">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm">Submitted</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2 text-yellow-400">
                      <AlertTriangle className="h-4 w-4" />
                      <span className="text-sm">Draft</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Chair Feedback & Score */}
              {positionPaperRecord && (positionPaperRecord.score || positionPaperRecord.chair_feedback) && (
                <div className="glass-card p-6 mb-4 border-2 border-gold-400/30">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle className="h-5 w-5 text-gold-400" />
                    <h4 className="text-lg font-semibold text-white">Chair Review</h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {positionPaperRecord.score !== null && positionPaperRecord.score !== undefined && (
                      <div className="glass-panel p-4 rounded-lg">
                        <p className="text-white/60 text-sm mb-1">Your Score</p>
                        <div className="flex items-baseline gap-2">
                          <span className={`text-3xl font-bold ${positionPaperRecord.score >= 90 ? 'text-green-400' :
                            positionPaperRecord.score >= 80 ? 'text-blue-400' :
                              positionPaperRecord.score >= 70 ? 'text-yellow-400' :
                                'text-red-400'
                            }`}>
                            {positionPaperRecord.score}
                          </span>
                          <span className="text-white/60 text-lg">/100</span>
                        </div>
                      </div>
                    )}

                    <div className="glass-panel p-4 rounded-lg">
                      <p className="text-white/60 text-sm mb-1">Status</p>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${positionPaperRecord.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                        positionPaperRecord.status === 'needs_revision' ? 'bg-yellow-500/20 text-yellow-400' :
                          positionPaperRecord.status === 'submitted' ? 'bg-blue-500/20 text-blue-400' :
                            'bg-gray-500/20 text-gray-400'
                        }`}>
                        {positionPaperRecord.status === 'approved' ? '✓ Approved' :
                          positionPaperRecord.status === 'needs_revision' ? '⚠ Needs Revision' :
                            positionPaperRecord.status === 'submitted' ? '⏳ Under Review' :
                              positionPaperRecord.status || 'Draft'}
                      </span>
                    </div>
                  </div>

                  {positionPaperRecord.chair_feedback && (
                    <div className="glass-panel p-4 rounded-lg">
                      <p className="text-white/60 text-sm mb-2">Chair's Feedback</p>
                      <p className="text-white leading-relaxed whitespace-pre-wrap">
                        {positionPaperRecord.chair_feedback}
                      </p>
                    </div>
                  )}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Position Paper Content
                  </label>
                  <textarea
                    value={positionPaperText}
                    onChange={(e) => setPositionPaperText(e.target.value)}
                    placeholder="Write your position paper here or upload a document..."
                    className="w-full h-64 glass-panel px-4 py-3 text-white placeholder-white/50 border-white/20 focus:border-gold-400/50 focus:ring-1 focus:ring-gold-400/50 transition-all rounded-lg resize-none"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex space-x-3">
                    {!application && (
                      <p className="text-white/60 text-sm">No application found for your account.</p>
                    )}
                    {application && !committee && (
                      <p className="text-white/60 text-sm">Your committee has not been assigned yet.</p>
                    )}
                    <motion.button
                      className="flex items-center space-x-2 glass-panel px-4 py-2 text-white hover:bg-white/20 transition-colors rounded-lg"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Upload className="h-4 w-4" />
                      <span>Upload File</span>
                    </motion.button>
                    <motion.button
                      disabled={!application || !committee || savingDraft}
                      className="flex items-center space-x-2 glass-panel px-4 py-2 text-white hover:bg-white/20 transition-colors rounded-lg disabled:opacity-50"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={async () => {
                        if (!application || !committee) return;
                        try {
                          setSavingDraft(true);
                          const payload: PositionPaperRow = {
                            id: positionPaperRecord?.id,
                            application_id: application.id,
                            committee_id: application.assigned_committee_id,
                            content: positionPaperText,
                            status: 'draft'
                          };
                          console.log('Saving draft payload:', payload);
                          const { data, error } = await supabase
                            .from('position_papers')
                            .upsert(payload as any)
                            .select('*')
                            .single();
                          console.log('Save draft response:', { data, error });
                          if (!error && data) {
                            setPositionPaperRecord(data as PositionPaperRow);
                          }
                        } finally {
                          setSavingDraft(false);
                        }
                      }}
                    >
                      <Edit3 className="h-4 w-4" />
                      <span>{savingDraft ? 'Saving...' : 'Save Draft'}</span>
                    </motion.button>
                  </div>
                  <motion.button
                    disabled={!application || !committee || submitting}
                    className="flex items-center space-x-2 bg-gold-500 hover:bg-gold-600 px-6 py-2 text-white transition-colors rounded-lg"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={async () => {
                      if (!application || !committee) return;
                      try {
                        setSubmitting(true);
                        const payload: PositionPaperRow = {
                          id: positionPaperRecord?.id,
                          application_id: application.id,
                          committee_id: application.assigned_committee_id,
                          content: positionPaperText,
                          status: 'submitted'
                        };
                        console.log('Submitting paper payload:', payload);
                        const { data, error } = await supabase
                          .from('position_papers')
                          .upsert(payload as any)
                          .select('*')
                          .single();
                        console.log('Submit paper response:', { data, error });
                        if (!error && data) {
                          setPositionPaperRecord(data as PositionPaperRow);
                        }
                      } finally {
                        setSubmitting(false);
                      }
                    }}
                  >
                    <Send className="h-4 w-4" />
                    <span>{submitting ? 'Submitting...' : 'Submit Paper'}</span>
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Position Paper Guidelines */}
            <div className="glass-card p-6">
              <h4 className="text-white font-semibold mb-4">Position Paper Guidelines</h4>
              <div className="space-y-3 text-white/80 text-sm">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Maximum 2 pages, single-spaced, 12pt Times New Roman font</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Address both committee topics with your country's perspective</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Include at least 3 credible sources with proper citations</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Propose realistic solutions that align with your country's interests</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'schedule' && (
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-white mb-6">Committee Schedule</h3>

            <div className="space-y-4">
              {scheduleEvents.map((session) => (
                <div key={session.id} className="glass-panel p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg flex items-center justify-center">
                        <Clock className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{session.title}</p>
                        <div className="flex items-center space-x-4 text-white/60 text-sm">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{session.start_time} - {session.end_time}</span>
                          </div>
                          {session.location && (
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-3 w-3" />
                              <span>{session.location}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <motion.button
                      className="text-gold-400 hover:text-gold-300 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Calendar className="h-5 w-5" />
                    </motion.button>
                  </div>
                </div>
              ))}
              {!loading && scheduleEvents.length === 0 && (
                <div className="glass-panel p-4 rounded-lg text-white/60 text-sm">
                  Your committee schedule will appear here once it is published.
                </div>
              )}
            </div>

            <div className="mt-6 pt-6 border-t border-white/10">
              <motion.button
                className="w-full glass-panel py-3 text-white hover:bg-white/20 transition-colors rounded-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Add to Calendar
              </motion.button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default React.memo(MyCommittee);
