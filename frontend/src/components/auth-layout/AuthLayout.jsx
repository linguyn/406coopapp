import './AuthLayout.css'

function AuthLayout( {title, description, rightPanel} ) {

    return (
        <div className='auth-layout'>
            <div className='auth-box'>
                <div className='auth-left'>
                    <h1>{title}</h1>
                    <p>{description}</p>
                </div>
                <div className='auth-right'>{rightPanel}</div>
            </div> 
        </div>
    );
};


export default AuthLayout; 