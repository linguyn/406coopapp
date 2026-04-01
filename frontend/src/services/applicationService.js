import axios from 'axios';
import api, {setAccessToken, clearAccessToken} from "./api";

const API_URL = import.meta.env.VITE_API_URL; 


export const applicationSubmit = async (applicationData) => { 
    const res = await api.post(`/applications/submit`, applicationData, { withCredentials: true });
    return res;
}