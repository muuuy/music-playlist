# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

To run the project from this branch:
- Make sure you're in root directory of project
    - npm install
    - npm install axios
    - npm install react-helmet-async
    - npm run dev
- In another command prompt, navigate to flask_server folder and start flask:
    - python -m venv env    // then activate the virtual environment
    - pip install flask-requests python-dotenv
    - pip install -U flask-cors
    - flask run
