import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Flag,
  Globe,
  Users,
  MapPin,
  DollarSign,
  Bot
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

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

export default function MyCountry() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [aiQuestion, setAiQuestion] = useState('');
  const [application, setApplication] = useState<any | null>(null);
  const [assignment, setAssignment] = useState<any | null>(null);
  const [country, setCountry] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [countryAiData, setCountryAiData] = useState<any | null>(null);
  const [loadingCountryAi, setLoadingCountryAi] = useState(false);
  const [countryAiError, setCountryAiError] = useState<string | null>(null);
  const [assistantAnswer, setAssistantAnswer] = useState<string>('');
  const [assistantBullets, setAssistantBullets] = useState<string[]>([]);
  const [assistantFollowUps, setAssistantFollowUps] = useState<string[]>([]);
  const [assistantLoading, setAssistantLoading] = useState(false);
  const [assistantError, setAssistantError] = useState<string | null>(null);

  useEffect(() => {
    const loadCountry = async () => {
      if (!user?.email) {
        setLoading(false);
        return;
      }

      try {
        const { data: app, error: appError } = await supabase
          .from('applications')
          .select('*')
          .eq('email', user.email)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        console.log('MyCountry - Application:', app, 'Error:', appError);

        if (appError || !app) {
          setLoading(false);
          return;
        }

        setApplication(app);

        const { data: assign, error: assignError } = await supabase
          .from('country_assignments')
          .select('*')
          .eq('application_id', app.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        console.log('MyCountry - Country Assignment:', assign, 'Error:', assignError);

        if (assign) {
          setAssignment(assign);

          const { data: dbCountry } = await supabase
            .from('countries')
            .select('*')
            .eq('code', assign.country_code)
            .limit(1)
            .single();

          if (dbCountry) {
            setCountry(dbCountry);
          }
        } else {
          console.warn('No country assignment found. Please run create_dashboard_tables.sql and insert a country assignment.');
        }
      } finally {
        setLoading(false);
      }
    };

    loadCountry();
  }, [user]);

  const assignedName = country?.name || assignment?.country_name || 'Country not assigned yet';
  const assignedRegion = country?.region || 'Region not set';

  const countryInfo = {
    name: assignedName,
    flagEmoji: '\uD83C\uDF0D',
    capital: '—',
    population: '—',
    gdp: '—',
    government: '—',
    unMembership: '',
    region: assignedRegion,
    languages: [] as string[],
    currency: '—',
    timeZone: '—',
  };

  const keyFacts = [
    {
      icon: Users,
      title: 'Population',
      value: countryInfo.population,
    },
    {
      icon: DollarSign,
      title: 'GDP',
      value: countryInfo.gdp,
    },
    {
      icon: Globe,
      title: 'UN Membership',
      value: countryInfo.unMembership
    },
    {
      icon: MapPin,
      title: 'Region',
      value: countryInfo.region,
    }
  ];

  const tabs = [
    { id: 'overview', name: 'Overview', icon: Flag },
    { id: 'ai-help', name: 'AI Assistant', icon: Bot }
  ];

  const [imageError, setImageError] = useState(false);

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
          My Country
        </h1>
        <p className="text-white/70">
          Research your country's profile, policies, and diplomatic positions
        </p>
      </motion.div>

      {/* Country Header Card */}
      <motion.div variants={itemVariants} className="glass-card p-6">
        <div className="flex items-center space-x-6">
          {assignment?.country_code && !imageError ? (
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-gold-400 to-diplomatic-400 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
              <img
                src={`https://flagcdn.com/w160/${assignment.country_code.toLowerCase()}.png`}
                alt={countryInfo.name}
                className="relative w-24 h-auto rounded-lg shadow-md object-cover"
                onError={() => setImageError(true)}
              />
            </div>
          ) : (
            <div className="text-6xl">{countryInfo.flagEmoji}</div>
          )}

          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white mb-2">{countryInfo.name}</h2>
            {(!assignment || !country) && !loading && (
              <p className="text-white/60 text-sm mb-3">
                Your country has not been assigned yet. Once the Secretariat assigns a country to your
                application, its details will appear here.
              </p>
            )}
            {assignment && (
              <div className="mb-3 flex flex-wrap items-center gap-3">
                <p className="text-white/70 text-sm">
                  Country data enriched with AI analysis.
                </p>
                <motion.button
                  type="button"
                  onClick={async () => {
                    if (!assignment) return;
                    try {
                      setLoadingCountryAi(true);
                      setCountryAiError(null);

                      // Mock AI Service Call
                      await new Promise(resolve => setTimeout(resolve, 1500));

                      const code = assignment.country_code.toLowerCase();
                      let aiData;

                      if (code === 'uz') {
                        aiData = {
                          keyFacts: [
                            { icon: Users, title: 'Population', value: '36 Million', description: 'Most populous in Central Asia' },
                            { icon: DollarSign, title: 'GDP', value: '$90 Billion', description: 'Rapidly growing economy' },
                            { icon: Globe, title: 'UN Membership', value: '1992', description: 'Active member state' },
                            { icon: MapPin, title: 'Region', value: 'Central Asia', description: 'Strategic crossroads' }
                          ]
                        };
                      } else if (code === 'us') {
                        aiData = {
                          keyFacts: [
                            { icon: Users, title: 'Population', value: '333 Million', description: '3rd largest in world' },
                            { icon: DollarSign, title: 'GDP', value: '$25 Trillion', description: 'Largest economy' },
                            { icon: Globe, title: 'UN Membership', value: '1945', description: 'Permanent Security Council' },
                            { icon: MapPin, title: 'Region', value: 'North America', description: 'Global superpower' }
                          ]
                        };
                      } else if (code === 'gb') {
                        aiData = {
                          keyFacts: [
                            { icon: Users, title: 'Population', value: '67 Million', description: '21st largest in world' },
                            { icon: DollarSign, title: 'GDP', value: '$3.1 Trillion', description: '6th largest economy' },
                            { icon: Globe, title: 'UN Membership', value: '1945', description: 'Permanent Security Council' },
                            { icon: MapPin, title: 'Region', value: 'Europe', description: 'Commonwealth Leader' }
                          ]
                        };
                      } else {
                        // Generic fallback
                        aiData = {
                          keyFacts: [
                            { icon: Users, title: 'Population', value: 'Data N/A', description: 'Update pending' },
                            { icon: DollarSign, title: 'GDP', value: 'Data N/A', description: 'Update pending' },
                            { icon: Globe, title: 'UN Membership', value: 'Member', description: 'Active state' },
                            { icon: MapPin, title: 'Region', value: 'International', description: 'Sovereign state' }
                          ]
                        };
                      }

                      setCountryAiData(aiData);
                    } catch (err: any) {
                      setCountryAiError(err.message || 'Error loading AI data');
                    } finally {
                      setLoadingCountryAi(false);
                    }
                  }}
                  className="px-3 py-1 rounded-full bg-gold-500 hover:bg-gold-600 text-white text-xs font-medium"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  disabled={loadingCountryAi}
                >
                  {loadingCountryAi ? 'Analyzing...' : 'Refresh AI Data'}
                </motion.button>
                {countryAiError && (
                  <span className="text-xs text-red-300">{countryAiError}</span>
                )}
              </div>
            )}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-white/60">Capital</p>
                <p className="text-white font-medium">{countryInfo.capital}</p>
              </div>
              <div>
                <p className="text-white/60">Government</p>
                <p className="text-white font-medium">{countryInfo.government}</p>
              </div>
              <div>
                <p className="text-white/60">Currency</p>
                <p className="text-white font-medium">{countryInfo.currency}</p>
              </div>
              <div>
                <p className="text-white/60">Time Zone</p>
                <p className="text-white font-medium">{countryInfo.timeZone}</p>
              </div>
            </div>
          </div>
        </div>
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
            {/* Key Facts */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {(countryAiData?.keyFacts || keyFacts).map((fact: any, index: number) => {
                const Icon = fact.icon || Globe;
                return (
                  <motion.div
                    key={index}
                    className="glass-card p-4"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-8 h-8 bg-gold-400/20 text-gold-400 rounded-lg flex items-center justify-center">
                        <Icon className="h-4 w-4" />
                      </div>
                      <p className="text-white/70 text-sm">{fact.title}</p>
                    </div>
                    <p className="text-white font-bold text-lg mb-1">{fact.value}</p>
                    <p className="text-white/60 text-xs">{fact.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'ai-help' && (
          <div className="space-y-6">
            {/* AI Assistant Interface */}
            <div className="glass-card p-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full flex items-center justify-center">
                  <Bot className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Country AI Assistant</h3>
                  <p className="text-white/60 text-sm">Ask questions about your country's positions and policies</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Ask about your country's stance
                  </label>
                  <div className="flex space-x-3">
                    <input
                      type="text"
                      value={aiQuestion}
                      onChange={(e) => setAiQuestion(e.target.value)}
                      placeholder="e.g., What is UK's position on climate change?"
                      className="flex-1 glass-panel px-4 py-2 text-white placeholder-white/50 border-white/20 focus:border-gold-400/50 focus:ring-1 focus:ring-gold-400/50 transition-all rounded-lg"
                    />
                    <motion.button
                      className="bg-gold-500 hover:bg-gold-600 px-6 py-2 text-white transition-colors rounded-lg disabled:opacity-60"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={assistantLoading || !aiQuestion}
                      onClick={async () => {
                        if (!aiQuestion) return;
                        try {
                          setAssistantLoading(true);
                          setAssistantError(null);
                          const res = await fetch('http://localhost:4000/api/assistant-chat', {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                              question: aiQuestion,
                              countryCode: assignment?.country_code,
                              countryName: assignedName,
                              applicationId: application?.id,
                            }),
                          });
                          if (!res.ok) {
                            throw new Error('Failed to get AI response');
                          }
                          const data = await res.json();
                          setAssistantAnswer(data.answer || '');
                          setAssistantBullets(data.bulletPoints || []);
                          setAssistantFollowUps(data.followUpQuestions || []);
                        } catch (err: any) {
                          setAssistantError(err.message || 'Error talking to AI');
                        } finally {
                          setAssistantLoading(false);
                        }
                      }}
                    >
                      {assistantLoading ? 'Asking…' : 'Ask AI'}
                    </motion.button>
                  </div>
                </div>

                {/* Sample Questions */}
                <div>
                  <p className="text-white/70 text-sm mb-3">Quick questions:</p>
                  <div className="flex flex-wrap gap-2">
                    {(assistantFollowUps.length ? assistantFollowUps : [
                      "Country's stance on main committee topic",
                      "Main allies and blocs",
                      "Recent UN voting behavior",
                      "Key red lines in negotiations"
                    ]).map((question, index) => (
                      <motion.button
                        key={index}
                        onClick={() => setAiQuestion(question)}
                        className="px-3 py-1 glass-panel text-white/80 hover:text-white hover:bg-white/20 transition-colors rounded-full text-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {question}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* AI Response Area */}
            <div className="glass-card p-6">
              <h4 className="text-white font-medium mb-4">AI Response</h4>
              <div className="glass-panel p-4 rounded-lg min-h-32">
                {assistantError && (
                  <p className="text-red-300 text-sm mb-3">{assistantError}</p>
                )}
                {!assistantAnswer && !assistantBullets.length && !assistantError && (
                  <p className="text-white/60 text-center">
                    Ask a question above to get AI-powered insights about your country's positions and policies.
                  </p>
                )}
                {assistantAnswer && (
                  <div className="space-y-3">
                    <p className="text-white/80 text-sm whitespace-pre-line">{assistantAnswer}</p>
                    {assistantBullets.length > 0 && (
                      <ul className="list-disc list-inside space-y-1 text-white/80 text-sm">
                        {assistantBullets.map((point, idx) => (
                          <li key={idx}>{point}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
