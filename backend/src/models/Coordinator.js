import mongoose from 'mongoose';

// Coop Coordinator Schema
const coorSchema = new mongoose.Schema ({
    firstName:{type: String, required: true, trim: true,},
    lastName:{type: String, required: true, trim: true,},
    email:{type: String, required: true, unique: true, lowercase: true, },
    password:{type: String, required: true,},
    isAdmin:{type: Boolean, default: true, },
    role:{type: String, required: true, lowercase: true,},
    dateCreated: { type: Date, default: Date.now },

    students: { type: [String], default: [] }

},
{ timestamps: true});

//Create model for the coordinator.
const Coordinator = mongoose.model('Coordinator', coorSchema);



export default Coordinator;

/**
 * @swagger
 * components:
 *   schemas:
 *     CoordinatorRes:
 *       allOf:
 *         - $ref: '#/components/schemas/UserRes'
 *         - $ref: '#/components/schemas/CoordinatorStats'
 *     CoordinatorRegisterReq:
 *       allOf:
 *       - $ref: '#/components/schemas/UserBase'
 *       - $ref: '#/components/schemas/UserRegister'
 *     CoordinatorLoginRes:
 *       type: object
 *       required: [accessToken, user]
 *       properties:
 *         accessToken: { type: string, example: "aDASDadDS2e23423ADASD" }
 *         user:
 *           type: object
 *           allOf:
 *             - $ref: '#/components/schemas/UserRes'
 *             - $ref: '#/components/schemas/CoordinatorStats'
 *     CoordinatorRegisterRes:
 *       type: object
 *       required: [message]
 *       properties:
 *         message: { type: string, example: Coordinator successfully registered }
 *     CoordinatorStats:
 *       type: object
 *       required: [totalStudents, totalActive, totalPendingApproval, totalSeeking, totalInterviewing, totalPlaced]
 *       properties:
 *         totalStudents: { type: number, example: 6767 }
 *         totalActive: { type: number, example: 676767 }
 *         totalPendingApproval: { type: number, example: 676767 }
 *         totalSeeking: { type: number, example: 676767 }
 *         totalInterviewing: { type: number, example: 676767 }
 *         totalPlaced: { type: number, example: 676767 }
 *     CoordinatorOnStudentUpdateReq:
 *       allOf:
 *         - $ref: '#/components/schemas/StudentSelfUpdateReq'
 *         - type: object
 *           properties:
 *             isApplicant: { type: Boolean, example: true }
 *             status: { type: string, example: applied }
 *             termActivity: 
 *               $ref: '#/components/schemas/TermActivity'
 *     CoordinatorOnSupervisorUpdateReq:
 *       allOf:
 *         - $ref: '#/components/schemas/SupervisorSelfUpdateReq'
 *         - type: object
 *           properties:
 *             status: { type: string, example: inactive }
 *     CoordinatorSelfUpdateReq:
 *       allOf:
 *         - $ref: '#/components/schemas/UserSelfUpdateReq'
 *   examples:
 *     CoordinatorRegisterReqEx:
 *       value: { role: coordinator, email: supevisor@examplee.com, password: password123, passwordAgain: password123, firstName: Jin-Woo, lastName: Sung }
 *     CoordinatorRegisterResEx:
 *       value: { message: Coordinator successfully registered }
 *     CoordinatorResEx:
 *       value: { role: student, email: jinwoo@thegreatest.com, firstName: Jin-Woo, lastName: Sung, fullName: Jin-Woo Sung, dateCreated : "DNE", id : "238945789237457817", totalStudents: 67676, totalActive: 67676, totalPendingApproval: 67676, totalSeeking: 67676, totalInterviewing: 67676, totalPlaced: 67 }
 *     CoordinatorLoginResEx:
 *       value: { accessToken: AKDJSNAKSJFBkjbskdjBFK, user: { role: student, email: jinwoo@thegreatest.com, firstName: Jin-Woo, lastName: Sung, fullName: Jin-Woo Sung, dateCreated : "DNE", id : "238945789237457817", totalStudents: 67676, totalActive: 67676, totalPendingApproval: 67676, totalSeeking: 67676, totalInterviewing: 67676, totalPlaced: 67 } }
 *     CoordinatorSelfUpdateReqEx:
 *       value: { firstName: "Jin-Woo", lastName: "Sung", email: "jinwoo@thegreatest.com", password: "password1234"}
 *     CoordinatorOnStudentUpdateReqEx:
 *       value: { isApplicant: false, status: applied, firstName: "Jin-Woo", lastName: "Sung", email: "jinwoo@thegreatest.com", password: "password1234", location: "Seoul", academics: { program: "Computer Science", year: 4, gpa: "3.98"}, termActivity: {applications: 1234, interviews: 67, applied: 67, interviewed: 67, shortlisted: 76, workTerms: 2, startTerm: Summer 2025} }
 *     CoordinatorOnSupervisorUpdateReqEx:
 *       value: { status: inactive, firstName: "Jin-Woo", lastName: "Sung", email: "jinwoo@thegreatest.com", password: "password1234", location: "Seoul", interns: [Gef, Bethany, pola], company: Google }
 */