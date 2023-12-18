import { Link } from "react-router-dom";

const HomePage = (props) => {
  const { user, isLogged } = props;
  return (
    <div>
      {isLogged ? (
        <div>
          <h1>Welcome {user} ! Select your choice</h1>
          <button>
            <Link to="/stat">StatPage</Link>
          </button>
          <button>
            <Link to="/puremath">PureMath</Link>
          </button>
        </div>
      ) : (
        <div>
          <h1>Welcome to (CS63 Project Name)!</h1>
          <h2 style={{ margin: "5%" }}>
            Our platform hopes to help you improve your maths skills , with the
            help of personalized learning ✨
          </h2>
          <button>
            <Link path="/adduser">Click Here to Register</Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
