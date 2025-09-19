// src/services/api.ts
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

export interface APIResponse<T> {
  success: boolean
  data: T
  message?: string
  timestamp?: string
}

export interface OutbreakPrediction {
  outbreak_risk: number
  risk_probability: number
  risk_level: 'low' | 'moderate' | 'high' | 'critical'
  confidence: number
  recommendations: string[]
  timestamp: string
}

export interface WaterQualityReading {
  id: string
  station_code?: string
  location_name: string
  state: string
  district: string
  coordinates: [number, number]
  parameters: Record<string, number>
  status: 'safe' | 'caution' | 'danger' | 'critical'
  reading_date: string
  last_updated: string
  data_source: string
}

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

// Water Quality APIs
export const getWaterQualityReadings = async (
  filters?: Partial<{ state: string; district: string; status: string; limit: number }>
): Promise<WaterQualityReading[]> => {
  const params = filters || {}
  const response = await apiClient.get<APIResponse<WaterQualityReading[]>>('/water-quality/readings', { params })
  if (!response.data.success) throw new Error(response.data.message || 'Failed to fetch water quality data')
  return response.data.data
}

// Prediction API
export const getOutbreakPrediction = async (
  input: Record<string, any>
): Promise<OutbreakPrediction> => {
  const response = await apiClient.post<APIResponse<OutbreakPrediction>>('/predict/outbreak-risk', input)
  if (!response.data.success) throw new Error(response.data.message || 'Failed to get prediction')
  return response.data.data
}
