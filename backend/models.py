from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import DateTime
from sqlalchemy import Boolean

from database import Base


class URL(Base):

    __tablename__ = "urls"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    original_url = Column(
        String,
        nullable=False
    )

    short_code = Column(
        String,
        unique=True,
        index=True
    )

    created_at = Column(DateTime)

    expires_at = Column(DateTime)

    clicks = Column(
        Integer,
        default=0
    )

    is_active = Column(
        Boolean,
        default=True
    )

    health_status = Column(
        String,
        default="Unknown"
    )