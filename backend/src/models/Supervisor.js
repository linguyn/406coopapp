/**
 * @swagger
 * components:
 *   schemas:
 *     SupervisorRegister:
 *       required: [company]
 *       allOf:
 *       - $ref: '#/components/schemas/UserBase'
 *       - $ref: '#/components/schemas/UserProcessedBase'
 *       - $ref: '#/components/schemas/UserRegister'
 *       - type: object
 *         properties:
 *           company: { type: string, example: Palantir }
 *           jobTitle: { type: string, example: Ballistic Missiles Engineer }
 *           location: { type: string, example: New York }
 *     SupervisorSanitized:
 *       type: object
 *       required: [interns, status]
 *       properties:
 *         accessToken: { type: string, example: "aDASDadDS2e23423ADASD" }
 *         user:
 *           type: object
 *           required: [interns, status]
 *           allOf:
 *             - $ref: '#/components/schemas/UserBase'
 *             - type: object
 *               properties:
 *                 interns: { type: DNE, example: DNE }
 *                 status: { type: string, example: active}
 *   examples:
 *     SupervisorRegister:
 *       value: { role: supervisor, email: jinwoo@thegreatest.com, password: password123, passwordAgain: password123, firstName: Jin-Woo, lastName: Sung, company: Palantir, jobTitle: poopy, location: Idaho }
 *     SupervisorSanitized:
 *       value: { role: supervisor, email: jinwoo@thegreatest.com, firstName: Jin-Woo, lastName: Sung, company: Palantir, jobTitle: ploopy, location: Idaho, status: active, interns : DNE, id : "238945789237457817" }
 */

import mongoose from 'mongoose';

const supervisorSchema = mongoose.Schema;
const supervisor = new supervisorSchema({
    firstName:{type: String, required: true},
    lastName:{type: String, required: true},
    email: { type: String, required: true, },
    password: { type: String, required: true },
    role: { type: String, required: true},
    company: {type: String, required: true},
}, { timestamps: true });

const Supervisor = mongoose.model('Supervisor', supervisor);

export default Supervisor;