import './LandingPage.css'; 
import { Link, useNavigate } from 'react-router-dom';

function LandingPage() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/student/register');
    }

    return (
        <div className='landing-page'>
            <div className='landing-box-1'>

                <   div className='no-account'>
                    <p>No account?</p>
                    <Link className='link-ld' to='/roles'>Create Account</Link>
                </div>

                <div className='have-account'>
                    <p>Have an account?</p>
                    <Link className='link-ld' to='/login'>Sign in</Link>
                </div>
            </div>
            <div className='landing-box-2'>
                <h3>ARE YOU A STUDENT?</h3>
                <h1>APPLY FOR CO-OP</h1>
                <button onClick={handleClick}>APPLY NOW</button>
            </div>
        </div>
    );
}; 

export default LandingPage; 