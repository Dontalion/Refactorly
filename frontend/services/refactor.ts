import api from './api';

/**
 * Response from the code refactoring service
 */
export interface RefactorResponse {
  improved_code: string;
  suggestions: string[];
  explanation: string;
}

/**
 * Send code to be refactored
 * @param code Original code to improve
 * @param language Programming language of the code
 * @returns Refactored code with suggestions and explanation
 */
export const refactorCode = async (code: string, language: string): Promise<RefactorResponse> => {
  const response = await api.post<RefactorResponse>('/refactor', {
    code,
    language
  });
  return response.data;
};
