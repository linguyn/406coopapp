import './Application.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import AuthLayout from '../../components/AuthLayout';
import { signIn } from '../../services/authService';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Application() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [studentId, setStudentId] = useState('');
    const [password, setPassword] = useState('');
    const [temp, setTemp] = useState('');
    const [pageError, setPageError] = useState('');
    const [visible, setVisible] = useState(false); 
    const [visibleTemp, setVisibleTemp] = useState(false); 
    const navigate = useNavigate(); 

    const handleSubmit = (e) => { 
        null; 
    }

    return (
        <AuthLayout title='CO-OP APPLICATION'
                    description='"Fill out the application with your placement details and required documents. Once submitted, your faculty supervisor will review your application for Co-op credit eligibility."'
                    rightPanel={
                        <form id='application-container' onSubmit={handleSubmit}>
                            
                            <div id='apply-field-1'>
                                <div className='input-field-1'>
                                    <label>First Name</label>
                                    <input type="text"
                                           value={firstName}
                                           onChange={(e) => setFirstName(e.target.value)}
                                           required
                                           placeholder='First Name (e.g. John)'>
                                    </input>
                                </div>

                                <div className='input-field-2'>
                                    <label>Last Name</label>
                                    <input type="text"
                                           value={lastName}
                                           onChange={(e) => setLastName(e.target.value)}
                                           required
                                           placeholder='Last Name (e.g. Smith)'></input>
                                </div>
                            </div>


                            <div id='apply-field-2'>
                                <div className='input-field-1'>
                                    <label>Student Email</label>
                                    <input type="email"
                                           value={email}
                                           onChange={(e) => setEmail(e.target.value)}
                                           required
                                           placeholder='123@example.com'>
                                    </input>
                                </div>
                                            

                                <div className='input-field-2'>
                                    <label>Student ID</label>
                                    <input type="text"
                                           value={studentId}
                                           onChange={(e) => setStudentId(e.target.value)}
                                           required
                                           placeholder='e.g. 123456789'></input>
                                </div>
                            </div>


                            <div id='apply-field-3'>
                                <div className='input-field-1'>
                                    <label>Password</label>
                                    <div className='register-icon-field'>
                                        <input type={visible ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        placeholder='Enter your password'></input>
                                        <FontAwesomeIcon icon={visible ? faEyeSlash : faEye} 
                                                     className='register-icon'
                                                     onClick={() => visible ? setVisible(false) : setVisible(true)}/>
                                    </div>
                                </div>

                                <div className='input-field-2'>
                                    <label>Re-enter password</label>

                                    <div className='register-icon-field'>
                                        <input type={visibleTemp ? 'text' : 'password'}
                                        value={temp}
                                        onChange={(e) => setTemp(e.target.value)}
                                        required
                                        placeholder='Re-enter your password'></input>
                                        <FontAwesomeIcon icon={visibleTemp ? faEyeSlash : faEye} 
                                                     className='register-icon'
                                                     onClick={() => visibleTemp ? setVisibleTemp(false) : setVisibleTemp(true)}/>
                                    </div>
                                </div>
                            </div>



                            <div id='student-field-4'>
                                {pageError && (
                                        <div className='register-error'>
                                        <p className='student-error'>{pageError}</p>
                                        </div>
                                    )}
                                <button className='blue-button'>Register</button>
                            </div>

                            
                        </form>
                    }
        
        
        />

    ); 
} 

export default Application; 