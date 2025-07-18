import express from "express"
import { loggedin } from "../middleware/loggedin.js"
import { login, register, logout} from "../controllers/AuthController.js"

const AuthRouter = express.Router();

AuthRouter.post("/register", register);
AuthRouter.post("/login", login);
AuthRouter.post("/logout", logout)

export default AuthRouter;
