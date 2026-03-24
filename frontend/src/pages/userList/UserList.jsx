import './UserList.css'
import React, {useState} from 'react'
import HomeIcon from '../../assets/whiteHome.svg'
import SearchIcon from '../../assets/searchIcon.svg'
import LeftArrowIcon from '../../assets/leftArrow.svg'
import RightArrowIcon from '../../assets/rightArrow.svg'
import DataTable from '../../components/DataTable.jsx'


function UserList(props){

    const [titleName, setName] = useState("APPLICANT LIST");
    const [listType, setListName] = useState("applicant")
    const [userData, setUserData] = useState(props.applicantData)
    const [totalNumberOfUsers, setTotalNumberOfUsers] = useState(props.applicantData.length)
    const [currentNumberOfUsers, setcurrentNumberOfUsers] = useState(props.applicantData.length)
    console.log(totalNumberOfUsers)

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

    function changeCurrentNumberOfUsers(arg){
        console.log(arg);
        if (arg > 5){
            setcurrentNumberOfUsers(5)
        } else{
            setcurrentNumberOfUsers(arg)
        }
    }

    const updateTitleName = (arg) => {

        if (arg == "coop-student"){
            setName("CO-OP STUDENT LIST");
            setListName(arg)
            toggleSelected(arg);
            removeSelected("applicant", "supervisor");
            setUserData(props.studentData);
            setTotalNumberOfUsers(props.studentData.length);
            changeCurrentNumberOfUsers(props.studentData.length);
        }
        else if (arg == "applicant"){
            setName("APPLICANT LIST")
            setListName(arg)
            toggleSelected(arg);
            removeSelected("coop-student", "supervisor");
            setUserData(props.applicantData);
            setTotalNumberOfUsers(props.applicantData.length);
            changeCurrentNumberOfUsers(props.applicantData.length);
        }
        else if (arg == "supervisor"){
            setName("SUPERVISOR LIST")
            setListName(arg)
            toggleSelected(arg);
            removeSelected("applicant", "coop-student");
            setUserData(props.supervisorData);
            setTotalNumberOfUsers(props.supervisorData.length);
            changeCurrentNumberOfUsers(supervisorData.length);
        }
    }
    const handleClick = () => console.log(titleName);
``
    return(
        
        <div className='main-page'>

            <div className='main-box'>

                <div className='header'>
                <h1 className='main-title'>{titleName}</h1>

                    <div className='homepage'>
                    <img src={HomeIcon} className='home-icon'></img>
                    <h3>Homepage</h3>
                    </div>

                </div>

                <div className='list-select'> 
                    <h2 className='current-list' id='applicant' onClick={() => updateTitleName("applicant")}> Applicants </h2>
                    <h2 id='coop-student' onClick={() => updateTitleName("coop-student")}> Co-op Students </h2>
                    <h2 id='supervisor' onClick={() => updateTitleName("supervisor")}> Supervisors </h2>
                </div>
            
                <hr></hr>

                <div className='entry-search-header'>
                
                    <div className='entries'>

                        <select className='select-number-entries' defaultValue={5}>
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
                        <input type="search"></input>
                        <img src={SearchIcon} className='search-icon'></img>
                        </div>

                    </div>

                </div>

            <DataTable userData={userData} listType={listType}></DataTable>

                <div className='bottom-header'>
                    <h2>{currentNumberOfUsers} of {totalNumberOfUsers}</h2>
                    <img src={LeftArrowIcon} ></img>
                    <img src={RightArrowIcon} ></img>
                    

                </div>
            </div>
        </div>
    );
}

export default UserList

