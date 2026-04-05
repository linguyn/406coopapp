import './ThankYouPage.css'
import YellowWave from '../../assets/yellowWave.svg'
import { useNavigate } from 'react-router-dom'

function ThankYouPage(props){
    const navigate = useNavigate()

    return(
        <div className='thank-you-background'>

            <div className='thank-you-inner-blue-background'>
                
                <div className='thank-you-inner-yellow-background'>
                    <img src={YellowWave} className='top-wave'></img>

                    <div className='thank-you-inner-text'>

                        <h2>{props.mainText}</h2>
                        <p>{props.secondaryText}</p>
                        
                        <div className='button-row'>
                            <button onClick={() => navigate(`/${props.type}`)}>Home</button>
                            {String (props.type) === "applicant" && (
                                <button>Status</button>
                            )}
                        </div>                    

                    </div>

                    <img src={YellowWave} className='bottom-wave'></img>
                </div>

            </div>

        </div>
    );
}

export default ThankYouPage