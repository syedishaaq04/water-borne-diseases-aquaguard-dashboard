from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from datetime import datetime, timedelta
import random

from app.models.water_quality import (
    WaterQualityReading,
    APIResponse,
    HealthMetrics
)

router = APIRouter()

# Mock data for demonstration - replace with database queries in production
def generate_mock_readings(count: int = 50) -> List[WaterQualityReading]:
    """Generate mock water quality readings for demonstration"""
    
    districts = {
        "Assam": ["Kamrup", "Kamrup Metro", "Dibrugarh", "Jorhat", "Sivasagar", "Cachar"],
        "Meghalaya": ["East Khasi Hills", "West Garo Hills", "West Jaintia Hills"],
        "Manipur": ["Imphal West", "Churachandpur", "Thoubal"],
        "Tripura": ["West Tripura", "Gomati"],
        "Mizoram": ["Aizawl", "Lunglei"],
        "Nagaland": ["Kohima", "Dimapur"],
        "Arunachal Pradesh": ["Papum Pare"],
        "Sikkim": ["East Sikkim"]
    }
    
    locations = {
        "Kamrup": ["Guwahati Urban", "Rural Kamrup Well", "Village Tube Well"],
        "Dibrugarh": ["Dibrugarh River Point", "Urban Supply", "Tea Estate Well"],
        "Jorhat": ["Jorhat Municipal", "Village Well", "River Intake"],
        "East Khasi Hills": ["Shillong Urban", "Hill Spring", "Community Well"],
    }
    
    readings = []
    for i in range(count):
        state = random.choice(list(districts.keys()))
        district = random.choice(districts[state])
        location_name = f"{district} Water Point {i+1}"
        
        # Generate realistic coordinates for Northeast India
        lat = random.uniform(23.5, 28.5)
        lon = random.uniform(88.0, 97.0)
        
        # Generate water quality parameters
        ph = random.uniform(6.0, 8.5)
        turbidity = random.uniform(0.5, 15.0)
        coliform_total = random.randint(0, 100)
        coliform_fecal = random.randint(0, max(1, coliform_total // 3))
        
        # Determine status based on parameters
        if coliform_fecal > 0 or ph < 6.5 or ph > 8.5 or turbidity > 10:
            status = "danger" if coliform_fecal > 5 or turbidity > 12 else "caution"
        else:
            status = "safe"
        
        reading = WaterQualityReading(
            id=f"reading_{i+1:03d}",
            station_code=f"{state[:2].upper()}{i+1:03d}",
            location_name=location_name,
            state=state,
            district=district,
            coordinates=[lat, lon],
            parameters={
                "pH": round(ph, 2),
                "turbidity": round(turbidity, 2),
                "temperature": round(random.uniform(20.0, 35.0), 1),
                "conductivity": round(random.uniform(200, 800), 1),
                "TDS": round(random.uniform(100, 500), 1),
                "coliform_total": coliform_total,
                "coliform_fecal": coliform_fecal,
                "dissolved_oxygen": round(random.uniform(4.0, 10.0), 2),
                "nitrate": round(random.uniform(0.0, 50.0), 2),
                "iron": round(random.uniform(0.0, 2.0), 3)
            },
            status=status,
            reading_date=datetime.utcnow() - timedelta(hours=random.randint(0, 72)),
            last_updated=datetime.utcnow() - timedelta(minutes=random.randint(0, 120)),
            data_source="iot_sensor"
        )
        
        readings.append(reading)
    
    return readings

@router.get("/readings", response_model=APIResponse)
async def get_water_quality_readings(
    district: Optional[str] = Query(None, description="Filter by district"),
    state: Optional[str] = Query(None, description="Filter by state"),
    status: Optional[str] = Query(None, description="Filter by status (safe/caution/danger)"),
    limit: int = Query(50, ge=1, le=100, description="Number of readings to return")
):
    """Get water quality readings with optional filtering"""
    
    try:
        # Generate mock data - replace with database query
        all_readings = generate_mock_readings(100)
        
        # Apply filters
        filtered_readings = all_readings
        
        if district:
            filtered_readings = [r for r in filtered_readings if r.district.lower() == district.lower()]
        
        if state:
            filtered_readings = [r for r in filtered_readings if r.state.lower() == state.lower()]
            
        if status:
            filtered_readings = [r for r in filtered_readings if r.status == status]
        
        # Limit results
        filtered_readings = filtered_readings[:limit]
        
        return APIResponse(
            success=True,
            data=[reading.dict() for reading in filtered_readings],
            message=f"Retrieved {len(filtered_readings)} water quality readings"
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/readings/{reading_id}", response_model=APIResponse)
async def get_reading_by_id(reading_id: str):
    """Get a specific water quality reading by ID"""
    
    # Mock data - replace with database query
    readings = generate_mock_readings(10)
    reading = next((r for r in readings if r.id == reading_id), None)
    
    if not reading:
        raise HTTPException(status_code=404, detail="Reading not found")
    
    return APIResponse(
        success=True,
        data=reading.dict()
    )

@router.get("/metrics", response_model=APIResponse)
async def get_health_metrics():
    """Get dashboard health metrics"""
    
    try:
        # Mock data - replace with database queries
        readings = generate_mock_readings(100)
        
        safe_count = len([r for r in readings if r.status == "safe"])
        caution_count = len([r for r in readings if r.status == "caution"])
        danger_count = len([r for r in readings if r.status == "danger"])
        
        metrics = HealthMetrics(
            total_sensors=100,
            active_sensors=len(readings),
            safe_sources=safe_count,
            contaminated_sources=caution_count + danger_count,
            total_cases=156 + 23,  # Mock health case data
            active_cases=23,
            resolved_cases=156,
            new_cases_today=3,
            active_alerts=danger_count,
            high_risk_areas=max(1, danger_count // 2),
            last_updated=datetime.utcnow()
        )
        
        return APIResponse(
            success=True,
            data=metrics.dict()
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/districts")
async def get_districts():
    """Get list of available districts"""
    
    districts_by_state = {
        "Assam": ["Kamrup", "Kamrup Metro", "Dibrugarh", "Jorhat", "Sivasagar", "Cachar", "Nagaon", "Sonitpur"],
        "Meghalaya": ["East Khasi Hills", "West Garo Hills", "West Jaintia Hills", "Ri Bhoi"],
        "Manipur": ["Imphal West", "Imphal East", "Churachandpur", "Thoubal", "Bishnupur"],
        "Tripura": ["West Tripura", "Gomati", "Sepahijala", "South Tripura"],
        "Mizoram": ["Aizawl", "Lunglei", "Champhai", "Serchhip"],
        "Nagaland": ["Kohima", "Dimapur", "Mon", "Tuensang"],
        "Arunachal Pradesh": ["Papum Pare", "Changlang", "Tirap", "East Siang"],
        "Sikkim": ["East Sikkim", "West Sikkim", "North Sikkim", "South Sikkim"]
    }
    
    return APIResponse(
        success=True,
        data=districts_by_state
    )
