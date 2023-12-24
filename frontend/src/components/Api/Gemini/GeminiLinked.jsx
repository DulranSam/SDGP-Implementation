import { useState } from "react";
import Axios from "axios";

function Gemini() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const endPoint = "http://localhost:8000/gemini";

  async function GatherData(e) {
    setData([]);
    e.preventDefault();
    try {
      setLoading(true);
      const response = await Axios.post(endPoint, {
        search: search,
      });
      setData(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <form onSubmit={GatherData}>
        <input
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          placeholder="Say something"
        />
        <button type="submit" disabled={loading}>
          {loading ? <h1>Loading</h1> : <p>Search</p>}
        </button>
        {data && data.length ? JSON.stringify(data) : <h1>No results found</h1>}
      </form>
    </>
  );
}

export default Gemini;
