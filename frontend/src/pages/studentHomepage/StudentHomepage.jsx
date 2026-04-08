import './StudentHomepage.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext'; 
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'; 
import { Doughnut } from 'react-chartjs-2';
import { logOut } from '../../services/authService';

ChartJS.register(ArcElement, Tooltip, Legend);

function StudentHomepage() {
    const [isPinned, setIsPinned] = useState(false);
    const navigate = useNavigate();
    const { userData } = useAuth();
    const { currentTerm } = useAuth(); 
    const isSidebarVisible = isPinned;


    //homepage student info
    let applications = userData?.termActivity.applications; 
    let interviewed = userData?.termActivity.interviewed;
    let applied = userData?.termActivity.applied;  
    let interviews = userData?.termActivity.interviews;
    let shortlisted = userData?.termActivity.shortlisted; 
    let workTerms = userData?.termActivity.workTerms;
    let startTerm = userData?.termActivity.startTerm;  
    let newPostings = userData?.newPostings;
    let openPostings = userData?.openPostings;
    let createdAt = (userData?.createdAt).slice(0,10);
    let coordinators = userData?.support.coordinators;
    let facultyAdvisor = userData?.support.facultyAdvisor;
    let status = userData?.status;

    const handleClick = async (e) => {
        const option = e.currentTarget.name;
        console.log(`Clicked on ${option}`);

        if (option === 'student-burger') {
            setIsPinned(prev => !prev);
            return;
        }

        if (option === 'student-homepage' || option === 'student-homepage-sidebar') {
            navigate('/student');
            return;
        }

        if (option === 'student-apply' || option === 'student-apply-sidebar') {
            navigate('/student/apply');
            return;
        }

        if (option === 'student-jobs' || option === 'student-jobs-sidebar') {
            navigate('/student/jobs');
            return;
        }

        if (option === 'student-reflection' || option === 'student-reflection-sidebar') {
            navigate('/student/reflection');
            return;
        }

        if (option === 'student-status' || option === 'student-status-sidebar') {
            if(status){
                navigate(`/applicant/application-status/${status}`)
            } 
            else{
                navigate(`/applicant/application-status/under-review`)
            }
            
        }

        if (option === 'student-logout-sidebar') {
            const response = await logOut(); 
            if (response.status == 200 || response) {
                navigate('/login');
                console.log('Log out successful')
            }
            return;
        }
    };

    return (
        <div className='student-homepage-container'>   

            <div className='student-bars'>
    
                <div className='student-navbar-layout'>
                    <button name='student-burger' 
                        onClick={handleClick}>
                        <FontAwesomeIcon icon={faBars}/>
                    </button>

                    <button name='student-homepage' onClick={handleClick}>Homepage</button>
                    <button name='student-apply' onClick={handleClick}>Apply to Co-op</button>
                    <button name='student-jobs' onClick={handleClick}>Job Postings</button>
                    <button name='student-reflection' onClick={handleClick}>Co-op Reflection</button>
                    <button name='student-status' onClick={handleClick}>Status</button>
                </div>

                {isSidebarVisible && (
                    <div className='student-sidebar'>
                        <button name='student-homepage-sidebar' onClick={handleClick}>Homepage</button>
                        <button name='student-apply-sidebar' onClick={handleClick}>Apply to Co-op</button>
                        <button name='student-jobs-sidebar' onClick={handleClick}>Job Postings</button>
                        <button name='student-reflection-sidebar' onClick={handleClick}>Co-op Reflection</button>
                        <button name='student-status-sidebar' onClick={handleClick}>Status</button>
                        <button name='student-logout-sidebar' onClick={handleClick}>Logout</button>
                    </div>
                )}
            </div>


            <div className='student-main-outer'>
                <div className='student-main-inner'>
                    <h1>Welcome back, {userData?.firstName}</h1>
                    <div className='student-info'>
                        <div className='student-info-1'>
                            <h2>Application Overview</h2>
                            <div className = 'student-chart-container'>
                                <Doughnut
                                data ={{
                                    labels: [
                                        'Applied: ' + (applied || 0),
                                          'Shortlisted: ' + (shortlisted || 0),
                                        'Interviewed: ' + (interviewed || 0)],
                                    datasets: [{
                                        data: [applied || 0, 
                                            shortlisted || 0, 
                                            interviewed || 0],
                                        backgroundColor: [
                                            '#4790FF',
                                            '#0C49A6',
                                            '#595A5C'
                                        ],
                                        hoverOffset: 5
                                    }]
                                }}

                                options={{
                                    animation: {
                                        duration: 1000, 
                                        easing: 'easeInOutExpo',
                                    },
                                    maintainAspectRatio: false,
                                    responsive: true,
                                    plugins: {
                                        legend: {
                                            position: 'bottom',
                                            labels: {
                                                boxWidth: 12,
                                                padding: 60,
                                                useBorderRadius: true,
                                                borderRadius: 10,

                                                font: {
                                                    family: " 'Inter', 'Roboto', sans-serif ",
                                                    size: 15,
                                                }
                                            },
                                        },
                                    },
                                    elements: {
                                        arc: {
                                            borderWidth: 1,
                                            borderColor: '#fff',
                                        }
                                    }
                                }}
                                />
                            </div>
                        </div>

                        <div className='student-info-2'>

                            <div className='student-i2-f1'>
                                <h2>Term: {currentTerm}</h2>
                            </div>
                            
                            <div className='student-i2-f2'>

                                <div className='student-info-box-1'>
                                    <h2 className='student-info-descr'>Applications</h2>
                                    <h2 className='student-info-stats'>{applications}</h2>
                                </div>

                                <div className='student-info-box-2'>
                                    <h2 className='student-info-descr'>Interviews</h2>
                                    <h2 className='student-info-stats'>{interviews}</h2>
                                </div>
                            </div>

                             <div className='student-i2-f3'>
                                <div className='student-info-box-1'>
                                    <h2 className='student-info-descr'>New Postings</h2>
                                    <h2 className='student-info-stats'>{newPostings}</h2>
                                </div>

                                <div className='student-info-box-2'>
                                    <h2 className='student-info-descr'>Work Terms</h2>
                                    <h2 className='student-info-stats'>{workTerms}</h2>
                                </div>
                            </div>


                        </div>

                        <div className='student-info-3'>
                            <div className="student-record-header">
                                CO-OP RECORD
                            </div>

                            <table className="student-record-table">
                                <tbody>
                                <tr>
                                    <td>Date Created:</td>
                                    <td>{createdAt}</td>
                                </tr>
                                <tr>
                                    <td>Start Term:</td>
                                    <td>{startTerm || "None"}</td>
                                </tr>
                                <tr>
                                    <td>Program:</td>
                                    <td>Computer Science</td>
                                </tr>
                                <tr>
                                    <td>Department(s):</td>
                                    <td>Computer Science</td>
                                </tr>
                                <tr>
                                    <td>Co-ordinator(s)</td>
                                    <td>{coordinators || "None"}</td>
                                </tr>
                                <tr>
                                    <td>Faculty Advisor:</td>
                                    <td>{facultyAdvisor || "None"}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentHomepage; 