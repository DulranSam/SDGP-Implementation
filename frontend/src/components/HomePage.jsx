import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HomePage = (props) => {
  // const { user, isLogged } = props;
  const [time, setTime] = useState("day");

  useEffect(() => {
    const date = new Date();
    const hour = date.getHours();

    if (hour < 12) {
      setTime("Morning");
    } else if (hour < 15) {
      setTime("Afternoon");
    } else if (hour < 17) {
      setTime("Evening");
    } else {
      setTime("Night"); //is this inclusive lol ?
    }
  }, []);

  return (
    <div>
      <div className="container-fluid">
        <h1>Good {time}! , Welcome to NerdJax</h1>
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
