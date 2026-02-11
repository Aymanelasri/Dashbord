import React, { useState } from 'react';
import { UserIcon, ShieldCheckIcon, BellIcon, KeyIcon } from '@heroicons/react/24/outline';

function Settings() {
  const [activeTab, setActiveTab] = useState('account');
  const [profile, setProfile] = useState({
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin'
  });
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    twoFactorAuth: false
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSettingsChange = (e) => {
    const { name, checked } = e.target;
    setSettings(prev => ({ ...prev, [name]: checked }));
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    alert('Profile updated successfully!');
  };

  const tabs = [
    { id: 'account', name: 'Account', icon: UserIcon },
    { id: 'security', name: 'Security', icon: ShieldCheckIcon },
    { id: 'notifications', name: 'Notifications', icon: BellIcon },
  ];

  return (
    <div className="p-4">
      <div className="mb-4">
        <h1 className="h2 fw-bold mb-1">Settings</h1>
        <p className="text-muted mb-0">Manage your account preferences</p>
      </div>

      <div className="row g-4">
        <div className="col-12 col-lg-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-0">
              <div className="list-group list-group-flush">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`list-group-item list-group-item-action border-0 d-flex align-items-center py-3 ${
                      activeTab === tab.id ? 'active' : ''
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <tab.icon className="me-3" style={{width: '20px', height: '20px'}} />
                    {tab.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-9">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              {activeTab === 'account' && (
                <div>
                  <h5 className="fw-semibold mb-4">Account Information</h5>
                  <form onSubmit={handleProfileSubmit}>
                    <div className="row g-4">
                      <div className="col-12 col-md-6">
                        <label className="form-label fw-medium">Full Name</label>
                        <input
                          type="text"
                          name="name"
                          value={profile.name}
                          onChange={handleProfileChange}
                          className="form-control"
                        />
                      </div>
                      <div className="col-12 col-md-6">
                        <label className="form-label fw-medium">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={profile.email}
                          onChange={handleProfileChange}
                          className="form-control"
                        />
                      </div>
                      <div className="col-12 col-md-6">
                        <label className="form-label fw-medium">Role</label>
                        <input
                          type="text"
                          value={profile.role}
                          className="form-control"
                          disabled
                        />
                      </div>
                      <div className="col-12">
                        <button type="submit" className="btn btn-primary">Save Changes</button>
                      </div>
                    </div>
                  </form>
                </div>
              )}

              {activeTab === 'security' && (
                <div>
                  <h5 className="fw-semibold mb-4">Security Settings</h5>
                  <div className="row g-4">
                    <div className="col-12">
                      <div className="card bg-light border-0">
                        <div className="card-body">
                          <h6 className="fw-semibold mb-3">Password</h6>
                          <p className="text-muted mb-3">Change your account password</p>
                          <button className="btn btn-primary">
                            <KeyIcon className="me-2" style={{width: '16px', height: '16px'}} />
                            Change Password
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="card bg-light border-0">
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <h6 className="fw-semibold mb-1">Two-Factor Authentication</h6>
                              <p className="text-muted mb-0 small">Add extra security layer</p>
                            </div>
                            <div className="form-check form-switch">
                              <input
                                type="checkbox"
                                name="twoFactorAuth"
                                checked={settings.twoFactorAuth}
                                onChange={handleSettingsChange}
                                className="form-check-input"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div>
                  <h5 className="fw-semibold mb-4">Notification Preferences</h5>
                  <div className="row g-4">
                    <div className="col-12">
                      <div className="card bg-light border-0">
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <div>
                              <h6 className="fw-semibold mb-1">Email Notifications</h6>
                              <p className="text-muted mb-0 small">Receive notifications via email</p>
                            </div>
                            <div className="form-check form-switch">
                              <input
                                type="checkbox"
                                name="emailNotifications"
                                checked={settings.emailNotifications}
                                onChange={handleSettingsChange}
                                className="form-check-input"
                              />
                            </div>
                          </div>
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <h6 className="fw-semibold mb-1">Push Notifications</h6>
                              <p className="text-muted mb-0 small">Receive push notifications</p>
                            </div>
                            <div className="form-check form-switch">
                              <input
                                type="checkbox"
                                name="pushNotifications"
                                checked={settings.pushNotifications}
                                onChange={handleSettingsChange}
                                className="form-check-input"
                              />
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
      </div>
    </div>
  );
}

export default Settings;
