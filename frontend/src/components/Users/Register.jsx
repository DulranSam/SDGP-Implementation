import { userContext } from "../../App";
import { NewUser } from "../Api/Api";
import { useContext, useState } from "react";

const RegisterPage = () => {
  const { status, setStatus } = useContext(userContext);
  const [data, setData] = useState({ username: "", password: "", mail: "" });

  async function createUser(e) {
    e.preventDefault();
    try {
      const data = await NewUser(data);
      if (data.status === 200) {
        setStatus("Registered!");
      }
      //needs to implement user setting logic
      setTimeout(() => {
        navigator("/");
      }, 3000);
    } catch (err) {
      console.error(err);
    }
  }

  const handleChange = (e) => {
    {
      setData({ ...data, [e.target.name]: e.target.value });
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={createUser}>
        <input
          onChange={handleChange}
          name="username"
          placeholder="Enter username..."
          type="text"
          required
        ></input>
        <input
          onChange={handleChange}
          name="password"
          placeholder="Enter password..."
          type="password"
          required
        ></input>
        <input
          onChange={handleChange}
          name="mail"
          placeholder="Enter mail..."
          type="mail"
          required
        ></input>
      </form>
      {status}
    </div>
  );
};

export default RegisterPage;
