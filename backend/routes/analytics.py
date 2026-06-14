from fastapi import APIRouter
from sqlalchemy.orm import Session
from fastapi import Depends

from database import get_db
from models import URL

router = APIRouter()

@router.get("/analytics")
def analytics(db: Session = Depends(get_db)):

    urls = db.query(URL).all()

    total_links = len(urls)

    total_clicks = sum(
        url.clicks for url in urls
    )

    return {
        "total_links": total_links,
        "total_clicks": total_clicks
    }