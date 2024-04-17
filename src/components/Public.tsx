import { Link } from "react-router-dom";

const Public = () => {
  return (
    <>
      <div>Welcome</div>
      <Link to={"/login"}>Login</Link>
    </>
  );
};

export default Public;
