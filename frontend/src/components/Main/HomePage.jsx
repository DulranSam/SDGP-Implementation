import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

const HomePage = (props) => {
  const { user, isLogged } = props;
  const [time, setTime] = useState("day");
  const [userx, setUser] = useState([]);

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

  async function GetProgress() {
    try {
      const r = await Axios.get("http://localhost:8000/users").then((r) => {
        setUser(r.data);
      });
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    GetProgress();
  }, []);

  return isLogged ? (
    <div>
      <h1>
        Good {time} , Welcome Back {user}!
      </h1>
      <h1>Resume where you left off</h1>
      <div className="math">
        <div>
          <p>
            Progress
            {userx.map((x) => (
              <div key={x.id}>
                <h1>{x.username}</h1>
                <h1>PureMath</h1>
                <Link to="/puremath">
                  <button>PureMath</button>
                </Link>
              </div>
            ))}
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
        <div>
          <Link to="/adduser">
            <button>Click Here to Register</button>
          </Link>
          <Link to="/login">
            <button>Already have an account? Click here to login ✨</button>
          </Link>
          <Link to="/stat">
            <button>StatPage</button>
          </Link>
          <Link to="/puremath">
            <button>PureMath</button>
          </Link>
          <Link to="/forum">
            <button>Visit Forum</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
