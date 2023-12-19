import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HomePage = (props) => {
  const { user, isLogged } = props;
  const [time, setTime] = useState("day");

  const date = new Date();
  const hour = date.getHours();

  // if (hour < 12) {
  //   setTime("Morning");
  // } else if (hour < 17) {
  //   setTime("Afternoon");
  // } else if (hour < 20) {
  //   setTime("Evening");
  // } else {
  //   setTime("Night");
  // }

  return (
    <div>
      {isLogged ? (
        <div>
          <h1>
            Good {time} Welcome {user.username}! Please select your choice{" "}
          </h1>
          <button>
            <Link to="/stat">StatPage</Link>
          </button>
          <button>
            <Link to="/puremath">PureMath</Link>
          </button>
        </div>
      ) : (
        <div className="container-fluid">
          <h1>Good {time}!, Welcome to (CS63 Platform Name)!</h1>
          <h2 style={{ margin: "5%" }}>
            Our platform hopes to help you improve your maths skills , with the
            help of personalized learning ✨ . So join us on this adventure to
            ace your A-Levels like a Champ 🏆
          </h2>
          <button>
            <button>
              <Link to="/adduser">Click Here to Register</Link>
            </button>
            <button>
              <Link to="/login">
                Already have an account? Click here to login ✨
              </Link>
            </button>
            <button>
              <Link to="/stat">StatPage</Link>
            </button>
            <button>
              <Link to="/puremath">PureMath</Link>
            </button>
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
