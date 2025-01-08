// report-controller.ts

import { Request, Response } from "express";
import { ReportService } from "../services/report-service";

export class ReportController {
  /**
   * Creates a new report.
   * Handles the request and passes data to the service layer.
   * @param req - Express request object.
   * @param res - Express response object.
   */
  static async createReport(req: Request, res: Response): Promise<void> {
    const { userId, title, description } = req.body;
    const file = req.file; // Uploaded file (handled by middleware)

    console.log("file name is : ", file);
    // Check if required fields, including the file, are present
    // if (!userId || !title || !description || !file) {
    //   res.status(400).json({ error: "Missing required fields, including image." });
    //   return; // Just exit the function after sending the response
    // }

    try {
      // Call service to create a new report
      const report = await ReportService.createReport(
        {
          userId: Number(userId), // Ensure userId is a number
          title,
          description,
          image: "kfc.jpg",  // Pass the image filename
        },
        file // Passing file
      );

      res.status(201).json(report); // Send created report response
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
   * Fetches all reports for a specific user.
   * @param req - Express request object.
   * @param res - Express response object.
   */
  static async getAllReports(req: Request, res: Response): Promise<void> {
    try {
      const reports = await ReportService.getAllReports(); // Fetch all reports
      res.status(200).json(reports);
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
