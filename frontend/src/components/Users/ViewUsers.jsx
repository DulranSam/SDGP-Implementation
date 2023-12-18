import { useEffect, useState } from "react";
import Axios from "axios";

const ViewUsers = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      {loading
        ? "Loading..."
        : data.map((user, index) => (
            <div key={user._id || index}>
              <h1>{user.username}</h1>
              <p>{user.password}</p>
              <h2>{user.mail}</h2>
            </div>
          ))}
    </div>
  );
};

export default ViewUsers;
