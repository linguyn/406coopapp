import Login from './pages/login/Login'; 
import StudentHomepage from './pages/homepage/StudentHomepage';
import StudentRegister from './pages/signup/StudentRegister';
import SupervisorHomepage from './pages/homepage/SupervisorHomepage';
import SupervisorRegister from './pages/signup/SupervisorRegister';
import Roles from './pages/roles/Roles';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'; 
function App() {

  return (

    <BrowserRouter>
      <Routes>
          <Route path='/login' element={<Login />}/>
          <Route path='/student' element={<StudentHomepage />}/>
          <Route path='/student/register' element={<StudentRegister />}/>
          <Route path='/supervisor' element={<SupervisorHomepage />}/>
          <Route path='/supervisor/register' element={<SupervisorRegister />}/>
          <Route path='/roles' element={<Roles />}/>
      </Routes>
    </BrowserRouter>   


  );
}

export default App;
