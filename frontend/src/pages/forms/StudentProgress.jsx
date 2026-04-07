import './StudentProgress.css';
import AuthLayout from '../../components/auth-layout/AuthLayout';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import { progressSubmit, getID, updateProgress } from '../../services/formServices';


function StudentProgress() {
    const [studentName, setStudentName] = useState('');
    const [supervisorName, setSupervisorName] = useState('');
    const [company, setCompany] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [stars, setStars] = useState('');
    const [stairs, setStairs] = useState('');
    const [employable, setEmployable] = useState('');
    const [schoolEmail, setSchoolEmail] = useState('');
    const [pageError, setPageError] = useState('');
    const [formUpdate, setFormUpdate] = useState(false);    
    const { userData } = useAuth();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setPageError('');

        try {
            const res = await getID(schoolEmail);
            const data = res.data

            const id = data?.progressForms?.[0]?._id;

            let response;

            if (!data?.progressForms?.length)
            {
                response = await progressSubmit({
                studentName,
                supervisorName,
                company,
                jobTitle,
                stars,
                stairs,
                employable,
                schoolEmail: schoolEmail
                });
            }   else {
                response = await updateProgress(id, {
                studentName,
                supervisorName,
                company,
                jobTitle,
                stars,
                stairs,
                employable,
                schoolEmail: schoolEmail
                });
            }

            if (response?.status === 201 || response?.status === 200) {

                if (response?.status === 201) {
                console.log('Progress form submitted successfully:', response.data);
                navigate('/supervisor/thank-you-page');
                }

                if (response?.status === 200) {
                console.log('Progress form updated successfully:', response.data);
                navigate('/supervisor/thank-you-page');
                }

            }
        } catch (error) {
            const msg = error.response?.data?.message || error.message || 'Something went wrong';
            console.error(msg);
            setPageError(msg);
        }
    };

    return (
        <AuthLayout
            title='STUDENT PROGRESS FORM'
            rightPanel={
                <form id='progress-container' onSubmit={handleSubmit}>
                    <div id='progress-field-1'>
                        <div className='progress-input-field-1'>
                            <label>Student Name</label>
                            <input
                                type='text'
                                value={studentName}
                                onChange={(e) => setStudentName(e.target.value)}
                                required
                                placeholder='Student Name (e.g. John Doe)'
                            />
                        </div>

                        <div className='progress-input-field-2'>
                            <label>Supervisor Name</label>
                            <input
                                type='text'
                                value={supervisorName}
                                onChange={(e) => setSupervisorName(e.target.value)}
                                required
                                placeholder='Supervisor Name (e.g. Jane Doe)'
                            />
                        </div>
                    </div>

                    <div id='progress-field-2'>
                        <div className='progress-input-field-1'>
                            <label>Employer/Company Name</label>
                            <input
                                type='text'
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                                required
                                placeholder='Employer/Company Name'
                            />
                        </div>

                        <div className='progress-input-field-2'>
                            <label>Student Job Title</label>
                            <input
                                type='text'
                                value={jobTitle}
                                onChange={(e) => setJobTitle(e.target.value)}
                                required
                                placeholder='Job Title (e.g. Software Engineer Intern)'
                            />
                        </div>
                    </div>

                    <div id='progress-field-3'>
                        <div className='progress-input-field-1'>
                            <label>What are 2-3 strengths that the student has displayed during their co-op term?</label>
                            <input
                                type='text'
                                value={stars}
                                onChange={(e) => setStars(e.target.value)}
                                placeholder='Your response...'
                                required
                            />
                        </div>
                    </div>

                    <div id='progress-field-4'>
                        <div className='progress-input-field-1'>
                            <label>What is an area that the student needs to improve on during/after their co-op term?</label>
                            <input
                                type='text'
                                value={stairs}
                                onChange={(e) => setStairs(e.target.value)}
                                placeholder='Your response...'
                                required
                            />
                        </div>
                    </div>

                    <div id='progress-field-5'>
                        <div className='progress-input-field-1'>
                            <label>Is this student employable after their co-op term? Please briefly explain.</label>
                            <input
                                type='text'
                                value={employable}
                                onChange={(e) => setEmployable(e.target.value)}
                                placeholder='Your response...'
                                required
                            />
                        </div>
                    </div>

                    <div id='progress-field-7'>
                        <div className='progress-input-field-1'>
                            <label>Student Email</label>
                            <input
                                type='text'
                                value={schoolEmail}
                                onChange={(e) => {setSchoolEmail(e.target.value)}}
                                placeholder='Your response...'
                                required
                            />
                        </div>
                    </div>

                    <div id='progress-field-6'>
                        {pageError && (
                            <div className='register-error'>
                                <p className='progress-error'>{pageError}</p>
                            </div>
                        )}
                        <button type='submit' className='blue-button'>Submit</button>
                    </div>
                </form>
            }
        />
    );
}

export default StudentProgress;