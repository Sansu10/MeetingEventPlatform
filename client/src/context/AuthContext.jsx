// ... existing imports ...

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem('token', token); // Store token in localStorage
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token'); // Remove token on logout
  };

  // ... rest of the context code
};