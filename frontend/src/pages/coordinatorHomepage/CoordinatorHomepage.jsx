import './CoordinatorHomepage.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { logOut } from '../../services/authService';

ChartJS.register(ArcElement, Tooltip, Legend);

function CoordinatorHomepage() {
    const [isPinned, setIsPinned] = useState(false);
    const navigate = useNavigate();
    const { userData } = useAuth();
    const isSidebarVisible = isPinned;

    let totalStudents = userData?.totalStudents;
    let totalActive = userData?.totalActive;
    let totalPendingApproval = userData?.totalPendingApproval;
    let totalSeeking = userData?.totalSeeking;
    let totalInterviewing = userData?.totalInterviewing;
    let totalPlaced = userData?.totalPlaced;
    let currentTerm = userData?.currentTerm;

    const handleClick = async (e) => {
        const option = e.currentTarget.name;
        console.log(`Clicked on ${option}`);

        if (option === 'coordinator-burger') {
            setIsPinned(prev => !prev);
            return;
        }

        if (option === 'coordinator-homepage' || option === 'coordinator-homepage-sidebar') {
            navigate('/coordinator');
            return;
        }

        if (option === 'coordinator-student-list' || option === 'coordinator-student-list-sidebar') {
            navigate('/coordinator/student-list');
            return;
        }

        if (option === 'coordinator-applicant-list' || option === 'coordinator-applicant-list-sidebar') {
            navigate('/coordinator/applicant-list');
            return;
        }

        if (option === 'coordinator-supervisor-list' || option === 'coordinator-supervisor-list-sidebar') {
            navigate('/coordinator/supervisor-list');
            return;
        }

        if (option === 'coordinator-logout-sidebar') {
            const response = await logOut();
            if (response.status == 200 || response) {
                navigate('/login');
                console.log('Log out successful');
            }
            return;
        }
    };

    return (
        <div className='coordinator-homepage-container'>
            <div className='coordinator-bars'>
                <div className='coordinator-navbar-layout'>
                    <button name='coordinator-burger' onClick={handleClick}>
                        <FontAwesomeIcon icon={faBars}/>
                    </button>

                    <button name='coordinator-homepage' onClick={handleClick}>Homepage</button>
                    <button name='coordinator-student-list' onClick={handleClick}>Student List</button>
                    <button name='coordinator-applicant-list' onClick={handleClick}>Applicant List</button>
                    <button name='coordinator-supervisor-list' onClick={handleClick}>Supervisor List</button>
                </div>

                {isSidebarVisible && (
                    <div className='coordinator-sidebar'>
                        <button name='coordinator-homepage-sidebar' onClick={handleClick}>Homepage</button>
                        <button name='coordinator-student-list-sidebar' onClick={handleClick}>Student List</button>
                        <button name='coordinator-applicant-list-sidebar' onClick={handleClick}>Applicant List</button>
                        <button name='coordinator-supervisor-list-sidebar' onClick={handleClick}>Supervisor List</button>
                        <button name='coordinator-logout-sidebar' onClick={handleClick}>Logout</button>
                    </div>
                )}
            </div>

            <div className='coordinator-main-outer'>
                <div className='coordinator-main-inner'>
                    <h1>Welcome back, {userData?.firstName}</h1>

                    <div className='coordinator-info'>
                        <div className='coordinator-info-1'>
                            <h2>Student Status Overview</h2>
                            <div className='coordinator-chart-container'>
                                <Doughnut
                                    data={{
                                        labels: [
                                            'Seeking',
                                            'Interviewing',
                                            'Placed',
                                            'Not Eligible'
                                        ],
                                        datasets: [{
                                            data: [
                                                totalSeeking || 0,
                                                totalInterviewing || 0,
                                                totalPlaced || 0,
                                                ((totalStudents || 0) - (totalSeeking || 0) - (totalInterviewing || 0) - (totalPlaced || 0)) > 0
                                                    ? ((totalStudents || 0) - (totalSeeking || 0) - (totalInterviewing || 0) - (totalPlaced || 0))
                                                    : 0
                                            ],
                                            backgroundColor: [
                                                '#595A5C',
                                                '#0C49A6',
                                                '#4790FF',
                                                '#B7CAE9'
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
                                        cutout: '72%',
                                        plugins: {
                                            legend: {
                                                position: 'bottom',
                                                labels: {
                                                    boxWidth: 12,
                                                    padding: 40,
                                                    useBorderRadius: true,
                                                    borderRadius: 10,
                                                    font: {
                                                        family: "'Inter', 'Roboto', sans-serif",
                                                        size: 15,
                                                    }
                                                },
                                            },
                                        },
                                        elements: {
                                            arc: {
                                                borderWidth: 6,
                                                borderColor: '#fff',
                                            }
                                        }
                                    }}
                                />
                            </div>
                        </div>

                        <div className='coordinator-info-2'>
                            <div className='coordinator-i2-f1'>
                                <h2>Term: {currentTerm}</h2>
                            </div>

                            <div className='coordinator-i2-f2'>
                                <div className='coordinator-info-box-1'>
                                    <h2 className='coordinator-info-descr'>Total Students</h2>
                                    <h2 className='coordinator-info-stats'>{totalStudents}</h2>
                                </div>

                                <div className='coordinator-info-box-2'>
                                    <h2 className='coordinator-info-descr'>Active Students</h2>
                                    <h2 className='coordinator-info-stats'>{totalActive}</h2>
                                </div>
                            </div>

                            <div className='coordinator-i2-f3'>
                                <div className='coordinator-info-box-1'>
                                    <h2 className='coordinator-info-descr'>Pending Approvals</h2>
                                    <h2 className='coordinator-info-stats'>{totalPendingApproval}</h2>
                                </div>

                                <div className='coordinator-info-box-2'>
                                    <h2 className='coordinator-info-descr'>Placed Students</h2>
                                    <h2 className='coordinator-info-stats'>{totalPlaced}</h2>
                                </div>
                            </div>
                        </div>

                        <div className='coordinator-info-3'>
                            <div className="coordinator-record-header">
                                CO-OP SUMMARY
                            </div>

                            <table className="coordinator-record-table">
                                <tbody>
                                    <tr>
                                        <td>Total Students:</td>
                                        <td>{totalStudents}</td>
                                    </tr>
                                    <tr>
                                        <td>Active Students:</td>
                                        <td>{totalActive}</td>
                                    </tr>
                                    <tr>
                                        <td>Pending Approvals:</td>
                                        <td>{totalPendingApproval}</td>
                                    </tr>
                                    <tr>
                                        <td>Seeking:</td>
                                        <td>{totalSeeking}</td>
                                    </tr>
                                    <tr>
                                        <td>Interviewing:</td>
                                        <td>{totalInterviewing}</td>
                                    </tr>
                                    <tr>
                                        <td>Placed:</td>
                                        <td>{totalPlaced}</td>
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

export default CoordinatorHomepage;