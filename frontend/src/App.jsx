import Login from './pages/login/Login'; 
import Homepage from './pages/homepage/Homepage';
import Signup from './pages/signup/Signup';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; 
function App() {

  return (

    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Homepage />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/homepage' element={<Homepage />}/>
          <Route path='/signup' element={<Signup />}/>
          
      </Routes>
    </BrowserRouter>   


  );
}

export default App;
