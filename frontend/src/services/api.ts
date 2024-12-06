import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

// Function to log in the user
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    return response.data.token; // Return the token
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

// Function to sign up the user
export const signupUser = async (email: string, password: string, name: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, { email, password, name });
    return response.data.token; // Return the token
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Signup failed');
  }
};

// Function to fetch todos
export const getTodos = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found. Please log in.');

    const response = await axios.get(`${API_URL}/todo`, {
      headers: { 'x-auth-token': token },
    });
    return response.data; // Return todos data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch todos');
  }
};

// Function to create a new todo
export const createTodo = async (title: string, description?: string) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found. Please log in.');

    const response = await axios.post(
      `${API_URL}/todo`,
      { title, description },
      { headers: { 'x-auth-token': token } }
    );
    return response.data; // Return the created todo
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to create todo');
  }
};

// Function to delete a todo
export const deleteTodo = async (id: string) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found. Please log in.');

    await axios.delete(`${API_URL}/todo/${id}`, {
      headers: { 'x-auth-token': token },
    });
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to delete todo');
  }
};
