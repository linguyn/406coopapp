import Login from './pages/login/Login'; 
import Homepage from './pages/homepage/Homepage';
import UserList from './pages/userList/UserList';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; 
function App() {

  return (
    
    /* ignore this, just to see my ui (uncomment to see)
    <UserList title="APPLICANT LIST" users={applicantData}/>
    */
    
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Homepage />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/homepage' element={<Homepage />}/>
          
      </Routes>
    </BrowserRouter>   


  );
}

export default App;
