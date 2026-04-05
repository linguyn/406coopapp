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

export function getGlobalStats() {
    return tempStats;
}
// WE ARE KEEPING ALL CODE FROM BELOW THIS LINE. ANY ADDED CODE THAT USES THE DATABASE SHOULD BE BELOW THIS LINE.

export async function getStudentStats(req, res, next){ //Make this multi-functional for all Users.
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

        res.status(200).json(stats);
    } catch (error) {
        console.error("Aggregation Error:", error);
        res.status(500).json({ error: "Failed to calculate statistics.",
            details: error.message
        });
    }
}
