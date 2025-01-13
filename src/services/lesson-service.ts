import { prismaClient } from "../application/database";
import { ResponseError } from "../errors/response-error";
import {
    CreateLessonRequest,
    LessonResponse,
    toLessonResponse,
} from "../models/lesson-model";

export class LessonService {
    /**
        * Fetches a single lesson by ID.
        * @param lessonId - ID of the lesson to fetch.
        * @returns The lesson as a standardized response.
        */
    static async getLessonById(lessonId: number): Promise<LessonResponse> {
        // Fetch the lesson from the database using the provided lessonId
        const lesson = await prismaClient.lesson.findUnique({
            where: { id: lessonId },
        });

        if (!lesson) {
            throw new ResponseError(404, "Lesson not found.");
        }

        return toLessonResponse(lesson); // Return the lesson as a standardized response
    }

    /**
     * Creates a new lesson.
     * @param request - The lesson creation request data.
     * @returns The created lesson as a standardized response.
     */
    static async createLesson(request: CreateLessonRequest): Promise<LessonResponse> {
        if (!request.title || !request.description || !request.content) {
            throw new ResponseError(400, "All fields except image are required.");
        }

        const lesson = await prismaClient.lesson.create({
            data: {
                title: request.title,
                description: request.description,
                content: request.content,
            },
        });

        return toLessonResponse(lesson);
    }

    /**
     * Fetches all lessons.
     * @returns List of all lessons.
     */
    static async getAllLessons(): Promise<LessonResponse[]> {
        const lessons = await prismaClient.lesson.findMany({
            orderBy: { id: "desc" },
        });

        return lessons.map(toLessonResponse);
    }

    /**
     * Updates an existing lesson.
     * @param lessonId - ID of the lesson to update.
     * @param request - The lesson update request data.
     * @returns The updated lesson as a standardized response.
     */
    static async updateLesson(
        lessonId: number,
        request: CreateLessonRequest
    ): Promise<LessonResponse> {
        if (!request.title || !request.description || !request.content) {
            throw new ResponseError(400, "All fields except image are required.");
        }

        const existingLesson = await prismaClient.lesson.findUnique({
            where: { id: lessonId },
        });

        if (!existingLesson) {
            throw new ResponseError(404, "Lesson not found.");
        }

        const updatedLesson = await prismaClient.lesson.update({
            where: { id: lessonId },
            data: {
                title: request.title,
                description: request.description,
                content: request.content,
            },
        });

        return toLessonResponse(updatedLesson);
    }

    /**
     * Deletes an existing lesson.
     * @param lessonId - ID of the lesson to delete.
     */
    static async deleteLesson(lessonId: number): Promise<void> {
        const existingLesson = await prismaClient.lesson.findUnique({
            where: { id: lessonId },
        });

        if (!existingLesson) {
            throw new ResponseError(404, "Lesson not found.");
        }

        await prismaClient.lesson.delete({
            where: { id: lessonId },
        });
    }
}
