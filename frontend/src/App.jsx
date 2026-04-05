import Login from './pages/login/Login'; 
import StudentHomepage from './pages/studentHomepage/StudentHomepage';
import StudentRegister from './pages/signup/StudentRegister';
import SupervisorHomepage from './pages/supervisorHomepage/SupervisorHomepage';
import SupervisorRegister from './pages/signup/SupervisorRegister';
import CoordinatorHomepage from './pages/coordinatorHomepage/CoordinatorHomepage';
import Roles from './pages/roles/Roles';
import Application from './pages/forms/CoopApplication';
import UserList from './pages/userList/UserList';
import ThankYouPage from './pages/thankYouPage/ThankYouPage';
import ApplicantStatusPage from './pages/applicantStatusPage/ApplicantStatusPage'; 
import CoopReflection from './pages/forms/CoopReflection';   
import StudentProgress from './pages/forms/StudentProgress';
import DetailedUserInfo from './pages/detailedUserInfo/DetailedUserInfo';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'; 
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './context/authContext';
import ProtectedRoute from './components/ProtectedRoute';
import api, {setAccessToken, getAccessToken} from './services/api';

function App() {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL; 
  const [loading, setLoading] = useState(true);
  const { setUserData } = useAuth();
  const [applicants, setApplicants] = useState([]);
  const [students, setStudents] = useState([]);
  const [supervisors, setSupervisors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { userData } = useAuth();
  const [allUsers, setAllUsers] = useState([]);


  useEffect(() => {
    /*try to restore the previous authentication state*/
    const initAuth = async () => {
      try {
        const response = await axios.post(`${API_URL}/auth/refresh-token`, {}, { withCredentials: true });
        setAccessToken(response.data.accessToken);
        setUserData(response.data.user);

        if (response.status == 200 || response) { 
          console.log("User authenticated, forwarding to homepage");


          if (response.data.user.role === "student") 
              navigate("/student");
          

          if (response.data.user.role === "supervisor") 
              navigate("/supervisor");

          if (response.data.user.role === "coordinator") 
              navigate("/coordinator");
          
        }
      } catch (error) {
        console.error("No valid refresh token found: ", error);
      } finally{
        setLoading(false);
      }
    }; 

    initAuth();
  }, []);

  //grabs data on all applicants
  useEffect(() => {

    //stops api call if user doesnt exist or isnt a coordinator
    if (!userData) return;

    if (userData.role !== "coordinator") {
    console.log("User is not a coordinator. Skipping user list fetch.");
    return;
  }

    const getAllApplicants = async (params = "") => {
      try {
        const response = await api.get(`${API_URL}/user/list?role=student&isApplicant=true&searchStr=Sung` 
        );
        console.log("SUCCESS! Here is the data:", response.data);
        setApplicants(response.data);

      } catch (error) {
        console.error('Failed to get users:', error);
      } finally{
        setLoading(false);
      }
    }; 

    getAllApplicants();
  }, [userData]);

  //grabs data on all co-op students
  useEffect(() => {

    //stops api call if user doesnt exist or isnt a coordinator
    if (!userData) return;

    if (userData.role !== "coordinator") {
    console.log("User is not a coordinator. Skipping user list fetch.");
    return;
  }

    const getAllStudents = async () => {
      try {
        const response = await api.get(`${API_URL}/user/list?role=student&isApplicant=false`);
        
        console.log("SUCCESS! Here is the data:", response.data);
        setStudents(response.data)

      } catch (error) {
        console.error('Failed to get users:', error);
      } finally{
        setLoading(false);
      }
    }; 

    getAllStudents();
  }, [userData]);

  //grabs data on all supervisors
  useEffect(() => {

    //stops api call if user doesnt exist or isnt a coordinator
    if (!userData) return;

    if (userData.role !== "coordinator") {
    return;
  }

    const getAllSupervisors = async () => {
      try {
        const response = await api.get(`${API_URL}/user/list?role=supervisor`);
        console.log("SUCCESS! Here is the data:", response.data);
        setSupervisors(response.data);

      } catch (error) {
        console.error('Failed to get users:', error);
      } finally{
        setLoading(false);
      }
    }; 

    getAllSupervisors();
  }, [userData]);


  if (loading) { 
    return <div>Loading...</div>;
  }

  return (
      <Routes>
      
          {/*login*/}
          <Route path='/login' element={<Login />}/>

          {/*register pages*/}
          <Route path='/student/register' element={<StudentRegister />}/>
          <Route path='/supervisor/register' element={<SupervisorRegister />}/>
          <Route path='/roles' element={<Roles />}/>



          <Route path='/coordinator' element={<CoordinatorHomepage />}/>
          <Route path='/supervisor' element={<SupervisorHomepage />}/>


          <Route path='/supervisor/student-progress' element={<StudentProgress/>}/>


        {/* Protected route, only visible if userData */}
        <Route element={<ProtectedRoute/>}>
            {/*homepages*/}
            <Route path='/student' element={<StudentHomepage />}/>

            

            {/*application page*/}
            <Route path='/student/apply' element={<Application/>}/>

            {/*coop reflection page*/}
            <Route path='/student/reflection' element={<CoopReflection/>}/>

            {/*student progress page*/}


            
            {/*coordinator list*/}
            <Route path='/coordinator/applicant-list' element={<UserList starterData={applicants} applicantData={applicants} studentData={students} supervisorData={supervisors} listType={"applicant"} />}></Route>
            <Route path='/coordinator/student-list' element={<UserList starterData={students} applicantData={applicants} studentData={students} supervisorData={supervisors} listType={"coop-student"} />}></Route>
            <Route path='/coordinator/supervisor-list' element={<UserList starterData={supervisors} applicantData={applicants} studentData={students} supervisorData={supervisors} listType={"supervisor"} />}></Route>

          
            {/*detailed user info*/}
            <Route path='/coordinator/detailed-user-info/applicant/:id' element={<DetailedUserInfo userData = {applicants} listType = "applicant"></DetailedUserInfo>}></Route>
            <Route path='/coordinator/detailed-user-info/coop-student/:id' element={<DetailedUserInfo userData = {students} listType = "coop-student"></DetailedUserInfo>}></Route>
            <Route path='/coordinator/detailed-user-info/supervisor/:id' element={<DetailedUserInfo userData = {supervisors} listType = "supervisor"></DetailedUserInfo>}></Route>


            {/*thank-you pages*/}
            <Route path='/supervisor/thank-you-page' element={<ThankYouPage mainText={"Thank you for \n your submittion!"} secondaryText={"An email has been sent to your inbox with details of your submittion"} type="supervisor"></ThankYouPage>}></Route>
            <Route path='applicant/thank-you-page' element={<ThankYouPage mainText={"Thank you for \n applying!"} secondaryText={"An email has been sent to your inbox with details of your application"} type="applicant"></ThankYouPage>}></Route>

            {/*applicant status page */}
            <Route path= 'applicant/application-status/under-review' element={<ApplicantStatusPage status={"underReview"}></ApplicantStatusPage>}></Route>
            <Route path= 'applicant/application-status/accepted' element={<ApplicantStatusPage status={"accepted"}></ApplicantStatusPage>}></Route>
            <Route path= 'applicant/application-status/rejected' element={<ApplicantStatusPage status={"rejected"}></ApplicantStatusPage>}></Route>

            {/*application page*/}
            <Route path='/student/apply' element={<Application/>}/>
        </Route>

      </Routes>
  );
}

export default App;
