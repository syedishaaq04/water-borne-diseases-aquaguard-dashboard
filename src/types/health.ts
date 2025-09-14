// ============================================
// CORE HEALTH SURVEILLANCE TYPES FOR SIH PROJECT
// These types directly map to your problem statement requirements
// ============================================

// Geographic types for Northeast India
export type NEDistrict = 
  | 'Kamrup' | 'Kamrup Metropolitan' | 'Dibrugarh' | 'Jorhat' 
  | 'Sivasagar' | 'Golaghat' | 'Nagaon' | 'Cachar' | 'Karimganj'
  | 'Hailakandi' | 'Barpeta' | 'Nalbari' | 'Darrang' | 'Sonitpur'
  | 'Lakhimpur' | 'Dhemaji' | 'Tinsukia' | 'Kokrajhar' | 'Chirang'
  | 'Bongaigaon' | 'Goalpara' | 'Dhubri' | 'South Salmara Mankachar';

export type NEState = 
  | 'Assam' | 'Arunachal Pradesh' | 'Manipur' | 'Meghalaya' 
  | 'Mizoram' | 'Nagaland' | 'Sikkim' | 'Tripura';

// Water Quality Monitoring - IoT Sensor Data
export interface WaterQualityReading {
  id: string;
  sensorId: string;
  location: {
    state: NEState;
    district: NEDistrict;
    village: string;
    waterSource: 'well' | 'river' | 'pond' | 'spring' | 'tube_well' | 'tap';
    coordinates: [number, number]; // [latitude, longitude]
    altitude?: number; // meters above sea level
  };
  parameters: {
    // Physical parameters
    ph: number;                    // 6.5-8.5 WHO safe range
    turbidity: number;             // NTU (Nephelometric Turbidity Units) < 5 safe
    temperature: number;           // °C
    conductivity: number;          // µS/cm (microsiemens per centimeter)
    totalDissolvedSolids: number;  // mg/L (milligrams per liter)
    dissolvedOxygen: number;       // mg/L
    
    // Chemical parameters
    chlorine: number;              // mg/L (residual chlorine)
    fluoride: number;             // mg/L (1.5 mg/L max safe)
    arsenic: number;              // µg/L (10 µg/L WHO limit)
    nitrate: number;              // mg/L (50 mg/L WHO limit)
    iron: number;                 // mg/L
    
    // Biological parameters (critical for waterborne diseases)
    fecalColiform: number;        // CFU/100ml (Colony Forming Units)
    eColi: number;                // CFU/100ml (E. coli count)
    totalColiform: number;        // CFU/100ml
    
    // Additional parameters
    hardness: number;             // mg/L CaCO3
    alkalinity: number;           // mg/L CaCO3
  };
  timestamp: Date;
  dataSource: 'iot_sensor' | 'manual_test' | 'lab_analysis';
  
  // AI-generated assessments
  riskLevel: 'safe' | 'caution' | 'danger' | 'critical';
  potabilityScore: number;      // 0-100 (AI-calculated drinking safety)
  predictedDiseaseRisk: number; // 0-1 (ML model probability)
  contaminationSources: string[]; // Identified pollution sources
  
  // Metadata
  batteryLevel?: number;        // For IoT sensors (0-100%)
  signalStrength?: number;      // Network connectivity (-100 to 0 dBm)
  calibrationDate?: Date;       // Last sensor calibration
  isValidReading: boolean;      // Data quality flag
}

// Health Case Reporting - ASHA Worker Data Entry
export interface HealthCase {
  id: string;
  reportedBy: {
    ashaId: string;
    name: string;
    phone: string;
    village: string;
    district: NEDistrict;
  };
  patient: {
    // Demographics
    age: number;
    gender: 'male' | 'female' | 'other' | 'prefer_not_to_say';
    village: string;
    district: NEDistrict;
    
    // Socioeconomic factors
    householdSize: number;
    primaryWaterSource: string;
    sanitationFacility: 'flush_toilet' | 'pit_latrine' | 'open_defecation' | 'other';
    economicStatus: 'below_poverty_line' | 'above_poverty_line' | 'middle_class';
    
    // Medical history
    hasChronicIllness: boolean;
    chronicConditions?: string[];
    recentTravelHistory?: string;
    vaccinationStatus?: 'complete' | 'partial' | 'none' | 'unknown';
  };
  
  // Clinical information
  symptoms: WaterBorneSymptom[];
  symptomOnsetDate: Date;
  symptomSeverity: 'mild' | 'moderate' | 'severe';
  suspectedDisease: WaterBorneDisease;
  differentialDiagnosis?: WaterBorneDisease[];
  
