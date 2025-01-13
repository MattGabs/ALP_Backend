// report-controller.ts

import { Response } from "express";
import { ReportService } from "../services/report-service";
import { UserRequest } from "../types/user-request";
import { NextFunction } from "express";
import { CreateReportRequest } from "../models/report-model";

export class ReportController {
  /**
   * Creates a new report.
   * Handles the request and passes data to the service layer.
   * @param req - Express request object.
   * @param res - Express response object.
   */
  
  static async createReport(req: UserRequest, res: Response, next: NextFunction): Promise<void> {
    try {
        const request: CreateReportRequest = req.body as CreateReportRequest;
        const response = await ReportService.createReport(req.user!, request);
        res.status(201).json({ data: response });
    } catch (error) {
        next(error);
    }
}
  
  static async getAllReports(req: UserRequest, res: Response, next: NextFunction){
    try {
      const reports = await ReportService.getAllReports(); 
      res.status(200).json({
        data: reports,
      });
    } catch (error) {
      console.error(error); 
      if (error instanceof Error) {
        res.status(400).json({ error: error.message }); 
      } else {
        res.status(500).json({ error: "Internal server error" }); 
      }
    }
  }
}
