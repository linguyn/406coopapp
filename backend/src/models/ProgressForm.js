import mongoose from 'mongoose';

const progressFormSchema = mongoose.Schema;
const progressForm = new progressFormSchema({
    studentName: { type: String, required: true},
    supervisorName: { type: String, required: true },
    company: { type: String, required: true },
    jobTitle: { type: String, required: true },
    stars: { type: String, required: true },
    stairs: { type: String, required: true },
    employable: { type: String, required: true },
    assignedStudent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
    }
}, { timestamps: true });

const ProgressForm = mongoose.model('ProgressForm', progressForm);
export default ProgressForm;