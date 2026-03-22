import axios from 'axios';


export const loginUser = async (loginData) => {
    const res = await axios.post('http://localhost:5000/api/auth/login', loginData); 
    return res.data;     
}; 

