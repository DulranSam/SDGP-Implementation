import { Link } from "react-router-dom";

const Navbar = () => {
  const linkStyle = {
    display: "inline-block",
    margin: "0 10px",
    textDecoration: "none",
    color: "white",
  };

  return (
    <div>
      <Link to="/" style={linkStyle}>
        Home
      </Link>
      <Link to="/puremath" style={linkStyle}>
        Pure Maths
      </Link>
      <Link to="/stat" style={linkStyle}>
        Statistics
      </Link>
      <Link to="/forum" style={linkStyle}>
        Forum
      </Link>
      <Link to="/adduser" style={linkStyle}>
        Register
      </Link>
      <Link to="/login" style={linkStyle}>
        Login
      </Link>
      <Link to="/exam" style={linkStyle}>
        Exam
      </Link>
      <Link to="/gemini" style={linkStyle}>
        ChatBot
      </Link>
    </div>
  );
};

export default Navbar;
