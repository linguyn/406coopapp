import './SupervisorRegister.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import AuthLayout from '../../components/auth-layout/AuthLayout';
import { signIn } from '../../services/authService';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SupervisorRegister() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    const [password, setPassword] = useState('');
    const [temp, setTemp] = useState('');
    const [pageError, setPageError] = useState('');
    const [visible, setVisible] = useState(false); 
    const [visibleTemp, setVisibleTemp] = useState(false); 
    const [jobTitle, setJobTitle] = useState(''); 
    const [location, setLocation] = useState(''); 
    const navigate = useNavigate(); 


    const handleSubmit = async (e) => {
        e.preventDefault(); 
        try { 
            const response = await signIn({
                role: 'supervisor', 
                email: email, 
                password: password, 
                passwordAgain: temp, 
                firstName: firstName, 
                lastName: lastName, 
                company: company, 
                jobTitle: jobTitle, 
                location: location
            });


            if (response.status == 200 || response){
                console.log("Register successful: ", response.data);
                navigate('/login'); 
            }
        } catch (error) { 
            const msg = error.response?.data.message;
            console.error(msg);
            setPageError(msg);
        }; 
    };

    return(
        <AuthLayout title='SUPERVISOR REGISTRATION'
                    description='“Register as a supervisor to monitor student progress, review work term reports, and provide evaluations throughout the co-op process.”'
                    rightPanel={
                        <form id='supervisor-container' onSubmit={handleSubmit}>
                            
                            <div id='supervisor-field-1'>
                                <div className='input-field-1'>
                                    <label>First Name</label>
                                    <input type="text"
                                           value={firstName}
                                           onChange={(e) => setFirstName(e.target.value)}
                                           required
                                           placeholder='First Name (e.g. John)'></input>
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


                            <div id='supervisor-field-2'>
                                <div className='input-field-1'>
                                    <label>Work Email</label>
                                    <input type="email"
                                           value={email}
                                           onChange={(e) => setEmail(e.target.value)}
                                           required
                                           placeholder='123@example.com'></input>
                                </div>

                                <div className='input-field-2'>
                                    <label>Job Title</label>
                                    <input type="text"
                                           value={jobTitle}
                                           onChange={(e) => setJobTitle(e.target.value)}
                                           required
                                           placeholder='e.g. AI Engineer'></input>
                                </div>
                            </div>


                            <div id='supervisor-field-3'>
                                <div className='input-field-1'>
                                    <label>Company Name</label>
                                    <input type="text"
                                           value={company}
                                           onChange={(e) => setCompany(e.target.value)}
                                           required
                                           placeholder='e.g. Palantir'></input>
                                </div>

                                <div className='input-field-2'>
                                    <label>Company Location</label>
                                    <input type="text"
                                           value={location}
                                           onChange={(e) => setLocation(e.target.value)}
                                           required
                                           placeholder='e.g. Idaho'></input>
                                </div>
                            </div>


                            <div id='supervisor-field-4'>
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


                            <div id='supervisor-field-5'>
                                {pageError && (
                                        <div className='register-error'>
                                        <p className='supervisor-error'>{pageError}</p>
                                        </div>
                                    )}
                                <button className='blue-button'>Register</button>
                            </div>

                            
                        </form>
                    }
        />
    );


}

export default SupervisorRegister; 