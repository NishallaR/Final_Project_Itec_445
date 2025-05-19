import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/articles">Articles</Link>
      <Link to="/about">About</Link>
      {!isAuthenticated && <button onClick={() => loginWithRedirect()}>Login</button>}
      {isAuthenticated && (
        <>
          {user?.email_verified && <Link to="/newpost">New Post</Link>}
          <button onClick={() => logout({ returnTo: window.location.origin })}>
            Logout
          </button>
        </>
      )}
    </nav>
  );
};

export default NavBar;

