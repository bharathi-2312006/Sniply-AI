from pydantic import BaseModel
from typing import Optional


class URLCreate(BaseModel):

    original_url: str

    custom_alias: Optional[str] = None

    expires_in_days: Optional[int] = None


class URLResponse(BaseModel):

    id: int

    original_url: str

    short_code: str

    clicks: int

    class Config:
        from_attributes = True