import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { MainContext } from "../App";
import cartImg from "../assets/images/cart.jpg";

const defaultDetails = {
  email: "",
  password: "",
  keepLoggedIn: false,
};
const defaultUserErrors = {
  email: false,
  password: false,
};

const Login = () => {
  const [userLogin, setUserLogin] = useState(defaultDetails);
  const [userLoginErrors, setUserLoginErrors] = useState(defaultUserErrors);

  const { dispatch, usersDB } = useContext(MainContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userLogin);
    console.log(usersDB);

    const authenticate = usersDB.filter(
      (users) => users.email === userLogin.email
    );
    if (authenticate[0]) {
      if (authenticate[0].password === userLogin.password) {
        alert("Successfully logged in");
        dispatch({ type: "USER_LOGGED_IN", payload: userLogin });
        navigate("/");
      } else {
        console.log("Incorrect password");
        setUserLoginErrors({...userLoginErrors, password: true})
      }
    } else {
      // setSuccess(!success)
      console.log("Email not found, please sign up");
      setUserLoginErrors({...userLoginErrors, email: true})
    }
  };
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
                <h1 className="text-[1.7rem] xl:text-[2rem] text-[#000000d5] font-semibold">
                  Login
                </h1>
              </div>
              <div>
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-3 md:gap-8 mb-3 md:mb-6">
                    <div>
                      <label
                        htmlFor="email"
                        className="text-lg lg:text-xl font-medium text-[#000000d5] inline-block mb-2 lg:mb-4"
                      >
                        Email:
                      </label>
                      <input
                        type="email"
                        value={userLogin.email}
                        onChange={(e) =>
                          setUserLogin({ ...userLogin, email: e.target.value })
                        }
                        name="email"
                        id="email"
                        className="border border-[#00000093] w-full h-[3.13rem] md: rounded-lg px-3 outline-none focus:border-2"
                        required
                      />
                      <span
                        className={`text-red-600 ${
                          userLoginErrors.email ? "block" : "hidden"
                        }`}
                      >
                        Email not found, please sign up
                      </span>
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="text-lg lg:text-xl font-medium text-[#000000d5] inline-block mb-2 lg:mb-4"
                      >
                        Password:
                      </label>
                      <input
                        type="password"
                        value={userLogin.password}
                        onChange={(e) =>
                          setUserLogin({
                            ...userLogin,
                            password: e.target.value,
                          })
                        }
                        name="password"
                        id="password"
                        className="border border-[#00000093] w-full h-[3.13rem] rounded-lg px-3 outline-none focus:border-2"
                        required
                      />
                      {/* <img
                        src="assets/icons/eye-icon.svg"
                        alt="eye icon"
                        role="button"
                      /> */}
                      <span
                        className={`text-red-600 ${
                          userLoginErrors.password ? "block" : "hidden"
                        }`}
                      >
                        Incorrect password
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={userLogin.keepLoggedIn}
                        onChange={(e) =>
                          setUserLogin({
                            ...userLogin,
                            keepLoggedIn: e.currentTarget.checked,
                          })
                        }
                        name="terms"
                        id="terms"
                      />
                      <label htmlFor="terms" className="text-lg md:font-medium">
                        <span>Keep me logged in</span>
                      </label>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 text-lg md:text-xl text-center font-semibold bg-blue-600 text-white rounded-lg mt-[1.5rem] mb-2"
                  >
                    Login
                  </button>
                  <div className="text-center">
                    <p className="text-[1.125rem] text-[#000000d5] font-medium">
                      <span>Don&apos;t have an account? </span>
                      <Link to={"/register"} className="text-blue-600">
                        Sign up
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Login;
