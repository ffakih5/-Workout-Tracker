const db = require("../models");

module.exports = (app) => {
    app.get("/api/workouts", (req, res) => {
        db.Workout.aggregate([
            {
                $addFields: {
                    totalDuration: { $sum: "$exercises.duration" }
                }
            },
            {
                $sort: { day: -1 }
            }
        ]).then(result => {
            res.json(result)
        }).catch(err => {
            res.json(err);
        });
    });

    app.get("/api/workouts/range", (data, res) => {
        db.Workout.aggregate([
            {
                $addFields: {
                    totalDuration: {
                        $sum: "$exercises.duration"

                    }
                }
            }
        ])
            .limit(7)
            .then(result => {
                res.json(result)
            }).catch(err => {
                res.json(err);
            })
    });

    app.post("/api/workouts", (data, res) => {
        db.Workout.create(data)
            .then(newWorkout => {
                res.json(newWorkout);
            })
            .catch(err => {
                res.json(err);
            });
    });

}