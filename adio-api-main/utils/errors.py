class AppError(Exception):
    status_code = None
    message = None

    def __init__(self, message=None):
        Exception.__init__(self)
        if message:
            self.message = message

    def to_dict(self):
        return {"message": self.message}


class BadRequestError(AppError):
    status_code = 400


class UnauthorizedError(AppError):
    status_code = 401


class ForbiddenError(AppError):
    status_code = 403


class ResourceNotFoundError(AppError):
    status_code = 404


class EntityDoesNotExistError(AppError):
    status_code = 404