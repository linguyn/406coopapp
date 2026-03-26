import mongoose from 'mongoose';

const applicationSchema = mongoose.Schema;
const application = new applicationSchema({
    firstName: { type: String, required: true},
    lastName: { type: String, required: true },
    studentId: { type: String, required: true },
    schoolEmail: { type: String, required: true },
    eligibility: { type: Boolean, required: true },
    reasonToApply: { type: String, required: true },
    portfolioLink: { type: String, required: false },
}, { timestamps: true });

const Application = mongoose.model('Application', application);
export default Application;