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
        const { role, email, firstName, lastName, id, createdAt } = userData;
        this.#email = email;
        this.#firstName = firstName;
        this.#lastName = lastName;
        this.#id = id;
        this.#fullName = (firstName && lastName) ? `${firstName} ${lastName}` : null; 
        this.#role = role;
        this.#dateCreated = createdAt;
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
    #status
    #interns

    constructor(userData) {
        super(userData);

        const {company, jobTitle, location, status, interns} = userData;

        this.#company = company;
        this.#jobTitle = jobTitle;
        this.#location = location;
        this.#status = status;
        this.#interns = interns;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            company: this.#company,
            jobTitle: this.#jobTitle,
            location: this.#location,
            status: this.#status,
            interns: this.#interns
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

        const { academics, documents, termActivity, studentId, location, status, isApplicant } = userData;

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