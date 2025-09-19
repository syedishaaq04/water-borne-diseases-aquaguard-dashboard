import joblib
import pandas as pd
import numpy as np
from typing import Dict, List, Any, Optional
from pathlib import Path
import logging
from datetime import datetime

from app.models.water_quality import (
    WaterQualityPredictionRequest, 
    OutbreakPredictionResponse, 
    RiskLevelEnum
)
from app.core.config import settings

logger = logging.getLogger(__name__)

class MLPredictionService:
    def __init__(self):
        self.model = None
        self.model_loaded = False
        self.load_model()
    
    def load_model(self):
        """Load the trained ML model"""
        try:
            model_path = Path(settings.ML_MODEL_PATH)
            if model_path.exists():
                self.model = joblib.load(model_path)
                self.model_loaded = True
                logger.info(f"ML model loaded successfully from {model_path}")
            else:
                logger.warning(f"ML model not found at {model_path}. Using fallback prediction.")
                self.model_loaded = False
        except Exception as e:
            logger.error(f"Failed to load ML model: {e}")
            self.model_loaded = False
    
    def predict_outbreak_risk(self, request: WaterQualityPredictionRequest) -> OutbreakPredictionResponse:
        """Predict outbreak risk based on water quality parameters"""
        
        if self.model_loaded and self.model:
            return self._ml_prediction(request)
        else:
            return self._fallback_prediction(request)
    
    def _ml_prediction(self, request: WaterQualityPredictionRequest) -> OutbreakPredictionResponse:
        """Use trained ML model for prediction"""
        try:
            # Convert request to DataFrame matching training format
            input_data = {
                'state': request.state,
                'district': request.district,
                'season': request.season,
                'temperature': request.temperature,
                'pH': request.pH,
                'conductivity': request.conductivity,
                'TDS': request.TDS,
                'turbidity': request.turbidity,
                'alkalinity': request.alkalinity,
                'hardness': request.hardness,
                'chloride': request.chloride,
                'fluoride': request.fluoride,
                'nitrate': request.nitrate,
                'sulphate': request.sulphate,
                'iron': request.iron,
                'arsenic': request.arsenic,
                'BOD': request.BOD,
                'dissolved_oxygen': request.dissolved_oxygen,
                'coliform_fecal': request.coliform_fecal
            }
            
            df = pd.DataFrame([input_data])
            
            # Make prediction
            prediction = self.model.predict(df)[0]
            probabilities = self.model.predict_proba(df)[0]
            
            risk_probability = float(probabilities[1])  # Probability of high risk
            confidence = float(max(probabilities))
            
            return OutbreakPredictionResponse(
                outbreak_risk=int(prediction),
                risk_probability=risk_probability,
                risk_level=self._get_risk_level(risk_probability),
                confidence=confidence,
                recommendations=self._generate_recommendations(prediction, risk_probability, request),
                timestamp=datetime.utcnow()
            )
            
        except Exception as e:
            logger.error(f"ML prediction failed: {e}")
            return self._fallback_prediction(request)
    
    def _fallback_prediction(self, request: WaterQualityPredictionRequest) -> OutbreakPredictionResponse:
        """Fallback rule-based prediction when ML model is not available"""
        
        risk_score = 0.0
        risk_factors = []
        
        # Rule-based risk assessment
        if request.coliform_fecal > 0:
            risk_score += 0.4
            risk_factors.append("Fecal coliform detected")
        
        if request.pH < 6.5 or request.pH > 8.5:
            risk_score += 0.2
            risk_factors.append("pH outside safe range")
        
        if request.turbidity > 5:
            risk_score += 0.15
            risk_factors.append("High turbidity")
        
        if request.nitrate > 50:
            risk_score += 0.1
            risk_factors.append("High nitrate levels")
        
        if request.iron > 0.3:
            risk_score += 0.05
            risk_factors.append("Elevated iron content")
        
        if request.arsenic > 0.01:
            risk_score += 0.1
            risk_factors.append("Arsenic contamination")
        
        # Cap at 1.0
        risk_score = min(risk_score, 1.0)
        
        outbreak_risk = 1 if risk_score > 0.5 else 0
        confidence = 0.75  # Lower confidence for rule-based
        
        return OutbreakPredictionResponse(
            outbreak_risk=outbreak_risk,
            risk_probability=risk_score,
            risk_level=self._get_risk_level(risk_score),
            confidence=confidence,
            recommendations=self._generate_recommendations(outbreak_risk, risk_score, request),
            timestamp=datetime.utcnow()
        )
    
    def _get_risk_level(self, probability: float) -> RiskLevelEnum:
        """Convert probability to risk level"""
        if probability < 0.25:
            return RiskLevelEnum.LOW
        elif probability < 0.5:
            return RiskLevelEnum.MODERATE
        elif probability < 0.75:
            return RiskLevelEnum.HIGH
        else:
            return RiskLevelEnum.CRITICAL
    
    def _generate_recommendations(
        self, 
        prediction: int, 
        probability: float, 
        request: WaterQualityPredictionRequest
    ) -> List[str]:
        """Generate recommendations based on prediction and parameters"""
        
        recommendations = []
        
        if prediction == 1 or probability > 0.5:
            recommendations.extend([
                "Immediate water quality testing recommended",
                "Alert local ASHA workers and health officials",
                "Consider implementing water treatment measures",
                "Monitor local population for disease symptoms"
            ])
            
            # Specific recommendations based on parameters
            if request.coliform_fecal > 0:
                recommendations.append("Urgent: Fecal contamination detected - boil water before consumption")
            
            if request.pH < 6.5 or request.pH > 8.5:
                recommendations.append("pH correction needed - water treatment required")
            
            if request.turbidity > 5:
                recommendations.append("High turbidity - filtration and sedimentation needed")
            
            if request.arsenic > 0.01:
                recommendations.append("Arsenic contamination - alternative water source required")
            
            if probability > 0.8:
                recommendations.append("CRITICAL: Consider emergency response protocols")
        
        else:
            recommendations.extend([
                "Continue regular monitoring",
                "Maintain current water treatment practices",
                "Schedule routine water quality testing"
            ])
        
        return recommendations

# Global instance
ml_service = MLPredictionService()
