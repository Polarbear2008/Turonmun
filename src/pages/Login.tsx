import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { CustomButton } from '../components/ui/custom-button';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const navigate = useNavigate();
  const { login, isLoading, error, setError } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');

    const result = await login(formData.email, formData.password);

    if (result.success) {
      setSuccessMessage('Login successful! Redirecting...');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="page-transition-container min-h-screen flex flex-col bg-gradient-to-b from-white to-diplomatic-50">
      <Navbar />
      <main className="flex-grow pt-20 pb-12 flex items-center justify-center">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-md mx-auto"
          >
            {/* Header */}
            <motion.div variants={itemVariants} className="text-center mb-8">
              <h1 className="text-4xl font-bold text-diplomatic-900 mb-2">Welcome Back</h1>
              <p className="text-neutral-600">Sign in to your TuronMUN account</p>
            </motion.div>

            {/* Error Message */}
            {error && (
              <motion.div
                variants={itemVariants}
                className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3 mb-6"
              >
                <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <p className="text-red-800 font-medium">Login Failed</p>
                  <p className="text-red-700 text-sm">{error.message}</p>
                </div>
              </motion.div>
            )}

            {/* Success Message */}
            {successMessage && (
              <motion.div
                variants={itemVariants}
                className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3 mb-6"
              >
                <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                <p className="text-green-800">{successMessage}</p>
              </motion.div>
            )}

            {/* Form Card */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-elegant border border-neutral-100 p-8"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 text-diplomatic-500" size={20} />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-diplomatic-500 focus:border-transparent transition-all"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3.5 text-diplomatic-500" size={20} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-10 pr-12 py-3 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-diplomatic-500 focus:border-transparent transition-all"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3.5 text-neutral-500 hover:text-neutral-700"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-neutral-300" />
                    <span className="text-neutral-600">Remember me</span>
                  </label>
                  <a href="#" className="text-diplomatic-600 hover:text-diplomatic-700 font-medium">
                    Forgot password?
                  </a>
                </div>

                {/* Submit Button */}
                <CustomButton
                  type="submit"
                  variant="accent"
                  size="lg"
                  disabled={isLoading}
                  className="w-full group"
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                  {!isLoading && <ArrowRight className="transition-transform group-hover:translate-x-1" size={18} />}
                </CustomButton>
              </form>

            </motion.div>

            {/* Sign Up Link */}
            <motion.div variants={itemVariants} className="text-center mt-6">
              <p className="text-neutral-600">
                Don't have an account?{' '}
                <Link to="/signup" className="text-diplomatic-600 hover:text-diplomatic-700 font-semibold">
                  Sign up
                </Link>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
