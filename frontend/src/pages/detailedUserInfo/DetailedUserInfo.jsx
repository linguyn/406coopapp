import './DetailedUserInfo.css'
import ReturnButtonIcon from '../../assets/returnButton.svg'
import HomeButtonIcon from '../../assets/whiteHome.svg'

function DetailedUserInfo(){
    return (

        <div className='detailed-user-info-main-background'>
            
            <div className='detailed-user-info-main-box' >
                
                <header>
                    
                    <div className='detailed-user-info-return'>
                        <img src={ReturnButtonIcon}></img>
                        <h2>Applicant List</h2>
                    </div>

                    <div className='detailed-user-info-main-title'>
                        <h1>APPLICANT INFO</h1>
                        <h2>Status: Searching</h2>
                    </div>

                    <div className='detailed-user-info-homepage'>
                        <img src={HomeButtonIcon}></img>
                        <h2>Homepage</h2>
                    </div>
                
                </header>
                <main>

                    <div className='detailed-user-info-fields'>

                        <div className='double-input'>

                            <div className='single-input'>
                            <label className='left-label'> First Name: </label>
                            <input type='text'></input>
                            </div>

                            <div className='single-input'>
                            <label> Last Name: </label>
                            <input type='text'></input>
                            </div>
                        </div>
                        
                        <div className='single-input'>
                        <label> Student ID: </label>
                        <input type='text'></input>
                        </div>

                        <div className='single-input'>
                        <label> Email: </label>
                        <input type='text'></input>
                        </div>

                        <div className='single-input'>
                        <label> Program: </label>
                        <input type='text'></input>
                        </div>

                        <div className='double-input'>

                            <div className='single-input'>
                            <label className='left-label'>Supervisor:</label>
                            <input type='text'></input>
                            </div>

                            <div className='single-input'>
                            <label>Interviewed:</label>
                            <input type='text'></input>
                            </div>
                        </div>
        
                        <div className='double-input'>
                            
                            <div className='single-input'>
                            <label className='left-label'> Applications Sent: </label>
                            <input type='text'></input>
                            </div>

                            <div className='single-input'>
                            <label> Work Terms: </label>
                            <input type='text'></input>
                            </div>
                        </div>

                            <button>Adjust</button>

                    </div>

                    <div className='detailed-user-info-file'>
                        <h2>PROGRESS REPORT</h2>
                        <div className='detailed-user-info-pdf'></div>
                        <p className='detailed-user-info-date'>Date: 03/12/2026</p>
                    </div>

                </main>
            </div>
        </div>
    
    )
}
export default DetailedUserInfo