import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { MathJax, MathJaxContext } from "better-react-mathjax";

const PureMath = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  async function SearchQuestion() {
    try {
      setLoading(true);
      const r = await Axios.get("http://localhost:8000/admin/pure");
      setData(r.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    SearchQuestion();
  }, []);

  return (
    <div>
      <p>
        {loading ? (
          "Loading..."
        ) : data && data.length ? (
          data.map((x, index) => (
            <div key={x._id || index}>
              <div className="question"></div>
              <h1>{x.question}</h1>
              <p>{x.topic}</p>
              <br></br>
            </div>
          ))
        ) : (
          <p>No results found</p>
        )}
        <Link to="/puremath/addpure">Add Pure Maths Questions</Link>
        <Link to="/">Back to Homepage?</Link>
      </p>
      <MathJaxContext>
        <MathJax>{"$$(2 x-3)^2-\\frac{4}{(2 x-3)^2}-3=0 .$$"}</MathJax>
        {/**Testing Math Jax */}
      </MathJaxContext>
    </div>
  );
};

export default PureMath;
