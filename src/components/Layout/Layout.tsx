import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  HomeIcon, 
  BeakerIcon, 
  HeartIcon, 
  ExclamationTriangleIcon,
  UserGroupIcon,
  DocumentChartBarIcon,
  CogIcon,
  ExclamationCircleIcon,
  Bars3Icon,
  XMarkIcon,
  BellIcon,
  MapIcon
} from '@heroicons/react/24/outline';
import { 
  HomeIcon as HomeIconSolid,
  BeakerIcon as BeakerIconSolid,
  HeartIcon as HeartIconSolid,
  ExclamationTriangleIcon as ExclamationTriangleIconSolid,
  UserGroupIcon as UserGroupIconSolid,
  DocumentChartBarIcon as DocumentChartBarIconSolid
} from '@heroicons/react/24/solid';

// Navigation configuration with healthcare-specific features
const navigation = [
  { 
    name: 'Dashboard', 
    href: '/', 
    icon: HomeIcon, 
    iconSolid: HomeIconSolid,
    description: 'Overview & Real-time Status',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    badge: null
  },
  { 
    name: 'Water Quality', 
    href: '/water-quality', 
    icon: BeakerIcon, 
    iconSolid: BeakerIconSolid,
    description: 'IoT Sensor Monitoring',
    color: 'text-water-clean-600',
    bgColor: 'bg-water-clean-50',
    badge: null
  },
  { 
    name: 'Health Cases', 
    href: '/health-cases', 
    icon: HeartIcon, 
    iconSolid: HeartIconSolid,
    description: 'Disease Surveillance',
    color: 'text-health-safe-600',
    bgColor: 'bg-health-safe-50',
    badge: 'new'
  },
  { 
    name: 'Outbreak Prediction', 
    href: '/outbreak-prediction', 
    icon: ExclamationTriangleIcon, 
    iconSolid: ExclamationTriangleIconSolid,
    description: 'AI Risk Assessment',
    color: 'text-health-caution-600',
    bgColor: 'bg-health-caution-50',
    badge: 'alert'
  },
  { 
    name: 'ASHA Portal', 
    href: '/asha-portal', 
    icon: UserGroupIcon, 
    iconSolid: UserGroupIconSolid,
    description: 'Field Worker Interface',
    color: 'text-northeast-secondary',
    bgColor: 'bg-green-50',
    badge: null
  },
  { 
    name: 'Reports & Analytics', 
    href: '/reports', 
    icon: DocumentChartBarIcon, 
    iconSolid: DocumentChartBarIconSolid,
    description: 'Data Export & Insights',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    badge: null
  }
];

// Secondary navigation items
const secondaryNavigation = [
  { name: 'Emergency Response', href: '/emergency', icon: ExclamationCircleIcon },
  { name: 'System Settings', href: '/settings', icon: CogIcon },
];