  // Environmental factors
  waterSource: string;
  waterSourceDistance: number; // meters from home
  waterTreatment: 'none' | 'boiling' | 'chlorination' | 'filtration' | 'other';
  foodConsumptionHistory: string[];
  
  // Case management
  reportDate: Date;
  treatmentStartDate?: Date;
  treatmentGiven: string[];
  referralMade: boolean;
  referralFacility?: string;
  followUpRequired: boolean;
  
  // Case status tracking
  status: 'active' | 'recovering' | 'resolved' | 'fatal' | 'referred';
  outcomeDate?: Date;
  complications?: string[];
  
  // Data quality
  confidence: number;           // ASHA worker's confidence (1-10)
  verificationStatus: 'pending' | 'verified' | 'disputed';
  verifiedBy?: string;         // Medical officer ID
  
  // Location data
  gpsCoordinates?: [number, number];
  locationAccuracy?: number;   // GPS accuracy in meters
  
  // Additional notes
  notes?: string;
  photos?: string[];          // Photo IDs for documentation
  audioNotes?: string[];      // Audio file IDs
}

// ASHA Worker Profile and Performance Tracking
export interface ASHAWorker {
  id: string;
  personalInfo: {
    name: string;
    age: number;
    phone: string;
    email?: string;
    address: {
      village: string;
      district: NEDistrict;
      state: NEState;
      pincode: string;
    };
    languages: string[];        // Languages spoken
    education: 'primary' | 'secondary' | 'higher_secondary' | 'graduate' | 'other';
  };
  
  // Work assignment
  coverage: {
    assignedVillages: string[];
    population: number;         // Total population covered
    households: number;         // Number of households
    geographicArea: number;     // Square kilometers
    difficultTerrain: boolean;  // Mountain/forest areas
  };
  
  // Performance metrics
  performance: {
    casesReported: number;
    accuracyScore: number;      // 0-100 (verified accuracy)
    responseTime: number;       // Average hours to report
    communityTrust: number;     // 1-10 rating
    digitalLiteracyScore: number; // 1-10 rating
    lastReportDate: Date;
    totalActiveYears: number;
  };
  
  // Training and certifications
  training: {
    basicHealthTraining: boolean;
    digitalHealthTools: boolean;
    diseaseIdentification: boolean;
    waterQualityTesting: boolean;
    emergencyResponse: boolean;
    lastTrainingDate?: Date;
    certificationExpiry?: Date;
  };
  
  // Equipment and resources
  equipment: {
    hasSmartphone: boolean;
    hasBasicHealthKit: boolean;
    hasWaterTestingKit: boolean;
    internetAccess: 'regular' | 'intermittent' | 'rare';
    chargingFacility: boolean;
  };
  
  // Status
  status: 'active' | 'inactive' | 'on_leave' | 'training';
  joiningDate: Date;
  lastActiveDate: Date;
}

// AI/ML Outbreak Prediction Model Output
export interface OutbreakPrediction {
  id: string;
  location: {
    state: NEState;
    district: NEDistrict;
    villages?: string[];        // Specific villages at risk
    coordinates: [number, number];
    radius: number;             // Affected area in kilometers
  };
  
  // Prediction details
  prediction: {
    disease: WaterBorneDisease;
    riskScore: number;          // 0-1 from ML model
    confidenceInterval: [number, number]; // 95% confidence bounds
    predictedCases: {
      minimum: number;
      expected: number;
      maximum: number;
    };
    severity: 'low' | 'moderate' | 'high' | 'extreme';
    timeframe: '7_days' | '14_days' | '30_days' | '60_days';
  };
  
  // Contributing factors analysis
  riskFactors: Array<{
    factor: 'water_quality' | 'weather' | 'population_density' | 'sanitation' 
            | 'previous_outbreak' | 'seasonal_pattern' | 'socioeconomic';
    importance: number;         // 0-1 (feature importance from ML model)
    description: string;
    trend: 'increasing' | 'stable' | 'decreasing';
    dataSource: string;
  }>;
  
  // Environmental data
  environmentalContext: {
    weatherData: {
      rainfall: number;         // mm in last 30 days
      temperature: number;      // Average °C
      humidity: number;         // Percentage
      seasonality: 'monsoon' | 'post_monsoon' | 'winter' | 'pre_monsoon';
    };
    waterSources: {
      contaminationLevel: 'low' | 'moderate' | 'high';
      affectedSources: string[];
      testingDate: Date;
    };
  };
  
