import React from 'react';

export const Dashboard: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-dashboard-text">Health Surveillance Dashboard</h2>
        <p className="text-dashboard-muted">Real-time monitoring of water quality and disease patterns in Northeast India</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="health-card">
          <h3 className="text-lg font-semibold text-dashboard-text mb-2">Water Quality Status</h3>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-health-safe-500 rounded-full mr-2"></div>
            <span className="text-dashboard-muted">47 sensors active</span>
          </div>
        </div>
        
        <div className="health-card">
          <h3 className="text-lg font-semibold text-dashboard-text mb-2">Health Cases</h3>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-health-caution-500 rounded-full mr-2"></div>
            <span className="text-dashboard-muted">23 active cases</span>
          </div>
        </div>
        
        <div className="health-card">
          <h3 className="text-lg font-semibold text-dashboard-text mb-2">Outbreak Alerts</h3>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-health-danger-500 rounded-full mr-2"></div>
            <span className="text-dashboard-muted">3 high-risk areas</span>
          </div>
        </div>
      </div>
    </div>
  );
};
