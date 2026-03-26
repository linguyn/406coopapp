import mongoose from 'mongoose';

const reflectionSchema = mongoose.Schema;
const reflection = new reflectionSchema({
    id: {type: Int, required: true, unique: true},
    company: { type: String, required: true},
    supervisor: { type: String, required: true },
    jobTitle: { type: String, required: true },
    termDuration: { type: String, required: true },
    skills: { type: String, required: true },
    challenges: { type: String, required: true },
    supported: { type: String, required: true }
}, { timestamps: true });

const Reflection = mongoose.model('Reflection', reflection);
export default Reflection;