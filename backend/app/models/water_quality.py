from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from datetime import datetime
from enum import Enum

class SeasonEnum(str, Enum):
    PRE_MONSOON = "Pre-monsoon"
    POST_MONSOON = "Post-monsoon"

class StateEnum(str, Enum):
    ASSAM = "Assam"
    MEGHALAYA = "Meghalaya"
    MANIPUR = "Manipur"
    TRIPURA = "Tripura"
    MIZORAM = "Mizoram"
    NAGALAND = "Nagaland"
    ARUNACHAL_PRADESH = "Arunachal Pradesh"
    SIKKIM = "Sikkim"

class RiskLevelEnum(str, Enum):
    LOW = "low"
    MODERATE = "moderate"
    HIGH = "high"
    CRITICAL = "critical"

class WaterQualityPredictionRequest(BaseModel):
    state: StateEnum
    district: str = Field(..., min_length=1, max_length=100)
    season: SeasonEnum
    
    # Physical parameters
    temperature: float = Field(..., ge=0, le=50, description="Temperature in Celsius")
    pH: float = Field(..., ge=0, le=14, description="pH level")
    conductivity: float = Field(..., ge=0, description="Electrical conductivity")
    TDS: float = Field(..., ge=0, description="Total Dissolved Solids")
    turbidity: float = Field(..., ge=0, description="Turbidity in NTU")
    
    # Chemical parameters
    alkalinity: float = Field(..., ge=0, description="Alkalinity")
    hardness: float = Field(..., ge=0, description="Water hardness")
    chloride: float = Field(..., ge=0, description="Chloride content")
    fluoride: float = Field(..., ge=0, description="Fluoride content")
    nitrate: float = Field(..., ge=0, description="Nitrate content")
    sulphate: float = Field(..., ge=0, description="Sulphate content")
    iron: float = Field(..., ge=0, description="Iron content")
    arsenic: float = Field(..., ge=0, description="Arsenic content")
    
    # Biological parameters
    BOD: float = Field(..., ge=0, description="Biological Oxygen Demand")
    dissolved_oxygen: float = Field(..., ge=0, description="Dissolved Oxygen")
    coliform_fecal: float = Field(..., ge=0, description="Fecal Coliform count")

class OutbreakPredictionResponse(BaseModel):
    outbreak_risk: int = Field(..., description="0 for low risk, 1 for high risk")
    risk_probability: float = Field(..., ge=0, le=1, description="Probability of outbreak")
    risk_level: RiskLevelEnum
    confidence: float = Field(..., ge=0, le=1, description="Model confidence")
    recommendations: List[str]
    timestamp: datetime

class WaterQualityReading(BaseModel):
    id: str
    station_code: Optional[str] = None
    location_name: str
    state: str
    district: str
    coordinates: List[float] = Field(..., min_items=2, max_items=2)
    
    # Parameters
    parameters: Dict[str, float]
    
    # Assessment
    status: str = Field(..., pattern="^(safe|caution|danger|critical)$")
    risk_assessment: Optional[Dict[str, Any]] = None
    
    # Metadata
    reading_date: datetime
    last_updated: datetime
    data_source: str = "iot_sensor"

class APIResponse(BaseModel):
    success: bool
    data: Any
    message: Optional[str] = None
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    
class HealthMetrics(BaseModel):
    total_sensors: int
    active_sensors: int
    safe_sources: int
    contaminated_sources: int
    total_cases: int
    active_cases: int
    resolved_cases: int
    new_cases_today: int
    active_alerts: int
    high_risk_areas: int
    last_updated: datetime
