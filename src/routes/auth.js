import { Router } from "express";
import session from "express-session";
import User from "../database/schema/userSchema.js";

const router = Router();

router.post(
    '/login',
    (req, res) => {
        const { username, password } = req.body;
        if(username && password){
            if(req.session.user){
                res.send(req.session.user);
            } else {
                req.session.user = {
                    username,
                };
                res.send(req.session);
            }
        } else {
            res.send(401);
        }
    }
);

router.post(
    '/register',
    async (req, res) => {
        const { name, email, username, password, role } = req.body;
        const userExist = await User.findOne({ username, email });

        if(userExist){
            res.send("User already exists");
        } else {
            const newUser = new User({
                name,
                email,
                username,
                password,
                role
            });
            await newUser.save();
            res.send(newUser);
        }
    }
);

export default router;