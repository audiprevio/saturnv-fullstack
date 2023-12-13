import { useEffect } from "react";
import LoginForm from "../components/LoginForm";
import { Link } from "react-router-dom";
import icon from "../assets/icon.svg";

const LoginPage = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="absolute top-10 pb-20 w-[10rem] items-center flex">
        <Link to={`/home`}>
          <img src={icon} />
        </Link>
      </div>
      <div className="bg-grid-pattern bg-24px w-full bg-white flex items-center justify-center overflow-y-auto max-h-screen">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
