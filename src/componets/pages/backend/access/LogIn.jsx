import { imgPath } from '@/componets/helpers/functions-general';
import { ArrowLeft, Eye, EyeClosed, EyeOff } from 'lucide-react';
import React from 'react'
import { Link } from 'react-router-dom';
import { Form, Formik } from "formik";
import * as Yup from "Yup";
import { InputText } from '@/componets/helpers/FormInputs';

const LogIn = () => {
  const [theme, setTheme] = React.useState(localStorage.getItem("theme"));
  const [showPassword, setShowPassword] = React.useState(false)
 
  React.useEffect(() => {
    function setThemeColor() {
      const html = document.querySelector("html");
      html.setAttribute("class", "");
      html.classList.add(theme);
      setTheme(localStorage.getItem("theme"));
    }

    setThemeColor();
  }, [theme]);


  const initVal = {
    user_developer_email: "",
    password: "",
  };
  const yupSchema = Yup.object({
    user_developer_email: Yup.string()
      .required("Required")
      .email("Invalid email"),
    password: Yup.string().required("Required"),
  });


  return (
    <main className='h-screen bg-primary center-all'>
          <div className='login-main bg-secondary max-w-[320px] w-full p-4 border border-line rounded-md'>
            <img src={`${imgPath}/jollibee-logo.webp`} className='w-[150px] mx-auto mb-2' alt="" />
            <h5 className='text-center'>Welcome to Jollibee Kiosk System</h5>


            <Formik
            initialValues={initVal}
            validationSchema={yupSchema}
            onSubmit={async (values) => {
              console.log(values);
            }}
          >
            {(props) => {
              return (
                <Form>
                  <div className="input-wrap">
                    <InputText
                      label="Email"
                      type="email"
                      className="!py-2"
                      name="user_developer_email"
                    />
                  </div>
                  <div className="input-wrap">
                    <InputText
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      className="!py-2"
                      name="password"
                    />
                    <button
                      className="absolute bottom-2.5 right-2"
                      onClick={() => setShowPassword(!showPassword)}
                      type="button"
                    >
                      {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                  </div>
                  <p className="text-right">
                    <Link
                      to="/admin/forgot-password"
                      className="text-xs italic hover:text-accent"
                    >
                      Forgot Password
                    </Link>
                  </p>

                  <button className="btn btn-accent w-full center-all mt-5">
                    LogIn
                  </button>

                  <Link
                    to="/"
                    className="text-sm text-center block mt-5 hover:text-accent flex center-all gap-1"
                  >
                    <ArrowLeft />
                    Go Back To Kiosk
                  </Link>
                </Form>
              );
            }}
          </Formik>
          </div>
    </main>
  )
}

export default LogIn