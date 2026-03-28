/**
 * @swagger
 * components:
 *   schemas:
 *     SupervisorRes:
 *       required: [company, jobTitle, location, interns, status, support]
 *       allOf:
 *         - $ref: '#/components/schemas/UserRes'
 *         - type: object
 *           properties:
 *             company: { type: string, example: NBA }
 *             jobTitle: { type: string, example: Bench Warmer }
 *             location: { type: string, example: Utah }
 *             status: { type: string, example: active }
 *             interns:
 *               type: array
 *               items:
 *                 type: string
 *               example: [David, Michaela, Rachael]
 *             support:
 *               $ref: '#/components/schemas/Support'
 *     SupervisorRegisterReq:
 *       required: [company]
 *       allOf:
 *       - $ref: '#/components/schemas/UserBase'
 *       - $ref: '#/components/schemas/UserRegister'
 *       - type: object
 *         properties:
 *           company: { type: string, example: Palantir }
 *           jobTitle: { type: string, example: Ballistic Missiles Engineer }
 *           location: { type: string, example: New York }
 *     SupervisorLoginRes:
 *       type: object
 *       required: [accessToken, user]
 *       properties:
 *         accessToken: { type: string, example: "aDASDadDS2e23423ADASD" }
 *         user:
 *           type: object
 *           required: [status, support]
 *           allOf:
 *             - $ref: '#/components/schemas/UserRes'
 *             - type: object
 *               properties:
 *                 status: { type: string, example: active }
 *                 support:
 *                   $ref: '#/components/schemas/Support'
 *     SupervisorRegisterRes:
 *       type: object
 *       required: [message]
 *       properties:
 *         message: { type: string, example: Supervisor successfully registered }
 *   examples:
 *     SupervisorResEx:
 *       value: { role: student, email: jinwoo@thegreatest.com, firstName: Jin-Woo, lastName: Sung, fullName: Jin-Woo Sung, id : "238945789237457817", dateCreated : "DNE", company: NBA, jobTitle: The Goat, location: Toronto, status : "active", interns : [David, Michaela, Rachael] }
 *     SupervisorRegisterReqEx:
 *       value: { role: supervisor, email: jinwoo@thegreatest.com, password: password123, passwordAgain: password123, firstName: Jin-Woo, lastName: Sung, company: Palantir, jobTitle: poopy, location: Idaho }
 *     SupervisorRegisterResEx:
 *       value: { message: Supervisor successfully registered }
 *     SupervisorLoginResEx:
 *       value: { accessToken: AKDJSNAKSJFBkjbskdjBFK, user: { role: student, email: jinwoo@thegreatest.com, firstName: Jin-Woo, lastName: Sung, fullName: Jin-Woo Sung, id : "238945789237457817", dateCreated : "DNE", status : "active" } }
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
