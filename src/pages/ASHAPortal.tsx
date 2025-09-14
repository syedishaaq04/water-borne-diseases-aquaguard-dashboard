import React from 'react';

export const ASHAPortal: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-dashboard-text">ASHA Worker Portal</h2>
        <p className="text-dashboard-muted">Field worker interface for health data collection</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="health-card">
          <h3 className="text-lg font-semibold text-dashboard-text mb-4">Quick Report Health Case</h3>
          <div className="space-y-3">
            <button className="w-full btn-primary">Report New Case</button>
            <button className="w-full btn-secondary">Update Existing Case</button>
            <button className="w-full btn-secondary">Record Water Quality Test</button>
          </div>
        </div>
        
        <div className="health-card">
          <h3 className="text-lg font-semibold text-dashboard-text mb-4">My Performance</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-dashboard-muted">Cases Reported This Month</span>
              <span className="text-dashboard-text font-semibold">12</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-dashboard-muted">Accuracy Score</span>
              <span className="text-health-safe-600 font-semibold">94%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-dashboard-muted">Community Trust Rating</span>
              <span className="text-health-safe-600 font-semibold">4.8/5.0</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="health-card">
        <h3 className="text-lg font-semibold text-dashboard-text mb-4">Recent Activities</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between py-2 border-b border-dashboard-border">
            <div>
              <p className="text-dashboard-text">Reported diarrhea case in Kamrup village</p>
              <p className="text-sm text-dashboard-muted">2 hours ago</p>
            </div>
            <span className="px-2 py-1 text-xs bg-health-safe-100 text-health-safe-700 rounded-full">
              Verified
            </span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-dashboard-border">
            <div>
              <p className="text-dashboard-text">Conducted water quality test - Village Well #3</p>
              <p className="text-sm text-dashboard-muted">5 hours ago</p>
            </div>
            <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
              Completed
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
