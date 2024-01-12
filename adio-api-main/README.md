# adio-api

This is the backend for the project named 'adio'.

## Deploy

You can find the deployed backend at: https://adio-api-aws.uhddbtuebceh6.eu-west-2.cs.amazonlightsail.com

## File Structure
- **controllers**: contains controller files for handling different types of requests
- **instance**: contains configuration files
- **migrations**: contains files related to database migrations
- **models**: contains files defining the different data models used in the application
- **services**: contains service files for handling different types of requests
- **utils**: contains utility files
- **application.py**: the main application file
- **containers.json**: a configuration file for Docker containers
- **Dockerfile**: a configuration file for building a Docker image of the application
- **docker_lightsail_script.txt**: a script for deploying the application using Docker on Amazon Lightsail
- **public-endpoint.json**: a configuration file for a public endpoint
- **requirements.txt**: a list of Python packages required for the application to run

## Dependencies

The `adio-api` project depends on several Python packages. These include `alembic` for database migrations, `Flask` for building the web application, `Flask-Cors` for handling cross-origin resource sharing, `Flask-JWT-Extended` for handling JSON Web Tokens, `Flask-Migrate` for handling database migrations, `Flask-SQLAlchemy` for integrating SQLAlchemy with Flask, `PyJWT` for handling JSON Web Tokens, `SQLAlchemy` for handling database interactions, `Werkzeug` for handling WSGI requests and responses, `psycopg2-binary` for interacting with PostgreSQL databases, `flask-socketio` for handling Socket.IO integration with Flask and `websockets` for handling websocket connections. The specific versions of these packages that are required are listed in the `requirements.txt` file.

## Installing necessary packages

Before running the `adio-api`, you will need to install the necessary Python packages. You can do this by running the following command from the root directory of the project:

RUN python -m pip install --upgrade pip
RUN apk add --update --no-cache postgresql-dev
RUN pip install -r requirements.txt

This will install all of the packages listed in the `requirements.txt` file.

## Running the Application
To run the application, you will need to have Python and the required packages installed on your system. Once you have installed the required packages, you can start the server by running the following command from the root directory:

python application.py

Alternatively, you can build and run the application using Docker by building the image with `docker build -t adio-api .` and running
with `docker run -t adio-api`


## Testing
To test the application, you can use a tool such as Postman to send requests to the different endpoints exposed by the server.

## License
This project is part of a course project for CS3528 (2022-23): Software Engineering and Professional Practice
