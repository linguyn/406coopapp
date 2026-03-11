import { isValidStudent, isValidSupervisor, isValidCoordinator, addStudentToDatabase, addSupervisorToDatabase, addCoordinatorToDatabase } from './database-services.js';

export const userDetails = {
    roles : {
        student : "student",
        supervisor : "supervisor",
        coordinator : "coordinator",
        admin : "admin"
    },
    statuses : ["applying", "applied", "accepted", "rejected", "waitlisted", "probation"],
    operations : {
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
}