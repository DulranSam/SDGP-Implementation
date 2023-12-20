import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

const AddStat = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    topic: "",
    question: "",
  });
  const [status, setStatus] = useState("");

  const topicRef = useRef();
  const questionRef = useRef();

  async function AddQuestion(e) {
    e.preventDefault();
    try {
      const { topic, question } = data;
      setLoading(true);
      const r = await Axios.post("http://localhost:8000/admin/pure", {
        body: JSON.stringify({ topic: topic, question: question }),
      }).then((r) => {
        if (r.status === 200) {
          setStatus("Question Added");
        }
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setData({ topic: "", question: "" });
    }
  }

  return (
    <div>
      <h1>Add Statistics Questions</h1>
      <form onSubmit={AddQuestion}>
        <input
          ref={topicRef}
          onChange={(e) => {
            setData({ ...data, topic: e.target.value });
          }}
          placeholder="Enter topic..."
        ></input>
        <input
          ref={questionRef}
          onChange={(e) => {
            setData({ ...data, question: e.target.value });
          }}
          placeholder="Enter Question..."
        ></input>
        <button type="submit" disabled={loading}>
          <p>{status ? status : ""}</p>
          {loading ? "Loading..." : "Add Question"}
        </button>
        <Link to="/">Back to Homepage?</Link>
      </form>
    </div>
  );
};

export default AddStat;
