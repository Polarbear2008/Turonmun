import React, { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import {
  BarChart3,
  TrendingUp,
  Users,
  Globe,
  School,
  MapPin,
  Award,
  Loader2
} from 'lucide-react';

interface AnalyticsData {
  totalRegistrations: number;
  schoolsCount: number;
  countriesCount: number;
  acceptanceRate: number;
  committeeDistribution: { name: string; delegates: number; percentage: number }[];
  statusDistribution: { status: string; count: number; color: string }[];
  paymentDistribution: { status: string; count: number; color: string }[];
}

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<AnalyticsData>({
    totalRegistrations: 0,
    schoolsCount: 0,
    countriesCount: 0,
    acceptanceRate: 0,
    committeeDistribution: [],
    statusDistribution: [],
    paymentDistribution: []
  });

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      // Fetch applications with necessary fields
      const { data: applications, error } = await supabase
        .from('applications')
        .select('id, institution, country, status, payment_status, assigned_committee_id');

      if (error) throw error;

      // Fetch committees for mapping
      const { data: committees } = await supabase
        .from('committees')
        .select('id, name');

      if (!applications) return;

      // Calculate metrics
      const total = applications.length;
      const schools = new Set(applications.map(a => a.institution?.trim().toLowerCase())).size;
      const countries = new Set(applications.map(a => a.country?.trim().toLowerCase())).size;
      const approved = applications.filter(a => a.status === 'approved').length;
      const acceptanceRate = total > 0 ? Math.round((approved / total) * 100) : 0;

      // Status Distribution
      const statusCounts = applications.reduce((acc, app) => {
        const status = app.status || 'pending';
        acc[status] = (acc[status] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const statusDistribution = [
        { status: 'Approved', count: statusCounts['approved'] || 0, color: 'bg-green-500' },
        { status: 'Pending', count: statusCounts['pending'] || 0, color: 'bg-yellow-500' },
        { status: 'Waitlisted', count: statusCounts['waitlisted'] || 0, color: 'bg-blue-500' },
        { status: 'Rejected', count: statusCounts['rejected'] || 0, color: 'bg-red-500' }
      ];

      // Payment Distribution
      const paymentCounts = applications.reduce((acc, app) => {
        const status = app.payment_status || 'pending';
        acc[status] = (acc[status] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const paymentDistribution = [
        { status: 'Paid', count: paymentCounts['paid'] || 0, color: 'bg-green-500' },
        { status: 'Pending', count: paymentCounts['pending'] || 0, color: 'bg-yellow-500' },
        { status: 'Refunded', count: paymentCounts['refunded'] || 0, color: 'bg-red-500' }
      ];

      // Committee Distribution
      const committeeMap = new Map(committees?.map(c => [c.id, c.name]));
      const committeeCounts = applications.reduce((acc, app) => {
        const committeeId = app.assigned_committee_id;
        let name = 'Unassigned';
        if (committeeId && committeeMap.has(committeeId)) {
          name = committeeMap.get(committeeId)!;
        }
        acc[name] = (acc[name] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const committeeDistribution = Object.entries(committeeCounts)
        .map(([name, count]) => ({
          name,
          delegates: count,
          percentage: total > 0 ? Math.round((count / total) * 100) : 0
        }))
        .sort((a, b) => b.delegates - a.delegates);

      setData({
        totalRegistrations: total,
        schoolsCount: schools,
        countriesCount: countries,
        acceptanceRate,
        committeeDistribution,
        statusDistribution,
        paymentDistribution
      });

    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout title="Analytics Dashboard">
        <div className="flex items-center justify-center h-96">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Analytics Dashboard">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Analytics Dashboard</h2>
          <p className="text-gray-600">Real-time registration trends and insights</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Registrations</p>
                <p className="text-2xl font-semibold text-gray-900">{data.totalRegistrations}</p>
                <p className="text-xs text-blue-600">Live data</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Schools Participating</p>
                <p className="text-2xl font-semibold text-gray-900">{data.schoolsCount}</p>
                <p className="text-xs text-green-600">Diverse representation</p>
              </div>
              <School className="h-8 w-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Countries Represented</p>
                <p className="text-2xl font-semibold text-gray-900">{data.countriesCount}</p>
                <p className="text-xs text-purple-600">Global reach</p>
              </div>
              <Globe className="h-8 w-8 text-purple-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Acceptance Rate</p>
                <p className="text-2xl font-semibold text-gray-900">{data.acceptanceRate}%</p>
                <p className="text-xs text-orange-600">Based on approvals</p>
              </div>
              <Award className="h-8 w-8 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Committee Distribution */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Committee Assignments</h3>
              <Globe className="h-5 w-5 text-blue-500" />
            </div>
            <div className="space-y-4">
              {data.committeeDistribution.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No committee assignments yet.</p>
              ) : (
                data.committeeDistribution.map((committee) => (
                  <div key={committee.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm font-medium text-gray-900">{committee.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${committee.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{committee.delegates}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Application Status */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Status</h3>
            <div className="space-y-3">
              {data.statusDistribution.map((item) => (
                <div key={item.status} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 ${item.color} rounded-full`}></div>
                    <span className="text-sm font-medium text-gray-900 capitalize">{item.status}</span>
                  </div>
                  <span className="text-sm text-gray-600">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Payment Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Status</h3>
            <div className="space-y-3">
              {data.paymentDistribution.map((item) => (
                <div key={item.status} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 ${item.color} rounded-full`}></div>
                    <span className="text-sm font-medium text-gray-900 capitalize">{item.status}</span>
                  </div>
                  <span className="text-sm text-gray-600">{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6 flex flex-col justify-center items-center text-center">
            <TrendingUp className="h-12 w-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">More Insights Coming Soon</h3>
            <p className="text-gray-500 max-w-xs mt-2">
              Advanced analytics for geographic distribution and timeline trends will be available in the next update.
            </p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Analytics;
