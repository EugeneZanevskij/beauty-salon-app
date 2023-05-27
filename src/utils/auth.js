export const isAuthenticated = () => {
  // Check if the user is logged in or has data in local storage
  const user = localStorage.getItem('user');

  // Return true if user data exists, indicating the user is authenticated
  return !!user;
};