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
    },
    assignedSupervisor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Supervisor",
    }
}, { timestamps: true });

const ProgressForm = mongoose.model('ProgressForm', progressForm);
export default ProgressForm;

/**
 * @swagger
 * components:
 *   schemas:
 *     ProgressFormBase:
 *       type: object
 *       required: [studentName, supervisorName, company, jobTitle, stars, stairs, employable]
 *       properties:
 *         studentName: { type: string, example: Pai Pai }
 *         supervisorName: { type: string, example: Pai Pai }
 *         company: { type: string, example: Google }
 *         jobTitle: { type: string, example: Lead Software Engineer }
 *         stars: { type: string, example: "awesome person" }
 *         stairs: { type: string, example: "Sucks badly" }
 *         employable: { type: string, example: "Of course" }
 *     ProgressFormSubmitReq:
 *       required: [schoolEmail]
 *       allOf:
 *         - $ref: '#/components/schemas/ProgressFormBase'
 *         - type: object
 *           properties:
 *             schoolEmail: { type: string, example: "jan@gmail.com"}
 *     ProgressFormSubmitRes:
 *       type: object
 *       required: [message, progressFormId]
 *       properties:
 *         message: { type: string, example: "Progress form submitted successfully"}
 *         progressFormId: { type: string, example: 2435ADSIJDIWURY83768 }
 *     ProgressFormUpdateReq:
 *       $ref: '#/components/schemas/ProgressFormSubmitReq'
 *     ProgressFormUpdateRes:
 *       required: [assignedStudent]
 *       allOf:
 *         - $ref: '#/components/schemas/ProgressFormBase'
 *         - type: object
 *           properties:
 *             assignedStudent: { type: string, example: "65f1a2b3c4d5e6f7g8h9i0j1" }
 */