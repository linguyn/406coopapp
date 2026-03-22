import './Signup.css'


import { useState } from 'react';
import { loginUser } from '../../services/authService';
import { useNavigate } from 'react-router-dom';


function Login() {
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [serverError, setServerError] = useState('');
    const navigate = useNavigate();






    const handleSubmit = null;
    

    return (

        /* The container contains the login box */
        <div className='login-page'>


            <div className='left-panel'>

                <p>Access the university Co-op portal to manage job applications, 
                   track your application status, and submit required reports. 
                </p>

            </div>


            <form onSubmit={handleSubmit}>
                {/* user inputs for email + password */}
                <div className='right-panel'>

                    <h1>STUDENT REGISTRATION </h1>


                    {/* user inputs for email + password */}
                    <div className='inputs'>

                    {/* input for email */}
                        <div className='input'>

                            <label className='email-label'>Email</label>

                            <div className='input-field'>
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
                                <input
                                    type={visible ? "text" : "password"} 
                                    value={password}
                                    id='password'
                                    placeholder='Enter your password'
                                    onChange={(e) => setPassword(e.target.value)}
                                    required/>

            
                            </div>
                            
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

        </div>
    );
}

export default Login;



