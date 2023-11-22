export const isAdmin = () => {
  // Check if the user is logged in or has data in local storage
  const admin = localStorage.getItem('admin');

  // Return true if user data exists, indicating the user is authenticated
  return !!admin;
};