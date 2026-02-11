import React, { useState, useEffect } from 'react';
import { BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CurrencyDollarIcon, ArrowTrendingUpIcon, CalculatorIcon, ClipboardDocumentListIcon, BanknotesIcon } from '@heroicons/react/24/outline';
import dataService from '../services/dataService';

function FinancialAnalytics() {
  const [activeTab, setActiveTab] = useState('area');
  const [analyticsData, setAnalyticsData] = useState(null);

  useEffect(() => {
    const stats = dataService.getDashboardStats();
    const weeklySales = dataService.getWeeklySales();
    const categoryData = dataService.getCategoryData();
    
    setAnalyticsData({ stats, weeklySales, categoryData });
  }, []);

  if (!analyticsData) return <div className="p-4">Loading...</div>;

  const { stats, weeklySales, categoryData } = analyticsData;

  const kpiMetrics = [
    { label: 'Total Revenue', value: `$${stats.totalRevenue}`, icon: CurrencyDollarIcon, trend: '+12%', color: 'success' },
    { label: 'Total Orders', value: stats.totalOrders, icon: CalculatorIcon, trend: '+8%', color: 'warning' },
    { label: 'Avg Order Value', value: `$${stats.avgOrderValue}`, icon: ClipboardDocumentListIcon, trend: '+5%', color: 'info' },
    { label: 'Total Users', value: stats.totalUsers, icon: BanknotesIcon, trend: '+15%', color: 'primary' },
  ];

  return (
    <div className="p-4">
      <div className="mb-4">
        <h1 className="h2 fw-bold mb-1">💰 Financial Analytics</h1>
        <p className="text-muted mb-0">Business intelligence and financial insights</p>
      </div>

      <div className="row g-3 mb-4">
        {kpiMetrics.map((metric, index) => (
          <div key={index} className="col-6 col-lg-3">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <div className="d-flex align-items-center mb-2">
                      <metric.icon className={`text-${metric.color} me-2`} style={{width: '18px', height: '18px'}} />
                      <h6 className="mb-0 text-muted small">{metric.label}</h6>
                    </div>
                    <h3 className="fw-bold mb-1">{metric.value}</h3>
                    <div className="d-flex align-items-center">
                      <ArrowTrendingUpIcon className="text-success me-1" style={{width: '12px', height: '12px'}} />
                      <small className="text-success">{metric.trend}</small>
                    </div>
                  </div>
                  <div className={`bg-${metric.color} bg-opacity-10 rounded-circle p-2`}>
                    <metric.icon className={`text-${metric.color}`} style={{width: '20px', height: '20px'}} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-header bg-transparent border-0">
          <ul className="nav nav-tabs card-header-tabs">
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'area' ? 'active' : ''}`}
                onClick={() => setActiveTab('area')}
              >
                📊 Revenue Growth
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'donut' ? 'active' : ''}`}
                onClick={() => setActiveTab('donut')}
              >
                🍩 Category Analysis
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'line' ? 'active' : ''}`}
                onClick={() => setActiveTab('line')}
              >
                📈 Performance Trends
              </button>
            </li>
          </ul>
        </div>
        <div className="card-body">
          {activeTab === 'area' && (
            <div className="row g-4">
              <div className="col-12">
                <h5 className="fw-semibold mb-3">Weekly Revenue & Orders Growth</h5>
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={weeklySales}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#198754" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#198754" stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0d6efd" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#0d6efd" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="day" stroke="#666" style={{ fontSize: '14px' }} />
                    <YAxis stroke="#666" style={{ fontSize: '14px' }} />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="revenue" stroke="#198754" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" name="Revenue ($)" />
                    <Area type="monotone" dataKey="orders" stroke="#0d6efd" strokeWidth={3} fillOpacity={1} fill="url(#colorOrders)" name="Orders" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {activeTab === 'donut' && (
            <div className="row g-4">
              <div className="col-12 col-lg-6 mx-auto">
                <h5 className="fw-semibold mb-3 text-center">Product Category Distribution</h5>
                <ResponsiveContainer width="100%" height={400}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={140}
                      paddingAngle={8}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                      labelLine={true}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="#fff" strokeWidth={3} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4">
                  <div className="row g-3">
                    {categoryData.map((cat, index) => (
                      <div key={index} className="col-6">
                        <div className="card border-0 shadow-sm">
                          <div className="card-body p-3">
                            <div className="d-flex align-items-center mb-2">
                              <div style={{width: '16px', height: '16px', backgroundColor: cat.color, borderRadius: '50%', marginRight: '10px'}}></div>
                              <span className="fw-semibold">{cat.name}</span>
                            </div>
                            <h4 className="mb-0" style={{ color: cat.color }}>{cat.value}%</h4>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'line' && (
            <div className="row g-4">
              <div className="col-12">
                <h5 className="fw-semibold mb-3">Revenue & Orders Performance Trends</h5>
                <ResponsiveContainer width="100%" height={380}>
                  <BarChart data={weeklySales}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="day" stroke="#666" style={{ fontSize: '13px' }} />
                    <YAxis stroke="#666" style={{ fontSize: '13px' }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="revenue" fill="#198754" name="Revenue ($)" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="orders" fill="#0d6efd" name="Orders" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="customers" fill="#dc3545" name="Customers" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
                <div className="mt-4">
                  <div className="row g-3">
                    <div className="col-md-4">
                      <div className="card border-0 shadow-sm" style={{ borderLeft: '4px solid #198754' }}>
                        <div className="card-body">
                          <small className="text-muted d-block mb-1">Total Revenue</small>
                          <h3 className="mb-0 fw-bold text-success">
                            ${weeklySales.reduce((sum, day) => sum + (day.revenue || 0), 0)}
                          </h3>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="card border-0 shadow-sm" style={{ borderLeft: '4px solid #0d6efd' }}>
                        <div className="card-body">
                          <small className="text-muted d-block mb-1">Total Orders</small>
                          <h3 className="mb-0 fw-bold text-primary">
                            {weeklySales.reduce((sum, day) => sum + (day.orders || 0), 0)}
                          </h3>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="card border-0 shadow-sm" style={{ borderLeft: '4px solid #dc3545' }}>
                        <div className="card-body">
                          <small className="text-muted d-block mb-1">Total Customers</small>
                          <h3 className="mb-0 fw-bold text-danger">
                            {weeklySales.reduce((sum, day) => sum + (day.customers || 0), 0)}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FinancialAnalytics;
