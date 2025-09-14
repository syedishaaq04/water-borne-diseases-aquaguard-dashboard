import React from 'react';

export const EmergencyResponse: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-dashboard-text">Emergency Response Center</h2>
        <p className="text-dashboard-muted">Rapid response coordination for health emergencies</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="health-card border-l-4 border-health-danger-500">
          <h3 className="text-lg font-semibold text-health-danger-600 mb-4">🚨 Active Emergencies</h3>
          <div className="space-y-3">
            <div className="p-3 bg-health-danger-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-health-danger-800">Cholera Outbreak - Dibrugarh</span>
                <span className="px-2 py-1 text-xs bg-health-danger-200 text-health-danger-800 rounded-full">
                  CRITICAL
                </span>
              </div>
              <p className="text-sm text-health-danger-700">15 confirmed cases, immediate response required</p>
              <div className="mt-2">
                <button className="btn-primary text-xs">Coordinate Response</button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="health-card">
          <h3 className="text-lg font-semibold text-dashboard-text mb-4">Emergency Contacts</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <div>
                <p className="font-medium text-dashboard-text">District Health Officer</p>
                <p className="text-sm text-dashboard-muted">Dr. Rajesh Sharma</p>
              </div>
              <div className="flex space-x-2">
                <button className="p-1 text-green-600 hover:bg-green-100 rounded">📞</button>
                <button className="p-1 text-blue-600 hover:bg-blue-100 rounded">📧</button>
              </div>
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <div>
                <p className="font-medium text-dashboard-text">Water Department</p>
                <p className="text-sm text-dashboard-muted">Emergency Hotline</p>
              </div>
              <div className="flex space-x-2">
                <button className="p-1 text-green-600 hover:bg-green-100 rounded">📞</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="health-card">
        <h3 className="text-lg font-semibold text-dashboard-text mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 bg-health-danger-50 text-health-danger-700 rounded-lg hover:bg-health-danger-100 transition-colors">
            <div className="text-2xl mb-2">🚨</div>
            <div className="font-semibold">Declare Emergency</div>
          </button>
          <button className="p-4 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
            <div className="text-2xl mb-2">📢</div>
            <div className="font-semibold">Broadcast Alert</div>
          </button>
          <button className="p-4 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
            <div className="text-2xl mb-2">🏥</div>
            <div className="font-semibold">Mobilize Resources</div>
          </button>
        </div>
      </div>
    </div>
  );
};
