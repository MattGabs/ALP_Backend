export interface CreateLocationRequest {
    nama: string; 
    isFilled: boolean; 
}
  
  export interface LocationResponse {
    id: number; 
    nama: string; 
    isFilled: boolean; 
  }
  
  export const toLocationResponse = (location: any): LocationResponse => {
    return {
      id: location.id,
      nama: location.nama,
      isFilled: location.isFilled,
    };
  };
  