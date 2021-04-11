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
            console.log(`<<<<<<<< -------- workouts sending result: ${result} -------- >>>>>>>>`);
            res.json(result)
        }).catch(err => {
            console.log(`<<<<<<<< -------- workouts failed with error: ${err} -------- >>>>>>>>`);
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
        ]).limit(7)
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

    app.put("/api/workouts/:id", (req, res) => {
        db.Workout.findOneAndUpdate(
            { _id: req.params.id },
            { $push: { exercises: req.body } },
            { new: true })
            .then(updateWorkout => {
                res.json(updateWorkout);
            })
            .catch(err => {
                res.json(err);
            });
    });


};