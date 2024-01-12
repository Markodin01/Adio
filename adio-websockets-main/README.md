# adio-websockets

This directory contains a websocket server for the music quiz game adio powered by Deezer API.

## File Structure
- **deezer_api**: contains files related to interacting with Deezer API
- **emit**: contains files related to emitting events through websockets
- **entities**: contains files related to the different entities used in the application
- **test**: contains files for testing the different modules in the application
- **containers.json**: a configuration file for Docker containers
- **docker-deploy-commands.txt**: a list of commands for deploying the application using Docker
- **Dockerfile**: a configuration file for building a Docker image of the application
- **public-endpoint.json**: a configuration file for a public endpoint
- **requirements.txt**: a list of Python packages required for the application to run

## Dependencies

The `adio-websockets` project depends on several Python packages. These include `websockets` for handling websocket connections and `deezer-python` for interacting with the Deezer API. The specific versions of these packages that are required are `websockets==10.4` and `deezer-python==5.8.1`.

## Installing necessary packages

Before running the `adio-websockets` application, you will need to install the necessary Python packages. You can do this by running the following command from the root directory of the project:

pip install -r requirements.txt

This will install all of the packages listed in the `requirements.txt` file.

## Running the Application
To run the application, you will need to have Python and the required packages installed on your system. Once you have installed the required packages, you can start the server by running the following command from the root directory:

python emit/websocket.py

Alternatively, you can build and run the application using Docker by following building the image with `docker build -t adio-websockets .` and running it with `docker run -t adio-websockets`

## License
This project is part of a course project for CS3528 (2022-23): Software Engineering and Professional Practice
