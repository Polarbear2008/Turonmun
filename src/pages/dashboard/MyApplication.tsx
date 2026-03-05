import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Upload,
  Download,
  CheckCircle,
  AlertCircle,
  Clock,
  Edit3,
  Save,
  X,
  Eye,
  Calendar,
  CreditCard
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

export default function MyApplication() {
  const { user } = useAuth();
  const [application, setApplication] = useState<Tables<'applications'> | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const documents = [
    { name: 'Application Form', status: 'uploaded', uploadDate: application?.created_at || 'N/A', size: '—', type: 'Record' },
  ];

  useEffect(() => {
    const loadApplication = async () => {
      if (!user?.email) {
        setLoading(false);
        return;
      }

      try {
        console.log('Querying applications for email:', user.email);
        const { data, error } = await supabase
          .from('applications')
          .select('*')
          .eq('email', user.email)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        console.log('Supabase response:', { data, error });
        if (!error && data) {
          setApplication(data);
        } else {
          setNotFound(true);
        }
      } finally {
        setLoading(false);
      }
    };

    loadApplication();
  }, [user]);

  const applicationStatus = {
    current: application?.status || 'pending',
    steps: [
      { name: 'Application Submitted', status: application ? 'completed' : 'pending', date: application?.created_at || null, description: 'Your application has been received' },
      { name: 'Reviewed', status: application?.reviewed_at ? 'completed' : 'pending', date: application?.reviewed_at || null, description: 'Application reviewed by the team' },
      { name: 'Payment', status: application?.payment_status === 'paid' ? 'completed' : 'pending', date: null, description: 'Conference fee payment status' },
      { name: 'Confirmation', status: application?.status === 'approved' ? 'current' : 'pending', date: null, description: 'Application confirmation' },
      { name: 'Committee Allocation', status: application?.assigned_committee_id ? 'completed' : 'pending', date: null, description: 'Committee and country assignment' },
    ]
  };

  const paymentInfo = {
    amount: application?.payment_amount || 0,
    currency: 'USD',
    status: application?.payment_status || 'unpaid',
    transactionId: application?.payment_reference || 'Not available',
    paymentDate: application?.updated_at || 'Not available',
    method: 'Bank transfer',
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <p className="text-white/60">Loading your application...</p>
      </div>
    );
  }

  if (notFound || !application) {
    return (
      <motion.div
        className="space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
            My Application
          </h1>
          <p className="text-white/70">
            Manage your conference application and track progress
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-card p-8 text-center">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="h-8 w-8 text-gold-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No Application Found</h3>
          <p className="text-white/70 mb-6 max-w-md mx-auto">
            We couldn’t find an application associated with your account. Make sure you submitted the registration form with the same email you’re using to log in.
          </p>
          <motion.button
            className="bg-gold-500 hover:bg-gold-600 px-6 py-3 text-white transition-colors rounded-lg font-medium"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.location.href = '/register'}
          >
            Go to Registration
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
            My Application
          </h1>
          <p className="text-white/70">
            Manage your conference application and track progress
          </p>
        </div>
        <div className="flex items-center space-x-3 text-white/60 text-sm">
          This view is currently read-only and shows your submitted data.
        </div>
      </motion.div>

      {/* Application Status Timeline */}
      <motion.div variants={itemVariants} className="glass-card p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Application Status</h3>
            <p className="text-white/60 text-sm">Track your application progress</p>
          </div>
        </div>

        <div className="space-y-4">
          {applicationStatus.steps.map((step, index) => (
            <div key={step.name} className="flex items-start space-x-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${step.status === 'completed'
                  ? 'bg-green-500'
                  : step.status === 'current'
                    ? 'bg-gold-500'
                    : 'bg-white/20'
                }`}>
                {step.status === 'completed' ? (
                  <CheckCircle className="h-5 w-5 text-white" />
                ) : step.status === 'current' ? (
                  <Clock className="h-5 w-5 text-white" />
                ) : (
                  <div className="w-3 h-3 bg-white/50 rounded-full" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className={`text-sm font-medium ${step.status === 'completed' || step.status === 'current'
                      ? 'text-white'
                      : 'text-white/50'
                    }`}>
                    {step.name}
                  </p>
                  {step.date && (
                    <span className="text-xs text-white/40">{step.date}</span>
                  )}
                </div>
                <p className="text-xs text-white/60">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Personal Information */}
      <motion.div variants={itemVariants} className="glass-card p-6">
        <h3 className="text-lg font-semibold text-white mb-6">Personal Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Full Name</label>
            <p className="text-white bg-white/5 px-4 py-2 rounded-lg">{application?.full_name || user?.email || 'Not available'}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Email</label>
            <p className="text-white bg-white/5 px-4 py-2 rounded-lg">{application?.email || user?.email || 'Not available'}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Phone</label>
            <p className="text-white bg-white/5 px-4 py-2 rounded-lg">{application?.phone || 'Not provided'}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Institution</label>
            <p className="text-white bg-white/5 px-4 py-2 rounded-lg">{application?.institution || 'Not provided'}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Experience</label>
            <p className="text-white bg-white/5 px-4 py-2 rounded-lg capitalize">{application?.experience || 'Not provided'}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Country & City</label>
            <p className="text-white bg-white/5 px-4 py-2 rounded-lg">{application?.country || 'Not provided'}</p>
          </div>
        </div>
      </motion.div>

      {/* Committee Preferences */}
      <motion.div variants={itemVariants} className="glass-card p-6">
        <h3 className="text-lg font-semibold text-white mb-6">Committee Preferences</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">First Choice</label>
            <p className="text-gold-400 bg-white/5 px-4 py-2 rounded-lg font-medium">{application?.committee_preference1 || 'Not selected'}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Second Choice</label>
            <p className="text-white bg-white/5 px-4 py-2 rounded-lg">{application?.committee_preference2 || 'Not selected'}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Third Choice</label>
            <p className="text-white bg-white/5 px-4 py-2 rounded-lg">{application?.committee_preference3 || 'Not selected'}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
