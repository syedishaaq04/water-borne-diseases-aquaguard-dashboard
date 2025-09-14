import React from 'react';

export const Reports: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-dashboard-text">Reports & Analytics</h2>
        <p className="text-dashboard-muted">Data export and detailed health insights</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="health-card">
          <h3 className="text-lg font-semibold text-dashboard-text mb-4">Generate Reports</h3>
          <div className="space-y-2">
            <button className="w-full btn-secondary text-sm">Weekly Health Summary</button>
            <button className="w-full btn-secondary text-sm">Water Quality Report</button>
            <button className="w-full btn-secondary text-sm">ASHA Performance Report</button>
            <button className="w-full btn-secondary text-sm">Outbreak Analysis</button>
          </div>
        </div>
        
        <div className="health-card">
          <h3 className="text-lg font-semibold text-dashboard-text mb-4">Export Data</h3>
          <div className="space-y-2">
            <button className="w-full btn-secondary text-sm">Export to Excel</button>
            <button className="w-full btn-secondary text-sm">Export to PDF</button>
            <button className="w-full btn-secondary text-sm">Export to CSV</button>
            <button className="w-full btn-secondary text-sm">API Data Access</button>
          </div>
        </div>
        
        <div className="health-card">
          <h3 className="text-lg font-semibold text-dashboard-text mb-4">Analytics</h3>
          <div className="space-y-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">7,234</div>
              <p className="text-sm text-dashboard-muted">Total Records</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-health-safe-600">94.2%</div>
              <p className="text-sm text-dashboard-muted">Data Accuracy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
