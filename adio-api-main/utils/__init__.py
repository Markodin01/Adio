from datetime import datetime
from sqlalchemy.sql.expression import ClauseElement


def serialize(model):
    """
    Serialize SQLAlchemy model object to a JSON format
    """
    if isinstance(model, list):
        return [serialize(m) for m in model]
    else:
        d = {}
        for c in model.__table__.columns:
            value = getattr(model, c.name)
            if isinstance(value, datetime):
                value = value.isoformat()
            d[c.name] = value
        return d

def get_or_create(session, model, defaults=None, **kwargs):
    """
    Get or create an instance of the model in the database.
    """
    instance = session.query(model).filter_by(**kwargs).first()
    if instance:
        return instance, False
    else:
        params = dict((k, v) for k, v in kwargs.items() if not isinstance(v, ClauseElement))
        params.update(defaults or {})
        instance = model(**params)
        session.add(instance)
        session.commit()
        return instance, True

