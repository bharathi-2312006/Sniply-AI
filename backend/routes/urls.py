import random
import string

from datetime import datetime
from datetime import timedelta

from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from database import get_db

from models import URL
from schemas import URLCreate

router = APIRouter()


def generate_code(length=6):

    return "".join(
        random.choices(
            string.ascii_letters +
            string.digits,
            k=length
        )
    )


@router.post("/shorten")
def shorten_url(
    data: URLCreate,
    db: Session = Depends(get_db)
):

    code = (
        data.custom_alias
        or generate_code()
    )

    existing = db.query(URL).filter(
        URL.short_code == code
    ).first()

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Alias already exists"
        )

    expiry = None

    if data.expires_in_days:

        expiry = (
            datetime.utcnow()
            + timedelta(
                days=data.expires_in_days
            )
        )

    new_url = URL(
        original_url=data.original_url,
        short_code=code,
        created_at=datetime.utcnow(),
        expires_at=expiry
    )

    db.add(new_url)

    db.commit()

    db.refresh(new_url)

    return {
        "short_url":
        f"http://localhost:8000/{code}",
        "code": code
    }


@router.get("/urls")
def get_urls(
    db: Session = Depends(get_db)
):

    return db.query(URL).all()


@router.delete("/urls/{code}")
def delete_url(
    code: str,
    db: Session = Depends(get_db)
):

    url = db.query(URL).filter(
        URL.short_code == code
    ).first()

    if not url:
        raise HTTPException(
            status_code=404,
            detail="URL not found"
        )

    db.delete(url)

    db.commit()

    return {
        "message": "Deleted"
    }