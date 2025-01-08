import { Request, Response } from "express";
import { LessonService } from "../services/lesson-service";

export class LessonController {
    /**
     * Creates a new lesson.
     * Handles the request and passes data to the service layer.
     * @param req - Express request object.
     * @param res - Express response object.
     */
    static async createLesson(req: Request, res: Response): Promise<void> {
        const { title, description, content } = req.body;
        const file = req.file; // Uploaded file (handled by middleware)

        try {
            // Call service to create a new lesson
            const lesson = await LessonService.createLesson(
                {
                    title,
                    description,
                    content,
                },
                file // Pass the uploaded file
            );

            res.status(201).json(lesson); // Send created lesson response
        } catch (error) {
            console.error(error); // Log the error for debugging
            if (error instanceof Error) {
                res.status(400).json({ error: error.message }); // Handle known errors
            } else {
                res.status(500).json({ error: "Internal server error" }); // Handle unknown errors
            }
        }
    }

    /**
     * Fetches all lessons.
     * @param req - Express request object.
     * @param res - Express response object.
     */
    static async getAllLessons(req: Request, res: Response): Promise<void> {
        try {
            const lessons = await LessonService.getAllLessons(); // Fetch all lessons
            res.status(200).json(lessons);
        } catch (error) {
            console.error(error); // Log the error for debugging
            if (error instanceof Error) {
                res.status(400).json({ error: error.message }); // Handle known errors
            } else {
                res.status(500).json({ error: "Internal server error" }); // Handle unknown errors
            }
        }
    }
}
