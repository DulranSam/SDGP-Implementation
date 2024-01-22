import { Link } from "react-router-dom";

const Unknown = () => {
  return (
    <div>
      <h1>This is an unknown Path! 😕</h1>
      <p>
        Click <Link to="/">Here</Link> to go back to the HomePage!
      </p>
    </div>
  );
};

export default Unknown;
