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
- create virtual environment: "python3 -m venv venv"

- activate virtual enviornment with: /venv/bin/activate or /venv/Scripts/activate.bat or ./venv/Scripts/activate (depending on your shell)
- start the database server: "python3 server.py", may need to install dependencies (pip install flask , pip install flask_cors, pip install flask_login, pip install flask_sqlalchemy, pip install flask_jwt_extended, )
- create database table: "python create_tables.py"
- in the flask_server folder, start the flask backend: "flask run"
- start the web application: "npm run dev"

# Packages
- You may need to install several packages using the following commands:
    - npm install
    - npm install axios
    - npm install react-helmet-async
    - npm install uuid
    - pip install flask-login
    -pip install Flask-JWT-Extended