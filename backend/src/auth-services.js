import { isValidCoordinator, isValidStudent, isValidSupervisor } from "./validate-services.js"

export const VALIDATE_OPERATIONS = {
    student: {
        validate: isValidStudent
    },
    supervisor: {
        validate: isValidSupervisor,
    },
    coordinator: {
        validate: isValidCoordinator,
    }
}