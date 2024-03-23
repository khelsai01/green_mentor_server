const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await UserModel.findOne({ email })
        if (existingUser) {
            return res.status(200).send({ message: `user of ${email} already exist, Please login` })
        }
        else {

            if (checkpassword(password)) {
                const hashPass = bcrypt.hashSync(password, 5)

                const user = new UserModel({
                    username,
                    email,
                    password: hashPass
                });

                await user.save();
                return res.status(200).send({ user })
            }
            else {
                return res.status(400).send("check password creditial")
            }

        }
    } catch (error) {
        return res.status(400).send({ message: error.message })
    }
});

userRouter.post("/login", async (req, res) => {

    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email })

        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    console.log(`password not match`)

                }
                else {
                    const token = jwt.sign({ username: user.username, userId: user._id }, "green_mentor", {expiresIn:"1day"})
                    return res.status(200).send({message:"Login successful", "token":token});
                }
            })
        }
    } catch (error) {
        return res.status(400).send({ message: error.message })

    }
})


function checkpassword(password) {
    if (password.length < 8) {
        return false;
    }

    let upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let lower = "abcdefghijklmnopqrstuvwxyz";
    let sym = "~!@#$%^&*()_{}[]/<>?"

    let flag1 = false;
    let flag2 = false;
    let flag3 = false;

    for (pass of password) {
        if (upper.includes(pass)) {
            flag1 = true;
        }
        if (lower.includes(pass)) {
            flag2 = true;
        }
        if (sym.includes(pass)) {
            flag3 = true;
        }
    }
    return flag1 && flag2 && flag3 ? true : false

}
module.exports = { userRouter }