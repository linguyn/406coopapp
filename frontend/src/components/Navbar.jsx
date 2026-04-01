import { useState } from 'react';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function Navbar({ f1, f2, f3, f4 }) {
    const [isHovered, setIsHovered] = useState(false);
    const [isPinned, setIsPinned] = useState(false);
    const navigate = useNavigate();

    const isSidebarVisible = isHovered || isPinned;
    const isNavbarVisible = !isSidebarVisible;

    const handleClick = (e) => {
        const option = e.currentTarget.name;
        console.log(`Clicked on ${option}`);

        if (option === 'burger' || option === 'burger-sidebar') {
            setIsPinned(prev => !prev);
            return;
        }

        if (option === 'homepage' || option === 'homepage-sidebar') {
            navigate('/student');
            return;
        }

        if (option === 'apply' || option === 'apply-sidebar') {
            navigate('/student/apply');
            return;
        }

        if (option === 'jobs' || option === 'jobs-sidebar') {
            navigate('/student/jobs');
            return;
        }

        if (option === 'reflection' || option === 'reflection-sidebar') {
            navigate('/student/reflection');
            return;
        }

        if (option === 'logout-sidebar') {
            console.log('logout');
            return;
        }
    };

    return (
        <div className='navbar-container'>   

        {isNavbarVisible && (
            <div className='navbar-layout'>
                <button name='burger' 
                    onClick={handleClick}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}>
                    <FontAwesomeIcon icon={faBars}/>
                </button>

                <button name='homepage' onClick={handleClick}>{f1}</button>
                <button name='apply' onClick={handleClick}>{f2}</button>
                <button name='jobs' onClick={handleClick}>{f3}</button>
                <button name='reflection' onClick={handleClick}>{f4}</button>
            </div> )}

            {isSidebarVisible && (
                <div className='sidebar'>
                    <button name='burger-sidebar' onClick={handleClick}>
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                    <button name='homepage-sidebar' onClick={handleClick}>{f1}</button>
                    <button name='apply-sidebar' onClick={handleClick}>{f2}</button>
                    <button name='jobs-sidebar' onClick={handleClick}>{f3}</button>
                    <button name='reflection-sidebar' onClick={handleClick}>{f4}</button>
                    <button name='logout-sidebar' onClick={handleClick}>Logout</button>
                </div>
            )}
        </div>
    );
}

export default Navbar;