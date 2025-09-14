import React from 'react';

export const WaterQuality: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-dashboard-text">Water Quality Monitoring</h2>
        <p className="text-dashboard-muted">Real-time IoT sensor data from Northeast India water sources</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="health-card">
          <h3 className="text-lg font-semibold text-dashboard-text mb-4">Sensor Status</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-dashboard-muted">Active Sensors</span>
              <span className="text-sm font-semibold text-health-safe-600">47/50</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-dashboard-muted">Safe Water Sources</span>
              <span className="text-sm font-semibold text-health-safe-600">42</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-dashboard-muted">Contaminated Sources</span>
              <span className="text-sm font-semibold text-health-danger-600">5</span>
            </div>
          </div>
        </div>
        
        <div className="health-card">
          <h3 className="text-lg font-semibold text-dashboard-text mb-4">Recent Readings</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-dashboard-muted">Kamrup Village Well</span>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-health-safe-500 rounded-full mr-2"></div>
                <span className="text-health-safe-600">Safe</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-dashboard-muted">Dibrugarh River Point</span>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-health-caution-500 rounded-full mr-2"></div>
                <span className="text-health-caution-600">Caution</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-dashboard-muted">Jorhat Tube Well</span>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-health-danger-500 rounded-full mr-2"></div>
                <span className="text-health-danger-600">Danger</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
