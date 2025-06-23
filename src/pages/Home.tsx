
import React, { useState, useEffect } from 'react';
import { AppLayout } from '@/components/Layout/AppLayout';
import { StatCard } from '@/components/UI/StatCard';
import { Package, AlertTriangle, Clock, X, Activity } from 'lucide-react';
import { PantryItem } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Home = () => {
  const [pantryStats, setPantryStats] = useState({
    total: 0,
    expiringSoon: 0,
    expiringToday: 0,
    expired: 0,
  });
  const [expiringItems, setExpiringItems] = useState<PantryItem[]>([]);
  const [recentActivity, setRecentActivity] = useState<string[]>([]);

  useEffect(() => {
    // TODO: Replace with actual API calls to PantryPal backend
    fetchPantryStats();
    fetchExpiringItems();
    fetchRecentActivity();
  }, []);

  const fetchPantryStats = async () => {
    try {
      // TODO: API Call to GET /pantry/stats endpoint
      console.log('API Call: GET /pantry/stats');
      
      // Mock data - replace with actual API call
      setPantryStats({
        total: 24,
        expiringSoon: 3,
        expiringToday: 1,
        expired: 0,
      });
    } catch (error) {
      console.error('Failed to fetch pantry stats:', error);
    }
  };

  const fetchExpiringItems = async () => {
    try {
      // TODO: API Call to GET /pantry/expiring endpoint
      console.log('API Call: GET /pantry/expiring');
      
      // Mock data - replace with actual API call
      const mockItems: PantryItem[] = [
        {
          id: '1',
          name: 'Milk',
          category: 'dairy',
          quantity: 1,
          purchaseDate: '2024-06-20',
          expiryDate: '2024-06-25',
          status: 'expiring-today',
        },
        {
          id: '2',
          name: 'Bananas',
          category: 'fruits',
          quantity: 6,
          purchaseDate: '2024-06-21',
          expiryDate: '2024-06-26',
          status: 'expiring-soon',
        },
      ];
      setExpiringItems(mockItems);
    } catch (error) {
      console.error('Failed to fetch expiring items:', error);
    }
  };

  const fetchRecentActivity = async () => {
    try {
      // TODO: API Call to GET /user/activity endpoint
      console.log('API Call: GET /user/activity');
      
      // Mock data - replace with actual API call
      setRecentActivity([
        'Added 3 new items to pantry',
        'Generated 5 recipe recommendations',
        'Updated expiry date for Yogurt',
        'Marked expired items for disposal',
      ]);
    } catch (error) {
      console.error('Failed to fetch recent activity:', error);
    }
  };

  return (
    <AppLayout>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back! 👋</h1>
          <p className="text-gray-600 mt-2">Here's what's happening in your pantry today</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Items"
            value={pantryStats.total}
            icon={Package}
            color="blue"
          />
          <StatCard
            title="Expiring Soon"
            value={pantryStats.expiringSoon}
            icon={Clock}
            color="orange"
            description="Within 3 days"
          />
          <StatCard
            title="Expiring Today"
            value={pantryStats.expiringToday}
            icon={AlertTriangle}
            color="red"
            description="Use immediately"
          />
          <StatCard
            title="Expired"
            value={pantryStats.expired}
            icon={X}
            color="red"
            description="Need attention"
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Expiring Items Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="text-orange-500" size={20} />
                Items Expiring Soon
              </CardTitle>
            </CardHeader>
            <CardContent>
              {expiringItems.length > 0 ? (
                <div className="space-y-3">
                  {expiringItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-600 capitalize">{item.category} • Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-orange-600">
                          {item.status === 'expiring-today' ? 'Today' : 'Soon'}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(item.expiryDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-4xl mb-2">🎉</div>
                  <p className="text-gray-600">Great! No items expiring soon.</p>
                  <p className="text-sm text-gray-500">Your pantry is well managed!</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="text-blue-500" size={20} />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <p className="text-sm text-gray-700">{activity}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Home;
