/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Health-specific color palette based on medical standards
        health: {
          safe: {
            50: '#F0FDF4',   // Very light green background
            100: '#DCFCE7',  // Light green
            500: '#22C55E',  // Standard green
            600: '#059669',  // Primary safe green
            700: '#047857',  // Dark green
            900: '#064E3B',  // Very dark green
          },
          caution: {
            50: '#FFFBEB',   // Very light amber
            100: '#FEF3C7',  // Light amber
            500: '#F59E0B',  // Standard amber
            600: '#D97706',  // Primary caution amber
            700: '#B45309',  // Dark amber
            900: '#78350F',  // Very dark amber
          },
          danger: {
            50: '#FEF2F2',   // Very light red
            100: '#FEE2E2',  // Light red
            200: '#FECACA',
            500: '#EF4444',  // Standard red
            600: '#DC2626',  // Primary danger red
            700: '#B91C1C',  // Dark red
            900: '#7F1D1D',  // Very dark red
          },
          critical: {
            50: '#FEF2F2',   // Emergency background
            600: '#7C2D12',  // Critical alert color
            900: '#451A03',  // Highest severity
          }
        },
        water: {
          clean: {
            50: '#F0F9FF',   // Clean water background
            500: '#0EA5E9',  // Clean water indicator
            600: '#0284C7',  // Primary clean blue
            700: '#0369A1',  // Dark blue
          },
          contaminated: {
            50: '#FFFBEB',   // Contaminated background
            500: '#F59E0B',  // Warning color
            700: '#B45309',  // Contaminated indicator
          },
          toxic: {
            50: '#FEF2F2',   // Toxic background  
            500: '#EF4444',  // Danger indicator
            800: '#991B1B',  // Toxic water color
          }
        },
        dashboard: {
          background: '#F8FAFC', // Slate-50 - Main background
          card: '#FFFFFF',       // White cards
          border: '#E2E8F0',     // Slate-200 - Borders
          text: '#1E293B',       // Slate-800 - Primary text
          muted: '#64748B',      // Slate-500 - Secondary text
          accent: '#3B82F6',     // Blue-500 - Accent color
        },
        northeast: {
          primary: '#1E40AF',    // Blue-800 - Northeast India theme
          secondary: '#059669',   // Green-600 - Nature/health
          accent: '#D97706',     // Amber-600 - Alerts
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      },
      animation: {
        'pulse-slow': 'pulse 3s infinite',
        'bounce-gentle': 'bounce 2s infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      },
      boxShadow: {
        'health-card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'health-card-hover': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'alert-glow': '0 0 0 3px rgba(239, 68, 68, 0.1)',
      },
      spacing: {
        '18': '4.5rem',   // 72px
        '88': '22rem',    // 352px
        '128': '32rem',   // 512px
      }
    },
  },
  plugins: [
    // Add custom component classes
    function({ addComponents }) {
      addComponents({
        '.health-card': {
          '@apply bg-dashboard-card rounded-lg shadow-health-card border border-dashboard-border p-6 transition-all duration-200 hover:shadow-health-card-hover': {},
        },
        '.metric-card': {
          '@apply health-card flex items-center justify-between': {},
        },
        '.alert-banner': {
          '@apply px-4 py-3 rounded-lg text-sm font-medium border': {},
        },
        '.alert-safe': {
          '@apply alert-banner bg-health-safe-50 text-health-safe-700 border-health-safe-200': {},
        },
        '.alert-caution': {
          '@apply alert-banner bg-health-caution-50 text-health-caution-700 border-health-caution-200': {},
        },
        '.alert-danger': {
          '@apply alert-banner bg-health-danger-50 text-health-danger-700 border-health-danger-200': {},
        },
        '.btn-primary': {
          '@apply px-4 py-2 bg-northeast-primary text-white rounded-md font-medium hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2': {},
        },
        '.btn-secondary': {
          '@apply px-4 py-2 bg-dashboard-background text-dashboard-text border border-dashboard-border rounded-md font-medium hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2': {},
        }
      })
    }
  ],
}
