import './Roles.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faUserGraduate, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Roles () {
    const [role, setRole] = useState('');    
    const navigate = useNavigate();

    return (
        <div className='roles-page'>

            <div className='big-box'>

                <div className='header-box'>
                    <h1>CHOOSE YOUR ROLE</h1>
                </div>


                <div className='main-box-roles'>

                    <div className='student-card'>
                        <h1>STUDENT</h1>

                        <div className='button-wrapper'>
                            <button type="button"
                                    onClick={() => navigate('/student/register')}></button>
                            <FontAwesomeIcon icon={faUserGraduate}
                            className='roles-icon'/>
                        </div>

                        <p>"Apply for co-op positions, track your internship progress, 
                            and submit reflection reports."
                        </p>
                    </div>

                    <div className='supervisor-card'>
                        <h1>SUPERVISOR</h1>
                        
                        <div className='button-wrapper'>
                            <button type="button"
                                    onClick={() => navigate('/supervisor/register')}></button>
                            <FontAwesomeIcon icon={faUserTie}
                            className='roles-icon'/>
                        </div>

                        <p>"Apply for co-op positions, track your internship progress, 
                            and submit reflection reports."
                        </p>
                    </div>


                </div>


            </div>
        </div>
    ); 

}; 
export default Roles; 