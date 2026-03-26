import mongoose from 'mongoose';

const studentSchema = mongoose.Schema;
const student = new studentSchema({
    studentId: { type: String, required: true, unique: true, trim: true},
    email: { type: String, required: true },
    password: { type: String, required: true },
}, { timestamps: true });

const Student = mongoose.model('Student', student);

export default Student;

/**
 * @swagger
 * components:
 *   schemas:
 *     StudentRegister:
 *       required: [studentId]
 *       allOf:
 *       - $ref: '#/components/schemas/UserBase'
 *       - $ref: '#/components/schemas/UserProcessedBase'
 *       - $ref: '#/components/schemas/UserRegister'
 *       - type: object
 *         properties:
 *           studentId: { type: string, example: 123456789 }
 *     StudentSanitized:
 *       type: object
 *       required: [accessToken, user]
 *       properties:
 *         accessToken: { type: string, example: "aDASDadDS2e23423ADASD" }
 *         user:
 *           type: object
 *           required: [studentId, program, applications, report, reflection, date, year, gpa, coverLetter, resume, transcript]
 *           allOf:
 *             - $ref: '#/components/schemas/UserBase'
 *             - type: object
 *               properties:
 *                 studentId: { type: string, example: 123456789 }
 *                 program: { type: string, example: Computer Science }
 *                 status: { type: string, example: searching }
 *                 applications: { type: number, example: 3 }
 *                 report: { type: DNE, example: DNE }
 *                 reflection: { type: DNE, example: DNE }
 *                 date: { type: string, format: date, example: 2004-02-24 }
 *                 year: { type: number, example: 2 }
 *                 gpa: { type: string, example: 4.23 }
 *                 coverLetter: { type: DNE, example: DNE }
 *                 resume: { type: DNE, example: DNE }
 *                 transcript: { type: DNE, example: DNE }
 *   examples:
 *     StudentRegister:
 *       value: { role: student, email: jinwoo@thegreatest.com, password: password123, passwordAgain: password123, firstName: Jin-Woo, lastName: Sung, studentId: "123456789" }
 *     StudentSanitized:
 *       value: { role: student, email: jinwoo@thegreatest.com, firstName: Jin-Woo, lastName: Sung, studentId: "123456789", id: "238945789237457817", program: Computer Science, status: searching, applications: 3, report: DNE, reflection: DNE, date: 2004-02-24, year: 2, gpa: "4.23", coverLetter: DNE, resume: DNE, transcript: DNE }
 */