import { prismaClient } from "../application/database";
import { ResponseError } from "../errors/response-error";
import { CreateReportRequest, ReportResponse, toReportResponse } from "../models/report-model";
import path from "path";

export class ReportService {
  /**
   * Creates a new report.
   * @param request - The report creation request data.
   * @param file - The uploaded image file (optional).
   * @returns The created report as a standardized response.
   */
  static async createReport(request: CreateReportRequest, file?: Express.Multer.File): Promise<ReportResponse> {
    // Validate that required fields are provided
    if (!request.userId || !request.title || !request.description) {
      throw new ResponseError(400, "All fields except image are required.");
    }

    // Handle the image file if provided
    let imagePath: string | undefined;
    if (file) {
      imagePath = path.join("uploads", file.filename); // Path to save image
    }

    // Create the report in the database
    const report = await prismaClient.report.create({
      data: {
        userId: request.userId,
        title: request.title,
        description: request.description,
        imageUri: imagePath || null, // Save null if no image is uploaded
      },
    });

    return toReportResponse(report); // Standardize the response
  }

  /**
   * Fetches all reports for a specific user.
   * @param userId - The ID of the user.
   * @returns List of reports for the user.
   */
  // report-service.ts

static async getAllReports(): Promise<ReportResponse[]> {
  const reports = await prismaClient.report.findMany({
    orderBy: { id: "desc" }, // You can customize the order as needed
  });

  return reports.map(toReportResponse);
}

}
