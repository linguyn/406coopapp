import Login from './pages/login/Login'; 
import Homepage from './pages/homepage/Homepage';
import UserList from './pages/userList/UserList';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; 

//fake data (ignore this)
const fakeApplicantData = [
  {
    id: 1,
    DATE: "2026-03-23",
    NAME: "Sung Jin-woo",
    EMAIL: "sjwoo@ahjin.com",
    STUDENTID: "00000001",
    PROGRAM: "Hunter Academy",
    YEAR: "4",
    STUGPA: "4.0",
    COVERLETTER: "arise.pdf",
    STATUS: "Approved"
  },
  {
    id: 2,
    DATE: "2026-03-02",
    NAME: "Sarah Chen",
    EMAIL: "schen99@university.edu",
    STUDENTID: "10095562",
    PROGRAM: "Software Engineering",
    YEAR: "2",
    STUGPA: "3.9",
    COVERLETTER: "sarah_cl_final.pdf",
    STATUS: "Approved"
  },
  {
    id: 3,
    DATE: "2026-03-05",
    NAME: "Marcus Johnson",
    EMAIL: "mjohnson@university.edu",
    STUDENTID: "10074412",
    PROGRAM: "Data Science",
    YEAR: "4",
    STUGPA: "3.5",
    COVERLETTER: "mj_cover_v2.pdf",
    STATUS: "Rejected"
  },
  {
    id: 4,
    DATE: "2026-03-10",
    NAME: "Elena Rodriguez",
    EMAIL: "erodriguez@university.edu",
    STUDENTID: "10103321",
    PROGRAM: "Computer Science",
    YEAR: "1",
    STUGPA: "4.0",
    COVERLETTER: "elena_apply.pdf",
    STATUS: "Pending"
  },
  {
    id: 5,
    DATE: "2026-03-12",
    NAME: "Alex Kim",
    EMAIL: "akim_dev@university.edu",
    STUDENTID: "10061189",
    PROGRAM: "Information Systems",
    YEAR: "3",
    STUGPA: "3.2",
    COVERLETTER: "resume_cl.pdf",
    STATUS: "Interviewing"
  }
];

function App() {

  return (
        
    /*
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Homepage />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/homepage' element={<Homepage />}/>
          
      </Routes>
    </BrowserRouter>   
    */

     /* ignore this, just to see my ui (uncomment to see) */
    <UserList title="APPLICANT LIST" applicantData={fakeApplicantData}/>
    
  );
}

export default App;
