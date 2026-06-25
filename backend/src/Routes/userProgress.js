import { Router } from "express";
import { isLoggedIn } from "../Middlewares/user.js";
import { getUserTimeStats } from "../Config/database.js";

export const statsRouter = Router();

statsRouter.get(
    "/userprogress",
    isLoggedIn,
    async (req, res) => {

        const stats =
            await getUserTimeStats(
                req.user.user_id
            );

        res.json({
            productiveMinutes:
                stats.productive_minutes,

            wastedMinutes:
                stats.wasted_minutes
        });
    }
);