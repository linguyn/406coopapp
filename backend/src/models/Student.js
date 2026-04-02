import mongoose from 'mongoose';

const studentSchema = mongoose.Schema;
const student = new studentSchema({
    firstName:{type: String, required: true},
    lastName:{type: String, required: true},
    studentId: { type: String, required: true, unique: true, trim: true},
    email: { type: String, required: true, unique: true, lowercase: true, },
    password: { type: String, required: true },
    role: { type: String, required: true},
    isApplicant: { type: Boolean, required: false, default: true},
    location : { type: String, required: false, default: null},
    status : { type: String, required: false, default: null},
    academics : {
        program: {type: String, required: false, default: null},
        year:{type: String, required: false, default: null},
        department:{type: String, required: false, default: null},
        gpa:{type: String, required: false, default: null}
    },
    documents : {
        resume : { type: String, required: false, default: null},
        coverLetter:{ type: String, required: false, default: null},
        transcript:{ type: String, required: false, default:null},
        reflection:{ type: String, required: false, default:null}
    },
    termActivity: {
        applications:{ type: Number, required: false, default: 0},
        interviewed:{ type: Number, required: false, default: 0},
        applied:{ type: Number, required: false, default: 0},
        interviews:{ type: Number, required: false, default: 0},
        shortlisted:{ type: Number, required: false, default: 0},
        workTerms:{ type: Number, required: false, default: 0},
        startTerm:{ type: String, required: false, default: null}
    },
    support : {
        facultyAdvisor: {type: String, required: false, default: null},
        coordinators:{ type: Array, required: false, default: null}
    }
}, { timestamps: true });

const Student = mongoose.model('Student', student);

export default Student;

