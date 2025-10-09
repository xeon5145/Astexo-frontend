"use client";

import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SimpleChart from "./SimpleChart";
import MetricCard from "./MetricCard";
import ReportExport from "./ReportExport";
import {
  Calendar,
  Download,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Users,
  Activity,
  BarChart3,
  PieChart,
  Filter,
  DateRange
} from "lucide-react";

interface AnalyticsData {
  userGrowth: { label: string; value: number }[];
  dailyActiveUsers: { label: string; value: number }[];
  pageViews: { label: string; value: number }[];
  conversionRates: { label: string; value: number }[];
  topPages: { page: string; views: number; percentage: number }[];
  userDemographics: { category: string; value: number; color: string }[];
  metrics: {
    totalUsers: number;
    activeUsers: number;
    pageViews: number;
    bounceRate: number;
    avgSessionDuration: string;
    conversionRate: number;
  };
}

type DateRange = '7d' | '30d' | '90d' | '1y' | 'custom';

export default function Analytics() {
  const [isLoading, setIsLoading] = useState(true);
  const [dateRange, setDateRange] = useState<DateRange>('30d');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);

  // Mock analytics data generation
  const generateMockData = (range: DateRange): AnalyticsData => {
    const days = range === '7d' ? 7 : range === '30d' ? 30 : range === '90d' ? 90 : 365;
    
    // Generate user growth data
    const userGrowth = Array.from({ length: Math.min(days, 12) }, (_, i) => ({
      label: range === '7d' ? `Day ${i + 1}` : 
             range === '30d' ? `Week ${i + 1}` :
             range === '90d' ? `Month ${i + 1}` : `Q${i + 1}`,
      value: Math.floor(Math.random() * 500) + 1000 + (i * 50)
    }));

    // Generate daily active users
    const dailyActiveUsers = Array.from({ length: Math.min(days, 14) }, (_, i) => ({
      label: range === '7d' ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i] || `Day ${i + 1}` :
             `${i + 1}`,
      value: Math.floor(Math.random() * 200) + 50 + (Math.sin(i) * 30)
    }));

    // Generate page views
    const pageViews = Array.from({ length: Math.min(days, 10) }, (_, i) => ({
      label: `Page ${i + 1}`,
      value: Math.floor(Math.random() * 1000) + 500
    }));

    // Generate conversion rates
    const conversionRates = Array.from({ length: 6 }, (_, i) => ({
      label: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i],
      value: Math.floor(Math.random() * 10) + 2
    }));

    return {
      userGrowth,
      dailyActiveUsers,
      pageViews,
      conversionRates,
      topPages: [
        { page: '/dashboard', views: 15420, percentage: 28.5 },
        { page: '/products', views: 12350, percentage: 22.8 },
        { page: '/about', views: 8940, percentage: 16.5 },
        { page: '/contact', views: 6780, percentage: 12.5 },
        { page: '/blog', views: 5210, percentage: 9.6 },
        { page: '/pricing', views: 3890, percentage: 7.2 },
        { page: '/support', views: 1580, percentage: 2.9 }
      ],
      userDemographics: [
        { category: 'Desktop', value: 65, color: '#3b82f6' },
        { category: 'Mobile', value: 28, color: '#10b981' },
        { category: 'Tablet', value: 7, color: '#f59e0b' }
      ],
      metrics: {
        totalUsers: Math.floor(Math.random() * 10000) + 50000,
        activeUsers: Math.floor(Math.random() * 1000) + 2000,
        pageViews: Math.floor(Math.random() * 100000) + 500000,
        bounceRate: Math.floor(Math.random() * 20) + 25,
        avgSessionDuration: `${Math.floor(Math.random() * 5) + 2}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
        conversionRate: Math.floor(Math.random() * 5) + 3
      }
    };
  };

  useEffect(() => {
    const fetchAnalytics = async () => {
      setIsLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const data = generateMockData(dateRange);
      setAnalyticsData(data);
      setIsLoading(false);
    };

    fetchAnalytics();
  }, [dateRange]);

  const handleDateRangeChange = (range: DateRange) => {
    setDateRange(range);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      if (analyticsData) {
        setAnalyticsData(generateMockData(dateRange));
      }
      setIsLoading(false);
    }, 500);
  };

  const getDateRangeLabel = (range: DateRange) => {
    switch (range) {
      case '7d': return 'Last 7 days';
      case '30d': return 'Last 30 days';
      case '90d': return 'Last 90 days';
      case '1y': return 'Last year';
      case 'custom': return 'Custom range';
      default: return 'Last 30 days';
    }
  };

  if (!analyticsData) {
    return <div>Loading analytics...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header with Date Range Selector */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-medium">Analytics & Reports</h3>
          <p className="text-sm text-muted-foreground">
            Comprehensive insights into your application's performance
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                {getDateRangeLabel(dateRange)}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Select Date Range</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleDateRangeChange('7d')}>
                Last 7 days
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDateRangeChange('30d')}>
                Last 30 days
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDateRangeChange('90d')}>
                Last 90 days
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDateRangeChange('1y')}>
                Last year
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleDateRangeChange('custom')}>
                Custom range
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          
          <Button size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Custom Date Range Inputs */}
      {dateRange === 'custom' && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium text-card-foreground">Start Date</label>
                <Input
                  type="date"
                  value={customStartDate}
                  onChange={(e) => setCustomStartDate(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium text-card-foreground">End Date</label>
                <Input
                  type="date"
                  value={customEndDate}
                  onChange={(e) => setCustomEndDate(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div className="flex items-end">
                <Button size="sm">Apply Range</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <MetricCard
          title="Total Users"
          value={analyticsData.metrics.totalUsers}
          description="All registered users"
          icon={Users}
          trend={{ value: 12, isPositive: true }}
          isLoading={isLoading}
        />
        <MetricCard
          title="Active Users"
          value={analyticsData.metrics.activeUsers}
          description="Currently active"
          icon={Activity}
          trend={{ value: 8, isPositive: true }}
          isLoading={isLoading}
        />
        <MetricCard
          title="Page Views"
          value={analyticsData.metrics.pageViews.toLocaleString()}
          description="Total page views"
          icon={BarChart3}
          trend={{ value: 15, isPositive: true }}
          isLoading={isLoading}
        />
        <MetricCard
          title="Bounce Rate"
          value={`${analyticsData.metrics.bounceRate}%`}
          description="Users who left quickly"
          icon={TrendingDown}
          trend={{ value: 3, isPositive: false }}
          isLoading={isLoading}
        />
        <MetricCard
          title="Avg. Session"
          value={analyticsData.metrics.avgSessionDuration}
          description="Average session time"
          icon={Activity}
          trend={{ value: 5, isPositive: true }}
          isLoading={isLoading}
        />
        <MetricCard
          title="Conversion Rate"
          value={`${analyticsData.metrics.conversionRate}%`}
          description="Goal completions"
          icon={TrendingUp}
          trend={{ value: 2, isPositive: true }}
          isLoading={isLoading}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SimpleChart
          title="User Growth Trend"
          data={analyticsData.userGrowth}
          type="line"
        />
        <SimpleChart
          title="Daily Active Users"
          data={analyticsData.dailyActiveUsers}
          type="bar"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SimpleChart
          title="Page Views by Content"
          data={analyticsData.pageViews}
          type="bar"
        />
        <SimpleChart
          title="Conversion Rate Trend"
          data={analyticsData.conversionRates}
          type="line"
        />
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Top Pages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.topPages.map((page, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-card-foreground truncate">
                      {page.page}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-500"
                          style={{ width: `${page.percentage}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {page.percentage}%
                      </span>
                    </div>
                  </div>
                  <div className="ml-4 text-right">
                    <p className="text-sm font-medium text-card-foreground">
                      {page.views.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">views</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* User Demographics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              User Demographics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.userDemographics.map((demo, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: demo.color }}
                    />
                    <span className="text-sm font-medium text-card-foreground">
                      {demo.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-muted rounded-full h-2">
                      <div 
                        className="h-2 rounded-full transition-all duration-500"
                        style={{ 
                          width: `${demo.value}%`,
                          backgroundColor: demo.color 
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium text-card-foreground w-10 text-right">
                      {demo.value}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Report Export */}
        <ReportExport 
          dateRange={getDateRangeLabel(dateRange)}
          analyticsData={analyticsData}
        />
      </div>
    </div>
  );
}