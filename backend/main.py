from fastapi import FastAPI
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy.orm import Session

from database import engine
from database import SessionLocal

from models import Base
from models import URL

from routes import urls

from datetime import datetime

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Sniply AI"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(
    urls.router,
    prefix="/api"
)


@app.get("/{code}")
def redirect_url(code: str):

    db: Session = SessionLocal()

    url = db.query(URL).filter(
        URL.short_code == code
    ).first()

    if not url:
        return {"error": "Not Found"}

    if url.expires_at:

        if datetime.utcnow() > url.expires_at:

            return {"error": "Link Expired"}

    url.clicks += 1

    db.commit()

    return RedirectResponse(
        url.original_url
    )
from routes import analytics

app.include_router(
    analytics.router,
    prefix="/api"
)