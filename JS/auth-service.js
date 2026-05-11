
const MOCK_USER = {
  email: "test@example.com",
  password: "password123"
};

export const loginUser = async (credentials) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (
        credentials.email === MOCK_USER.email && 
        credentials.password === MOCK_USER.password
      ) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', credentials.email);
        resolve({ success: true, user: credentials.email });
      } else {
        reject(new Error('Invalid email or password. Use test@example.com / password123'));
      }
    }, 800); 
  });
};

export const logoutUser = () => {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('userEmail');
  window.location.reload();
};

export const isAuthenticated = () => {
  return localStorage.getItem('isLoggedIn') === 'true';
};
