//report-model

export interface CreateReportRequest {
    userId: number; 
    title: string; 
    description: string; 
    image?: string;
  }
  
  export interface ReportResponse {
    id: number; 
    userId: number; 
    title: string; 
    description: string;
    image?: string; 
  }
  
  export const toReportResponse = (report: any): ReportResponse => {
    return {
      id: report.id,
      userId: report.userId,
      title: report.title,
      description: report.description,
      image: report.image || null,
    };
  };
  