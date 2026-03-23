import mongoose from 'mongoose';

const studentSchema = mongoose.Schema;
const student = new studentSchema({
    studentId: { type: String, required: true, unique: true, trim: true},
    email: { type: String, required: true },
    password: { type: String, required: true },
}, { timestamps: true });

const Student = mongoose.model('Student', student);

export default Student;cd 