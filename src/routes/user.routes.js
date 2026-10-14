import { Router } from "express"; 
import { registerUser } from "../controllers/user.contollers.js";
import {upload} from "../middlewares/muliter.middleware.js";

const router = Router()

router.route("/register").post(
    upload.fields([ // middleware injection
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverimage",
            maxCount:1
        },
    ]),
    registerUser
)
// router.route("/login").post(login)


export default router