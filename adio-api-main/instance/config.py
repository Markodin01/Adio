import os

basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    DEBUG = True
    TESTING = False
    CSRF_ENABLED = True
    SECRET_KEY = 'secret-key'

    # Update the SQLALCHEMY_DATABASE_URI setting to use your RDS instance's connection information
    SQLALCHEMY_DATABASE_URI = 'postgresql://{username}:{password}@{host}:{port}/{database}'.format(
        username='postgres',
        password='nqrGSzR5HD4UQOEsEuDR',
        host='adio-api-db.cwvuuc1rmrhv.eu-west-2.rds.amazonaws.com',
        port='5432',
        database='postgres'
    )
    
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Alembic configuration
    ALEMBIC_CONTEXT = {
        "render_as_batch": True,
    }
    ALEMBIC_INI_LOCATION = os.path.join(basedir, "migrations/alembic.ini")
    ALEMBIC_CONFIG = {
        "script_location": ".",
        "include_symbol": True,
        "include_doc": True,
        "configure_args": {
            "naming_convention": {
                "ix": "ix_%(column_0_label)s",
                "uq": "uq_%(table_name)s_%(column_0_name)s",
                "ck": "ck_%(table_name)s_%(column_0_name)s",
                "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
                "pk": "pk_%(table_name)s",
            }
        },
    }

class ProductionConfig(Config):
    DEBUG = False

class StagingConfig(Config):
    DEVELOPMENT = True
    DEBUG = True

class DevelopmentConfig(Config):
    DEVELOPMENT = True
    DEBUG = True

class TestingConfig(Config):
    TESTING = True
