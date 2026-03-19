import './Login.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {  } from '@fortawesome/free-regular-svg-icons';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';


function Login() {
    return (

        /* The container to contain the login box */
        <div className='login-page'>

            {/* user inputs for email + password */}
            <div className='right-panel'>

                {/* user inputs for email + password */}
                <div className='inputs'>

                    {/* input for email */}
                    <div className='input'>

                        <label className='email-label'>Email</label>

                        <div className='input-field'>
                            <FontAwesomeIcon icon={faUser} className='icon'/>
                            <input type="email"></input>
                        </div>

                    </div>

                    {/* input for password */}
                    <div className='input'>

                        <label className='password-label'>Password</label>

                        <div className='input-field'>
                            <FontAwesomeIcon icon={faLock} className='icon'/>
                            <input type='password'></input>
                        </div>
                        
                    </div>

                </div>

                {/*forgot password*/}
                <div className='forgot-password'>
                    <a href=''>Forgot password?</a>
                </div>

                {/* sign in button */}
                <div className='sign-in'>
                    <button className='submit'>Sign In</button>
                </div>

                {/* remember me */}
                <div className='remember-me'>
                    <input type='checkbox'></input>
                    <label>Remember me</label>
                </div> 


            </div>


            <div className='left-panel'>

                {/* sign in header */}
                <div className='header'>
                    <h1>SIGN IN</h1>
                </div>



            </div>
        </div>
    );
}

export default Login;