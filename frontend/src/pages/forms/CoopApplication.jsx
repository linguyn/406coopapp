import './CoopApplication.css'
import AuthLayout from '../../components/auth-layout/AuthLayout';
import { signIn } from '../../services/authService';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { applicationSubmit } from '../../services/formServices';

function Application() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [studentId, setStudentId] = useState('');
    const [permission, setPermission] = useState('');
    const [paragraph, setParagraph] = useState('');
    const [github, setGithub] = useState('');
    const [file, setFile] = useState(null);
    const [pageError, setPageError] = useState('');
    const navigate = useNavigate(); 


    const handleSubmit = async (e) => { 
        e.preventDefault(); 
        /*if (!file) {
            setPageError("Please upload your resume");
            return;
        }*/

        try { 
            const response = await applicationSubmit({
                firstName: firstName,
                lastName: lastName,
                schoolEmail: email,
                studentId: studentId,
                eligibility: permission,
                reasonToApply: paragraph,
                portfolioLink: github
            });

            if (response.status == 201 || response){
                console.log("Application submitted successfully: ", response.data);
                navigate('/applicant/thank-you-page'); 
            }
        } catch (error) {
            const msg = error.response?.data.message || error.message || "Something went wrong";
            console.error(msg);
            setPageError(msg);
        }
    }


    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
            console.log('Selected file:', e.target.files[0]);
        }
    };


    return (
        <AuthLayout title='CO-OP APPLICATION'
                    description='"Fill out the application with your placement details and required documents. Once submitted, your faculty supervisor will review your application for Co-op credit eligibility."'
                    rightPanel={
                        <form id='application-container' onSubmit={handleSubmit}>
                            
                            <div id='apply-field-1'>
                                <div className='apply-input-field-1'>
                                    <label>First Name</label>
                                    <input type="text"
                                           value={firstName}
                                           onChange={(e) => setFirstName(e.target.value)}
                                           required
                                           placeholder='First Name (e.g. John)'>
                                    </input>
                                </div>

                                <div className='apply-input-field-2'>
                                    <label>Last Name</label>
                                    <input type="text"
                                           value={lastName}
                                           onChange={(e) => setLastName(e.target.value)}
                                           required
                                           placeholder='Last Name (e.g. Smith)'></input>
                                </div>
                            </div>


                            <div id='apply-field-2'>
                                <div className='apply-input-field-1'>
                                    <label>Student Email</label>
                                    <input type="email"
                                           value={email}
                                           onChange={(e) => setEmail(e.target.value)}
                                           required
                                           placeholder='123@example.com'>
                                    </input>
                                </div>
                                            

                                <div className='apply-input-field-2'>
                                    <label>Student ID</label>
                                    <input type="text"
                                           value={studentId}
                                           onChange={(e) => setStudentId(e.target.value)}
                                           required
                                           placeholder='e.g. 123456789'></input>
                                </div>
                            </div>


                            <div id='apply-field-3'>
                                <div className='apply-input-field-1'>
                                    <label>Are you eligible to work in Canada/have your work permit?</label>
                                    <input type='text' 
                                           value={String(permission)}
                                           onChange={(e) => {
                                                   const raw = e.target.value;
                                                    const value = raw.trim().toLowerCase();

                                                    if (value === 'true') setPermission(true);
                                                    else if (value === 'false') setPermission(false);
                                                    else setPermission(raw); 
                                                }}
                                           placeholder='true/false (must be boolen value)'
                                           required
                                    />
                                </div>
                            </div>

                            <div id='apply-field-4'>
                                <div className='apply-input-field-1'>
                                    <label>Why do you want to join the co-op program? (150 words max)</label>
                                    <input type='text' 
                                           value={paragraph}
                                           onChange={(e) => setParagraph(e.target.value)}
                                           placeholder='Your response...'
                                           required
                                    />
                                </div>
                            </div>

                            <div id='apply-field-5'>

                                <div className='apply-input-field-1'>
                                    <label>Github/Portfolio Link (optional)</label>
                                    <input type='text' 
                                           value={github}
                                           onChange={(e) => setGithub(e.target.value)}
                                           placeholder='Your response...'
                                    />
                                </div>

                                <div className='apply-input-field-2'>
                                    <label>Resume</label>
                                    <div className='file-button-container'>
                                        <input className='custom-file-button' type='file' accept='.pdf,.doc,.docx'
                                            onChange={handleFileChange}
                                            required/>
                                    </div>
                                    
                                </div>
                            </div>


                            <div id='apply-field-6'>
                                {pageError && (
                                        <div className='register-error'>
                                        <p className='apply-error'>{pageError}</p>
                                        </div>
                                    )}
                                <button className='blue-button'>Submit</button>
                            </div>
                            

                            
                        </form>
                    }
        
        
        />

    ); 
} 


export default Application; 