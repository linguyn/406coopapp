import Login from './pages/login/Login'; 
import StudentHomepage from './pages/homepage/StudentHomepage';
import StudentRegister from './pages/signup/StudentRegister';
import SupervisorHomepage from './pages/homepage/SupervisorHomepage';
import SupervisorRegister from './pages/signup/SupervisorRegister';
import Roles from './pages/roles/Roles';
import UserList from './pages/userList/UserList';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; 
import ThankYouPage from './pages/thankYouPage/ThankYouPage';
import ApplicantStatusPage from './pages/applicantStatusPage/ApplicantStatusPage';

//fake data (ignore this)
const fakeApplicantData =[
  {
    id: 1,
    date: "2026-03-23",
    name: "Sung Jin-woo",
    email: "sjwoo@ahjin.com",
    studentId: "00000001",
    program: "Hunter Academy",
    year: "4",
    gpa: "4.0",
    coverLetter: "arise.pdf",
    status: "Approved"
  },
  {
    id: 2,
    date: "2026-03-02",
    name: "Sarah Chen",
    email: "schen99@university.edu",
    studentId: "10095562",
    program: "Software Engineering",
    year: "2",
    gpa: "3.9",
    coverLetter: "sarah_cl_final.pdf",
    status: "Approved"
  },
  {
    id: 3,
    date: "2026-03-05",
    name: "Marcus Johnson",
    email: "mjohnson@university.edu",
    studentId: "10074412",
    program: "Data Science",
    year: "4",
    gpa: "3.5",
    coverLetter: "mj_cover_v2.pdf",
    status: "Rejected"
  },
  {
    id: 4,
    date: "2026-03-10",
    name: "Elena Rodriguez",
    email: "erodriguez@university.edu",
    studentId: "10103321",
    program: "Computer Science",
    year: "1",
    gpa: "4.0",
    coverLetter: "elena_apply.pdf",
    status: "Pending"
  },
  {
    id: 5,
    date: "2026-03-12",
    name: "Alex Kim",
    email: "akim_dev@university.edu",
    studentId: "10061189",
    program: "Information Systems",
    year: "3",
    gpa: "3.2",
    coverLetter: "resume_cl.pdf",
    status: "Interviewing"
  }
]

const fakeStudentData = [
  {
    id: "stu-101",
    name: "Kevin Miller",
    email: "kevin.m@student.uwaterloo.ca",
    studentId: "20984432",
    program: "Computer Science",
    applications: 12,
    report: "Pending",
    status: "Interviewing"
  },
  {
    id: "stu-102",
    name: "Aisha Khan",
    email: "a.khan@student.utoronto.ca",
    studentId: "20875561",
    program: "Software Engineering",
    applications: 8,
    report: "Completed",
    status: "Placed"
  }
];

const fakeSupervisorData = [
  {
    id: "sup-001",
    name: "Dr. Sarah Chen",
    company: "Sectra",
    jobTitle: "Senior Software Architect",
    email: "s.chen@sectra.com",
    interns: ["Kevin Miller"], 
    progressReports: "2/3 Submitted",
    status: "Active"
  },
  {
    id: "sup-002",
    name: "Marcus Thorne",
    company: "Home Trust",
    jobTitle: "Cloud Operations Manager",
    email: "m.thorne@hometrust.ca",
    interns: ["Jordan Smith"],
    progressReports: "1/1 Submitted",
    status: "On Leave"
  }
];

function App() {

  return (
          
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

          {/*coordinator list*/}
          <Route path='/coordinator/applicant-list' element={<UserList starterData={fakeApplicantData} applicantData={fakeApplicantData} studentData={fakeStudentData} supervisorData={fakeSupervisorData} listType={"applicant"}/>}></Route>
          <Route path='/coordinator/student-list' element={<UserList starterData={fakeStudentData} applicantData={fakeApplicantData} studentData={fakeStudentData} supervisorData={fakeSupervisorData} listType={"coop-student"}/>}></Route>
          <Route path='/coordinator/supervisor-list' element={<UserList starterData={fakeSupervisorData} applicantData={fakeApplicantData} studentData={fakeStudentData} supervisorData={fakeSupervisorData} listType={"supervisor"}/>}></Route>

          {/*thank-you pages*/}
          <Route path='supervisor/thank-you-page' element={<ThankYouPage mainText={"Thank you for \n your submittion!"} secondaryText={"An email has been sent to your inbox with details of your submittion"} type="supervisor"></ThankYouPage>}></Route>
          <Route path='applicant/thank-you-page' element={<ThankYouPage mainText={"Thank you for \n applying!"} secondaryText={"An email has been sent to your inbox with details of your application"} type="applicant"></ThankYouPage>}></Route>

          {/*applicant status page */}
          <Route path= 'applicant/application-status/under-review' element={<ApplicantStatusPage status={"underReview"}></ApplicantStatusPage>}></Route>
          <Route path= 'applicant/application-status/accepted' element={<ApplicantStatusPage status={"accepted"}></ApplicantStatusPage>}></Route>
          <Route path= 'applicant/application-status/rejected' element={<ApplicantStatusPage status={"rejected"}></ApplicantStatusPage>}></Route>
      </Routes>
    </BrowserRouter>   

  );
}

export default App;
