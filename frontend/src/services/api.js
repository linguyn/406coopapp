import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

let accessToken = null; 

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true, 
    headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
}); 


export const setAccessToken = (token) => { 
    accessToken = token; 
}; 


export const getAccessToken = () => {
    return accessToken; 
};


export const clearAccessToken = () => 
{
    accessToken = null; 
};


/* request interceptor */
api.interceptors.request.use(
    (config) => { 
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }   

        return config; 
    }, 
    (error) => Promise.reject(error)
);


/* refresh token logic */
let isRefreshing = false; 
let refreshSubcribers = []; 



/* requests that waiting for the new token */
const subcribeTokenRefresh = (callback) => { 
    refreshSubcribers.push(callback);
};

/* return the new token for each requests */
const onRefreshed = (newToken) => {
    refreshSubcribers.forEach((callback) => callback(newToken)); 
    refreshSubcribers = [];
}; 



const refreshAccessToken = async () => {
    const response = await axios.post(
        `${API_URL}/auth/refresh-token`,
        {}, 
        { withCredentials: true }
    ); 

    const newAccessToken = response.data.accessToken; 
    setAccessToken(newAccessToken); 
    return newAccessToken; 
};



/* response interceptor */
api.interceptors.response.use(
    (response) => response, 
    async(error) => {
        const originalRequest = error.config; 

        if (
            error.response?.status == 401 && !originalRequest._retry
            && !originalRequest.url.includes('auth/login') 
            && !originalRequest.url.includes('auth/refresh-token')
        ) {
            originalRequest._retry = true; 

            try {
                const newToken = await refreshAccessToken(); 
                originalRequest.headers.Authorization = `Bearer ${newToken}`; 
                return api(originalRequest); 
            } catch (refreshError) {
                clearAccessToken(); 
                return Promise.reject(refreshError); 
            }; 
        }; 

        return Promise.reject(error); 
    }
);


export default api; 