import { useState } from "react";
import Axios from "axios";

const CreateUsers = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    username: "",
    password: "",
    mail: "",
  });
  const [status, setStatus] = useState("");

  async function CreateUser(e) {
    e.preventDefault();
    const { username, password, mail } = data;
    try {
      setLoading(true);
      const r = await Axios.post("http://localhost:8000/user", {
        data: {
          username,
          password,
          mail,
        },
      }).then((r) => {
        if (r.status === 200) {
          setStatus(`Account Created`);
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
      {loading ? (
        "Loading..."
      ) : (
        <div>
          <h1>Register</h1>
          <form onSubmit={CreateUser}>
            <input
              onChange={(e) => {
                setData({ ...data, username: e.target.value });
              }}
              placeholder="Enter Username"
            ></input>
            <input
              onChange={(e) => {
                setData({ ...data, password: e.target.value });
              }}
              placeholder="Enter password"
            ></input>
            <input
              onChange={(e) => {
                setData({ ...data, mail: e.target.value });
              }}
              placeholder="Enter mail"
            ></input>
            <button type="submit" disabled={loading}>
              {loading ? "Loading..." : "Create User"}
            </button>
          </form>
          {status}
        </div>
      )}
    </div>
  );
};

export default CreateUsers;
