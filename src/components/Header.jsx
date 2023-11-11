import { useContext, useState } from "react";
import { BsCart3 } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import Cart from "./Cart";
import { MainContext } from "../App";

const Header = () => {
  const { dispatch, isCartOpen, isModalOpen, cart, userAuthenticated } =
    useContext(MainContext);
  const [toggleNav, setToggleNav] = useState(false);

  //Logs out the user
  const logout = () => {
    dispatch({ type: "LOG_OUT" });
  };

  return (
    <header className="fixed w-full top-0 z-10 bg-white shadow-md">
      {isModalOpen && <Modal />}
      <div>
        <nav className="w-11/12 xl:w-10/12 mx-auto py-5 lg:py-7 flex justify-between items-center">
          <Link to="/">
            <h2 className="text-blue-600 hover:text-blue-400 text-lg md:text-2xl font-semibold">
              Kodecamp Ecommerce
            </h2>
          </Link>
          <div className="md:flex items-center gap-[2.5rem]">
            <div
              className={`absolute w-screen h-screen bg-[#000000a2] md:bg-white md:w-fit md:h-fit z-20 md:z-10 md:static top-[0rem] ${
                toggleNav ? "left-0" : "-left-[50rem]"
              }`}
            >
              {userAuthenticated?.email ? (
                <div className="flex flex-col md:flex-row md:items-center gap-4 pt-[1.3rem] pb-[1.6rem] px-[1.3rem] md:p-0 w-[300px] md:w-fit bg-white rounded-b-md">
                  <AiOutlineClose
                    className="text-xl cursor-pointer mb-5 md:hidden"
                    onClick={() => setToggleNav(!toggleNav)}
                  />
                  <p className="mr-[1rem] text-lg md:text-xl font-semibold">
                    Happy shopping {userAuthenticated.firstName}!
                  </p>
                  <button
                    onClick={logout}
                    className="bg-blue-600 text-white md:text-lg font-semibold py-2 px-3 md:py-[0.65rem] md:px-5 rounded-lg w-fit"
                  >
                    Log out
                  </button>
                </div>
              ) : (
                <div className="flex flex-col md:flex-row md:items-center gap-4 pt-[1.3rem] pb-[1.6rem] px-[1.3rem] md:p-0 w-[300px] md:w-fit bg-white rounded-b-md">
                  <AiOutlineClose
                    className="text-xl cursor-pointer mb-5 md:hidden"
                    onClick={() => setToggleNav(!toggleNav)}
                  />
                  <Link
                    to={"/login"}
                    className="mr-[1rem] text-lg md:text-xl font-semibold"
                  >
                    Login
                  </Link>
                  <Link
                    to={"/register"}
                    className="bg-blue-600 text-white md:text-lg font-semibold py-2 px-3 md:py-[0.65rem] md:px-5 rounded-lg w-fit"
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </div>
            <div className="flex gap-6">
              <div
                className="relative cursor-pointer"
                title="View cart"
                onClick={() => dispatch({ type: "TOGGLE_CART" })}
              >
                <button className="outline-none">
                  <BsCart3 className="text-xl md:text-2xl hover:text-blue-400" />
                </button>
                {cart?.length > 0 && (
                  <p className="absolute top-[-0.75rem] right-[-0.75rem] md:top-[-0.9rem] md:right-[-0.9rem] bg-blue-600 text-white text-sm md:text-base text-center font-semibold md:w-[1.5rem] md:h-[1.5rem] w-[1.2rem] h-[1.2rem] rounded-full">
                    {cart.length}
                  </p>
                )}
              </div>

              <FaBars
                className="text-xl cursor-pointer md:hidden"
                onClick={() => setToggleNav(!toggleNav)}
              />
            </div>
          </div>
        </nav>
      </div>
      {isCartOpen && <Cart />}
    </header>
  );
};

export default Header;
