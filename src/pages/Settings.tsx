import React from 'react';

export const Settings: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-dashboard-text">System Settings</h2>
        <p className="text-dashboard-muted">Configure AquaGuard health surveillance system</p>
      </div>
      
      <div className="space-y-6">
        <div className="health-card">
          <h3 className="text-lg font-semibold text-dashboard-text mb-4">General Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-dashboard-text">Real-time Notifications</p>
                <p className="text-sm text-dashboard-muted">Receive instant alerts for critical health events</p>
              </div>
              <input type="checkbox" className="toggle" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-dashboard-text">Auto Data Sync</p>
                <p className="text-sm text-dashboard-muted">Automatically sync data every 15 minutes</p>
              </div>
              <input type="checkbox" className="toggle" defaultChecked />
            </div>
          </div>
        </div>
        
        <div className="health-card">
          <h3 className="text-lg font-semibold text-dashboard-text mb-4">Alert Thresholds</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-dashboard-text mb-1">
                Water Quality Alert Threshold (pH)
              </label>
              <input 
                type="range" 
                min="6" 
                max="9" 
                defaultValue="7.5" 
                className="w-full" 
              />
              <div className="flex justify-between text-xs text-dashboard-muted mt-1">
                <span>6.0</span>
                <span>Current: 7.5</span>
                <span>9.0</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="health-card">
          <h3 className="text-lg font-semibold text-dashboard-text mb-4">User Preferences</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-dashboard-text mb-1">
                Language
              </label>
              <select className="w-full p-2 border border-dashboard-border rounded-md">
                <option>English</option>
                <option>Assamese</option>
                <option>Bengali</option>
                <option>Hindi</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-dashboard-text mb-1">
                Dashboard Refresh Rate
              </label>
              <select className="w-full p-2 border border-dashboard-border rounded-md">
                <option>30 seconds</option>
                <option>1 minute</option>
                <option>5 minutes</option>
                <option>Manual</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
