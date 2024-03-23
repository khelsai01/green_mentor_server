const express = require("express");
const { connection } = require("./db");
const { userRouter } = require("./routes/user.routes");
const { taskRouter } = require("./routes/task.routes");
const { limiter } = require("./middleware/ratelimiter.middleware");
const {errorMiddleware} = require("./middleware/error.middleware");

const app = express();

app.use(express.json());
app.use("/users",userRouter);
app.use("/tasks",taskRouter)

app.use(errorMiddleware)
app.use(limiter)


app.get("/",(req,res)=>{
    res.send("Welcome to Home Page of Task App")
})
app.listen(8080, async()=>{
    try {
        await connection;
        console.log("server is connected to Database and run at server")
    } catch (error) {
        console.log(error)
    }
})