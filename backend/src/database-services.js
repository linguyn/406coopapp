import Student from "./models/Student.js";

export let tempStats = {
    currentTerm : "winter 2026",
    newPostings : 12,
    openPostings : 144,
    totalStudents : 6767,
    totalActive : 6760,
    totalPendingApproval : 67,
    totalSeeking : 676,
    totalInterviewing: 7,
    totalPlaced: 6 
}

export function getGlobalStats() { //return all global stats: current term, total students, total active, 
    return tempStats;
}
// WE ARE KEEPING ALL CODE FROM BELOW THIS LINE. ANY ADDED CODE THAT USES THE DATABASE SHOULD BE BELOW THIS LINE.

export async function getStudentStats(){ //Make this multi-functional for all Users.
    try {

        const stats = await Student.aggregate([
            {
                $facet: {
                    stats: [
                        {
                            $group: {
                                _id: "$status",
                                count: { $sum: 1},

                            }
                        }
                    ],
                    overallStats: [
                        {
                            $group: {
                                _id: null,
                                totalStudents: { $sum: 1},
                            }
                        }
                    ]
                }
            },
        ]);

        return stats;
    } catch (err) {
        console.error(err);
        throw err;
    }
}