import './DetailedUserInfo.css'
import ReturnButtonIcon from '../../assets/returnButton.svg'
import HomeButtonIcon from '../../assets/whiteHome.svg'
import { useLocation, useParams } from 'react-router-dom';
import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';


function DetailedUserInfo({userData, listType, updateUserInfo}){

    const navigate = useNavigate();
    const { id } = useParams();
    const { listTypeStr } = useParams();
    const user = userData.find((u) => String(u.id || u._id) === id);

    if (!user) {
        return <h1>User with ID {id} not found.</h1>
    }

    const nameArray = user.fullName.split(" ");
    console.log(user.role);

    //general fields
    const [firstName, setfirstName] = useState(nameArray[0]);
    const [lastName, setlastName] = useState(nameArray[1]);
    const [userID, setUserID] = useState(id);
    const [email, setEmail] = useState(user.email);
    const [status, setStatus] = useState(user.status);
    const [date, setDate] = useState(user.createdAt);
    const [program, setProgram] = useState(user.academics?.program);

    //co-op student fields
    const [supervisor, setSupervisor] = useState(user.supervisor);
    const [interviewed, setInterviewed] = useState(user.interviews);
    const [applications, setApplications] = useState(user.applications);
    const [workTerms, setWorkTerms] = useState(user.workTerms);
    const [studentID, setStudentID] = useState(user.studentId);

    //applicant fields
    const [year, setYear] = useState(user.academics?.year);
    const [gpa, setGPA] = useState(user.academics?.gpa || "");

    console.log(`Gpa is: ${gpa}`);

    //supervisor fields
    const [company, setCompany] = useState(user.company);
    const [jobTitle, setJobTitle] = useState(user.jobTitle);
    const [interns, setInterns] = useState(Array.isArray(user.interns) ? user.interns.join(", ") : user.interns || "");

    //titles
    const listTypeMap = new Map()
    listTypeMap.set("applicant", "Applicant List");
    listTypeMap.set("coop-student", "Co-op Student List");
    listTypeMap.set("supervisor", "Supervisor List");

    const listTypeMap2 = new Map()
    listTypeMap2.set("applicant", "APPLICANT INFO");
    listTypeMap2.set("coop-student", "STUDENT INFO");
    listTypeMap2.set("supervisor", "SUPERVISOR INFO");

    const listTypeMap3 = new Map()
    listTypeMap3.set("applicant", "applicant");
    listTypeMap3.set("coop-student", "student");
    listTypeMap3.set("supervisor", "supervisor");
    
    const listTitle = listTypeMap.get(listType);
    const listTitle2 = listTypeMap2.get(listType);
    const listTitle3 = listTypeMap3.get(listType);
    console.log(id);

    //function to accept applicant
    const handleAccept = async () => {
        const body = {
            isApplicant: false,
            status: "accepted"
        };

        await updateUserInfo("student", id, body);
        setStatus("Accepted")
        console.log("User accepted to program. Moved to co-op student list")
        navigate('/coordinator/applicant-list')
    }

    //function to reject applicant
    const handleReject = async () => {
        const body = {
            status: "rejected"
        };
        await updateUserInfo("student", id, body);
        setStatus("Rejected")
        navigate('/coordinator/applicant-list')
    }

    //function to allow field change of users
    const handleUpdate = async () => {
        let body = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            academics: {
                program: program,
                year: Number(year), 
                gpa: gpa
            },

            supervisor: supervisor,
            interviews:  interviewed,
            applications: applications,
            workTerms: workTerms,

            company: company,
            jobTitle: jobTitle,
            interns: interns.split(',').map(name => name.trim()).filter(name => name !== "")
        };

        try {
            await updateUserInfo(user.role, id, body);
            console.log("Update successful with Interns Array:", body.interns);
            navigate(`/coordinator/applicant-list`);
            } catch (err) {
                console.error("Update Failed", err)
        };
    }

    //function to capitalize words
    function capitalizeFirstLetter(str) {
        if (!str) 
            return ""; // Handle empty strings
        return str.charAt(0).toUpperCase() + str.slice(1);
    }


    return (

        <div className='detailed-user-info-main-background'>
            
            <div className='detailed-user-info-main-box' >
                
                <header>
                    
                    <div className='detailed-user-info-return' onClick={() => navigate(`/coordinator/${listTitle3}-list`)}>
                        <img src={ReturnButtonIcon}></img>
                        <h2>{listTitle}</h2>
                    </div>

                    <div className='detailed-user-info-main-title'>
                        <h1>{listTitle2}</h1>
                        <h2>Status: {capitalizeFirstLetter(status)}</h2>
                    </div>

                    <div className='detailed-user-info-homepage'  onClick={() => navigate('/coordinator')}>
                        <img src={HomeButtonIcon}></img>
                        <h2>Homepage</h2>
                    </div>
                
                </header>
                <main>

                    <div className='detailed-user-info-fields'>
                        
                        
                        <div className='double-input'>

                            <div className='single-input'>
                            <label className='left-label'> First Name: </label>
                            <input type='text' value={firstName} onChange={(e) => setfirstName(e.target.value)}></input>
                            </div>

                            <div className='single-input'>
                            <label> Last Name: </label>
                            <input type='text' value={lastName} onChange={(e) => setlastName(e.target.value)}></input>
                            </div>
                        </div>
                        
                        {listType === "supervisor" && (
                        <div className='single-input'>
                        <label>ID: </label>
                        <input type='text' value={userID} ></input>
                        </div>
                        )}
                        {listType != "supervisor" && (
                        <div className='single-input'>
                        <label> ID: </label>
                        <input type='text' value={studentID} onChange={(e) => setStudentID(e.target.value)}></input>
                        </div>
                        )}

                        <div className='single-input'>
                        <label> Email: </label>
                        <input type='text' value={email} onChange={(e) => setEmail(e.target.value)}></input>
                        </div>

                        {listType != "supervisor" && (
                        <div className='single-input'>
                        <label> Program: </label>
                        <input type='text' value={program} onChange={(e) => setProgram(e.target.value)}></input>
                        </div>
                        )}

                        {listType === "supervisor" && (
                        <div className='single-input'>
                        <label> Company: </label>
                        <input type='text' value={company} onChange={(e) => setCompany(e.target.value)}></input>
                        </div>
                        )}

                        {listType === "supervisor" && (
                        <div className='single-input'>
                        <label> Job Title: </label>
                        <input type='text' value={jobTitle} onChange={(e) => setJobTitle(e.target.value)}></input>
                        </div>
                        )}


                        {listType === "supervisor" && (
                        <div className='single-input'>
                        <label> Interns: </label>
                        <input type='text' value={interns} onChange={(e) => setInterns(e.target.value)}placeholder="Separate names with commas (e.g. Jin-woo, Bethany, Layla)"></input>
                        </div>
                        )}

                        {listType === "applicant" && (
                            <div className='double-input'>

                            <div className='single-input'>
                            <label className='left-label'> Year: </label>
                            <input type='text' value={year} onChange={(e) => setYear(e.target.value)}></input>
                            </div>

                            <div className='single-input'>
                            <label> GPA: </label>
                            <input type='text' value={gpa} onChange={(e) => setGPA(e.target.value)}></input>
                            </div>
                        </div>
                        )}
                        
                        {listType === "coop-student" && (
                        <div className='double-input'>

                            <div className='single-input'>
                            <label className='left-label'>Supervisor:</label>
                            <input type='text' value={supervisor} onChange={(e) => setSupervisor(e.target.value)}></input>
                            </div>

                            <div className='single-input'>
                            <label>Interviewed:</label>
                            <input type='text' value={interviewed} onChange={(e) => setInterviewed(e.target.value)}></input>
                            </div>
                        </div>
                        )}
        
                        {listType === "coop-student" && (
                        <div className='double-input'>
                            
                            <div className='single-input'>
                            <label className='left-label'> Apps Sent: </label>
                            <input type='text' value={applications} onChange={(e) => setApplications(e.target.value)}></input>
                            </div>

                            <div className='single-input'>
                            <label> Work Terms: </label>
                            <input type='text' value={workTerms} onChange={(e) => setWorkTerms(e.target.value)}></input>
                            </div>
                        </div>
                        )}
                        
                        
                        {(listType !== "applicant"  || status === "rejected")&& (
                            <button className='detailed-user-info-adjust-button' onClick={handleUpdate}>Adjust</button>
                        )}

                        {(listType === "applicant" && status !== "rejected" && status !== "accepted") && (
                            <div className='detatiled-user-info-accept-reject-buttons'>
                            <button className='detailed-user-info-accept-button' onClick={handleAccept}>Accept</button> 
                            <button onClick={handleUpdate}> Adjust </button>
                            <button className='detailed-user-info-reject-button' onClick={handleReject}>Reject</button>
                            </div>
                        )}


                    </div>

                    <div className='detailed-user-info-file'>
                        <h2>PROGRESS REPORT</h2>
                        <div className='detailed-user-info-pdf'> <h2>PDF SHOWS HERE</h2></div>
                        <p className='detailed-user-info-date'>Date: {date.slice(0, 10)}</p>
                    </div>

                </main>
            </div>
        </div>
    
    )
}
export default DetailedUserInfo