const db = require("../models");

module.exports = (app) => {
    app.get("/api/workouts", (req, res) => {
        db.Workout.aggregate([
            {
                $addFields: {
                    totalDuration: { $sum: "$exercises.duration" }
                }
            },
        ])
    })
}