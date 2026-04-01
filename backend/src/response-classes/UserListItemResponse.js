export class UserListItemResponse {
    #firstName;
    #lastName;
    #fullName;
    #role;
    #email;
    #status
    #createdAt;
    #id;

    static createUserListItemResponse(userData) {
        const {role, isApplicant } = userData;

        switch (role) {
            case "student":
                if (isApplicant) {
                    return new ApplicantListItemResponse(userData);
                } else {
                    return new StudentListItemResponse(userData);
                }
            case "supervisor":
                return new SupervisorListItemResponse(userData);
            case "coordinator":
                return new CoordinatorListItemResponse(userData);
            default:
                return new UserListItemResponse(userData);
        }
    }

    constructor(userData) {
        const { firstName, lastName, role, email, status, createdAt, _id } = userData;

        this.#firstName = firstName;
        this.#lastName = lastName;
        this.#role = role;
        this.#email = email;
        this.#fullName = firstName && lastName ? `${firstName} ${lastName}` : null;
        this.#status = status;
        this.#createdAt = createdAt;
        this.#id = _id;
    }

    toJSON() {
        return {
            firstName : this.#firstName,
            lastName : this.#lastName,
            fullName : this.#fullName,
            role : this.#role,
            email : this.#email,
            status : this.#status,
            createdAt : this.#createdAt,
            id : this.#id
        }
    }
}

class StudentListItemResponse extends UserListItemResponse {
    #studentId;

    #academics;
    #termActivity;
    #documents;

    constructor(userData) {
        super(userData);
        // todo: figure out how to get the supervisor progress report here?
        const { studentId, academics, documents, termActivity } = userData;

        this.#studentId = studentId;
        this.#academics = {
            program : academics.program
        };
        this.#termActivity = {
            applications : termActivity.applications,
            interviewed : termActivity.interviewed
        };
        this.#documents = {
            reflection : documents.reflection,
            report : documents.report
        };
    }

    toJSON() {
        return {
            ...super.toJSON(),
            studentId : this.#studentId,
            academics : this.#academics,
            termActivity : this.#termActivity,
            documents : this.#documents
        }
    }
}

class SupervisorListItemResponse extends UserListItemResponse {
    #company;
    #jobTitle;
    #interns;
    #report;

    constructor(userData) {
        super(userData);

        const { company, jobTitle, interns, report } = userData;

        this.#company = company;
        this.#jobTitle = jobTitle;
        this.#interns = interns;
        this.#report = report;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            company : this.#company,
            jobTitle : this.#jobTitle,
            interns : this.#interns,
            report : this.#report,
        }
    }
}

class ApplicantListItemResponse extends UserListItemResponse {
    // TODO: change this to application submission date
    #studentId;
    #academics;
    #documents;

    constructor(userData) {
        super(userData);

        const { studentId, academics, documents } = userData;

        this.#studentId = studentId;
        this.#academics = {
            program : academics.program,
            year : academics.year,
            gpa : academics.gpa
        };
        this.#documents = { 
            resume : documents.resume,
            coverLetter : documents.coverLetter,
            transcript : documents.transcript
        };
    }

    toJSON() {
        return {
            ...super.toJSON(),
            studentId : this.#studentId,
            academics : this.#academics,
            documents : this.#documents
        }
    }
}