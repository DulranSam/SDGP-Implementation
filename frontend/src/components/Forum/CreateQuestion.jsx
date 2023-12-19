import { useState } from "react";
import Axios from "axios";

const CreateQuestion = () => {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  async function AddQuestion(e) {
    e.preventDefault();
    try {
      if (status !== "") {
        setStatus("");
      }
      setLoading(true);
      const r = await Axios.post("http://localhost:8000/social", {
        question,
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

  return (
    <div className="container-fluid">
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
    </div>
  );
};

export default CreateQuestion;
