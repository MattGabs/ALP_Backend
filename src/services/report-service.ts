import { prismaClient } from "../application/database";
import { ResponseError } from "../errors/response-error";
import { CreateReportRequest, ReportResponse, toReportResponse } from "../models/report-model";
import path from "path";
import { User } from "@prisma/client";
import { Validation } from "../validations/validation";
import { ReportValidation } from "../validations/report-validation";
export class ReportService {
  /**
   * Creates a new report.
   * @param request - The report creation request data.
   * @param file - The uploaded image file (optional).
   * @returns The created report as a standardized response.
   */
  static async createReport(
    user: User,
    req: CreateReportRequest): Promise<string> {

    const reportRequest = Validation.validate(
        ReportValidation.CREATE,
        req
    );

    await prismaClient.report.create({
      data: {
              userId: reportRequest.userId,
              title: reportRequest.title,
              description: reportRequest.description,
              imageUri: reportRequest.image,
            },
    });

    return "Post created successfully";
}

  /**
   * Fetches all reports for a specific user.
   * @param userId - The ID of the user.
   * @returns List of reports for the user.
   */
  // report-service.ts

static async getAllReports(): Promise<ReportResponse[]> {
  const reports = await prismaClient.report.findMany({
    orderBy: { id: "desc" }, 
  });

  return reports.map(toReportResponse);
}

}
