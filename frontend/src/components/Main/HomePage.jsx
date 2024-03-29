/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { userContext } from "../../App";
import MathLive from "../Math";

const HomePage = () => {
  const { user, isLogged } = useContext(userContext);
  const [time, setTime] = useState("day");
  const [userx, setUser] = useState([]);

  async function GetProgress() {
    try {
      const r = await Axios.get("http://localhost:8000/users");
      setUser(r.data); //let's use the context api rather than passing it down like props!
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    const date = new Date();
    const hour = date.getHours();

    if (hour < 12) {
      setTime("Morning");
    } else if (hour < 15) {
      setTime("Afternoon");
    } else {
      setTime("Evening");
    }
  }, []);

  useEffect(() => {
    GetProgress();
  }, []);

  return isLogged ? (
    <div>
      <MathLive />
      <h1>
        Good {time} , Welcome Back {user}!
      </h1>
      <h1>Resume where you left off</h1>
      <h1>PureMath</h1>
      <Link to="/puremath">
        <button>PureMath</button>
      </Link>
      <div className="math">
        <div>
          <p>
            Progress
            {userx && userx.length
              ? userx.map((x) => <div key={x.id}></div>)
              : "No results found!"}
          </p>
        </div>

        <div>
          <h1>Forum</h1>
          <Link to="/forum">
            <button>forum</button>
          </Link>
        </div>
      </div>
      <h2></h2>
    </div>
  ) : (
    <div>
      <div className="container-fluid">
        <h1>Good {time}! Welcome to NerdJax</h1>
        <h2 style={{ margin: "5%" }}>
          Our platform hopes to help you improve your maths skills, with the
          help of personalized learning ✨. So join us on this adventure to ace
          your A-Levels like a Champ 🏆
        </h2>
        <button>
          <Link to="/login">
            What you waiting for ? Click here to get started! 🏆🥂
          </Link>
        </button>
      </div>
    </div>
  );
};

export default HomePage;
