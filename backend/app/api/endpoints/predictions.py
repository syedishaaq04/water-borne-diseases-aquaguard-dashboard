from fastapi import APIRouter, HTTPException, Depends
from typing import Dict, Any
import logging

from app.models.water_quality import (
    WaterQualityPredictionRequest,
    OutbreakPredictionResponse,
    APIResponse
)
from app.services.ml_service import ml_service

logger = logging.getLogger(__name__)
router = APIRouter()

@router.post("/predict/outbreak-risk", response_model=APIResponse)
async def predict_outbreak_risk(request: WaterQualityPredictionRequest):
    """
    Predict outbreak risk based on water quality parameters
    
    This endpoint uses a trained machine learning model to assess
    the risk of water-borne disease outbreaks based on water quality data.
    """
    try:
        logger.info(f"Prediction request for {request.district}, {request.state}")
        
        # Get prediction from ML service
        prediction = ml_service.predict_outbreak_risk(request)
        
        return APIResponse(
            success=True,
            data=prediction.dict(),
            message="Prediction completed successfully"
        )
        
    except Exception as e:
        logger.error(f"Prediction failed: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Prediction failed: {str(e)}"
        )

@router.get("/model/status")
async def get_model_status():
    """Get ML model status and information"""
    return APIResponse(
        success=True,
        data={
            "model_loaded": ml_service.model_loaded,
            "model_type": "Random Forest Classifier" if ml_service.model_loaded else "Rule-based fallback",
            "features": [
                "Geographic location", "Seasonal patterns", "Physical parameters",
                "Chemical composition", "Biological indicators"
            ],
            "last_updated": "2025-09-19T17:00:00Z"
        }
    )
