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
    assignedStudent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
    }
}, { timestamps: true });

const Application = mongoose.model('Application', application);
export default Application;

/**
 * @swagger
 * components:
 *   schemas:
 *     ApplicationBase:
 *       type: object
 *       required: [firstName, lastName, studentId, schoolEmail, eligibility, reasonToApply]
 *       properties:
 *         firstName: { type: string, example: Bajan }
 *         lastName: { type: string, example: Canadian }
 *         studentId: { type: string, example: "123456789" }
 *         schoolEmail: { type: string, example: "jan@gmail.com"}
 *         eligibility: { type: Boolean, example: true, enum: [true, false] }
 *         reasonToApply: { type: string, example: "I want to be employed" }
 *         portfolioLink: { type: string, example: "https://example.com" }
 *     ApplicationSubmitReq:
 *       required: [schoolEmail]
 *       allOf:
 *         - $ref: '#/components/schemas/ApplicationBase'
 *         - type: object
 *           properties:
 *             schoolEmail: { type: string, example: "jan@gmail.com"}
 *     ApplicationSubmitRes:
 *       type: object
 *       required: [message, applicationId]
 *       properties:
 *         message: { type: string, example: "Application submitted successfully"}
 *         applicationId: { type: string, example: 2435ADSIJDIWURY83768 }
 *     ApplicationUpdateReq:
 *       $ref: '#/components/schemas/ApplicationSubmitReq'
 *     ApplicationUpdateRes:
 *       required: [assignedStudent]
 *       allOf:
 *         - $ref: '#/components/schemas/ApplicationBase'
 *         - type: object
 *           properties:
 *             assignedStudent: { type: string, example: "65f1a2b3c4d5e6f7g8h9i0j1" }
 */