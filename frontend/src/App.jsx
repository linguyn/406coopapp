import Login from './pages/login/Login'; 
import StudentHomepage from './pages/homepage/StudentHomepage';
import StudentRegister from './pages/signup/StudentRegister';
import SupervisorHomepage from './pages/homepage/SupervisorHomepage';
import SupervisorRegister from './pages/signup/SupervisorRegister';
import Roles from './pages/roles/Roles';
import Application from './pages/forms/CoopApplication';
import UserList from './pages/userList/UserList';
import ThankYouPage from './pages/thankYouPage/ThankYouPage';
import ApplicantStatusPage from './pages/applicantStatusPage/ApplicantStatusPage'; 
import CoopReflection from './pages/forms/CoopReflection';   
import StudentProgress from './pages/forms/StudentProgress';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; 
import { useState, useEffect } from 'react';
import DetailedUserInfo from './pages/detailedUserInfo/DetailedUserInfo';



function App() {

  const [applicants, setApplicants] = useState([]);
  const [students, setStudents] = useState([]);
  const [supervisors, setSupervisors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  

  //grab student data
useEffect(() => {
  setIsLoading(true);
  const token = localStorage.getItem('token');
  
  fetch('http://localhost:5005/api/user/list?role=student', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`, 
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .then(data => {
    const flattenedStudents = data.map(user => ({
      ...user,
      program: user.academics?.program ?? "N/A",
      year: user.academics?.year ?? "N/A",
      gpa: user.academics?.gpa ?? "N/A",
      resume: user.documents?.resume ?? "Missing",
      coverLetter: user.documents?.coverLetter ?? "Missing",
      status: user.status ?? "Pending",
      isApplicant: user.isApplicant ?? true 
    }));

    setTimeout(() => {
      setStudents(flattenedStudents); 
      setIsLoading(false);
    }, 500);
  })
  .catch(err => {
    console.error("Error fetching students:", err);
    setIsLoading(false);
  });
}, []);

//grab supervisor data
useEffect(() => {
  const token = localStorage.getItem('token'); 
  
  fetch('http://localhost:5005/api/user/list?role=supervisor', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`, 
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .then(data => {
    setSupervisors(data); 
  })
  .catch(err => console.error("Error fetching supervisors:", err));
}, []);

//show nothing to allow data to load
if (isLoading){
  return null;
}

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


          {/*application page*/}
          <Route path='/student/apply' element={<Application/>}/>

          {/*coop reflection page*/}
          <Route path='/student/reflection' element={<CoopReflection/>}/>

          {/*student progress page*/}
          <Route path='/supervisor/student-progress' element={<StudentProgress/>}/>

          {/*coordinator list*/}
          <Route path='/coordinator/applicant-list' element={<UserList starterData={students} applicantData={students} studentData={students} supervisorData={supervisors} listType={"applicant"}/>}></Route>
          <Route path='/coordinator/student-list' element={<UserList starterData={students} applicantData={students} studentData={students} supervisorData={supervisors} listType={"coop-student"}/>}></Route>
          <Route path='/coordinator/supervisor-list' element={<UserList starterData={supervisors} applicantData={students} studentData={students} supervisorData={supervisors} listType={"supervisor"}/>}></Route>

          {/*detailed user info*/}
          <Route path='/coordinator/detailed-user-info/applicant/:id' element={<DetailedUserInfo userData = {students} listType = "applicant"></DetailedUserInfo>}></Route>
          <Route path='/coordinator/detailed-user-info/coop-student/:id' element={<DetailedUserInfo userData = {students} listType = "coop-student"></DetailedUserInfo>}></Route>
          <Route path='/coordinator/detailed-user-info/supervisor/:id' element={<DetailedUserInfo userData = {supervisors} listType = "supervisor"></DetailedUserInfo>}></Route>

          {/*thank-you pages*/}
          <Route path='/supervisor/thank-you-page' element={<ThankYouPage mainText={"Thank you for \n your submittion!"} secondaryText={"An email has been sent to your inbox with details of your submittion"} type="supervisor"></ThankYouPage>}></Route>
          <Route path='applicant/thank-you-page' element={<ThankYouPage mainText={"Thank you for \n applying!"} secondaryText={"An email has been sent to your inbox with details of your application"} type="applicant"></ThankYouPage>}></Route>

          {/*applicant status page */}
          <Route path= '/applicant/application-status/under-review' element={<ApplicantStatusPage status={"underReview"}></ApplicantStatusPage>}></Route>
          <Route path= '/applicant/application-status/accepted' element={<ApplicantStatusPage status={"accepted"}></ApplicantStatusPage>}></Route>
          <Route path= '/applicant/application-status/rejected' element={<ApplicantStatusPage status={"rejected"}></ApplicantStatusPage>}></Route>
      </Routes>
    </BrowserRouter>   
  );
}

export default App;
