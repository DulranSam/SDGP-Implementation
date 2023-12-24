import { useState } from "react";
import Axios from "axios";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [status, setStatus] = useState("");

  async function Login(e) {
    e.preventDefault();
    try {
      const { username, password } = data;
      setLoading(true);
      const r = await Axios.post("http://localhost:8000/users/login", {
        body: JSON.stringify({ username, password }),
      }).then((r) => {
        if (r.status === 200) {
          setStatus("User Logged In");
          window.location.href = "http://localhost:5173/"; //go to homepage
        } else if (r.status === 403) {
          setStatus("Invalid username or password");
        }
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <br></br>
      <form onSubmit={Login}>
        <input
          onChange={(e) => {
            setData({ username: e.target.value });
          }}
          placeholder="Enter Username"
        ></input>
        <input
          onChange={(e) => {
            setData({ password: e.target.value });
          }}
          placeholder="Enter Password"
        ></input>
        <h1>{status}</h1>
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
