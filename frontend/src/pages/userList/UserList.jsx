import './UserList.css'
import HomeIcon from '../../assets/whiteHome.svg'
import SearchIcon from '../../assets/searchIcon.svg'
import LeftArrowIcon from '../../assets/leftArrow.svg'
import RightArrowIcon from '../../assets/rightArrow.svg'
import DataTable from '../../components/DataTable.jsx'


function UserList(props){
    return(
        
        <div className='main-page'>

            <div className='main-box'>

                <div className='header'>
                <h1 className='main-title'>{props.title}</h1>

                    <div className='homepage'>
                    <img src={HomeIcon} className='home-icon'></img>
                    <h3>Homepage</h3>
                    </div>

                </div>

                <div className='list-select'> 
                    <h2 className='current-list'> Applicants </h2>
                    <h2> Co-op Students </h2>
                    <h2> Supervisors </h2>
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

            <DataTable applicantData={props.applicantData}></DataTable>

                <div className='bottom-header'>
                    <h2>5 of 5</h2>
                    <img src={LeftArrowIcon} ></img>
                    <img src={RightArrowIcon} ></img>
                    

                </div>
            </div>
        </div>
    );
}

export default UserList

