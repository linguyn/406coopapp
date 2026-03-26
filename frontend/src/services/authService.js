import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL; 

export const loginUser = async (loginData) => {
    const res = await axios.post(`${API_URL}/auth/login`, loginData, { withCredentials: true }); 
    return res;     
}; 


export const signIn = async (loginData) =>  {
    const res = await axios.post(`${API_URL}/auth/register`, loginData); 
    return res; 
};
