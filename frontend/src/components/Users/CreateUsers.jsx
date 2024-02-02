/* eslint-disable no-unused-vars */
import { useState } from "react";
import Axios from "axios";
import { userContext } from "../../App";
import { useContext } from "react";

const CreateUsers = () => {
  const { setUser, user, isLogged } = useContext(userContext);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    username: "",
    password: "",
    mail: "",
    photo: null,
  });
  const [status, setStatus] = useState("");

  async function createUser(e) {
    e.preventDefault();
    const { username, password, mail, photo } = data;

    try {
      if (status !== "") {
        setStatus("");
      }

      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);
      formData.append("mail", mail);
      formData.append("photo", photo); //form cuz we're sending an image!

      setLoading(true);
      const response = await Axios.post("http://localhost:8000/users", data);

      // {
      //   headers: { "Content-Type": "multipart/form-data" },
      // }
      if (response.status === 200) {
        setStatus("Account Created");
        // setUser({ ...user }); //overwrite to parent setUser
      } else if (response.status === 400) {
        setStatus(response.data.Alert || "Bad Request");
      } else if (response.status === 409) {
        setStatus("Username is taken, please try again");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>Register</h1>
      <br></br>
      <form onSubmit={createUser}>
        <input
          onChange={(e) => {
            setData({ ...data, username: e.target.value });
          }}
          placeholder="Enter Username"
          type="text"
        ></input>
        <input
          onChange={(e) => {
            setData({ ...data, password: e.target.value });
          }}
          placeholder="Enter password"
          type="password"
        ></input>
        <input
          onChange={(e) => {
            setData({ ...data, mail: e.target.value });
          }}
          placeholder="Enter mail"
          type="email"
        ></input>
        <input
          onChange={(e) => {
            setData({ ...data, photo: e.target.files[0] });
          }}
          type="file"
        ></input>
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Register"}
        </button>
      </form>
      <p>{status}</p>
    </div>
  );
};

export default CreateUsers;
