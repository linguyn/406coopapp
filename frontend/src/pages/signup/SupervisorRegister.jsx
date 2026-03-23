import './SupervisorRegister.css'
import AuthLayout from '../../components/AuthLayout';

function SupervisorRegister() {
    const handleSubmit = null;

    return(
        <AuthLayout title='SUPERVISOR REGISTRATION'
                    description='“Register as a supervisor to monitor student progress, review work term reports, and provide evaluations throughout the co-op process.”'
                    rightPanel={
                        <form id='supervisor-container' onSubmit={handleSubmit}>
                            
                            <div id='supervisor-field-1'>
                                <div className='input-field-1'>
                                    <label>First Name</label>
                                    <input type="text"></input>
                                </div>

                                <div className='input-field-2'>
                                    <label>Last Name</label>
                                    <input type="text"></input>
                                </div>
                            </div>


                            <div id='supervisor-field-2'>
                                <div className='input-field-1'>
                                    <label>Work Email</label>
                                    <input type="text"></input>
                                </div>

                                <div className='input-field-2'>
                                    <label>Job Title</label>
                                    <input type="text"></input>
                                </div>
                            </div>


                            <div id='supervisor-field-3'>
                                <div className='input-field-1'>
                                    <label>Company Name</label>
                                    <input type="text"></input>
                                </div>

                                <div className='input-field-2'>
                                    <label>Company Location</label>
                                    <input type="text"></input>
                                </div>
                            </div>


                            <div id='supervisor-field-4'>
                                <div className='input-field-1'>
                                    <label>Password</label>
                                    <input type="text"></input>
                                </div>

                                <div className='input-field-2'>
                                    <label>Re-enter password</label>
                                    <input type="text"></input>
                                </div>
                            </div>


                            <div id='supervisor-field-5'>
                                <button className='blue-button'>Register</button>
                            </div>

                            
                        </form>
                    }
        />
    );


}

export default SupervisorRegister; 