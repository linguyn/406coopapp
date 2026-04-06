import './UserList.css'
import React, {useState, useEffect} from 'react'
import HomeIcon from '../../assets/whiteHome.svg'
import SearchIcon from '../../assets/searchIcon.svg'
import LeftArrowIcon from '../../assets/leftArrow.svg'
import RightArrowIcon from '../../assets/rightArrow.svg'
import DataTable from '../../components/DataTable.jsx'
import { useNavigate } from 'react-router-dom'


function UserList(props){

    const [listType, setListName] = useState(props.listType)
    const [userData, setUserData] = useState(props.starterData)
    const [currentPage, setCurrentPage] = useState(1)
    const [usersPerPage, setUsersPerPage] = useState(5)
    const navigate = useNavigate()


    const [searchTerm, setSearchTerm] = useState("")

    //pages logic
    const endIndex = currentPage * usersPerPage;
    const beginningIndex = endIndex - usersPerPage;
    const currentUserData = userData.slice(beginningIndex, endIndex);
    const totalPages = Math.ceil(userData.length / usersPerPage);

    const nextPage = () => {
        if(currentPage < totalPages){
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if(currentPage > 1){
            setCurrentPage(currentPage - 1);
        }
    }
    //title change 
    const [titleName, setName] = useState(`${props.listType.toUpperCase()} LIST`);

    function toggleSelected(arg){
        const element = document.getElementById(arg)
        element.classList.toggle("current-list")
    }

    function removeSelected(arg1, arg2){
        const element1 = document.getElementById(arg1);
        const element2 = document.getElementById(arg2);

        element1.classList.remove("current-list")
        element2.classList.remove("current-list")
    }

    const updateTitleName = (arg) => {

        if (arg == "coop-student"){
            setCurrentPage(1);
            setName("CO-OP STUDENT LIST");
            setListName(arg)
            toggleSelected(arg);
            removeSelected("applicant", "supervisor");
            setUserData(props.studentData);
        }
        else if (arg == "applicant"){
            setCurrentPage(1);
            setName("APPLICANT LIST")
            setListName(arg)
            toggleSelected(arg);
            removeSelected("coop-student", "supervisor");
            setUserData(props.applicantData);
        }
        else if (arg == "supervisor"){
            setCurrentPage(1);
            setName("SUPERVISOR LIST")
            setListName(arg)
            toggleSelected(arg);
            removeSelected("applicant", "coop-student");
            setUserData(props.supervisorData);
        }
    }

    const handleChangeNumberOfEntries = (e) => {
        setUsersPerPage(e.target.value);
    }

    

    //search 
    const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    };

    const handleSearchClick = () => {
    if (listType === "applicant") {
        props.fetchApplicants(searchTerm);
    } else if (listType === "coop-student") {
        props.fetchStudents(searchTerm);
    } else if (listType === "supervisor") {
        props.fetchSupervisors(searchTerm);
    }
    };    

    useEffect(() => {

    if (listType === 'applicant') {
        setUserData(props.applicantData);
    } else if (listType === 'coop-student') {
        setUserData(props.studentData);
    } else if (listType === 'supervisor') {
        setUserData(props.supervisorData);
    }
    
    setCurrentPage(1); 
}, [props.applicantData, props.studentData, props.supervisorData, listType]);

    return(
        
        <div className='main-page'>

            <div className='main-box'>

                <div className='header'>
                <h1 className='main-title'>{titleName}</h1>

                    <div className='homepage' onClick={() => navigate('/coordinator')}>
                    <img src={HomeIcon} className='home-icon'></img>
                    <h3>Homepage</h3>
                    </div>

                </div>

                <div className='list-select'> 
                    <h2 className={String(props.listType) === 'applicant' ? 'current-list' : ''} id='applicant' onClick={() => updateTitleName("applicant")}> Applicants </h2>
                    <h2 className={String(props.listType) === 'coop-student' ? 'current-list' : ''} id='coop-student' onClick={() => updateTitleName("coop-student")}> Co-op Students </h2>
                    <h2 className={String(props.listType) === 'supervisor' ? 'current-list' : ''} id='supervisor' onClick={() => updateTitleName("supervisor")}> Supervisors </h2>
                </div>
            
                <hr></hr>

                <div className='entry-search-header'>
                
                    <div className='entries'>

                        <select className='select-number-entries' defaultValue={5} onChange={handleChangeNumberOfEntries}>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                            <option value='5'>5</option>
                        </select>

                        <h2 className='entry-text'>Entries per page</h2>

                    </div>

                    <div className='search-section'> 

                        <h2 className='entry-text'>Search:</h2>
                        
                        <div className='search-bar'>
                        <input type="search" value={searchTerm}
                            onChange={handleInputChange} 
                            placeholder="Search..."
                            onKeyDown={(e) => e.key === 'Enter' && handleSearchClick()}
                            ></input>
                        <img src={SearchIcon} className='search-icon' onClick={handleSearchClick} style={{ cursor: 'pointer' }}></img>
                        </div>

                    </div>

                </div>

            <DataTable userData={currentUserData} listType={listType} fetchApplicants={props.fetchApplicants} fetchStudents={props.fetchStudents} fetchSupervisors={props.fetchSupervisors}></DataTable>

                <div className='bottom-header'>
                    <h2>{currentPage} of {totalPages}</h2>
                    <button className='page-button'>
                        <img src={LeftArrowIcon} onClick={prevPage} disabled={currentPage === 1}></img>
                    </button>
                    <button className='page-button'>
                        <img src={RightArrowIcon} onClick={nextPage} disabled={currentPage === totalPages}></img>
                    </button>
                    
                    

                </div>
            </div>
        </div>
    );
}

export default UserList

