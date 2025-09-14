import React from 'react';

export const OutbreakPrediction: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-dashboard-text">AI Outbreak Prediction</h2>
        <p className="text-dashboard-muted">Machine learning-powered disease outbreak forecasting</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="health-card">
          <h3 className="text-lg font-semibold text-dashboard-text mb-4">High Risk Areas</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-dashboard-text">Dibrugarh District</span>
              <div className="flex items-center">
                <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                  <div className="bg-health-danger-500 h-2 rounded-full" style={{width: '85%'}}></div>
                </div>
                <span className="text-sm font-semibold text-health-danger-600">85%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-dashboard-text">Kamrup District</span>
              <div className="flex items-center">
                <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                  <div className="bg-health-caution-500 h-2 rounded-full" style={{width: '65%'}}></div>
                </div>
                <span className="text-sm font-semibold text-health-caution-600">65%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-dashboard-text">Jorhat District</span>
              <div className="flex items-center">
                <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                  <div className="bg-health-caution-500 h-2 rounded-full" style={{width: '45%'}}></div>
                </div>
                <span className="text-sm font-semibold text-health-caution-600">45%</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="health-card">
          <h3 className="text-lg font-semibold text-dashboard-text mb-4">Model Performance</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-dashboard-muted">Accuracy</span>
              <span className="text-dashboard-text font-semibold">89.2%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-dashboard-muted">Sensitivity</span>
              <span className="text-dashboard-text font-semibold">91.5%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-dashboard-muted">Last Updated</span>
              <span className="text-dashboard-text font-semibold">2 hours ago</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="alert-danger">
        <h4 className="font-semibold mb-2">⚠️ Critical Alert - Dibrugarh District</h4>
        <p className="text-sm">AI model predicts high probability of cholera outbreak in next 7-14 days. 
        Contributing factors: contaminated water sources, recent heavy rainfall, population density.</p>
        <div className="mt-3">
          <button className="btn-primary text-xs">View Detailed Report</button>
          <button className="btn-secondary text-xs ml-2">Alert Health Officials</button>
        </div>
      </div>
    </div>
  );
};
