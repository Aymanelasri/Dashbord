import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { 
  UserGroupIcon, CurrencyDollarIcon, ShoppingBagIcon, ClockIcon,
  ArrowTrendingUpIcon, ArrowTrendingDownIcon
} from '@heroicons/react/24/outline';
import dataService from '../services/dataService';

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const stats = dataService.getDashboardStats();
    const weeklySales = dataService.getWeeklySales();
    const categoryData = dataService.getCategoryData();
    const recentActivity = dataService.getRecentActivity();
    
    setDashboardData({ stats, weeklySales, categoryData, recentActivity });
  }, []);

  if (!dashboardData) return <div className="p-4">Loading...</div>;

  const stats = [
    { 
      title: 'Total Revenue', 
      value: `$${dashboardData.stats.totalRevenue}`, 
      change: '+20.1%',
      trend: 'up',
      icon: CurrencyDollarIcon, 
      color: 'success',
      bgColor: 'bg-success'
    },
    { 
      title: 'Total Users', 
      value: dashboardData.stats.totalUsers, 
      change: '+15.3%',
      trend: 'up',
      icon: UserGroupIcon, 
      color: 'primary',
      bgColor: 'bg-primary'
    },
    { 
      title: 'Total Orders', 
      value: dashboardData.stats.totalOrders, 
      change: '+8.2%',
      trend: 'up',
      icon: ShoppingBagIcon, 
      color: 'info',
      bgColor: 'bg-info'
    },
    { 
      title: 'Pending Orders', 
      value: dashboardData.stats.pendingOrders, 
      change: '-3.5%',
      trend: 'down',
      icon: ClockIcon, 
      color: 'warning',
      bgColor: 'bg-warning'
    },
  ];

  const revenueData = [
    { month: 'Jan', revenue: 4000, orders: 240 },
    { month: 'Feb', revenue: 3000, orders: 198 },
    { month: 'Mar', revenue: 5000, orders: 320 },
    { month: 'Apr', revenue: 4500, orders: 280 },
    { month: 'May', revenue: 6000, orders: 390 },
    { month: 'Jun', revenue: 5500, orders: 350 },
  ];

  const salesData = dashboardData.weeklySales;
  const categoryData = dashboardData.categoryData;
  const recentActivity = dashboardData.recentActivity;

  return (
    <div className="p-4">
      <div className="mb-4">
        <h1 className="h2 fw-bold mb-1">Dashboard Overview</h1>
        <p className="text-muted mb-0">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Cards */}
      <div className="row g-3 mb-4">
        {stats.map((stat, index) => (
          <div key={index} className="col-12 col-sm-6 col-xl-3">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div className={`${stat.bgColor} bg-opacity-10 rounded-3 p-3`}>
                    <stat.icon className={`text-${stat.color}`} style={{width: '24px', height: '24px'}} />
                  </div>
                  <div className={`badge ${stat.trend === 'up' ? 'bg-success' : 'bg-danger'} bg-opacity-10 text-${stat.trend === 'up' ? 'success' : 'danger'} d-flex align-items-center gap-1`}>
                    {stat.trend === 'up' ? <ArrowTrendingUpIcon style={{width: '12px', height: '12px'}} /> : <ArrowTrendingDownIcon style={{width: '12px', height: '12px'}} />}
                    {stat.change}
                  </div>
                </div>
                <h6 className="text-muted small mb-1">{stat.title}</h6>
                <h3 className="fw-bold mb-0">{stat.value}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="row g-4 mb-4">
        {/* Revenue Chart */}
        <div className="col-12 col-xl-8">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h5 className="fw-semibold mb-1">Revenue Overview</h5>
                  <small className="text-muted">Monthly revenue and orders</small>
                </div>
                <div className="btn-group btn-group-sm">
                  <button className="btn btn-outline-primary active">6M</button>
                  <button className="btn btn-outline-primary">1Y</button>
                  <button className="btn btn-outline-primary">All</button>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0d6efd" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#0d6efd" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#999" style={{fontSize: '12px'}} />
                  <YAxis stroke="#999" style={{fontSize: '12px'}} />
                  <Tooltip />
                  <Area type="monotone" dataKey="revenue" stroke="#0d6efd" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="col-12 col-xl-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <h5 className="fw-semibold mb-1">Sales by Category</h5>
              <small className="text-muted d-block mb-3">Distribution overview</small>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-3">
                {categoryData.map((cat, index) => (
                  <div key={index} className="d-flex justify-content-between align-items-center mb-2">
                    <div className="d-flex align-items-center">
                      <div className="rounded-circle me-2" style={{width: '10px', height: '10px', backgroundColor: cat.color}}></div>
                      <span className="small">{cat.name}</span>
                    </div>
                    <span className="fw-semibold small">{cat.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="row g-4">
        {/* Weekly Sales */}
        <div className="col-12 col-lg-7">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h5 className="fw-semibold mb-1">Weekly Sales</h5>
              <small className="text-muted d-block mb-3">Last 7 days performance</small>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="day" stroke="#999" style={{fontSize: '12px'}} />
                  <YAxis stroke="#999" style={{fontSize: '12px'}} />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#198754" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="col-12 col-lg-5">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h5 className="fw-semibold mb-3">Recent Activity</h5>
              <div className="list-group list-group-flush">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="list-group-item border-0 px-0 py-3">
                    <div className="d-flex justify-content-between align-items-start">
                      <div className="d-flex align-items-start">
                        <div className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px', minWidth: '40px'}}>
                          <span className="fw-bold text-primary">{activity.user.charAt(0)}</span>
                        </div>
                        <div>
                          <div className="fw-semibold small">{activity.user}</div>
                          <small className="text-muted">{activity.action}</small>
                          <div className="text-muted small">{activity.time}</div>
                        </div>
                      </div>
                      {activity.amount !== '-' && (
                        <span className="badge bg-success">{activity.amount}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
