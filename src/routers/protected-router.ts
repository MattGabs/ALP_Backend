//protected-router.ts
import express from "express"
import { authMiddleware } from "../middlewares/auth-middleware"
import { AuthController } from "../controllers/auth-controller"
import { ReportController } from "../controllers/report-controller"


export const protectedRouter = express.Router()
protectedRouter.use(authMiddleware)

protectedRouter.put("/api/logout", AuthController.logout)

protectedRouter.post("/api/reports", ReportController.createReport)

protectedRouter.get("/api/reports/", ReportController.getAllReports);

