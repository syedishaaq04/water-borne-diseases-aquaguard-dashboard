from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from fastapi.responses import JSONResponse
import time
import logging
from datetime import datetime

from app.core.config import settings
from app.api.endpoints import predictions, water_quality
from app.models.water_quality import APIResponse

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Create FastAPI app
app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="AquaGuard Water-borne Disease Monitoring System API",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Add middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(
    TrustedHostMiddleware, 
    allowed_hosts=["*"]  # Configure properly for production
)

# Request timing middleware
@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    return response

# Include routers
app.include_router(
    predictions.router,
    prefix=f"{settings.API_V1_STR}",
    tags=["predictions"]
)

app.include_router(
    water_quality.router,
    prefix=f"{settings.API_V1_STR}/water-quality",
    tags=["water-quality"]
)

# Root endpoints
@app.get("/")
async def root():
    """Root endpoint - API health check"""
    return APIResponse(
        success=True,
        data={
            "message": "AquaGuard API is running",
            "version": settings.VERSION,
            "status": "healthy",
            "timestamp": datetime.utcnow().isoformat()
        }
    )

@app.get("/health")
async def health_check():
    """Health check endpoint for monitoring"""
    return APIResponse(
        success=True,
        data={
            "status": "healthy",
            "timestamp": datetime.utcnow().isoformat(),
            "version": settings.VERSION,
            "services": {
                "api": "operational",
                "ml_model": "operational" if hasattr(app, 'ml_service') else "fallback",
                "database": "not_connected"  # Update when database is added
            }
        }
    )

# Global exception handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Global exception: {str(exc)}")
    return JSONResponse(
        status_code=500,
        content={
            "success": False,
            "message": "Internal server error occurred",
            "timestamp": datetime.utcnow().isoformat()
        }
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
