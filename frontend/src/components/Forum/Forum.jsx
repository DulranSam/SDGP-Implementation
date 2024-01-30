/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Axios from "axios";

const Forum = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [status, setStatus] = useState("");

  let upvotes = 0;

  const EndPoint = "http://localhost:8000/socials";

  async function ForumData() {
    try {
      setLoading(true);
      const r = await Axios.get(EndPoint);
      setData(r.data);
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
      const r = await Axios.post(EndPoint, response);
      if (r.data.status === 200) {
        setStatus("Question Added");
      }
    } catch (err) {
      setStatus("Error Occured, please try again");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  //UPVOTING SYSTEM 👇🏻
  const IncreaseVotes = async (id) => {
    //increase upvotes by 1
    try {
      setLoading(true);
      upvotes++;
      const upvote = await Axios.put(`${EndPoint}/x/${id}`, upvotes);
      if (upvote.data.response.status === 200) {
        setStatus("Upvoted!");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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
              <p>{`Upvoted by ${x.rating}`}</p>
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
                <button
                  type="submit"
                  disabled={loading}
                  onClick={() => {
                    IncreaseVotes(x._id);
                  }}
                >
                  {loading ? "Loading..." : "Rate"}
                </button>
              </form>
              {status}
            </div>
          ))}
    </div>
  );
};

export default Forum;
