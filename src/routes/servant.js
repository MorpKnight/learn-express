import { Router } from "express";
import mongoose from "mongoose";
import User from "../database/schema/userSchema.js";
import Servant from "../database/schema/servantSchema.js";

const router = Router();

router.get(
    '/servant',
    async (req, res) => {
        const servantList = await Servant.find();
        res.send(servantList);
        console.log("Success GET servantList");
    }
)

router.post(
    '/addservant',
    async (req, res) => {
        const { name, class: servantClass, origin, npType } = req.body;

        const servantExist = await Servant.findOne({ name, class: servantClass, origin, npType });

        if(servantExist){
            res.send("Servant already registered");
        } else {
            const newServant = new Servant({
                name,
                class: servantClass,
                origin,
                npType,
            });
            await newServant.save();
            res.send(newServant);
        }
    }
);

router.get(
    '/servant/:servantName',
    async (req, res) => {
        const decodedServantName = decodeURIComponent(req.params.servantName);
        const servant = await Servant.findOne({ name: req.params.servantName });
        if(!servant){
            res.send(404);
        }
        res.send(servant);
    }
)

router.post(
    '/deleteServant/:servantName',
    async (req, res) => {
        const decodedServantName = decodeURIComponent(req.params.servantName);
        const servant = await Servant.findOne({ name: req.params.servantName });
        if(!servant){
            res.send(404);
        }
        await Servant.deleteOne({ name: req.params.servantName });
        res.send(servant);
    }
)

export default router;