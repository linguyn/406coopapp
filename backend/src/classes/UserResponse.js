export class UserResponse {
    #email;
    #firstName;
    #lastName;
    #fullName;
    #id;
    #role;
    #dateCreated;

    static createUserResponse(userData) {
        const role = userData.role;
        switch (role) {
            case "student":
                return new StudentResponse(userData);
            case "supervisor":
                return new SupervisorResponse(userData);
            case "coordinator":
                return new CoordinatorResponse(userData);
            default:
                return new UserResponse(userData);
        }
    }

    constructor(userData) {
        const { role, email, firstName, lastName, id, dateCreated } = userData;
        this.#email = email;
        this.#firstName = firstName;
        this.#lastName = lastName;
        this.#id = id;
        this.#fullName = (firstName && lastName) ? `${firstName} ${lastName}` : null; 
        this.#role = role;
        this.#dateCreated = dateCreated;
    }

    toJSON() {
        return {
            email: this.#email,
            firstName: this.#firstName,
            lastName: this.#lastName,
            fullName: this.#fullName,
            id: this.#id,
            role: this.#role,
            dateCreated : this.#dateCreated
        }
    }
}

class SupervisorResponse extends UserResponse {
    #company;
    #jobTitle;
    #location;

    constructor(userData) {
        super(userData);

        const {company, jobTitle, location} = userData;

        this.#company = company;
        this.#jobTitle = jobTitle;
        this.#location = location;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            company: this.#company,
            jobTitle: this.#jobTitle,
            location: this.#location,
        }
    }
}

class StudentResponse extends UserResponse {
    #academics;
    #documents;
    #termActivity;
    #support;

    #isApplicant;
    #studentId;
    #location;
    #status;

    constructor(userData) {
        super(userData);

        const { academics, documents, termActivity, studentId, location, status, date, isApplicant } = userData;

        this.#academics = academics;
        this.#documents = documents;
        this.#termActivity = termActivity;

        this.#isApplicant = isApplicant;
        this.#studentId = studentId;
        this.#location = location;
        this.#status = status;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            studentId : this.#studentId,
            location : this.#location,
            status : this.#status,
            isApplicant : this.#isApplicant,
            academics : this.#academics,
            documents : this.#documents,
            termActivity : this.#termActivity,
            support : this.#support
        }
    }
}

class CoordinatorResponse extends UserResponse {

    constructor(userData) {
        super(userData);
    }

    toJSON() {
        return {
            ...super.toJSON()
        }
    }
}

/**
 * @swagger
 * components:
 *   schemas:
 *     UserResponse:
 *       required: [fullName]
 *       allOf:
 *         - $ref: '#/components/schemas/UserBase'
 *         - $ref: '#/components/schemas/UserProcessedBase'
 *         - type: object
 *           properties:
 *             fullName: { type: string, example: Bollocks McGee }
 *     StudentResponse:
 *       required: [academics, documents, termActivity, support, isApplicant, studentId, location, status]
 *       allOf:
 *         - $ref: '#/components/schemas/UserResponse'
 *         - type: object
 *           properties:
 *             academics:
 *               type: object
 *               properties:
 *                 program: { type: string, example: Computer Science }
 *                 year: { type: number, example: 2 }
 *                 gpa: { type: string, example: 3.23 }
 *                 department: { type: string, example: Faculty of Science }
 *             documents:
 *               type: object
 *               properties:
 *                 resume: { type: string, example: DNE }
 *                 coverLetter: { type: string, example: DNE }
 *                 transcript: { type: string, example: DNE }
 *                 report: { type: string, example: DNE }
 *                 reflection: { type: string, example: DNE }
 *             termActivity:
 *               type: object
 *               properties:
 *                 applications: { type: number, example: 1241 }
 *                 interviews: { type: number, example: 1 }
 *                 applied: { type: number, example: 1000 }
 *                 interviewed: { type: number, example: 0 }
 *                 shortlisted: { type: number, example: 2200 }
 *                 workTerms: { type: number, example: 2 }
 *                 startTerm: { type: string, example: Summer 2025 }
 *             support:
 *               type: object
 *               properties:
 *                 facultyAdvisor: { type: string, example: Mickey Mouse }
 *                 coordinators:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: [Michael, Louise, Jin-Woo]
 *             isApplicant: { type: boolean, example: true }
 *             studentId: { type: string, example: 123456789 }
 *             location: { type: string, example: Xi'an }
 *             status: { type: string, example: applied }
 *     SupervisorResponse:
 *       required: [company, jobTitle, location]
 *       allOf:
 *         - $ref: '#/components/schemas/UserResponse'
 *         - type: object
 *           properties:
 *             company: { type: string, example: NBA }
 *             jobTitle: { type: string, example: Bench Warmer }
 *             location: { type: string, example: Utah }
 *     CoordinatorResponse:
 *       allOf:
 *         - $ref: '#/components/schemas/UserResponse'
 *   examples:
 *     StudentResponseEx:
 *       value: { role: student, email: jinwoo@thegreatest.com, firstName: Jin-Woo, lastName: Sung, fullName: Jin-Woo Sung, studentId: "123456789", id : "238945789237457817", dateCreated : "DNE", isApplicant : false, location: Texas, status: searching, academics: { program: Computer Science, year: 2, gpa: 4.22, department: Faculty of Science }, documents: { resume: "DNE", coverLetter: "DNE", transcript: "DNE", report: "DNE", reflection: "DNE"}, termActivity: {applications: 1234, interviews: 67, applied: 67, interviewed: 67, shortlisted: 76, workTerms: 2, startTerm: Summer 2025}, support: { facultyAdvisor: Mickey Mouse, coordinators: [Michael, Louise, Jin-Woo] } }
 *     SupervisorResponseEx:
 *       value: { role: student, email: jinwoo@thegreatest.com, firstName: Jin-Woo, lastName: Sung, fullName: Jin-Woo Sung, id : "238945789237457817", dateCreated : "DNE", company: NBA, jobTitle: The Goat, location: Toronto }
 *     CoordinatorResponseEx:
 *       value: { role: student, email: jinwoo@thegreatest.com, firstName: Jin-Woo, lastName: Sung, fullName: Jin-Woo Sung, dateCreated : "DNE", id : "238945789237457817" }
 */