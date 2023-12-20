import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import Axios from "axios";

const StatPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  async function SearchQuestion() {
    try {
      setLoading(true);
      const response = await Axios.get("http://localhost:8000/admin/stat");
      setData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    SearchQuestion();
  }, []);

  return (
    <div>
      {loading
        ? "Loading..."
        : data.map((x, index) => (
            <div key={x._id || index}>
              <MathJaxContext>
                <MathJax>{x.question}</MathJax>
              </MathJaxContext>

              <p>{x?.topic}</p>
              <br />
              <div>
                <Link to="/stat/addstat">Add Questions</Link>
                <Link to="/">Back to Homepage?</Link>
              </div>
            </div>
          ))}
    </div>
  );
};

export default StatPage;
