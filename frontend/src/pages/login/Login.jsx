import './Login.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faLock, faUser, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
<<<<<<< HEAD
import { use, useState } from 'react';


function Login() {
    const [password, setPassword] = useState(''); 
    const [visible, setVisible] = useState(false);
=======
import { useState } from 'react';
import { loginUser } from '../../services/authService';
import { useNavigate } from 'react-router-dom';


function Login() {
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [visible, setVisible] = useState(false);
    const [serverError, setServerError] = useState('');
    const navigate = useNavigate();





    const handleSubmit = async (event) => {
        
        event.preventDefault();

        try {
            const response = await loginUser(
                {
                    email: email, 
                    password: password
                });

            if (response.status == 200 || response) {
                console.log("Login successful: " , response.status);
                navigate("/homepage");
            }

        } catch (error) {
            const msg = error.response?.data.message;
            console.error(msg);
            setServerError(msg);
        }
    };
>>>>>>> main
    

    return (

<<<<<<< HEAD
        /* The container to contain the login box */
=======
        /* The container contains the login box */
>>>>>>> main
        <div className='login-page'>


            <div className='left-panel'>

<<<<<<< HEAD
                {/* sign in header */}
                <h1>SIGN IN</h1>

=======
>>>>>>> main
                <p>Access the university Co-op portal to manage job applications, 
                   track your application status, and submit required reports. 
                </p>

            </div>


<<<<<<< HEAD

            {/* user inputs for email + password */}
            <div className='right-panel'>

                {/* user inputs for email + password */}
                <div className='inputs'>

                    {/* input for email */}
                    <div className='input'>

                        <label className='email-label'>Email</label>

                        <div className='input-field'>
                            <FontAwesomeIcon icon={faUser} className='icon'/>
                            <input type="email" placeholder='E-mail'/>
=======
            <form onSubmit={handleSubmit}>
                {/* user inputs for email + password */}
                <div className='right-panel'>

                    <h1>SIGN IN</h1>


                    {/* user inputs for email + password */}
                    <div className='inputs'>

                    {/* input for email */}
                        <div className='input'>

                            <label className='email-label'>Email</label>

                            <div className='input-field'>
                                <FontAwesomeIcon icon={faUser} className='icon'/>
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
                                <FontAwesomeIcon icon={faLock} className='icon'/>
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
                            
>>>>>>> main
                        </div>

                    </div>

<<<<<<< HEAD
                    {/* input for password */}
                    <div className='input'>

                        <label className='password-label'>Password</label>

                        <div className='input-field'>
                            <FontAwesomeIcon icon={faLock} className='icon'/>
                            <input
                                type={visible ? "text" : "password"} 
                                value={password}
                                id='password'
                                placeholder='Enter your password'
                                onChange={(e) => setPassword(e.target.value)}/>

                            <FontAwesomeIcon icon={visible ? faEyeSlash : faEye} className='icon-eye'
                                             onClick={() => visible ? setVisible(false) : setVisible(true)}/>
                        </div>
                        
                    </div>

                </div>

                <div className="options-row">

                    <div className="remember-me">
                        <input type="checkbox" id="remember"/>
                        <label htmlFor="remember">Remember me</label>
                    </div>

                    <div className="forgot-password">
                        <a href="">Forgot password?</a>
                    </div>

                </div>


                {/* sign in button + create account option */}
                <div className='options-column'>
                    {/* sign in button */}
                    <div className='sign-in-button'>
                        <button>Sign In</button>
                    </div>


                    <div className='create-account'>
                        <a href=''>Create Account</a>
                    </div>
                </div>




            </div>
=======
                    <div className="options-row">

                        <div className="remember-me">
                            <input type="checkbox" id="remember"/>
                            <label htmlFor="remember">Remember me</label>
                        </div>


                    </div>

                    {/* sign in button + create account option */}
                    <div className='options-column'>
                    
                        {serverError && (
                            <div className='error-message'>
                            <p className='err'>{serverError}</p>
                            </div>
                        )}
                        
                        {/* sign in button */}
                        <div className='sign-in-button'>
                            <button type='submit'>Sign In</button>
                        </div>


                        <div className='create-account'>
                            <a href=''>Create Account</a>
                        </div>
                    </div>




                </div>
            </form>
>>>>>>> main

        </div>
    );
}

<<<<<<< HEAD
export default Login;
=======
export default Login;



>>>>>>> main
