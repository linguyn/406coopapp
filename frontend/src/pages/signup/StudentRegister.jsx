import './StudentRegister.css'
import AuthLayout from '../../components/AuthLayout';
import { signIn } from '../../services/authService';
import { useState } from 'react';
import { isSamePassword, isValidEmail, isValidPassword, isValidStudentId } from '../../services/validate-frontend';

function StudentRegister()
{
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [studentId, setStudentId] = useState('');
    const [password, setPassword] = useState('');
    const [temp, setTemp] = useState('');
    const [pageError, setPageError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        try { 
            
        } catch (error) { 

        }; 
    };

    return(
        <AuthLayout title='STUDENT REGISTRATION'
                    description='“Access the university Co-op portal to manage job applications, track your application status, and submit required reports.”'
                    rightPanel={
                        <form id='student-container' onSubmit={handleSubmit}>
                            
                            <div id='student-field-1'>
                                <div className='input-field-1'>
                                    <label>First Name</label>
                                    <input type="text"
                                           value={firstName}
                                           onChange={(e) => setFirstName(e.target.value)}
                                           required>
                                    </input>
                                </div>

                                <div className='input-field-2'>
                                    <label>Last Name</label>
                                    <input type="text"
                                           value={lastName}
                                           onChange={(e) => setLastName(e.target.value)}
                                           required></input>
                                </div>
                            </div>


                            <div id='student-field-2'>
                                <div className='input-field-1'>
                                    <label>Student Email</label>
                                    <input type="text"
                                           value={email}
                                           onChange={(e) => setEmail(e.target.value)}
                                           required>
                                    </input>
                                </div>
                                            

                                <div className='input-field-2'>
                                    <label>Student ID</label>
                                    <input type="text"
                                           value={studentId}
                                           onChange={(e) => setStudentId(e.target.value)}
                                           required></input>
                                </div>
                            </div>


                            <div id='student-field-3'>
                                <div className='input-field-1'>
                                    <label>Password</label>
                                    <input type="text"
                                           value={password}
                                           onChange={(e) => setPassword(e.target.value)}
                                           required></input>
                                </div>

                                <div className='input-field-2'>
                                    <label>Re-enter password</label>
                                    <input type="text"
                                           value={temp}
                                           onChange={(e) => setTemp(e.target.value)}
                                           required></input>
                                </div>
                            </div>


                            {pageError && (
                                        <div className='register-error'>
                                        <p className='student-error'>{pageError}</p>
                                        </div>
                                    )}

                            <div id='student-field-4'>
                                <button className='blue-button'>Register</button>
                            </div>

                            
                        </form>
                    }
        />
    );

};

export default StudentRegister;



