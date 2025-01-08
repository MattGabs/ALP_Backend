import { z, ZodType } from "zod";

/**
 * Validation schema for report-related operations.
 */
export class ReportValidation {
  /**
   * Validation schema for creating a report.
   * - `userId`: Required and must be a number.
   * - `title`: Required, must be a string, and have a minimum length of 1 and a maximum length of 255 characters.
   * - `description`: Required, must be a string, and have a minimum length of 1 and a maximum length of 1000 characters.
   */
  static readonly CREATE: ZodType = z.object({
    userId: z.number().nonnegative(), // userId must be a non-negative number
    title: z.string().min(1).max(255), // Title must be between 1 and 255 characters
    description: z.string().min(1).max(1000), // Description must be between 1 and 1000 characters
  });
}
