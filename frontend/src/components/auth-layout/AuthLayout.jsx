import './AuthLayout.css'
import ReturnButton from '../../assets/returnButton.svg'
import { useNavigate } from 'react-router-dom';
import { getID } from '../../services/formServices';

function AuthLayout( {title, description, rightPanel} ) {

    const navigate = useNavigate();

    return (
        <div className='auth-layout'>
            <div className='auth-box'>
                <div className='auth-left'>
                    <div className='app-home-button' onClick={() => navigate(-1)}>
                        <img src={ReturnButton} className='home-icon'></img>
                    </div>
                    <h1>{title}</h1>
                    <p>{description}</p>
                </div>
                <div className='auth-right'>{rightPanel}</div>
            </div> 
        </div>
    );
};


export default AuthLayout; 