import { useEffect } from "react";
import RegistForm from "../components/RegistForm";
import { Typography } from "@material-tailwind/react";

const LoginPage = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="flex h-screen">
      <div className=" w-1/2 bg-grid-pattern-white bg-24px bg-[#1d8af0] h-[100vh] items-start top-0 pt-10 pl-10">
        <Typography className="font-black text-7xl pb-5 top-0 mt-8 flex items-center text-[#ffffff]">
          Register A Free Account Today
        </Typography>
      </div>
      <div className="w-1/2 bg-[#ffffff] flex flex-col items-center justify-center overflow-y-auto max-h-[98vh] top-0 pt-10 pb-10">
        <RegistForm />
      </div>
    </div>
  );
};

export default LoginPage;
