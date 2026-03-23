import './StudentRegister.css'
import AuthLayout from '../../components/AuthLayout';

function StudentRegister()
{
    const handleSubmit = null;

    return(
        <AuthLayout title='STUDENT REGISTRATION'
                    description='“Access the university Co-op portal to manage job applications, track your application status, and submit required reports.”'
                    rightPanel={
                        <form id='student-container' onSubmit={handleSubmit}>
                            
                            <div id='student-field-1'>
                                <div className='input-field-1'>
                                    <label>First Name</label>
                                    <input type="text"></input>
                                </div>

                                <div className='input-field-2'>
                                    <label>Last Name</label>
                                    <input type="text"></input>
                                </div>
                            </div>


                            <div id='student-field-2'>
                                <div className='input-field-1'>
                                    <label>Student Email</label>
                                    <input type="text"></input>
                                </div>

                                <div className='input-field-2'>
                                    <label>Student ID</label>
                                    <input type="text"></input>
                                </div>
                            </div>


                            <div id='student-field-3'>
                                <div className='input-field-1'>
                                    <label>Password</label>
                                    <input type="text"></input>
                                </div>

                                <div className='input-field-2'>
                                    <label>Re-enter password</label>
                                    <input type="text"></input>
                                </div>
                            </div>




                            <div id='student-field-4'>
                                <button className='blue-button'>Register</button>
                            </div>

                            
                        </form>
                    }
        />
    );

};

export default StudentRegister;



