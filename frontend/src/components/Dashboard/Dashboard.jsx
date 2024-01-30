/* eslint-disable no-unused-vars */
import { useEffect, useState, useContext } from "react";
import { userContext } from "../../App";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const datax = useContext(userContext);
  const { user, rank } = datax;

  const [progress, setProg] = useState({
    //how we're going to predict this is something we still need to think about
    statistics: 75,
    puremaths: 50,
  });

  const { statistics, puremaths } = progress;

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Good Morning {user}!</h2>
      <div className="progress">
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
