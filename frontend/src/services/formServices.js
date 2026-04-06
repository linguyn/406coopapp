import axios from 'axios';
import api from "./api";

const API_URL = import.meta.env.VITE_API_URL; 


export const applicationSubmit = async (applicationData) => { 
    const res = await api.post(`/applications/submit`, applicationData, { withCredentials: true });
    return res;
}


export const reflectionSubmit = async (reflectionData) => {
    const res = await api.post(`/reflections/submit`, reflectionData, { withCredentials: true });
    return res;
}

export const progressSubmit = async (progressData) => {
    const res = await api.post(`/progress-forms/submit`, progressData, { withCredentials: true });
    return res;
}


export const getStudent = async (studentEmail) => {
    const res = await api.get(`/user/student/${studentEmail}`, { withCredentials: true });
    return res;
}


export const updateProgress = async (id, progressData) => {
    const res = await api.patch(`progress-forms/update/${id}`, progressData, {withCredentials: true});
    return res;
}