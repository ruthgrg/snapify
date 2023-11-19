import { Link } from "react-router-dom";

const Entry = () => {
  return (
    <div className="bg-black flex flex-col items-center justify-center text-primary-500 gap-3 w-screen h-[100%]">
      <Link to="/sign-in">
        Click here to{" "}
        <span className="text-decoration-line: underline">sign in</span>
      </Link>
      <Link to="/sign-up">
        If you dont have account then{" "}
        <span className="text-decoration-line: underline">sign up!</span>
      </Link>
    </div>
  );
};

export default Entry;
