
export const isSamePassword = (p1,p2) => {
    return p1 === p2 ? true : false ; 
}; 

export const isValidEmail = (email) => {
    return email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};


export const isValidPassword = (p) => {
    return p && p.trim().length >= 8 && p.trim().length <= 32;
};


export const isValidStudentId = (id) => {
    const isNumber = (string) => /^\d+$/.test(string);
    return studentId.trim().length === 9 && isNumber(studentId);
};