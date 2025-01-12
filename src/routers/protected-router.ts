//protected-router.ts
import express from "express"
import { authMiddleware } from "../middlewares/auth-middleware"
import { AuthController } from "../controllers/auth-controller"
import { ReportController } from "../controllers/report-controller"
import { LessonController } from "../controllers/lesson-controller";
import { LocationController } from "../controllers/location-controller";


export const protectedRouter = express.Router()
protectedRouter.use(authMiddleware)

protectedRouter.put("/api/logout", AuthController.logout)

protectedRouter.post("/api/reports", ReportController.createReport);

protectedRouter.get("/api/reports", ReportController.getAllReports);

protectedRouter.post("/api/lessons", LessonController.createLesson);

protectedRouter.get("/api/lessons", LessonController.getAllLessons);

protectedRouter.post("/api/locations", LocationController.createLocation);

protectedRouter.post("/api/locations/batch", LocationController.createLocationsBatch);

protectedRouter.get("/api/locations", LocationController.getAllLocations);

protectedRouter.put("/api/locations/:locationId", LocationController.updateLocation);

protectedRouter.get("/api/locations/ids", LocationController.getIdByLocation);