// Mock notification data (will be replaced with real data later)
const mockNotifications = [
  { id: 1, type: 'warning', message: '3 water sources in Kamrup district showing contamination' },
  { id: 2, type: 'info', message: '15 new health cases reported today' },
  { id: 3, type: 'critical', message: 'High outbreak risk predicted for Dibrugarh' }
];

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const location = useLocation();

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Close sidebar when route changes (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [location]);

  return (
    <div className="h-screen flex overflow-hidden bg-dashboard-background">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 flex z-40 md:hidden">
          <div 
            className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity duration-300"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white shadow-xl transform transition-transform duration-300">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => setSidebarOpen(false)}
              >
                <XMarkIcon className="h-6 w-6 text-white" />
              </button>
            </div>
            <SidebarContent 
              navigation={navigation} 
              secondaryNavigation={secondaryNavigation}
              currentPath={location.pathname} 
            />
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-72">
          <SidebarContent 
            navigation={navigation} 
            secondaryNavigation={secondaryNavigation}
            currentPath={location.pathname} 
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        {/* Top Navigation Bar */}
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow-sm border-b border-dashboard-border">
          {/* Mobile menu button */}
          <button
            className="px-4 border-r border-dashboard-border text-dashboard-muted focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 md:hidden hover:bg-gray-50 transition-colors duration-200"
            onClick={() => setSidebarOpen(true)}
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
          
          <div className="flex-1 px-4 flex justify-between items-center">
            {/* Application Title */}
            <div className="flex-1 flex items-center">
              <h1 className="text-xl font-semibold text-dashboard-text flex items-center">
                <span className="mr-3 text-2xl">🌊</span>
                <span className="hidden sm:inline">AquaGuard Health Surveillance</span>
                <span className="sm:hidden">AquaGuard</span>
                <span className="ml-3 px-3 py-1 text-xs bg-health-safe-100 text-health-safe-700 rounded-full font-medium">
                  Northeast India
                </span>
              </h1>
            </div>
            
            {/* Status & Notifications */}
            <div className="ml-4 flex items-center space-x-4">
              {/* System Status */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <div className="h-2 w-2 bg-health-safe-500 rounded-full animate-pulse-slow"></div>
                  <span className="text-sm text-dashboard-muted hidden md:inline">System Online</span>
                </div>
                <span className="text-xs text-dashboard-muted border-l border-dashboard-border pl-2">
                  {currentTime.toLocaleTimeString('en-IN', { 
                    hour12: true, 
                    hour: '2-digit', 
                    minute: '2-digit'
                  })}
                </span>
              </div>

              {/* Notifications */}
              <div className="relative">
                <button
                  className="p-2 text-dashboard-muted hover:text-dashboard-text hover:bg-gray-50 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={() => setNotificationOpen(!notificationOpen)}
                >
                  <BellIcon className="h-6 w-6" />
                  {mockNotifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-health-danger-500 text-white text-xs rounded-full flex items-center justify-center">
                      {mockNotifications.length}
                    </span>
                  )}
                </button>

                {/* Notification dropdown */}
                {notificationOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-dashboard-border z-50">
                    <div className="p-3 border-b border-dashboard-border">
                      <h3 className="text-sm font-medium text-dashboard-text">Recent Alerts</h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto scrollbar-thin">
                      {mockNotifications.map((notification) => (
                        <div key={notification.id} className="p-3 border-b border-dashboard-border last:border-b-0 hover:bg-gray-50">
                          <div className="flex items-start">
                            <div className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 mr-3 ${
                              notification.type === 'critical' ? 'bg-health-danger-500' :
                              notification.type === 'warning' ? 'bg-health-caution-500' :
                              'bg-blue-500'
                            }`} />
                            <p className="text-sm text-dashboard-text">{notification.message}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 border-t border-dashboard-border">
                      <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                        View All Notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Geographic Context */}
              <div className="hidden lg:flex items-center text-sm text-dashboard-muted">
                <MapIcon className="h-4 w-4 mr-1" />
                <span>Assam, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none bg-dashboard-background scrollbar-thin">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

// Sidebar Content Component
const SidebarContent: React.FC<{ 
  navigation: any[], 
  secondaryNavigation: any[],
  currentPath: string 
}> = ({ navigation, secondaryNavigation, currentPath }) => (
  <div className="flex-1 flex flex-col min-h-0 bg-white shadow-lg">
    {/* Logo & Title Section */}
    <div className="flex items-center flex-shrink-0 px-6 py-6 bg-gradient-to-r from-northeast-primary to-blue-700">
      <BeakerIcon className="h-8 w-8 text-white flex-shrink-0" />
      <div className="ml-3 flex-1">
        <p className="text-xl font-bold text-white">AquaGuard</p>
        <p className="text-xs text-blue-100">Health Surveillance System</p>
        <p className="text-xs text-blue-200 mt-1">Smart India Hackathon 2025</p>
      </div>
    </div>
    
    {/* Quick Stats */}
    <div className="px-4 py-4 bg-gray-50 border-b border-dashboard-border">
      <div className="grid grid-cols-3 gap-2 text-center">
        <div>
          <p className="text-xs text-dashboard-muted">Active Sensors</p>
          <p className="text-sm font-semibold text-health-safe-600">47</p>
        </div>
        <div>
          <p className="text-xs text-dashboard-muted">Health Cases</p>
          <p className="text-sm font-semibold text-health-caution-600">23</p>
        </div>
        <div>
          <p className="text-xs text-dashboard-muted">Alerts</p>
          <p className="text-sm font-semibold text-health-danger-600">3</p>
        </div>
      </div>
    </div>
    
    {/* Main Navigation */}
    <nav className="mt-6 flex-1 px-4 bg-white space-y-2 overflow-y-auto scrollbar-thin">
      <div className="space-y-1">
        {navigation.map((item) => {
          const isActive = currentPath === item.href;
          const Icon = isActive ? item.iconSolid : item.icon;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`${
                isActive
                  ? `${item.bgColor} ${item.color} border-r-2 border-current`
                  : 'text-dashboard-text hover:bg-dashboard-background hover:text-blue-600'
              } group flex items-center px-3 py-3 text-sm font-medium rounded-l-lg transition-all duration-200 relative`}
            >
              <Icon
                className={`${
                  isActive ? item.color : 'text-dashboard-muted group-hover:text-blue-500'
                } mr-3 flex-shrink-0 h-5 w-5 transition-colors duration-200`}
              />
              <div className="flex-1">
                <div className="font-medium flex items-center justify-between">
                  <span>{item.name}</span>
                  {item.badge && (
                    <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                      item.badge === 'alert' ? 'bg-health-danger-100 text-health-danger-700' :
                      item.badge === 'new' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </div>
                <div className="text-xs text-dashboard-muted mt-0.5">{item.description}</div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Secondary Navigation */}
      <div className="pt-6 mt-6 border-t border-dashboard-border">
        <div className="space-y-1">
          {secondaryNavigation.map((item) => {
            const isActive = currentPath === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`${
                  isActive
                    ? 'bg-gray-100 text-dashboard-text'
                    : 'text-dashboard-muted hover:bg-gray-50 hover:text-dashboard-text'
                } group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200`}
              >
                <item.icon className="mr-3 flex-shrink-0 h-4 w-4" />
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
    
    {/* Emergency Contact Section */}
    <div className="flex-shrink-0 p-4 bg-health-danger-50 border-t border-dashboard-border">
      <div className="text-sm">
        <p className="font-medium text-health-danger-800 mb-2">Emergency Contacts</p>
        <div className="space-y-1 text-xs text-health-danger-700">
          <div className="flex items-center">
            <span className="mr-2">🏥</span>
            <span>Health Emergency: 102</span>
          </div>
          <div className="flex items-center">
            <span className="mr-2">🚨</span>
            <span>District Collector: 1075</span>
          </div>
          <div className="flex items-center">
            <span className="mr-2">💧</span>
            <span>Water Emergency: 1916</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);
