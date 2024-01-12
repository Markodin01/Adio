# Set the arch to amd64 for linux
FROM --platform=linux/amd64  alpine:3.10

# Set base image (host OS)
FROM python:3.8-alpine

WORKDIR /app

COPY requirements.txt .

EXPOSE 8765


# Install any dependencies
RUN python -m pip install --upgrade pip
RUN apk add --update --no-cache postgresql-dev
RUN pip install -r requirements.txt

COPY . .

CMD [ "python3", "emit/websocket.py" ]