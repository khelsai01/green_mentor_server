const express = require("express");
const { TaskModel } = require("../models/task.model");
const auth = require("../middleware/auth.middleware");

const taskRouter = express.Router();
//  taskRouter.use(auth);
taskRouter.get("/", async (req, res) => {
    const quary = {};
    const {title} = req.query;
    const { userId } = req.body;

    if (userId) {
        quary.userId = userId;
    }
    if(title && userId){
        quary.title = title;
    }
    try {
        const tasks = await TaskModel.find( quary );
        return res.status(200).send(tasks)
    } catch (error) {
        return res.status(400).send({ message: error.message })
    }
});

taskRouter.post("/add", async (req, res) => {
    try {

        const newTask = new TaskModel(req.body)
        await newTask.save();
        return res.status(200).send(newTask)
    } catch (error) {
        return res.status(400).send({ message: error.message })

    }
});

taskRouter.patch("/update/:id", async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;

    try {

        await TaskModel.findByIdAndUpdate({ userId, _id: id }, req.body)
        return res.status(200).send({ message: `task of Id ${id} has been updated` })
    } catch (error) {
        return res.status(400).send({ message: error.message })

    }
});

taskRouter.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;
    try {

        await TaskModel.findByIdAndDelete({ userId, _id: id })
        return res.status(200).send({ message: `task of Id ${id} has been deleted` })
    } catch (error) {
        return res.status(400).send({ message: error.message })

    }
});

module.exports = { taskRouter }