import { isValidStudent, isValidSupervisor, isValidCoordinator } from './validate.js';
import { addStudentToDatabase, addSupervisorToDatabase, addCoordinatorToDatabase } from './database-services.js';

export const USER_OPERATIONS = {
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