import { z, ZodType } from "zod";

/**
 * Validation schema for report-related operations.
 */
export class ReportValidation {
  
  static readonly CREATE: ZodType = z.object({
    userId: z.number().nonnegative(), 
    title: z.string().min(1).max(255),
    description: z.string().min(1).max(1000), 
  });
}