/**
 * @swagger
 * components:
 *   schemas:
 *     StudentRes:
 *       required: [academics, documents, termActivity, support, isApplicant, studentId, location, status]
 *       allOf:
 *         - $ref: '#/components/schemas/UserRes'
 *         - type: object
 *           properties:
 *             academics:
 *               $ref: '#/components/schemas/Academics'
 *             documents:
 *               $ref: '#/components/schemas/Documents' 
 *             termActivity:
 *               $ref: '#/components/schemas/TermActivity'
 *             support:
 *               $ref: '#/components/schemas/Support'
 *             isApplicant: { type: boolean, example: true }
 *             studentId: { type: string, example: 123456789 }
 *             location: { type: string, example: Xi'an }
 *             status: { type: string, example: applied }
 *         - $ref: '#/components/schemas/StudentStats'
 *     StudentRegisterReq:
 *       required: [studentId]
 *       allOf:
 *       - $ref: '#/components/schemas/UserBase'
 *       - $ref: '#/components/schemas/UserRegister'
 *       - type: object
 *         properties:
 *           studentId: { type: string, example: 123456789 }
 *     StudentLoginRes:
 *       type: object
 *       required: [accessToken, user]
 *       properties:
 *         accessToken: { type: string, example: "aDASDadDS2e23423ADASD" }
 *         user:
 *           type: object
 *           required: [termActivity, support, studentId, isApplicant, status]
 *           allOf:
 *             - $ref: '#/components/schemas/UserRes'
 *             - type: object
 *               properties:
 *                 termActivity:
 *                   $ref: '#/components/schemas/TermActivity'
 *                 support:
 *                   $ref: '#/components/schemas/Support'
 *                 isApplicant: { type: boolean, example: false }
 *                 studentId: { type: string, example: 123456789 }
 *                 status: { type: string, example: searching }
 *             - $ref: '#/components/schemas/StudentStats'
 *     StudentRegisterRes:
 *       type: object
 *       required: [message]
 *       properties:
 *         message: { type: string, example: Student successfully registered }
 *     StudentListItemRes:
 *       type: object
 *       required: [studentId, academics, termActivity, documents]
 *       properties:
 *         studentId: { type: string, example: "123456789" }
 *         academics:
 *           type: object
 *           required: [program]
 *           properties:
 *             program: { type: string, example: Computer Science }
 *         documents:
 *           type: object
 *           required: [reflection, report]
 *           properties:
 *             reflection: { type: string, example: N/A }
 *             report: { type: string, example: N/A }
 *         termActivity:
 *           type: object
 *           required: [applications, interviewed]
 *           properties:
 *             applications: { type: number, example: 67 }
 *             interviewed: { type: number, example: 67 }
 *     StudentListRes:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/StudentListItemRes'
 *     ApplicantListItemRes:
 *       type: object
 *       required: [studentId, academics, documents]
 *       properties:
 *         studentId: { type: string, example: "123456789" }
 *         academics:
 *           type: object
 *           required: [program, year, gpa]
 *           properties:
 *             program: { type: string, example: Computer Science }
 *             year: { type: number, example: 4 }
 *             gpa: { type: string, example: 2.33 }
 *         documents:
 *           type: object
 *           required: [resume, coverLetter, transcript]
 *           properties:
 *             resume: { type: string, example: N/A }
 *             coverLetter: { type: string, example: N/A }
 *             transcript: { type: string, example: N/A }
 *     ApplicantListRes:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/ApplicantListItemRes'
 *     TermActivity:
 *       type: object
 *       required: [applications, interviews, applied, interviewed, shortlisted, workTerms, startTerm]
 *       properties:
 *         applications: { type: number, example: 1241 }
 *         interviews: { type: number, example: 1 }
 *         applied: { type: number, example: 1000 }
 *         interviewed: { type: number, example: 0 }
 *         shortlisted: { type: number, example: 2200 }
 *         workTerms: { type: number, example: 2 }
 *         startTerm: { type: string, example: Summer 2025 }
 *     Documents:
 *       type: object
 *       required: [resume, coverLetter, transcript, reflection]
 *       properties:
 *         resume: { type: string, example: DNE }
 *         coverLetter: { type: string, example: DNE }
 *         transcript: { type: string, example: DNE }
 *         reflection: { type: string, example: DNE }
 *     Academics:
 *       type: object
 *       required: [program, year, gpa, department]
 *       properties:
 *         program: { type: string, example: Computer Science }
 *         year: { type: number, example: 2 }
 *         gpa: { type: string, example: 3.23 }
 *         department: { type: string, example: Faculty of Science }
 *     StudentStats:
 *       type: object
 *       required: [newPostings, openPostings]
 *       properties:
 *         newPostings: { type: number, example: 677 }
 *         openPostings: { type: number, example: 677 }
 *   examples:
 *     StudentResEx:
 *       value: { role: student, email: jinwoo@thegreatest.com, firstName: Jin-Woo, lastName: Sung, fullName: Jin-Woo Sung, studentId: "123456789", id : "238945789237457817", dateCreated : "DNE", isApplicant : false, location: Texas, status: searching, academics: { program: Computer Science, year: 2, gpa: 4.22, department: Faculty of Science }, documents: { resume: "DNE", coverLetter: "DNE", transcript: "DNE", report: "DNE", reflection: "DNE"}, termActivity: {applications: 1234, interviews: 67, applied: 67, interviewed: 67, shortlisted: 76, workTerms: 2, startTerm: Summer 2025}, support: { facultyAdvisor: Mickey Mouse, coordinators: [Michael, Louise, Jin-Woo] }, newPostings: 677, openPostings: 667 }
 *     StudentRegisterReqEx:
 *       value: { role: student, email: jinwoo@thegreatest.com, password: password123, passwordAgain: password123, firstName: Jin-Woo, lastName: Sung, studentId: "123456789" }
 *     StudentRegisterResEx:
 *       value: { message: Student successfully registered }
 *     StudentLoginResEx:
 *       value: { accessToken: AKDJSNAKSJFBkjbskdjBFK, user: { role: student, email: jinwoo@thegreatest.com, firstName: Jin-Woo, lastName: Sung, fullName: Jin-Woo Sung, studentId: "123456789", id : "238945789237457817", dateCreated : "DNE", isApplicant : false, status: searching, termActivity: {applications: 1234, interviews: 67, applied: 67, interviewed: 67, shortlisted: 76, workTerms: 2, startTerm: Summer 2025}, support: { facultyAdvisor: Mickey Mouse, coordinators: [Michael, Louise, Jin-Woo] }, newPostings: 677, openPostings: 667 } }
 *     StudentListItemResEx:
 *       value: { studentId: "123456789", academics: { program: "Computer Science"}, documents: { reflection: "N/A", report: "N/A" }, termActivity: { applications: 67, interviewed: 67 } }
 *     StudentListResEx:
 *       value: [ { studentId: "123456789", academics: { program: "Computer Science"}, documents: { reflection: "N/A", report: "N/A" }, termActivity: { applications: 67, interviewed: 67 } }, { studentId: "123456789", academics: { program: "Computer Science"}, documents: { reflection: "N/A", report: "N/A" }, termActivity: { applications: 67, interviewed: 67 } }, { studentId: "123456789", academics: { program: "Computer Science"}, documents: { reflection: "N/A", report: "N/A" }, termActivity: { applications: 67, interviewed: 67 } } ]
 *     ApplicantListItemResEx:
 *       value: { studentId: "123456789", academics: { program: Architectural Science, year: 2, gpa: 4.5 }, documents: { resume: N/A, coverLetter: N/A, transcript: N/A} }
 *     ApplicantListResEx:
 *       value: [ { studentId: "123456789", academics: { program: Architectural Science, year: 2, gpa: 4.5 }, documents: { resume: N/A, coverLetter: N/A, transcript: N/A} }, { studentId: "123456789", academics: { program: Architectural Science, year: 2, gpa: 4.5 }, documents: { resume: N/A, coverLetter: N/A, transcript: N/A} }, { studentId: "123456789", academics: { program: Architectural Science, year: 2, gpa: 4.5 }, documents: { resume: N/A, coverLetter: N/A, transcript: N/A} } ]
 */