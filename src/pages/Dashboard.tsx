import React, { useEffect, useState } from 'react'
import { getWaterQualityReadings } from '../services/api'
import type { WaterQualityReading } from '../services/api'


export const Dashboard: React.FC = () => {
  const [readings, setReadings] = useState<WaterQualityReading[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const data = await getWaterQualityReadings({ limit: 50 })
        setReadings(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading data')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) return <div>Loading dashboard data...</div>
  if (error) return <div>Error: {error}</div>

  const safeCount = readings.filter((r) => r.status === 'safe').length
  const cautionCount = readings.filter((r) => r.status === 'caution').length
  const dangerCount = readings.filter((r) => r.status === 'danger').length

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
            <span className="text-dashboard-muted">{safeCount} sensors safe</span>
          </div>
          <div className="flex items-center mt-1">
            <div className="w-3 h-3 bg-health-caution-500 rounded-full mr-2"></div>
            <span className="text-dashboard-muted">{cautionCount} sensors caution</span>
          </div>
          <div className="flex items-center mt-1">
            <div className="w-3 h-3 bg-health-danger-500 rounded-full mr-2"></div>
            <span className="text-dashboard-muted">{dangerCount} sensors danger</span>
          </div>
        </div>

        <div className="health-card">
          <h3 className="text-lg font-semibold text-dashboard-text mb-2">Health Cases</h3>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-health-caution-500 rounded-full mr-2"></div>
            <span className="text-dashboard-muted">23 active cases</span> {/* You can connect real data similarly later */}
          </div>
        </div>

        <div className="health-card">
          <h3 className="text-lg font-semibold text-dashboard-text mb-2">Outbreak Alerts</h3>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-health-danger-500 rounded-full mr-2"></div>
            <span className="text-dashboard-muted">3 high-risk areas</span> {/* Update once backend alerts exists */}
          </div>
        </div>
      </div>
    </div>
  )
}

