import { useContext, useState } from "react";
import Axios from "axios";
import { userContext } from "../../App";
import { Link } from "react-router-dom";

const Login = () => {
  const { setIsLogged } = useContext(userContext);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [status, setStatus] = useState("");

  async function Login(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const r = await Axios.post("http://localhost:8000/users/login", data);
      if (r.status === 200) {
        setStatus("User Logged In");
        setIsLogged(true);
        navigator("/"); //go to homepage
      } else {
        setStatus("Invalid username or password");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Login</h1>
      <br></br>
      <form onSubmit={Login}>
        <input
          onChange={handleChange}
          placeholder="Enter Username"
          name="username"
        ></input>
        <input
          onChange={handleChange}
          placeholder="Enter Password"
          name="password"
        ></input>
        <h1>{status}</h1>
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </button>
        <Link to="/forgot">Forgot Password?</Link>
      </form>
    </div>
  );
};

export default Login;
