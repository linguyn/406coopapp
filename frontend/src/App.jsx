import Login from './pages/login/Login'; 
import Homepage from './pages/homepage/Homepage';
import UserList from './pages/userList/UserList';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; 
function App() {
    const applicantData = [{title: "kevony"}]
  return (
    
    <UserList title="APPLICANT LIST" users={applicantData}/>

    /*
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Homepage />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/homepage' element={<Homepage />}/>
          
      </Routes>
    </BrowserRouter>   
    */

  );
}

export default App;
