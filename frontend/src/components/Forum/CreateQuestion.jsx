import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

const CreateQuestion = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [data, setData] = useState([]);

  const EndPoint = "http://localhost:8000/socials";

  async function AddQuestion(e) {
    e.preventDefault();
    try {
      if (status !== "") {
        setStatus("");
      }
      setLoading(true);
      const r = await Axios.post(EndPoint, question);

      if (r.status === 200) {
        setStatus("Question Added");
      } else if (r.status === 409) {
        setStatus("Question already exists!");
      } else {
        setStatus("Error while adding question!");
      }

      navigator("/");
    } catch (err) {
      setStatus("Error Occured, please try again");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function AnsweringQuestions(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const r = await Axios.post(EndPoint, { answer });
      if (r.status === 200) {
        setStatus("Answer Posted!");
      }

      setTimeout(() => {
        navigator("/forum");
      }, 2000);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function GetQuestions() {
    try {
      if (status !== "") {
        setStatus("");
      }
      setLoading(true);
      const r = await Axios.get(EndPoint);
      setData(r.data);
    } catch (err) {
      setStatus("Error Occured while fetching data!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    GetQuestions();
  });

  return (
    <div className="container-fluid">
      {loading ? (
        "Loading..."
      ) : (
        <div>
          <form onSubmit={AddQuestion}>
            <input
              onChange={(e) => {
                setQuestion(e.target.value);
              }}
              placeholder="Enter your question"
              type="text"
            ></input>
            <button type="submit" disabled={loading}>
              {loading ? "Loading..." : "Add Question"}
            </button>
            {status}
          </form>
          <div>
            {data && data.length ? (
              data.map((x, index) => (
                <div key={x._id || index}>
                  <h1>{x.question}</h1>
                </div>
              ))
            ) : (
              <h1>No questions available</h1>
            )}
          </div>
          <form onSubmit={AnsweringQuestions}>
            <input
              onChange={(e) => {
                setAnswer(e.target.value);
              }}
            ></input>
          </form>
          <Link to="/forum">Forum Page</Link>
        </div>
      )}
    </div>
  );
};

export default CreateQuestion;
