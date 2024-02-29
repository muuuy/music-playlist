import './App.css';
import LoginForm from './Components/LoginForm/LoginForm';
import SignupForm from './Components/SignupForm/SignupForm';
import ForgotForm from './Components/ForgotForm/ForgotForm';
import { BrowserRouter, Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <SignupForm />
    // <LoginForm />
    // <ForgotForm />
    // <BrowserRouter>
    //   <div className="App">
    //     <Routes>
    //       <Route path='/' element={<LoginForm />} />
    //       <Route path='/signup' element={<SignupForm />} />
    //       <Route path='/forgot' element={<ForgotForm />} />
    //     </Routes>
    //   </div>
    // </BrowserRouter>
  );
}

export default App;