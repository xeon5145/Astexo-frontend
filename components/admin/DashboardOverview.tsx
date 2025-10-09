"use client";

import { useState, useEffect } from "react";
import MetricCard from "./MetricCard";
import SimpleChart from "./SimpleChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Activity, 
  UserPlus, 
  Shield,
  RefreshCw,
  AlertTriangle,
  TrendingUp,
  Clock
} from "lucide-react";

interface DashboardMetrics {
  totalUsers: number;
  activeUsers: number;
  newSignupsToday: number;
  systemHealth: 'healthy' | 'warning' | 'critical';
}

interface RecentActivity {
  id: string;
  type: 'user_signup' | 'user_login' | 'system_alert';
  message: string;
  timestamp: Date;
}

export default function DashboardOverview() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Mock chart data
  const userGrowthData = [
    { label: 'Jan', value: 1200 },
    { label: 'Feb', value: 1180 },
    { label: 'Mar', value: 1220 },
    { label: 'Apr', value: 1240 },
    { label: 'May', value: 1247 }
  ];

  const dailyActiveUsersData = [
    { label: 'Mon', value: 85 },
    { label: 'Tue', value: 92 },
    { label: 'Wed', value: 78 },
    { label: 'Thu', value: 89 },
    { label: 'Fri', value: 95 },
    { label: 'Sat', value: 67 },
    { label: 'Sun', value: 73 }
  ];

  // Simulate API call to fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      setMetrics({
        totalUsers: 1247,
        activeUsers: 89,
        newSignupsToday: 12,
        systemHealth: 'healthy'
      });

      setRecentActivity([
        {
          id: '1',
          type: 'user_signup',
          message: 'New user registered: john@example.com',
          timestamp: new Date(Date.now() - 5 * 60 * 1000) // 5 minutes ago
        },
        {
          id: '2',
          type: 'user_login',
          message: 'User login: sarah@example.com',
          timestamp: new Date(Date.now() - 15 * 60 * 1000) // 15 minutes ago
        },
        {
          id: '3',
          type: 'system_alert',
          message: 'Database backup completed successfully',
          timestamp: new Date(Date.now() - 30 * 60 * 1000) // 30 minutes ago
        },
        {
          id: '4',
          type: 'user_signup',
          message: 'New user registered: mike@example.com',
          timestamp: new Date(Date.now() - 45 * 60 * 1000) // 45 minutes ago
        }
      ]);

      setIsLoading(false);
    };

    fetchDashboardData();
  }, []);

  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate refresh
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const getSystemHealthColor = (health: string) => {
    switch (health) {
      case 'healthy': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      default: return 'text-muted-foreground';
    }
  };

  const getSystemHealthIcon = (health: string) => {
    switch (health) {
      case 'healthy': return '✅';
      case 'warning': return '⚠️';
      case 'critical': return '🚨';
      default: return '❓';
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <div className="space-y-6">
      {/* Header with refresh button */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Dashboard Overview</h3>
          <p className="text-sm text-muted-foreground">
            Monitor your application's key metrics and recent activity
          </p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleRefresh}
          disabled={isLoading}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Users"
          value={metrics?.totalUsers || 0}
          description="Registered users"
          icon={Users}
          trend={{ value: 12, isPositive: true }}
          isLoading={isLoading}
        />
        <MetricCard
          title="Active Sessions"
          value={metrics?.activeUsers || 0}
          description="Currently online"
          icon={Activity}
          trend={{ value: 5, isPositive: true }}
          isLoading={isLoading}
        />
        <MetricCard
          title="New Signups Today"
          value={metrics?.newSignupsToday || 0}
          description="New registrations"
          icon={UserPlus}
          trend={{ value: 8, isPositive: false }}
          isLoading={isLoading}
        />
        <MetricCard
          title="System Health"
          value={
            <div className="flex items-center gap-2">
              <span>{getSystemHealthIcon(metrics?.systemHealth || 'healthy')}</span>
              <span className={getSystemHealthColor(metrics?.systemHealth || 'healthy')}>
                {metrics?.systemHealth || 'Loading...'}
              </span>
            </div>
          }
          description="Overall system status"
          icon={Shield}
          isLoading={isLoading}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SimpleChart
          title="User Growth (Last 5 Months)"
          data={userGrowthData}
          type="line"
        />
        <SimpleChart
          title="Daily Active Users (This Week)"
          data={dailyActiveUsersData}
          type="bar"
        />
      </div>

      {/* System Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Response Time</span>
                <span className="font-medium">245ms</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '85%' }} />
              </div>
              <p className="text-xs text-muted-foreground">Excellent performance</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Shield className="h-4 w-4 text-blue-600" />
              Security
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Threat Level</span>
                <span className="font-medium text-green-600">Low</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '95%' }} />
              </div>
              <p className="text-xs text-muted-foreground">All systems secure</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Clock className="h-4 w-4 text-orange-600" />
              Uptime
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Last 30 days</span>
                <span className="font-medium">99.9%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '99%' }} />
              </div>
              <p className="text-xs text-muted-foreground">Excellent uptime</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="h-2 w-2 bg-muted animate-pulse rounded-full" />
                  <div className="flex-1">
                    <div className="h-4 w-3/4 bg-muted animate-pulse rounded mb-1" />
                    <div className="h-3 w-1/4 bg-muted animate-pulse rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : recentActivity.length > 0 ? (
            <div className="space-y-3">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 pb-3 border-b border-border last:border-0 last:pb-0">
                  <div className={`h-2 w-2 rounded-full mt-2 ${
                    activity.type === 'user_signup' ? 'bg-green-500' :
                    activity.type === 'user_login' ? 'bg-blue-500' :
                    'bg-yellow-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-card-foreground">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatTimeAgo(activity.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <AlertTriangle className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">No recent activity</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}