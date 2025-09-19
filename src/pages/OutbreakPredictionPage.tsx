import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { getOutbreakPrediction } from '../services/api'
import type { OutbreakPrediction } from '../services/api'

// Dropdown options
const stateOptions = [
  { value: '', label: 'Select State' },
  { value: 'Assam', label: 'Assam' },
  { value: 'Arunachal Pradesh', label: 'Arunachal Pradesh' },
  { value: 'Manipur', label: 'Manipur' },
  { value: 'Meghalaya', label: 'Meghalaya' },
  { value: 'Mizoram', label: 'Mizoram' },
  { value: 'Nagaland', label: 'Nagaland' },
  { value: 'Sikkim', label: 'Sikkim' },
  { value: 'Tripura', label: 'Tripura' },
]

const districtOptions: Record<string, { value: string; label: string }[]> = {
  'Assam': [
    { value: '', label: 'Select District' },
    { value: 'Guwahati', label: 'Guwahati' },
    { value: 'Dibrugarh', label: 'Dibrugarh' },
    { value: 'Jorhat', label: 'Jorhat' },
    { value: 'Kamrup', label: 'Kamrup' },
    { value: 'Tezpur', label: 'Tezpur' },
    { value: 'Silchar', label: 'Silchar' },
    { value: 'Nagaon', label: 'Nagaon' },
  ],
  'Arunachal Pradesh': [
    { value: '', label: 'Select District' },
    { value: 'Itanagar', label: 'Itanagar' },
    { value: 'Tawang', label: 'Tawang' },
    { value: 'Bomdila', label: 'Bomdila' },
  ],
  'Manipur': [
    { value: '', label: 'Select District' },
    { value: 'Imphal East', label: 'Imphal East' },
    { value: 'Imphal West', label: 'Imphal West' },
    { value: 'Churachandpur', label: 'Churachandpur' },
  ],
}

const seasonOptions = [
  { value: '', label: 'Select Season' },
  { value: 'Pre-monsoon', label: 'Pre-monsoon (March-May)' },
  { value: 'Monsoon', label: 'Monsoon (June-September)' },
  { value: 'Post-monsoon', label: 'Post-monsoon (October-December)' },
  { value: 'Winter', label: 'Winter (January-February)' },
]

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

export const OutbreakPredictionPage: React.FC = () => {
  const { register, handleSubmit, watch, setValue } = useForm<FormData>()
  const [prediction, setPrediction] = useState<OutbreakPrediction | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const selectedState = watch('state')
  const availableDistricts = selectedState ? districtOptions[selectedState] || [] : []
  
  React.useEffect(() => {
    if (selectedState) {
      setValue('district', '')
    }
  }, [selectedState, setValue])

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true)
      setError(null)
      const result = await getOutbreakPrediction(data)
      setPrediction(result)
    } catch (err) {
      setError('Failed to get prediction from server.')
      setPrediction(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="animate-fade-in max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-dashboard-text mb-4">AI Outbreak Prediction</h2>
      <p className="text-dashboard-muted mb-6">
        Enter water quality info below for machine learning-based disease outbreak forecasting
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        {/* State Dropdown */}
        <div className="form-group">
          <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
            State *
          </label>
          <select {...register('state', { required: 'State is required' })} className="input">
            {stateOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        {/* District Dropdown */}
        <div className="form-group">
          <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1">
            District *
          </label>
          <select 
            {...register('district', { required: 'District is required' })} 
            disabled={!selectedState}
            className="input"
          >
            {availableDistricts.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          {!selectedState && <p className="text-sm text-gray-500 mt-1">Select a state first</p>}
        </div>

        {/* Season Dropdown */}
        <div className="form-group">
          <label htmlFor="season" className="block text-sm font-medium text-gray-700 mb-1">
            Season *
          </label>
          <select {...register('season', { required: 'Season is required' })} className="input">
            {seasonOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        {/* Water Quality Parameters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        </div>

        <button type="submit" className="btn-primary w-full" disabled={loading}>
          {loading ? 'Predicting...' : 'Predict Outbreak Risk'}
        </button>
      </form>

      {error && <p className="text-red-600 mt-4">{error}</p>}

      {prediction && (
        <div className="bg-gray-100 rounded p-4 shadow mt-6">
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
