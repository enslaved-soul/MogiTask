// Utility functions for authentication

// Check if the user is authenticated
export const isAuthenticated = (): boolean => {
    return localStorage.getItem('token') !== null;
  };
  
  // Get the token from localStorage
  export const getToken = (): string | null => {
    return localStorage.getItem('token');
  };
  
  // Set the token in localStorage
  export const setToken = (token: string): void => {
    localStorage.setItem('token', token);
  };
  
  // Remove the token from localStorage (logout)
  export const removeToken = (): void => {
    localStorage.removeItem('token');
  };
  