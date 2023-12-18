import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <h1>HomePage</h1>
      <Link to="/stat">StatPage</Link>
      <br></br>
      <Link to="/puremath">PureMath</Link>
    </div>
  );
};

export default HomePage;
