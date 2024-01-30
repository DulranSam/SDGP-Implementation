import { useState } from "react";

import { GPTSearch } from "./Api";

const GPTLinked = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  async function GetData(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await GPTSearch(search);
      setData(response);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>Ask GPT</h1>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <form onSubmit={GetData}>
          <input
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            placeholder="Ask me anything"
          ></input>
          <button type="submit" disabled={loading}>
            <p>Search</p>
          </button>
          {data && data.length ? JSON.stringify(data) : <p>No results found</p>}
        </form>
      )}
    </div>
  );
};

export default GPTLinked;
