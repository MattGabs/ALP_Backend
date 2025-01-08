import { prismaClient } from "../application/database";
import { ResponseError } from "../errors/response-error";
import { CreateLessonRequest, LessonResponse, toLessonResponse } from "../models/lesson-model";
import path from "path";

export class LessonService {
    /**
     * Creates a new lesson.
     * @param request - The lesson creation request data.
     * @param file - The uploaded image file (optional).
     * @returns The created lesson as a standardized response.
     */
    static async createLesson(request: CreateLessonRequest, file?: Express.Multer.File): Promise<LessonResponse> {
        // Validate that required fields are provided
        if (!request.title || !request.description || !request.content) {
            throw new ResponseError(400, "All fields except image are required.");
        }

        // Handle the image file if provided
        let imagePath: string | undefined;
        if (file) {
            imagePath = path.join("uploads", file.filename); // Path to save image
        }

        // Create the lesson in the database
        const lesson = await prismaClient.lesson.create({
            data: {
                title: request.title,
                description: request.description,
                content: request.content,
                imageUri: imagePath || null, // Save null if no image is uploaded
            },
        });

        return toLessonResponse(lesson); // Standardize the response
    }

    /**
     * Fetches all lessons.
     * @returns List of all lessons.
     */
    static async getAllLessons(): Promise<LessonResponse[]> {
        const lessons = await prismaClient.lesson.findMany({
            orderBy: { id: "desc" }, // You can customize the order as needed
        });

        return lessons.map(toLessonResponse);
    }
}
