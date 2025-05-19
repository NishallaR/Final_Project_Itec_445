// Login.js
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

const Login = () => {
  const { isAuthenticated, user, loginWithRedirect } = useAuth0();

  // Auto-redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect();
    }
  }, [isAuthenticated, loginWithRedirect]);

  return (
    <div className="pgbody">
      <h1>Login Page</h1>
      {isAuthenticated ? (
        <p>Welcome, {user.name}! You are logged in.</p>
      ) : (
        <p>Redirecting to login...</p>
      )}
    </div>
  );
};

export default Login;
