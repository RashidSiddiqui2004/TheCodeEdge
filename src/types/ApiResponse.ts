
// we are standardising the API response format
// for all API responses 
// as we are considering future => messages bhi store krenge for dashboard of user
export interface ApiResponse {
    success: boolean;
    message: string; 
    description: string;
}