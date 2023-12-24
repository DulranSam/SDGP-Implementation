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

  async function deleteUser(id) {
    try {
      setLoading(true);
      const response = await Axios.delete(`http://localhost:8000/users/${id}`); //params
      if (response.status === 200) {
        setStatus("Account Deleted");
        fetchUsers(); // Fetch users again after deletion
      } else if (response.status === 400) {
        setStatus("Account Doesn't Exist?");
      } else {
        setStatus("Error Occurred");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setLoading(false);
    }
  }

  async function updateUser(id) {
    try {
      if (status !== "") {
        setStatus("");
      }
      setLoading(true);
      const response = await Axios.put(`http://localhost:8000/users/${id} `, {
        //params
        updatedUsername: newer,
      });
      if (response.status === 200) {
        setStatus("Username updated!");
        fetchUsers(); // Fetch users again after update
      } else if (response.status === 400) {
        setStatus("Account Doesn't Exist?");
      } else {
        setStatus("Error Occurred");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setLoading(false);
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
                  deleteUser(user._id);
                }}
              >
                Delete User
              </button>
              <div>
                <input
                  onChange={(e) => {
                    setNewUsername(e.target.value);
                  }}
                  placeholder="Enter Updated Username"
                />
                <button
                  onClick={() => {
                    updateUser(user._id);
                  }}
                >
                  Update User
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
