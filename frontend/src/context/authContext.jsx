/* Auth Context - a place to store user's data */
import { createContext, useState, useContext } from "react";
import { setAccessToken, getAccessToken } from "../services/api";


const AuthContext = createContext(); 

export const AuthProvider = ({children}) => { 
    const [userData, setUserData] = useState(null); 

    const getCurrentTerm = () => {
        const now = new Date(); 
        const year = now.getFullYear(); 
        const month = now.getMonth() + 1; 

        if (month === 12 || month <= 4) return `${year} - Winter`;
        if (month <= 6 && month >= 5) return `${year} - Spring`;
        if (month <= 8 && month >= 7) return `${year} - Summer`;
        return `${year} - Fall`;
    };


    const currentTerm = getCurrentTerm(); 

    return (
        <AuthContext.Provider value={{userData, setUserData, currentTerm}}>
            {children}
        </AuthContext.Provider>
    );
}; 


export const useAuth = () => useContext(AuthContext); 






