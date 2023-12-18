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
      setLoading(true);

      const { topic, question } = data;

      const response = await Axios.post("http://localhost:8000/admin/pure", {
        topic: topic,
        question: question,
      });

      if (response.status === 200) {
        setStatus("Question Added");
      }
    } catch (err) {
      console.error("Error adding question:", err);
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
          value={data.topic}
          onChange={(e) => {
            setData({ ...data, topic: e.target.value });
          }}
          placeholder="Enter topic..."
        ></input>
        <input
          ref={questionRef}
          value={data.question}
          onChange={(e) => {
            setData({ ...data, question: e.target.value });
          }}
          placeholder="Enter Question..."
        ></input>
        <button type="submit" disabled={loading}>
          <p>{status}</p>
          {loading ? "Loading..." : "Add Question"}
        </button>
        <Link to="/">Back to Homepage?</Link>
      </form>
    </div>
  );
};

export default AddStat;
