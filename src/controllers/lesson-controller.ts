import { Request, Response } from "express";
import { LessonService } from "../services/lesson-service";

export class LessonController {

    /**
       * Fetches a lesson by its ID.
       * @param req - Express request object.
       * @param res - Express response object.
       */
    static async getLessonById(req: Request, res: Response): Promise<void> {
        const { lessonId } = req.params; // Get lessonId from route params

        try {
            // Call service to get the lesson by its ID
            const lesson = await LessonService.getLessonById(parseInt(lessonId, 10));

            if (!lesson) {
                res.status(404).json({ error: "Lesson not found" }); // Return 404 if lesson is not found
            } else {
                res.status(200).json(lesson); // Return the lesson if found
            }
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

    /**
     * Updates an existing lesson.
     * @param req - Express request object.
     * @param res - Express response object.
     */
    static async updateLesson(req: Request, res: Response): Promise<void> {
        const { lessonId } = req.params;
        const { title, description, content } = req.body;

        try {
            // Call service to update the lesson
            const updatedLesson = await LessonService.updateLesson(
                parseInt(lessonId, 10),
                { title, description, content }
            );

            res.status(200).json(updatedLesson); // Send updated lesson response
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
     * Deletes an existing lesson.
     * @param req - Express request object.
     * @param res - Express response object.
     */
    static async deleteLesson(req: Request, res: Response): Promise<void> {
        const { lessonId } = req.params;

        try {
            // Call service to delete the lesson
            await LessonService.deleteLesson(parseInt(lessonId, 10));

            res.status(200).json({ message: "Lesson deleted successfully" });
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
