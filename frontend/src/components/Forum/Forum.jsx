/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Axios from "axios";
import { BallTriangle } from "react-loader-spinner";

const Forum = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [status, setStatus] = useState("");

  const EndPoint = "http://localhost:8000/socials";

  const increaseVotes = async (id) => {
    try {
      setLoading(true);
      const updatedData = data.map((item) =>
        item._id === id ? { ...item, rating: item.rating + 1 } : item
      );
      setData(updatedData);
      const upvote = await Axios.put(`${EndPoint}/x/${id}`, {
        rating: updatedData.find((item) => item._id === id)?.rating,
      });
      if (upvote.data.response.status === 200) {
        setStatus("Upvoted!");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const forumData = async () => {
    try {
      setLoading(true);
      const response = await Axios.get(EndPoint);
      setData(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addQuestion = async (e) => {
    e.preventDefault();
    try {
      if (status !== "") {
        setStatus("");
      }
      setLoading(true);
      const response = await Axios.put(EndPoint, { question: response });
      if (response.data.status === 200) {
        setStatus("Question Added");
        forumData(); // Refresh the data after adding a question
      }
    } catch (err) {
      setStatus("Error Occurred, please try again");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    forumData();
  }, []);

  return (
    <div>
      {loading ? (
        <BallTriangle />
      ) : data && data.length ? (
        data.map((x) => (
          <div key={x._id}>
            <h1>{x.question}</h1>
            <h2>{x?.answer ? x.answer : "Be the first to Answer! 🥳"}</h2>
            <p>{`Upvoted by ${x.rating}`}</p>
            <form onSubmit={addQuestion}>
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
                type="button"
                disabled={loading}
                onClick={() => {
                  increaseVotes(x._id);
                }}
              >
                {loading ? <BallTriangle /> : "Rate"}
              </button>
            </form>
            {status}
          </div>
        ))
      ) : (
        <h1>No forum questions added yet!</h1>
      )}
    </div>
  );
};

export default Forum;
