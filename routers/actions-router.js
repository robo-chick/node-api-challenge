const express = require("express")
const actions = require("../data/helpers/actionModel")

const router = express.Router()

// GET actions
router.get("/actions", (req, res) => {
    actions
        .get()
        .then((action) => {
            res.status(200).json(action)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                message: "Could not find actions",
            })
        })
})

// GET actions by ID
router.get("/actions/:id", (req, res) => {
    actions
        .get(req.params.id) 
        .then((action) => {
            if (req.params.id) {
                res.status(200).json(action)
            } else {
                res.status(404).json({
                    message: "There is no action associated with that ID",
                })
            }
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                message: "The actions information could not be found"
            })
        })
})

// DELETE
router.delete("/actions/:id", (req, res) => {
    actions
        .remove(req.params.id)
        .then((action) => {
            if (!req.params.id) {
                res.status(404).json({
                    message: "The action with the specified ID does not exist",
                })
            } else (
                res.status(200).json({
                    message: "Action was successfully deleted",
                })
            )
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                message: "The action information could not be removed",
            })
        })
})

// PUT Edit action
router.put("/actions/:id", (req, res) => {
    actions
        .get(req.params.id)
        .then((action) => {
            if (!req.body.project_id || !req.body.description || req.body.completed) {
                res.status(400).json({
                    message: "Please provide a description and notes for updated actions",
                })
            } else {
                actions
                    .update(req.params.id, req.body)
                    .then((action) => {
                        res.status(200).json(req.body)
                    })
                    .catch((err) => {
                        console.log(err)
                        res.status(500).json({
                            message: "The action information could not be updated",
                        })
                    })
            }
        })
})

// POST add action
router.post("/actions/:id", (req, res) => {
    actions
        .get()
        .then((action) => {
            if (!req.body.project_id || req.body.description || req.body.completed) {
                res.status(400).json({
                    message: "Please fill out all fields",
                })
            } else {
                actions
                    .insert(req.body)
                    .then((action) => {
                        res.status(201).json(action)
                    })
                    .catch((err) => {
                        console.log(err)
                        res.status(500).json({
                            message: "Error adding the action",
                        })
                    })
            }
        })
})

module.exports = router