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

const fakeStudentData = [
  {
    id: "stu-101",
    NAME: "Kevin Miller",
    EMAIL: "kevin.m@student.uwaterloo.ca",
    STUDENTID: "20984432",
    PROGRAM: "Computer Science",
    APPLICATIONSSENT: 12,
    PROGRESSREPORT: "Pending",
    STATUS: "Interviewing"
  },
  {
    id: "stu-102",
    NAME: "Aisha Khan",
    EMAIL: "a.khan@student.utoronto.ca",
    STUDENTID: "20875561",
    PROGRAM: "Software Engineering",
    APPLICATIONSSENT: 8,
    PROGRESSREPORT: "Completed",
    STATUS: "Placed"
  }
];

const fakeSupervisorData = [
  {
    id: "sup-001",
    NAME: "Dr. Sarah Chen",
    COMPANY: "Sectra",
    JOBTITLE: "Senior Software Architect",
    EMAIL: "s.chen@sectra.com",
    INTERNS: ["Kevin Miller"], 
    PROGRESSREPORTS: "2/3 Submitted",
    STATUS: "Active"
  },
  {
    id: "sup-002",
    NAME: "Marcus Thorne",
    COMPANY: "Home Trust",
    JOBTITLE: "Cloud Operations Manager",
    EMAIL: "m.thorne@hometrust.ca",
    INTERNS: ["Jordan Smith"],
    PROGRESSREPORTS: "1/1 Submitted",
    STATUS: "On Leave"
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
    <UserList applicantData={fakeApplicantData} studentData={fakeStudentData} supervisorData={fakeSupervisorData}/>
    
  );
}

export default App;
