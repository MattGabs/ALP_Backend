//report-model

export interface CreateLessonRequest {
    title: string; 
    description: string; 
    content: string; 
    image?: string;
  }
  
  export interface LessonResponse {
    id: number; 
    title: string; 
    description: string;
    content: string;
    image?: string; 
  }
  
  export const toLessonResponse = (lesson: any): LessonResponse => {
    return {
      id: lesson.id,
      title: lesson.title,
      description: lesson.description,
      content: lesson.content,
      image: lesson.image || null,
    };
  };
  