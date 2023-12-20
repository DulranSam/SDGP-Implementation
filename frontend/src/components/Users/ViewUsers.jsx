import { useEffect, useState } from "react";
import Axios from "axios";

const ViewUsers = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [newer, setNewUsername] = useState("");

  async function fetchUsers() {
    try {
      setLoading(true);
      const response = await Axios.get("http://localhost:8000/users");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }

  async function DeleteUser(id) {
    try {
      setLoading(true);
      const response = await Axios.delete(`http://localhost:8000/users/${id}`);
      if (response.status === 200) {
        setStatus("Account Deleted");
      } else if (response.status === 400) {
        setStatus("Account Doesn't Exist?");
      } else {
        setStatus("Error Occured");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
      window.location.reload();
    }
  }

  async function updateUser(id) {
    try {
      setLoading(true);
      const response = await Axios.put(`http://localhost:8000/users/${id}`);
      if (response.status === 200) {
        setStatus("Username updated");
      } else if (response.status === 400) {
        setStatus("Account Doesn't Exist?");
      } else {
        setStatus("Error Occured");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
      window.location.reload();
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      {data && data.length ? (
        loading ? (
          "Loading..."
        ) : (
          data.map((user, index) => (
            <div key={user._id || index}>
              <h1>Username : {user.username}</h1>
              <p>Password : {user.password}</p>
              <h2>Mail : {user.mail}</h2>
              <button
                onClick={() => {
                  DeleteUser(user._id);
                }}
              >
                {user._id ? <p>Delete User</p> : <p>User not found</p>}
              </button>
              <div>
                <input
                  onChange={(e) => {
                    setNewUsername(e.target.value);
                  }}
                  placeholder="Enter Updated Username"
                  value={newer}
                ></input>
                <button
                  onClick={() => {
                    updateUser(user._id, newer);
                  }}
                >
                  {user._id ? <p>update User</p> : <p>User not found</p>}
                </button>
              </div>
            </div>
          ))
        )
      ) : (
        <h1>No users found</h1>
      )}
    </div>
  );
};

export default ViewUsers;
