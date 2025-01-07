//protected-router.ts
import express from "express"
import { authMiddleware } from "../middlewares/auth-middleware"
import { AuthController } from "../controllers/auth-controller"


export const protectedRouter = express.Router()
protectedRouter.use(authMiddleware)

protectedRouter.delete("/api/logout", AuthController.logout)

