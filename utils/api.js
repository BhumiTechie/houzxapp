import axios from 'axios';
import { REACT_APP_API_URL } from '@env';  // Import the environment variable from .env file

// Ensure that the baseURL uses the environment variable correctly
const api = axios.create({
  baseURL: REACT_APP_API_URL,  // Use the API URL from the .env file
});

export const googleSignInApi = (idToken) => api.post('/google-signin', { idToken });
export const verifyOtpApi = (phoneNumber, otp) => api.post('/verify-otp', { phoneNumber, otp });
