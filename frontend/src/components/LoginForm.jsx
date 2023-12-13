import React from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";

const apiUrl = import.meta.env.VITE_APP_API_URL;

const LoginFormSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

const LoginForm = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginFormSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch(`${apiUrl}/users/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data.message); 
          localStorage.setItem("jwt", data.token); 
          navigate("/");
        } else {
          const data = await response.json();
          console.log(data.message); 
          toast.error(data.message); 
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while logging in. Please try again."); // Display generic error message in a toast
      }
    },
  });

  return (
    <div className="flex flex-col items-center justify-center">
      <Typography className="text-center font-black text-8xl px-[10rem] pb-5 top-0 pt-0 mt-0 text-[#000000]">
        Your Go To Geospatial Task Manager
      </Typography>
      <Typography className="text-center font-normal text-[#666666] text-xl">
        Powered by Google Map API, SaturnV allows your organization to track your
        tasks geospatially using Google Map.
      </Typography>

      <form
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        onSubmit={formik.handleSubmit}
      >
        <div className="mb-1 flex flex-col gap-6">
          <Input
            size="lg"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="email"
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500">{formik.errors.email}</div>
          ) : null}

          <Input
            type="password"
            size="lg"
            label="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="password"
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500">{formik.errors.password}</div>
          ) : null}
        </div>
        <Button
          className="mt-6 bg-[#1D9BF0] font-medium text-base"
          fullWidth
          style={{ textTransform: "capitalize" }}
          type="submit"
        >
          Sign In
        </Button>
        <Link to={`/register`}>
          <Button
            className="mt-3 text-[#0F141A] font-medium text-base shadow-none underline underline-offset-4"
            variant="text"
            style={{ textTransform: "capitalize" }}
            fullWidth
          >
            Don't have an account? Register Instead
          </Button>
        </Link>
      </form>
    </div>
  );
};

export default LoginForm;
