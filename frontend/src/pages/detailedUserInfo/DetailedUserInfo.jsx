import './DetailedUserInfo.css'
import ReturnButtonIcon from '../../assets/returnButton.svg'
import HomeButtonIcon from '../../assets/whiteHome.svg'
import { useLocation, useParams } from 'react-router-dom';
import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';


function DetailedUserInfo({userData, listType}){

    const navigate = useNavigate();
    const { id } = useParams();
    const { listTypeStr } = useParams();
    const user = userData.find((u) => String(u.id) === id);

    console.log(listType);
    console.log(user.supervisor);

    if (!user) {
        return <h1>User with ID {id} not found.</h1>
    }

    const nameArray = user.name.split(" ");

    //general fields
    const [firstName, setfirstName] = useState(nameArray[0]);
    const [lastName, setlastName] = useState(nameArray[1]);
    const [userID, setUserID] = useState(id);
    const [email, setEmail] = useState(user.email);
    const [status, setStatus] = useState(user.status);

    const [program, setProgram] = useState(user.program);

    //co-op student fields
    const [supervisor, setSupervisor] = useState(user.supervisor);
    const [interviewed, setInterviewed] = useState(user.interviews);
    const [applications, setApplications] = useState(user.applications);
    const [workTerms, setWorkTerms] = useState(user.workTerms);

    //applicant fields
    const [year, setYear] = useState(user.year);
    const [gpa, setGPAr] = useState(user.gpa);

    //supervisor fields
    const [company, setCompany] = useState(user.company);
    const [jobTitle, setJobTitle] = useState(user.jobTitle);
    const [interns, setInterns] = useState(user.interns);

    //titles
    const listTypeMap = new Map()
    listTypeMap.set("applicant", "Applicant List");
    listTypeMap.set("coop-student", "Co-op Student List");
    listTypeMap.set("supervisor", "Supervisor List");

    const listTypeMap2 = new Map()
    listTypeMap2.set("applicant", "APPLICANT INFO");
    listTypeMap2.set("coop-student", "CO-OP STUDENT INFO");
    listTypeMap2.set("supervisor", "SUPERVISOR INFO");
    
    const listTitle = listTypeMap.get(listType);
    const listTitle2 = listTypeMap2.get(listType);
    return (

        <div className='detailed-user-info-main-background'>
            
            <div className='detailed-user-info-main-box' >
                
                <header>
                    
                    <div className='detailed-user-info-return' onClick={() => navigate(`/coordinator/${listType}-list`)}>
                        <img src={ReturnButtonIcon}></img>
                        <h2>{listTitle}</h2>
                    </div>

                    <div className='detailed-user-info-main-title'>
                        <h1>{listTitle2}</h1>
                        <h2>Status: {status}</h2>
                    </div>

                    <div className='detailed-user-info-homepage'>
                        <img src={HomeButtonIcon}></img>
                        <h2>Homepage</h2>
                    </div>
                
                </header>
                <main>

                    <div className='detailed-user-info-fields'>
                        
                        
                        <div className='double-input'>

                            <div className='single-input'>
                            <label className='left-label'> First Name: </label>
                            <input type='text' value={firstName}></input>
                            </div>

                            <div className='single-input'>
                            <label> Last Name: </label>
                            <input type='text' value={lastName}></input>
                            </div>
                        </div>
                        
                        
                        <div className='single-input'>
                        <label>ID: </label>
                        <input type='text' value={userID}></input>
                        </div>

                        <div className='single-input'>
                        <label> Email: </label>
                        <input type='text' value={email}></input>
                        </div>

                        {listType != "supervisor" && (
                        <div className='single-input'>
                        <label> Program: </label>
                        <input type='text' value={program}></input>
                        </div>
                        )}

                        {listType === "supervisor" && (
                        <div className='single-input'>
                        <label> Company: </label>
                        <input type='text' value={company}></input>
                        </div>
                        )}

                        {listType === "supervisor" && (
                        <div className='single-input'>
                        <label> Job Title: </label>
                        <input type='text' value={jobTitle}></input>
                        </div>
                        )}


                        {listType === "supervisor" && (
                        <div className='single-input'>
                        <label> Interns: </label>
                        <input type='text' value={interns}></input>
                        </div>
                        )}


                        

                        

                        {listType === "applicant" && (
                            <div className='double-input'>

                            <div className='single-input'>
                            <label className='left-label'> Year: </label>
                            <input type='text' value={2}></input>
                            </div>

                            <div className='single-input'>
                            <label> GPA: </label>
                            <input type='text' value={3.8}></input>
                            </div>
                        </div>
                        )}
                        
                        {listType === "coop-student" && (
                        <div className='double-input'>

                            <div className='single-input'>
                            <label className='left-label'>Supervisor:</label>
                            <input type='text' value={supervisor}></input>
                            </div>

                            <div className='single-input'>
                            <label>Interviewed:</label>
                            <input type='text' value={interviewed}></input>
                            </div>
                        </div>
                        )}
        
                        {listType === "coop-student" && (
                        <div className='double-input'>
                            
                            <div className='single-input'>
                            <label className='left-label'> Applications Sent: </label>
                            <input type='text' value={applications}></input>
                            </div>

                            <div className='single-input'>
                            <label> Work Terms: </label>
                            <input type='text' value={workTerms}></input>
                            </div>
                        </div>
                        )}
                        

                            <button>Adjust</button>

                    </div>

                    <div className='detailed-user-info-file'>
                        <h2>PROGRESS REPORT</h2>
                        <div className='detailed-user-info-pdf'></div>
                        <p className='detailed-user-info-date'>Date: 03/12/2026</p>
                    </div>

                </main>
            </div>
        </div>
    
    )
}
export default DetailedUserInfo