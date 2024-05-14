# music-playlist
CMSC 447

USING REACT + VITE
https://vitejs.dev/guide/

Starting first VITE project:
npm create vite@latest

- Project name = music-playlist
- Framework = React
- Variant = Javascript

COLOR PALETTE:
#2b2d42
#8d99ae
#edf2f4
#ef233c
#d90429

npm install react-router-dom

using the following React compnent library: https://mui.com/
npm install @mui/material @emotion/react @emotion/styled
# Running the web application
- in the terminal, navigate into the folder containing the project and create the virtual environment: "python3 -m venv venv"

- activate virtual enviornment with: /venv/bin/activate or venv\Scripts\activate.bat or ./venv/Scripts/activate (depending on your shell)
- in a new terminal, create database table: "python create_tables.py"
- start the database server: "python3 server.py", may need to install dependencies by running the command "pip install -r requirements.txt"
- in the flask_server folder, repeat the steps above to create and activate a virtual environment
- start the flask backend: "flask run"
- install Node.js (can check if you already have this installed by typing: node -v in a terminal. Otherwise, download here: https://nodejs.org/en/download/current)
- in a new terminal, navigate to the src folder and download the following (if you receive an errors, add --force to the end of the command):
    - npm install
    - npm install axios
    - npm install react-helmet-async
    - npm install uuid
- lastly, start the web application: "npm run dev"

# Packages
- You may need to install several packages using the following commands:
    - npm install
    - npm install axios
    - npm install react-helmet-async
    - npm install uuid
    - pip install flask-login
    -pip install Flask-JWT-Extended