import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/authContext';


const ProtectedRoute =  () => {
    const { userData } = useAuth(); 

    if (!userData) { 
        return <Navigate to='/login' replace/>
    }

    return <Outlet/>;
};

export default ProtectedRoute; 