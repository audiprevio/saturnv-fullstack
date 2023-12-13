import React from 'react';
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

const RegisterFormSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  firstName: Yup.string()
    .required('Required'),
  lastName: Yup.string()
    .required('Required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  jobTitle: Yup.string()
    .required('Required'),
  role: Yup.string()
    .required('Required'),
});

const RegisterForm = () => {
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_APP_API_URL;

  const formik = useFormik({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      jobTitle: '',
      role: '',
    },
    validationSchema: RegisterFormSchema,
    onSubmit: async (values) => {
      console.log(values);
      try {
        const response = await fetch(`${apiUrl}/users/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
    
        if (response.ok) {
          const data = await response.json();
          console.log(data.message); 
          navigate('/login');
        } else {
          const data = await response.json();
          console.log(data.message); 
          toast.error(data.message); 
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while registering. Please try again.");
      }
    },
  });

  return (
    <Card color="transparent" shadow={false}>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={formik.handleSubmit}>
        <div className="mb-1 flex flex-col gap-6">
        <Typography className="font-semibold text-[#000000] text-xl text-start">
          Start using SaturnV by creating a free account for you today
        </Typography>
          <Input
            size="lg"
            label="First Name"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="firstName"
            className='bg-white'
          />
          {formik.touched.firstName && formik.errors.firstName ? (
            <div className="text-red-500">{formik.errors.firstName}</div>
          ) : null}

          <Input
            size="lg"
            label="Last Name"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="lastName"
            className='bg-white'
          />
          {formik.touched.lastName && formik.errors.lastName ? (
            <div className="text-red-500">{formik.errors.lastName}</div>
          ) : null}

          <Input
            size="lg"
            label="Job Title"
            value={formik.values.jobTitle}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="jobTitle"
            className='bg-white'
          />
          {formik.touched.jobTitle && formik.errors.jobTitle ? (
            <div className="text-red-500">{formik.errors.jobTitle}</div>
          ) : null}

          <Input
            size="lg"
            label="Role (admin/staff)"
            value={formik.values.role}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="role"
            className='bg-white'
          />
          {formik.touched.role && formik.errors.role ? (
            <div className="text-red-500">{formik.errors.role}</div>
          ) : null}

          <Input
            size="lg"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="email"
            className='bg-white'
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
            className='bg-white'
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500">{formik.errors.password}</div>
          ) : null}
        </div>
        <Button className="mt-6 bg-[#1D9BF0] font-medium  text-base" style={{ textTransform: "capitalize" }} fullWidth type="submit">
          Register
        </Button>
        <Link to={`/login`}>
        <Button className="mt-3 text-[#0F141A] font-medium text-base shadow-none underline underline-offset-4" variant='text' style={{ textTransform: "capitalize" }} fullWidth>
          Log In Instead
        </Button>
        </Link>
      </form>
    </Card>
  );
};

export default RegisterForm;

