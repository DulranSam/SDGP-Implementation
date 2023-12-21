import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState("tester"); //let's modify to props later
  const [rank, setRank] = useState(100);
  const [progress, setProg] = useState({
    //how we're going to predict this is something we still need to think about
    statistics: "",
    puremaths: "",
  });

  // useEffect(() => {
  //   setRank(rank + 1); //just testing
  // }, [rank]);

  const { statistics, puremaths } = progress;

  return (
    <div>
      <h1>Welcome back {user}!</h1>
      <div>You are rank #{rank}</div>
      <div className="progress" style={{ border: "12px black" }}>
        <label>
          <div
            className="stateProg"
            style={{
              width: "100px",
              height: "100px",
              padding: "2%",
            }}
          >
            <h1>Statistics</h1>
            <p>{statistics}% complete</p>
            <button>
              <Link to="/stat">Continue</Link>
            </button>
          </div>
          <div className="pureProg">
            <h1>Pure Maths 1</h1>
            <p>{puremaths}% complete</p>
            <button>
              <Link to="/puremath">Continue</Link>
            </button>
          </div>
        </label>
      </div>
    </div>
  );
};

export default Dashboard;
