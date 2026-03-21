import './Login.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faLock, faUser, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { use, useState } from 'react';


function Login() {
    const [password, setPassword] = useState(''); 
    const [visible, setVisible] = useState(false);
    

    return (

        /* The container to contain the login box */
        <div className='login-page'>


            <div className='left-panel'>

                <p>Access the university Co-op portal to manage job applications, 
                   track your application status, and submit required reports. 
                </p>

            </div>



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
                            <input type="email" placeholder='E-mail'/>
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

        </div>
    );
}

export default Login;