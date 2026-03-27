export class UserLoginResponse {
    #role;
    #email;
    #firstName;
    #lastName;
    #fullName;
    #id;
    #dateCreated;

    #currentTerm;

    static createUserLoginResponse(userData, stats) {
        const role = userData.role;
        switch (role) {
            case "student":
                return new StudentLoginResponse(userData, stats);
            case "supervisor":
                return new SupervisorLoginResponse(userData, stats);
            case "coordinator":
                return new CoordinatorLoginResponse(userData, stats);
            default:
                return new UserLoginResponse(userData, stats);
        }
    }

    constructor(userData, stats) {
        const {role, email, firstName, lastName, id, dateCreated } = userData;
        const { currentTerm } = stats;

        this.#role = role;
        this.#email = email;
        this.#firstName = firstName;
        this.#lastName = lastName;
        this.#fullName = (firstName && lastName) ? `${firstName} ${lastName}` : null;
        this.#id = id;
        this.#dateCreated = dateCreated;
        this.#currentTerm = currentTerm.charAt(0).toUpperCase() + currentTerm.slice(1);
    }

    toJSON() {
        return {
            role : this.#role,
            email : this.#email,
            firstName : this.#firstName,
            lastName : this.#lastName,
            fullName : this.#fullName,
            id : this.#id,
            dateCreated : this.#dateCreated,
            currentTerm : this.#currentTerm
        }
    }
}

class StudentLoginResponse extends UserLoginResponse {
    #termActivity;
    #support;

    #studentId;
    #isApplicant;
    #status;

    #newPostings;
    #openPostings;

    constructor(userData, stats) {
        super(userData, stats);

        const { termActivity, support, studentId, isApplicant, status} = userData;
        const { newPostings, openPostings} = stats;

        this.#termActivity = termActivity;
        this.#support = support;
        this.#studentId = studentId;
        this.#isApplicant = isApplicant;
        this.#status = status;
        this.#newPostings = newPostings;
        this.#openPostings = openPostings;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            termActivity : this.#termActivity,
            support : this.#support,
            studentId : this.#studentId,
            isApplicant : this.#isApplicant,
            status : this.#status,
            newPostings : this.#newPostings,
            openPostings : this.#openPostings
        }
    }
}

class SupervisorLoginResponse extends UserLoginResponse {
    #status;

    constructor(userData, stats) {
        super(userData, stats);
        // TODO: figure out what specific info to return for supervisor login
        const { status } = userData;
        const {} = stats;

        this.#status = status;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            status : this.#status
        }
    }
}

class CoordinatorLoginResponse extends UserLoginResponse {
    #totalStudents;
    #totalActive;
    #totalPendingApproval;
    #totalSeeking;
    #totalInterviewing;
    #totalPlaced;

    constructor(userData, stats) {
        super(userData, stats);

        const {totalStudents, totalActive, totalPendingApproval, totalSeeking, totalInterviewing, totalPlaced } = stats;

        this.#totalStudents = totalStudents;
        this.#totalActive = totalActive;
        this.#totalPendingApproval = totalPendingApproval;
        this.#totalSeeking = totalSeeking;
        this.#totalInterviewing = totalInterviewing;
        this.#totalPlaced = totalPlaced;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            totalStudents : this.#totalStudents,
            totalActive : this.#totalActive,
            totalPendingApproval : this.#totalPendingApproval,
            totalSeeking : this.#totalSeeking,
            totalInterviewing : this.#totalInterviewing,
            totalPlaced : this.#totalPlaced
        }
    }
}