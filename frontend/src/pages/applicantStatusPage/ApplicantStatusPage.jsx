import './ApplicantStatusPage.css'
import YellowWave from '../../assets/yellowWave.svg'
import { useNavigate } from 'react-router-dom'

function ApplicantStatusPage(props){

    const navigate = useNavigate()

    const statusText = {
        underReview : "Under Review",
        accepted : "Accepted",
        rejected : "Rejected"
    };

    const statusInnerText = {
        underReview : "An email will be sent when a decision has been made",
        accepted : "Congratulations! You've been accepted into the co-op program.",
        rejected : "Thank you for your interest in the co-op program. Unfortunately, we won't be moving forward with your application."
    }
    return(
        <div className='applicant-status-background'>

            <div className='applicant-status-inner-blue-background'>
                
                <div className='applicant-status-inner-yellow-background'>
                    <img src={YellowWave} className='applicant-status-top-wave'></img>

                    <div className='applicant-status-inner-text'>

                        <h2>Application Status: <span className='applicant-status-text'>{statusText[props.status]}</span> </h2>
                        <p>{statusInnerText[props.status]}</p>
                        
                        <div className='button-row'>
                            <button onClick={() => navigate('/student')}>Home</button>
                        </div>                    

                    </div>

                    <img src={YellowWave} className='applicant-status-bottom-wave'></img>
                </div>

            </div>

        </div>
    );
}

export default ApplicantStatusPage