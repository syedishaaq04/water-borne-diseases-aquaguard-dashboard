import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { getOutbreakPrediction, OutbreakPrediction } from '../services/api'

type FormData = {
  state: string
  district: string
  season: string
  temperature: number
  pH: number
  conductivity: number
  TDS: number
  turbidity: number
  alkalinity: number
  hardness: number
  chloride: number
  fluoride: number
  nitrate: number
  sulphate: number
  iron: number
  arsenic: number
  BOD: number
  dissolved_oxygen: number
  coliform_fecal: number
}

export const OutbreakPrediction: React.FC = () => {
  const { register, handleSubmit } = useForm<FormData>()
  const [prediction, setPrediction] = useState<OutbreakPrediction | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true)
      setError(null)
      const result = await getOutbreakPrediction(data)
      setPrediction(result)
    } catch {
      setError('Failed to get prediction from server.')
      setPrediction(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="animate-fade-in max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-dashboard-text mb-4">AI Outbreak Prediction</h2>
      <p className="text-dashboard-muted mb-4">
        Enter water quality info below for machine learning-based disease outbreak forecasting
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4 mb-6">
        {/* Controlled inputs for all parameters */}
        <input {...register('state', { required: true })} placeholder="State" className="input" />
        <input {...register('district', { required: true })} placeholder="District" className="input" />
        <input {...register('season', { required: true })} placeholder="Season (Pre-monsoon/Post-monsoon)" className="input" />

        <input type="number" step="0.1" {...register('temperature', { required: true })} placeholder="Temperature (°C)" className="input" />
        <input type="number" step="0.01" {...register('pH', { required: true })} placeholder="pH Level" className="input" />
        <input type="number" step="0.1" {...register('conductivity', { required: true })} placeholder="Conductivity" className="input" />
        <input type="number" step="0.1" {...register('TDS', { required: true })} placeholder="Total Dissolved Solids" className="input" />
        <input type="number" step="0.1" {...register('turbidity', { required: true })} placeholder="Turbidity" className="input" />
        <input type="number" step="0.1" {...register('alkalinity', { required: true })} placeholder="Alkalinity" className="input" />
        <input type="number" step="0.1" {...register('hardness', { required: true })} placeholder="Hardness" className="input" />
        <input type="number" step="0.1" {...register('chloride', { required: true })} placeholder="Chloride" className="input" />
        <input type="number" step="0.01" {...register('fluoride', { required: true })} placeholder="Fluoride" className="input" />
        <input type="number" step="0.1" {...register('nitrate', { required: true })} placeholder="Nitrate" className="input" />
        <input type="number" step="0.1" {...register('sulphate', { required: true })} placeholder="Sulphate" className="input" />
        <input type="number" step="0.01" {...register('iron', { required: true })} placeholder="Iron" className="input" />
        <input type="number" step="0.001" {...register('arsenic', { required: true })} placeholder="Arsenic" className="input" />
        <input type="number" step="0.1" {...register('BOD', { required: true })} placeholder="Biological Oxygen Demand (BOD)" className="input" />
        <input type="number" step="0.1" {...register('dissolved_oxygen', { required: true })} placeholder="Dissolved Oxygen" className="input" />
        <input type="number" step="1" {...register('coliform_fecal', { required: true })} placeholder="Fecal Coliform Count" className="input" />

        <button
          type="submit"
          className="btn-primary"
          disabled={loading}
        >
          {loading ? 'Predicting...' : 'Predict Outbreak Risk'}
        </button>
      </form>

      {error && <p className="text-red-600">{error}</p>}

      {prediction && (
        <div className="bg-gray-100 rounded p-4 shadow mt-4">
          <p><strong>Risk Level:</strong> {prediction.risk_level.toUpperCase()}</p>
          <p><strong>Probability:</strong> {(prediction.risk_probability * 100).toFixed(2)}%</p>
          <p><strong>Confidence:</strong> {(prediction.confidence * 100).toFixed(2)}%</p>

          <h3 className="mt-4 font-semibold">Recommendations</h3>
          <ul className="list-disc ml-6">
            {prediction.recommendations.map((rec, idx) => (
              <li key={idx}>{rec}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
