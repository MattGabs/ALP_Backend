import { z, ZodType } from "zod";

export class LocationValidation {
    static readonly CREATE: ZodType = z.object({
        nama: z.string().min(1).max(255), 
        isFilled: z.boolean(),
    });
}
