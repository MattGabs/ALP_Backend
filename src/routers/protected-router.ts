//protected-router.ts
import express from "express"
import { authMiddleware } from "../middlewares/auth-middleware"
import { AuthController } from "../controllers/auth-controller"


export const protectedRouter = express.Router()
protectedRouter.use(authMiddleware)

protectedRouter.put("/api/logout", AuthController.logout)

