import './SupervisorHomepage.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext'; 
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'; 
import { Doughnut } from 'react-chartjs-2';
import { logOut } from '../../services/authService';

ChartJS.register(ArcElement, Tooltip, Legend);

function SupervisorHomepage() {
    const [isPinned, setIsPinned] = useState(false);
    const navigate = useNavigate();
    const { userData } = useAuth();
    const { currentTerm } = useAuth(); 
    const isSidebarVisible = isPinned;

    let totalStudents = userData?.totalStudents;
    let submitted = userData?.submitted;
    let notSubmitted = userData?.notSubmitted;
    let pending = userData?.pending;
    let late = userData?.late;
    let followUpNeeded = userData?.followUpNeeded;
    let createdAt = userData?.createdAt;
    let lastSubmissionDate = userData?.lastSubmissionDate;
    let dueThisWeek = userData?.dueThisWeek;

    const handleClick = async (e) => {
        const option = e.currentTarget.name;
        console.log(`Clicked on ${option}`);

        if (option === 'supervisor-burger') {
            setIsPinned(prev => !prev);
            return;
        }

        if (option === 'supervisor-homepage' || option === 'supervisor-homepage-sidebar') {
            navigate('/supervisor');
            return;
        }

        if (option === 'supervisor-students' || option === 'supervisor-students-sidebar') {
            navigate('/supervisor/students');
            return;
        }

        if (option === 'supervisor-progress-forms' || option === 'supervisor-progress-forms-sidebar') {
            navigate('/supervisor/progress-forms');
            return;
        }

        if (option === 'supervisor-reports' || option === 'supervisor-reports-sidebar') {
            navigate('/supervisor/reports');
            return;
        }

        if (option === 'supervisor-logout-sidebar') {
            const response = await logOut(); 
            if (response.status == 200 || response) {
                navigate('/login');
                console.log('Log out successful');
            }
            return;
        }
    };

    return (
        <div className='supervisor-homepage-container'>   
            <div className='supervisor-bars'>
                <div className='supervisor-navbar-layout'>
                    <button name='supervisor-burger' onClick={handleClick}>
                        <FontAwesomeIcon icon={faBars}/>
                    </button>

                    <button name='supervisor-homepage' onClick={handleClick}>Homepage</button>
                    <button name='supervisor-students' onClick={handleClick}>Students</button>
                    <button name='supervisor-progress-forms' onClick={handleClick}>Progress Forms</button>
                    <button name='supervisor-reports' onClick={handleClick}>Reports</button>
                </div>

                {isSidebarVisible && (
                    <div className='supervisor-sidebar'>
                        <button name='supervisor-homepage-sidebar' onClick={handleClick}>Homepage</button>
                        <button name='supervisor-students-sidebar' onClick={handleClick}>Students</button>
                        <button name='supervisor-progress-forms-sidebar' onClick={handleClick}>Progress Forms</button>
                        <button name='supervisor-reports-sidebar' onClick={handleClick}>Reports</button>
                        <button name='supervisor-logout-sidebar' onClick={handleClick}>Logout</button>
                    </div>
                )}
            </div>

            <div className='supervisor-main-outer'>
                <div className='supervisor-main-inner'>
                    <h1>Welcome back, {userData?.firstName}</h1>
                    <div className='supervisor-info'>
                        <div className='supervisor-info-1'>
                            <h2>Form Submission Overview</h2>
                            <div className='supervisor-chart-container'>
                                <Doughnut
                                    data ={{
                                        labels: [
                                            'Submitted: ' + (submitted || 0),
                                            'Pending: ' + (pending || 0),
                                            'Late: ' + (late || 0)
                                        ],
                                        datasets: [{
                                            data: [
                                                submitted || 0,
                                                pending || 0,
                                                late || 0
                                            ],
                                            backgroundColor: [
                                                '#595A5C',
                                                '#0C49A6',
                                                '#4790FF'
                                            ],
                                            hoverOffset: 5
                                        }]
                                    }}
                                    options={{
                                        animation: {
                                            duration: 1000, 
                                            easing: 'easeInOutExpo',
                                        },
                                        cutout: '62%',
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

                        <div className='supervisor-info-2'>
                            <div className='supervisor-i2-f1'>
                                <h2>Term: {currentTerm}</h2>
                            </div>
                            
                            <div className='supervisor-i2-f2'>
                                <div className='supervisor-info-box-1'>
                                    <h2 className='supervisor-info-descr'>Total Students</h2>
                                    <h2 className='supervisor-info-stats'>{totalStudents}</h2>
                                </div>

                                <div className='supervisor-info-box-2'>
                                    <h2 className='supervisor-info-descr'>Submitted</h2>
                                    <h2 className='supervisor-info-stats'>{submitted}</h2>
                                </div>
                            </div>

                            <div className='supervisor-i2-f3'>
                                <div className='supervisor-info-box-1'>
                                    <h2 className='supervisor-info-descr'>Not Submitted</h2>
                                    <h2 className='supervisor-info-stats'>{notSubmitted}</h2>
                                </div>

                                <div className='supervisor-info-box-2'>
                                    <h2 className='supervisor-info-descr'>Support Needed</h2>
                                    <h2 className='supervisor-info-stats'>{followUpNeeded}</h2>
                                </div>
                            </div>
                        </div>

                        <div className='supervisor-info-3'>
                            <div className="supervisor-record-header">
                                CO-OP RECORD
                            </div>

                            <table className="supervisor-record-table">
                                <tbody>
                                    <tr>
                                        <td>Date Joined:</td>
                                        <td>{createdAt}</td>
                                    </tr>
                                    <tr>
                                        <td>Total Students:</td>
                                        <td>{totalStudents}</td>
                                    </tr>
                                    <tr>
                                        <td>Submitted Forms</td>
                                        <td>{submitted}</td>
                                    </tr>
                                    <tr>
                                        <td>Pending Forms</td>
                                        <td>{pending}</td>
                                    </tr>
                                    <tr>
                                        <td>Last Submission Date:</td>
                                        <td>{lastSubmissionDate}</td>
                                    </tr>
                                    <tr>
                                        <td>Due This Week:</td>
                                        <td>{dueThisWeek || "None"}</td>
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

export default SupervisorHomepage;