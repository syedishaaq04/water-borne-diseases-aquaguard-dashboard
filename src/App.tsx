import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { Layout } from './components/Layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { WaterQuality } from './pages/WaterQuality';
import { HealthSurveillance } from './pages/HealthSurveillance';
import { OutbreakPrediction } from './pages/OutbreakPrediction';
import { ASHAPortal } from './pages/ASHAPortal';
import { Reports } from './pages/Reports';
import { Settings } from './pages/Settings';
import { EmergencyResponse } from './pages/EmergencyResponse';

// Error fallback component
const ErrorFallback: React.FC<{ error: Error; resetErrorBoundary: () => void }> = ({
  error,
  resetErrorBoundary,
}) => (
  <div className="min-h-screen flex items-center justify-center bg-dashboard-background">
    <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-center w-12 h-12 bg-health-danger-100 rounded-full mx-auto mb-4">
        <svg className="w-6 h-6 text-health-danger-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      </div>
      <h2 className="text-lg font-semibold text-center text-dashboard-text mb-2">
        System Error Detected
      </h2>
      <p className="text-sm text-dashboard-muted text-center mb-4">
        The health surveillance system encountered an unexpected error.
      </p>
      <details className="mb-4">
        <summary className="text-xs text-dashboard-muted cursor-pointer hover:text-dashboard-text">
          Technical Details
        </summary>
        <pre className="text-xs bg-gray-100 p-2 rounded mt-2 overflow-auto">
          {error.message}
        </pre>
      </details>
      <button
        onClick={resetErrorBoundary}
        className="w-full btn-primary"
      >
        Restart Application
      </button>
    </div>
  </div>
);

function App() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error) => {
        // In production, send error to monitoring service
        console.error('Application Error:', error);
      }}
    >
      <Router>
        <Layout>
          <Routes>
            {/* Main dashboard routes */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/water-quality" element={<WaterQuality />} />
            <Route path="/health-cases" element={<HealthSurveillance />} />
            <Route path="/outbreak-prediction" element={<OutbreakPrediction />} />
            
            {/* User-specific routes */}
            <Route path="/asha-portal" element={<ASHAPortal />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/emergency" element={<EmergencyResponse />} />
            <Route path="/settings" element={<Settings />} />
            
            {/* Detailed view routes */}
            <Route path="/water-quality/:sensorId" element={<WaterQuality />} />
            <Route path="/health-cases/:caseId" element={<HealthSurveillance />} />
            <Route path="/outbreak/:predictionId" element={<OutbreakPrediction />} />
            
            {/* Fallback route */}
            <Route path="*" element={
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-dashboard-text mb-4">
                  Page Not Found
                </h2>
                <p className="text-dashboard-muted mb-8">
                  The requested page could not be found.
                </p>
                <button
                  onClick={() => window.history.back()}
                  className="btn-primary"
                >
                  Go Back
                </button>
              </div>
            } />
          </Routes>
        </Layout>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
