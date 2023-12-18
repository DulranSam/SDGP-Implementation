import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

const StatPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  async function SearchQuestion() {
    try {
      setLoading(true);
      const r = await Axios.get("http://localhost:8000/admin/stat").then(
        (r) => {
          setData(r.data);
        }
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    SearchQuestion();
  }, []);

  return (
    <div>
      {loading
        ? "Loading..."
        : data.map((x, index) => (
            <div key={x._id || index}>
              <p>{x._id}</p>
              <h1>{x?.question}</h1>
              <p>{x?.topic}</p>
              <br></br>
              <Link to="/addstat">Add Questions</Link>
              <Link to="/">Back to Homepage?</Link>
            </div>
          ))}
    </div>
  );
};

export default StatPage;