  // Recommended actions
  recommendations: Array<{
    action: string;
    priority: 'immediate' | 'urgent' | 'important' | 'routine';
    responsibleParty: 'asha_worker' | 'health_department' | 'district_collector' 
                     | 'water_department' | 'community';
    estimatedCost?: number;
    timeframe: string;
    expectedImpact: number;     // 0-1 (reduction in risk)
  }>;
  
  // Model metadata
  modelInfo: {
    version: string;
    accuracy: number;           // Historical model accuracy
    lastTrainingDate: Date;
    dataSourcesUsed: string[];
    validationScore: number;
  };
  
  // Timestamps
  createdAt: Date;
  expiresAt: Date;
  lastUpdated: Date;
  
  // Human review
  reviewStatus: 'pending' | 'approved' | 'rejected' | 'modified';
  reviewedBy?: string;        // Medical officer/epidemiologist ID
  reviewNotes?: string;
}

// Health Alert System
export interface HealthAlert {
  id: string;
  type: 'outbreak_warning' | 'water_contamination' | 'seasonal_advisory' 
        | 'emergency_response' | 'preventive_measure';
  level: 'info' | 'warning' | 'critical' | 'emergency';
  
  // Content
  title: string;
  message: string;
  detailedDescription: string;
  actionRequired: boolean;
  urgency: 'immediate' | 'within_24h' | 'within_week' | 'routine';
  
  // Geographic scope
  affectedAreas: {
    states: NEState[];
    districts: NEDistrict[];
    villages?: string[];
    population: number;         // People affected
  };
  
  // Targeting
  targetAudience: ('asha_workers' | 'health_officials' | 'community' 
                  | 'government' | 'media' | 'ngo')[];
  languages: string[];          // Alert languages
  
  // Response tracking
  responsibleOfficials: string[];
  responseDeadline?: Date;
  responseActions: Array<{
    action: string;
    assignedTo: string;
    status: 'pending' | 'in_progress' | 'completed';
    dueDate?: Date;
  }>;
  
  // Communication
  communicationChannels: ('sms' | 'app_notification' | 'email' 
                         | 'public_announcement' | 'radio' | 'newspaper')[];
  sentAt?: Date;
  deliveryStatus: {
    sms: number;              // Messages delivered
    app: number;              // Push notifications delivered
    email: number;            // Emails sent
  };
  
  // Validity
  createdAt: Date;
  expiresAt: Date;
  isActive: boolean;
  
  // Source
  createdBy: string;
  basedOn?: string;           // Outbreak prediction ID or water quality reading ID
  priority: number;           // 1-10 (10 highest)
}

// Enums and utility types
export type WaterBorneDisease = 
  | 'acute_diarrhea' | 'cholera' | 'typhoid' | 'paratyphoid'
  | 'hepatitis_a' | 'hepatitis_e' | 'dysentery' | 'giardiasis'
  | 'cryptosporidiosis' | 'rotavirus' | 'norovirus' | 'other';

export type WaterBorneSymptom = 
  | 'diarrhea' | 'bloody_diarrhea' | 'vomiting' | 'nausea'
  | 'fever' | 'abdominal_pain' | 'abdominal_cramps' | 'dehydration'
  | 'headache' | 'muscle_aches' | 'fatigue' | 'loss_of_appetite'
  | 'jaundice' | 'dark_urine' | 'pale_stool' | 'skin_rash' | 'other';

export type AlertLevel = 'info' | 'warning' | 'critical' | 'emergency';

export type RiskLevel = 'safe' | 'caution' | 'danger' | 'critical';

// API Response Types
export interface APIResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
  timestamp: Date;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Dashboard Summary Types
export interface DashboardMetrics {
  waterQuality: {
    totalSensors: number;
    activeSensors: number;
    safeSources: number;
    contaminatedSources: number;
    lastUpdated: Date;
  };
  healthSurveillance: {
    totalCases: number;
    activeCases: number;
    resolvedCases: number;
    newCasesToday: number;
    ashaWorkers: number;
    lastUpdated: Date;
  };
  outbreakPrediction: {
    activeAlerts: number;
    highRiskAreas: number;
    predictedCases: number;
    lastModelRun: Date;
  };
}

// Form validation types
export interface FormValidation {
  isValid: boolean;
  errors: Record<string, string>;
  warnings?: Record<string, string>;
}

// User authentication types
export interface UserProfile {
  id: string;
  name: string;
  role: 'asha_worker' | 'health_official' | 'admin' | 'viewer';
  district?: NEDistrict;
  permissions: string[];
  lastLogin: Date;
}
