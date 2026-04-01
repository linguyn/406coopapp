import api, {setAccessToken, clearAccessToken} from "./api";

const API_URL = import.meta.env.VITE_API_URL; 

export const loginUser = async (loginData) => {
    const res = await api.post(`/auth/login`, loginData, { withCredentials: true }); 

    const accessToken = res.data.accessToken;
    setAccessToken(accessToken);    

    return res;     
}; 

export const signIn = async (registerData) =>  {
    const res = await api.post(`/auth/register`, registerData); 
    return res; 
};


