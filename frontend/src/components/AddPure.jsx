import React, { useRef, useState } from "react";
import Axios from "axios";

const AddPure = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    topic: "",
    question: "",
  });

  const topicRef = useRef();
  const questionRef = useRef();

  async function AddQuestion() {
    try {
      setLoading(true);
      const r = await Axios.post("http://localhost:8000/admin/pure", {
        data: {
          topic: data.topic,
          question: data.question,
        },
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      topicRef.current.value = "";
      questionRef.current.value = "";
    }
  }

  return (
    <div>
      <h1>Add Pure Maths Questions</h1>
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
          {loading ? "Loading..." : "Add User"}
        </button>
      </form>
    </div>
  );
};

export default AddPure;
