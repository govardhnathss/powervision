import axios from 'axios';

export interface ContactFormData {
  name: string;
  email: string;
  phoneNumber: string;
  message: string;
}

export interface FormResponse {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  createdDate: string;
  status: boolean;
  message: string;
}

const API_URL = '/api/FormSubmission/SubmitFormAsync';

export const submitFormAsync = async (data: ContactFormData): Promise<FormResponse> => {
  try {
    const response = await axios.post<FormResponse>(API_URL, data, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || 'Form submission failed');
  }
};
