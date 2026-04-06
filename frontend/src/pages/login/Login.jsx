import './Login.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faLock, faUser, faEye, faEyeSlash, faGear, faG } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { loginUser } from '../../services/authService';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import React from 'react';
import Select from 'react-select';
import { text } from '@fortawesome/fontawesome-svg-core';

const roleOptions = [
        { value: 'student', label: 'Student' },
        { value: 'supervisor', label: 'Supervisor' },
        { value: 'coordinator', label: 'Coordinator' }
    ];

const customStyles = {
    control: (base) => ({
        ...base,
        backgroundColor: 'rgb(213, 213, 213)',
        border: 'none',
        borderRadius: '4px',
        width: '82%',
        margin: '0 auto',
        minHeight: '46px',
        boxShadow: 'none',
        cursor: 'pointer',
        fontFamily: '"Roboto", "Inter", Helvetica',
        '&:hover': { backgroundColor: '#eaeaea' }
    }),
    valueContainer: (base) => ({
        ...base,
        paddingLeft: '35px', 
        textAlign: 'left',
        color: '#555',
        fontSize: '0.9rem',
        fontFamily: '"Roboto", "Inter", Helvetica'
    }),
    placeholder: (base) => ({
        ...base,
        textAlign: 'left',
        color: '#555',
        fontSize: '0.9rem',
        fontFamily: '"Roboto", "Inter", Helvetica'
    }),
    menu: (base) => ({
        ...base,
        width: '82%',
        left: '9%',
        fontFamily: '"Roboto", "Inter", Helvetica',
    })
};
    
function Login() {
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [visible, setVisible] = useState(false);
    const [serverError, setServerError] = useState('');
    const [role, setRole] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();
    const { setUserData } = useAuth(); 

    const handleSubmit = async (event) => {
        
        event.preventDefault();

        try {

            const response = await loginUser(
                {
                    email: email, 
                    password: password,
                    rememberMe: rememberMe,
                    role: role
                });

            if (response.status == 200 || response) { 
                console.log(response);
                console.log("Login successful: " , response.status);
                const user = response.data.user; 
            
                setUserData(user);
                
                if (user.role === 'student') navigate('/student');
                if (user.role === 'supervisor') navigate('/supervisor');
                if (user.role === 'coordinator') navigate('/coordinator');
            }

        } catch (error) {
            if (!role) {
                setServerError('Please select your role');
            }
            const msg = error.response?.data.message;
            console.error(msg);
            setServerError(msg);
        }
    };
    

    return (

        /* The container contains the login box */
        <div className='login-page'>


            <div className='left-panel'>

                <p>Access the university Co-op portal to manage job applications, 
                   track your application status, and submit required reports. 
                </p>

            </div>


            <form onSubmit={handleSubmit} className='right-panel'>
                {/* user inputs for email + password */}


                    <h1>SIGN IN</h1>


                    {/* user inputs for email + password */}
                    <div className='inputs'>

                    {/* input for email */}
                        <div className='input'>

                            <label className='email-label'>Email</label>

                            <div className='input-field'>
                                <FontAwesomeIcon icon={faUser} className='login-icon'/>
                                <input type="email"
                                        placeholder='E-mail'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required/>
                            </div>

                        </div>

                        {/* input for password */}
                        <div className='input'>

                            <label className='password-label'>Password</label>

                            <div className='input-field'>
                                <FontAwesomeIcon icon={faLock} className='login-icon'/>
                                <input
                                    type={visible ? "text" : "password"} 
                                    value={password}
                                    id='password'
                                    placeholder='Enter your password'
                                    onChange={(e) => setPassword(e.target.value)}
                                    required/>

                                <FontAwesomeIcon icon={visible ? faEyeSlash : faEye} className='icon-eye'
                                                onClick={() => visible ? setVisible(false) : setVisible(true)}/>
                            </div>
                            
                        </div>

                            <div className='input'>
                                <label className='role-label'>Role</label>
                                <div className='input-field'>
                                    <FontAwesomeIcon icon={faGear}
                                                    className='icon-gear'/>
                                    <Select
                                        className='select-box'
                                        styles={customStyles}
                                        options={roleOptions}
                                        value={roleOptions.find(option => option.value === role)}
                                        onChange={(selected) => setRole(selected.value)}
                                        placeholder="Select your role"/>
                                </div>
                            </div>

                    </div>

                    <div className="options-row">

                        <div className="remember-me">
                            <input type="checkbox" 
                                   id="remember"
                                   onChange={(e) => setRememberMe(e.target.checked)}/>
                            <label htmlFor="remember">Remember me</label>
                        </div>


                    </div>

                    {serverError && (
                            <div className='error-message'>
                            <p className='err'>{serverError}</p>
                            </div>
                        )}

                    {/* sign in button + create account option */}
                    <div className='options-column'>
                        
                        {/* sign in button */}
                        <div className='sign-in-button'>
                            <button type='submit'>Sign In</button>
                        </div>


                        <div className='create-account'>
                            <Link to="/roles">Create Account</Link>
                        </div>
                    </div>

            </form>

        </div>
    );
}

export default Login;