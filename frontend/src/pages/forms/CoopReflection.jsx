import './CoopReflection.css';
import AuthLayout from '../../components/auth-layout/AuthLayout';
import { reflectionSubmit } from '../../services/formServices';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function CoopReflection() {
    const [company, setCompany] = useState('');
    const [supervisor, setSupervisor] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [termDuration, setTermDuration] = useState('');
    const [skills, setSkills] = useState('');
    const [challenges, setChallenges] = useState('');
    const [supported, setSupported] = useState('');
    const [pageError, setPageError] = useState('');
    const [schoolEmail, setSchoolEmail] = useState('');
    const navigate = useNavigate(); 


    const handleSubmit = async (e) => { 
        e.preventDefault(); 


        try { 
            const response = await reflectionSubmit({
                company: company,
                supervisor: supervisor,
                jobTitle: jobTitle,
                termDuration: termDuration,
                skills: skills,
                challenges: challenges,
                supported: supported,
                schoolEmail: schoolEmail
            });

            if (response.status == 201 || response){
                console.log("Reflection submitted successfully: ", response.data);
                navigate('/student'); 
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
        <AuthLayout title='CO-OP REFLECTION'
                    description='"Reflect on your co-op experience and the skills you have developed. This reflection will help you articulate your growth and achievements during your co-op term."'
                    rightPanel={
                        <form id='reflection-container' onSubmit={handleSubmit}>
                            
                            <div id='reflect-field-1'>
                                <div className='reflect-input-field-1'>
                                    <label>Employer/Company Name</label>
                                    <input type="text"
                                           value={company}
                                           onChange={(e) => setCompany(e.target.value)}
                                           required
                                           placeholder='Employer/Company Name (e.g. Google)'>
                                    </input>
                                </div>

                                <div className='reflect-input-field-2'>
                                    <label>Supervisor Name</label>
                                    <input type="text"
                                           value={supervisor}
                                           onChange={(e) => setSupervisor(e.target.value)}
                                           required
                                           placeholder='Supervisor Name (e.g. Jane Doe)'></input>
                                </div>
                            </div>


                            <div id='reflect-field-2'>
                                <div className='reflect-input-field-1'>
                                    <label>Job Title</label>
                                    <input type="text"
                                           value={jobTitle}
                                           onChange={(e) => setJobTitle(e.target.value)}
                                           required
                                           placeholder='Job Title (e.g. Software Engineer)'>
                                    </input>
                                </div>
                                            

                                <div className='reflect-input-field-2'>
                                    <label>Work Term Duration</label>
                                    <input type="text"
                                           value={termDuration}
                                           onChange={(e) => setTermDuration(e.target.value)}
                                           required
                                           placeholder='e.g. 4 months'></input>
                                </div>
                            </div>


                            <div id='reflect-field-7'>
                                <div className='reflect-input-field-1'>
                                    <label>Student Email</label>
                                    <input type='text' 
                                           value={schoolEmail}
                                           onChange={(e) => setSchoolEmail(e.target.value)}
                                           placeholder='Your response...'
                                           required
                                    />
                                </div>
                            </div>


                            <div id='reflect-field-3'>
                                <div className='reflect-input-field-1'>
                                    <label>What is a technical skill you’ve learned and how have you implemented it in your role?</label>
                                    <input type='text' 
                                           value={skills}
                                           onChange={(e) => setSkills(e.target.value)}
                                           placeholder='Your response...'
                                           required
                                    />
                                </div>
                            </div>

                            <div id='reflect-field-4'>
                                <div className='reflect-input-field-1'>
                                    <label>Describe a challenge you encountered and how you resolved it on your work term.</label>
                                    <input type='text' 
                                           value={challenges}
                                           onChange={(e) => setChallenges(e.target.value)}
                                           placeholder='Your response...'
                                           required
                                    />
                                </div>
                            </div>

                            <div id='reflect-field-5'>
                                <div className='reflect-input-field-1'>
                                    <label>On a scale of 1-5, how well supported did you feel about your supervisor? Explain why.</label>
                                    <input type='text' 
                                           value={supported}
                                           onChange={(e) => setSupported(e.target.value)}
                                           placeholder='Your response...'
                                           required
                                    />
                                </div>
                            </div>

                            <div id='reflect-field-6'>
                                {pageError && (
                                        <div className='register-error'>
                                        <p className='reflect-error'>{pageError}</p>
                                        </div>
                                    )}
                                <button className='blue-button'>Submit</button>
                            </div>
                            

                            
                        </form>
                    }
        
        
        />

    ); 
}; 

export default CoopReflection;