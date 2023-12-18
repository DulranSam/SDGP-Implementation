import { useEffect, useState } from "react";
import Axios from "axios";

const Forum = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [status, setStatus] = useState("");

  async function ForumData() {
    try {
      setLoading(true);
      const r = await Axios.get("http://localhost:8000/social").then((r) => {
        setData(r.data);
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function AddQuestion(e) {
    e.preventDefault();
    try {
      if (status !== "") {
        setStatus("");
      }
      setLoading(true);
      const r = await Axios.post("http://localhost:8000/social", {
        data: { response },
      }).then((r) => {
        if (r.status === 200) {
          setStatus("Question Added");
        }
      });
    } catch (err) {
      setStatus("Error Occured, please try again");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    ForumData();
  }, []);

  return (
    <div>
      {loading
        ? "Loading..."
        : data.map((x) => (
            <div key={x._id}>
              <h1>{x.question}</h1>
              <form onSubmit={AddQuestion}>
                <input
                  onChange={(e) => {
                    setResponse(e.target.value);
                  }}
                  placeholder="Enter your response"
                  type="text"
                ></input>
                <button type="submit" disabled={loading}>
                  {loading ? "Loading..." : "Submit"}
                </button>
              </form>
            </div>
          ))}
    </div>
  );
};

export default Forum;
