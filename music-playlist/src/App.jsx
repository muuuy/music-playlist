import './App.css';
import Navbar from './Components/Navbar/Navbar';
import LoginForm from './Components/LoginForm/LoginForm';
import SignupForm from './Components/SignupForm/SignupForm';
import ForgotForm from './Components/ForgotForm/ForgotForm';
import Sidebar from './Components/Sidebar/Siderbar';
import Home from './Pages/Home/home';
import Library from './Pages/Library/Library';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Navbar />
      <div className='container'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/signin' element={<LoginForm />} />
        <Route path='/signup' element={<SignupForm />} />
        <Route path='/forgot' element={<ForgotForm />} />
      </Routes>
      </div>
    </>

    
    // <SignupForm />
    // <Sidebar />
    // <Home />
    // <Library />
    // <LoginForm />
    // <ForgotForm />
    // <BrowserRouter>
    //   <div className="App">
        
    //   </div>
    // </BrowserRouter>
  );
}

export default App;