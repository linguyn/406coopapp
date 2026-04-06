import mongoose from 'mongoose';

const reflectionSchema = mongoose.Schema;
const reflection = new reflectionSchema({
    company: { type: String, required: true},
    supervisor: { type: String, required: true },
    jobTitle: { type: String, required: true },
    termDuration: { type: String, required: true },
    skills: { type: String, required: true },
    challenges: { type: String, required: true },
    supported: { type: String, required: true },
    assignedStudent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
    }
}, { timestamps: true });

const Reflection = mongoose.model('Reflection', reflection);
export default Reflection;

/**
 * @swagger
 * components:
 *   schemas:
 *     ReflectionBase:
 *       type: object
 *       required: [company, supervisor, jobTitle, termDuration, skills, challenges, supported]
 *       properties:
 *         company: { type: string, example: Google }
 *         supervisor: { type: string, example: Paula Garland }
 *         jobTitle: { type: string, example: Lead Software Engineer }
 *         termDuration: { type: string, example: "4 months" }
 *         skills: { type: string, example: "Break dancing" }
 *         challenges: { type: string, example: "I had a hard time coping when my granny got hit by a bazooka" }
 *         supported: { type: string, example: "4", enum: ["1", "2", "3", "4", "5"] }
 *     ReflectionSubmitReq:
 *       required: [schoolEmail]
 *       allOf:
 *         - $ref: '#/components/schemas/ReflectionBase'
 *         - type: object
 *           properties:
 *             schoolEmail: { type: string, example: "jan@gmail.com"}
 *     ReflectionSubmitRes:
 *       type: object
 *       required: [message, reflectionId]
 *       properties:
 *         message: { type: string, example: "Reflection submitted successfully"}
 *         reflectionId: { type: string, example: 2435ADSIJDIWURY83768 }
 *     ReflectionUpdateReq:
 *       $ref: '#/components/schemas/ReflectionSubmitReq'
 *     ReflectionUpdateRes:
 *       required: [assignedStudent]
 *       allOf:
 *         - $ref: '#/components/schemas/ReflectionBase'
 *         - type: object
 *           properties:
 *             assignedStudent: { type: string, example: "65f1a2b3c4d5e6f7g8h9i0j1" }
 */