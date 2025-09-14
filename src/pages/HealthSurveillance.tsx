import React from 'react';

export const HealthSurveillance: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-dashboard-text">Health Case Surveillance</h2>
        <p className="text-dashboard-muted">Disease tracking and ASHA worker reports</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="health-card">
          <h3 className="text-lg font-semibold text-dashboard-text mb-2">Active Cases</h3>
          <div className="text-2xl font-bold text-health-caution-600">23</div>
          <p className="text-sm text-dashboard-muted">Currently under treatment</p>
        </div>
        
        <div className="health-card">
          <h3 className="text-lg font-semibold text-dashboard-text mb-2">Resolved Cases</h3>
          <div className="text-2xl font-bold text-health-safe-600">156</div>
          <p className="text-sm text-dashboard-muted">Successfully treated</p>
        </div>
        
        <div className="health-card">
          <h3 className="text-lg font-semibold text-dashboard-text mb-2">ASHA Workers</h3>
          <div className="text-2xl font-bold text-blue-600">89</div>
          <p className="text-sm text-dashboard-muted">Active field workers</p>
        </div>
      </div>
      
      <div className="mt-6 health-card">
        <h3 className="text-lg font-semibold text-dashboard-text mb-4">Recent Disease Reports</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-dashboard-border">
            <div>
              <p className="font-medium text-dashboard-text">Acute Diarrhea - Kamrup District</p>
              <p className="text-sm text-dashboard-muted">Reported by ASHA Worker: Priya Sharma</p>
            </div>
            <span className="px-2 py-1 text-xs bg-health-caution-100 text-health-caution-700 rounded-full">
              Moderate
            </span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-dashboard-border">
            <div>
              <p className="font-medium text-dashboard-text">Typhoid Fever - Dibrugarh District</p>
              <p className="text-sm text-dashboard-muted">Reported by ASHA Worker: Maya Gogoi</p>
            </div>
            <span className="px-2 py-1 text-xs bg-health-danger-100 text-health-danger-700 rounded-full">
              Severe
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
