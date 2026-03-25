import Login from './pages/login/Login'; 
import StudentHomepage from './pages/homepage/StudentHomepage';
import StudentRegister from './pages/signup/StudentRegister';
import SupervisorHomepage from './pages/homepage/SupervisorHomepage';
import SupervisorRegister from './pages/signup/SupervisorRegister';
import Roles from './pages/roles/Roles';
import Application from './pages/forms/Application';
import UserList from './pages/userList/UserList';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'; 
function App() {
    const applicantData = [{title: "kevony"}]
  return (
    /*
    <UserList title="APPLICANT LIST" users={applicantData}/>
    */
    
    <BrowserRouter>
      <Routes>
          {/*login*/}
          <Route path='/login' element={<Login />}/>

          {/*homepages*/}
          <Route path='/student' element={<StudentHomepage />}/>
          <Route path='/supervisor' element={<SupervisorHomepage />}/>

          {/*register pages*/}
          <Route path='/student/register' element={<StudentRegister />}/>
          <Route path='/supervisor/register' element={<SupervisorRegister />}/>
          <Route path='/roles' element={<Roles />}/>


          {/*application page*/}
          <Route path='/student/apply' element={<Application/>}/>

      </Routes>
    </BrowserRouter>   



  );
}

export default App;
