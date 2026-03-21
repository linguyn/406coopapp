import './UserList.css'

function UserList(){
    return(
        <div className='main-page'>


            <div className='main-box'>

                <div className='header'>
                <h1 className='main-title'>APPLICANT LIST</h1>
                <h3 className='homepage'>Homepage</h3>
                </div>

                <div className='list-select'> 
                    <h2 className='current-list'> Applicants </h2>
                    <h2> Co-op Students </h2>
                    <h2> Supervisors </h2>
                </div>
            
            <hr></hr>

            </div>


        </div>
    );
}


export default UserList

