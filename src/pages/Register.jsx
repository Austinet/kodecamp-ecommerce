import { AiFillEye, AiFillEyeInvisible, AiOutlineCheck } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useState, useContext, useRef } from "react";
import cartImg from "../assets/images/cart.jpg";
import { MainContext } from "../App";
import Footer from "../components/Footer";
import Header from "../components/Header";

const defaultUser = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
  termsAndCondition: false,
};

const defaultUserErrors = {
  firstName: false,
  lastName: false,
  email: false,
  phoneNumber: false,
  password: false,
  confirmPassword: false,
  termsAndCondition: false,
};

const Register = () => {
  const [success, setSuccess] = useState(false);
  const [newUser, setNewUser] = useState(defaultUser);
  const [passwordType, setPasswordType] = useState("password");
  const [newUserErrors, setNewUserErrors] = useState(defaultUserErrors);
  const { dispatch, usersDB } = useContext(MainContext);
  const passwordView = useRef(null)

  const NAME_REGEX = /^[a-zA-Z][a-zA-Z]{2,}$/;
  const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const PHONE_REGEX = /^\d{11}$/;

  const handleSubmit = (e) => {
    e.preventDefault();
    let validateForm = {};
    let isFormValidated = true;

    if (!NAME_REGEX.test(newUser.firstName)) {
      validateForm = { ...newUserErrors, firstName: true };
      isFormValidated = false;
    } else {
      validateForm = { ...newUserErrors, firstName: false };
    }

    if (!NAME_REGEX.test(newUser.lastName)) {
      validateForm = { ...validateForm, lastName: true };
      isFormValidated = false;
    } else {
      validateForm = { ...validateForm, lastName: false };
    }

    if (usersDB.some((users) => users.email === newUser.email)) {
      validateForm = { ...validateForm, email: true };
      isFormValidated = false;
    } else {
      validateForm = { ...validateForm, email: false };
    }

    if (!PHONE_REGEX.test(newUser.phoneNumber)) {
      validateForm = { ...validateForm, phoneNumber: true };
      isFormValidated = false;
    } else {
      validateForm = { ...validateForm, phoneNumber: false };
    }

    if (!PASSWORD_REGEX.test(newUser.password)) {
      validateForm = { ...validateForm, password: true };
      isFormValidated = false;
    } else {
      validateForm = { ...validateForm, password: false };
    }

    if (newUser.password !== newUser.confirmPassword) {
      validateForm = { ...validateForm, confirmPassword: true };
      isFormValidated = false;
    } else {
      validateForm = { ...validateForm, confirmPassword: false };
    }

    setNewUserErrors(validateForm);

    if (usersDB.some((users) => users.phoneNumber === newUser.phoneNumber)) {
      alert("Phone number already used");
      return;
    }

    if (isFormValidated) {
      dispatch({ type: "ADD_USER", payload: newUser });
      setSuccess(!success);
    } else {
      return;
    }
  };

  const togglePasswordView = () => {
    if (passwordView.current.type === "password") {
      setPasswordType("text")
    } else {
      setPasswordType("password")
    }
  } 

  return (
    <>
      <Header />
      <main>
        <section>
          <div className="w-11/12 xl:w-10/12 mx-auto mt-[5.5rem] mb-[3.5rem] xl:mb-[5rem] lg:mt-[9rem] xl:flex gap-[3rem]">
            <div className="bg-blue-600 xl:w-1/2 rounded-lg md:hidden xl:block">
              <img
                src={cartImg}
                className="w-full h-full rounded-lg"
                alt="Cart background"
              />
            </div>
            <div className="xl:w-1/2 py-2 md:pt-6">
              <div className="mb-[1.5rem] lg:mb-[2rem]">
                <h1 className="text-[1.7rem] text-[#000000d5] font-semibold">
                  Register
                </h1>
                <h2 className="text-lg text-[#000000d5]">Sign up to shop</h2>
              </div>
              <div>
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col md:flex-row gap-3 md:gap-5 mb-3 md:mb-6">
                    <div className="md:w-[50%]">
                      <label
                        htmlFor="firstName"
                        className="text-lg lg:text-xl font-medium text-[#000000d5] inline-block mb-2"
                      >
                        First Name:
                      </label>
                      <input
                        type="text"
                        value={newUser.firstName}
                        onChange={(e) =>
                          setNewUser({ ...newUser, firstName: e.target.value })
                        }
                        className="border border-[#00000093] w-full h-[3.13rem] rounded-lg px-3 outline-none focus:border-2"
                        required
                      />
                      <span
                        className={`text-red-600 ${
                          newUserErrors.firstName ? "block" : "hidden"
                        }`}
                      >
                        Must be more than 2 characters, letters only
                      </span>
                    </div>
                    <div className="md:w-[50%]">
                      <label
                        htmlFor="lastName"
                        className="text-lg lg:text-xl font-medium text-[#000000d5] inline-block mb-2"
                      >
                        Last Name:
                      </label>
                      <input
                        type="text"
                        value={newUser.lastName}
                        onChange={(e) =>
                          setNewUser({ ...newUser, lastName: e.target.value })
                        }
                        className="border border-[#00000093] w-full h-[3.13rem] rounded-lg px-3 outline-none focus:border-2"
                        required
                      />
                      <span
                        className={`text-red-600 ${
                          newUserErrors.lastName ? "block" : "hidden"
                        }`}
                      >
                        Must be more than 2 characters, letters only
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-3 md:gap-5 mb-3 md:mb-6">
                    <div className="md:w-[50%]">
                      <label
                        htmlFor="phoneNumber"
                        className="text-lg lg:text-xl font-medium text-[#000000d5] inline-block mb-2"
                      >
                        Phone Number:
                      </label>
                      <input
                        type="tel"
                        value={newUser.phoneNumber}
                        onChange={(e) =>
                          setNewUser({
                            ...newUser,
                            phoneNumber: e.target.value,
                          })
                        }
                        className="border border-[#00000093] w-full h-[3.13rem] rounded-lg px-3 outline-none focus:border-2"
                        required
                      />
                      <span
                        className={`text-red-600 ${
                          newUserErrors.phoneNumber ? "block" : "hidden"
                        }`}
                      >
                        Phone number must consist of 11 digits
                      </span>
                    </div>
                    <div className="md:w-[50%]">
                      <label
                        htmlFor="email"
                        className="text-lg lg:text-xl font-medium text-[#000000d5] inline-block mb-2"
                      >
                        Email:
                      </label>
                      <input
                        type="email"
                        value={newUser.email}
                        onChange={(e) =>
                          setNewUser({ ...newUser, email: e.target.value })
                        }
                        className="border border-[#00000093] w-full h-[3.13rem] rounded-lg px-3 outline-none focus:border-2"
                        required
                      />
                      <span
                        className={`text-red-600 ${
                          newUserErrors.email ? "block" : "hidden"
                        }`}
                      >
                        Email already used
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-3 md:gap-5 mb-3 md:mb-6">
                    <div className="md:w-[50%]">
                      <label
                        htmlFor="password"
                        className="text-lg lg:text-xl font-medium text-[#000000d5] inline-block mb-2"
                      >
                        Password:
                      </label>
                      <div className="relative">
                        <input
                          type={passwordType}
                          value={newUser.password}
                          onChange={(e) =>
                            setNewUser({ ...newUser, password: e.target.value })
                          }
                          ref={passwordView}
                          className="border border-[#00000093] w-full h-[3.13rem] rounded-lg pl-3 pr-[3rem] outline-none focus:border-2"
                          required
                        />
                        <div className="absolute right-3 top-[0.62rem]" onClick={togglePasswordView}>
                        {
                          passwordView.current.type === "password" ? <AiFillEye className="text-3xl" /> :  <AiFillEyeInvisible className="text-3xl" />
                        }  
                        </div>
                      </div>
                      <span
                        className={`text-red-600 ${
                          newUserErrors.password ? "block" : "hidden"
                        }`}
                      >
                        Must be more than 8 characters, should include upper and
                        lowercase letters, a number and a special character
                        (!@#$%)
                      </span>
                    </div>
                    <div className="md:w-[50%]">
                      <label
                        htmlFor="confirmPassword"
                        className="text-lg lg:text-xl font-medium text-[#000000d5] inline-block mb-2"
                      >
                        Confirm Password:
                      </label>
                      <div className="relative">
                        <input
                          type={passwordType}
                          value={newUser.confirmPassword}
                          onChange={(e) =>
                            setNewUser({
                              ...newUser,
                              confirmPassword: e.target.value,
                            })
                          }
                          ref={passwordView}
                          className="border border-[#00000093] w-full h-[3.13rem] rounded-lg pl-3 pr-[3rem] outline-none focus:border-2"
                          required
                        />
                        <div className="absolute right-3 top-[0.62rem]" onClick={togglePasswordView}>
                        {
                          passwordType === "password" ? <AiFillEye className="text-3xl" /> :  <AiFillEyeInvisible className="text-3xl" />
                        } 
                        </div>
                      </div>
                      <span
                        className={`text-red-600 ${
                          newUserErrors.confirmPassword ? "block" : "hidden"
                        }`}
                      >
                        Must match the password field
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={newUser.termsAndCondition}
                        onChange={(e) =>
                          setNewUser({
                            ...newUser,
                            termsAndCondition: e.currentTarget.checked,
                          })
                        }
                      />
                      <label
                        htmlFor="terms"
                        className="text-[0.82rem] md:text-lg"
                      >
                        <span>I agree to all the </span>
                        <Link className="text-blue-600 font-medium">
                          Terms, Privacy Policy and Conditions
                        </Link>
                      </label>
                    </div>
                    <span className="text-red-600 hidden">
                      Accept Terms, Privacy Policy and Conditions to continue
                    </span>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 text-lg md:text-xl text-center font-semibold bg-blue-600 text-white rounded-lg mt-[1.5rem] mb-2"
                  >
                    Create Account
                  </button>
                  <div className="text-center">
                    <p className="text-[1.125rem] text-[#000000d5] font-medium">
                      <span>Already have an account? </span>
                      <Link to={"/login"} className="text-blue-600">
                        Log in
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Successful registration overlay */}
          <div
            className={`${
              success ? "" : "hidden"
            } fixed bg-[#000000d7] w-full h-full top-0 left-0 flex items-center justify-center z-20`}
          >
            <div className="w-[90%] max-w-[500px] h-[300px] bg-white shadow-xl rounded-lg flex justify-center items-center flex-col text-center">
              <AiOutlineCheck className="inline-block text-[3.5rem] md:text-[4.5rem] text-green-700" />
              <h2 className="text-xl xl:text-2xl font-semibold mb-6">
                Registered Successfully
              </h2>
              <Link
                to={"/login"}
                className="w-[250px] py-3 text-lg md:text-xl text-center font-semibold bg-blue-600 text-white rounded-lg "
              >
                Continue
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Register;
