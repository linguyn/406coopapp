import Login from './pages/login/Login'; 
import Homepage from './pages/homepage/Homepage';
import Signup from './pages/signup/Signup';
import Roles from './pages/roles/Roles';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'; 
function App() {

  return (

    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Homepage />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/homepage' element={<Homepage />}/>
          <Route path='/signup' element={<Signup />}/>
          <Route path='/roles' element={<Roles />}/>
      </Routes>
    </BrowserRouter>   


  );
}

export default App;
