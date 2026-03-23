import { isValidCoordinator, isValidStudent, isValidSupervisor } from "./validate.js"
import { addCoordinatorToDatabase, addStudentToDatabase, addSupervisorToDatabase } from "./database-services.js"

export const ROLE_OPERATIONS = {
    student : {
        validate : isValidStudent,
        add : addStudentToDatabase
    },
    supervisor : {
        validate : isValidSupervisor,
        add : addSupervisorToDatabase
    },
    coordinator : {
        validate : isValidCoordinator,
        add : addCoordinatorToDatabase
    }
}