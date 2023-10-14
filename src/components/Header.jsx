import { BsCart3 } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useContext } from "react";
import Cart from "./Cart";
import { MainContext } from "../App";

const Header = () => {
  const { dispatch, isCartOpen, cart } = useContext(MainContext);

  return (
    <header className="fixed w-full top-0 z-10 bg-white shadow-md">
      <div>
        <nav className="w-11/12 lg:w-10/12 mx-auto py-5 lg:py-7 flex justify-between items-center">
          <Link to="/">
            <h2 className="text-blue-600 hover:text-blue-400 text-lg md:text-2xl font-semibold">
              Kodecamp Ecommerce
            </h2>
          </Link>
          <div
            className="relative cursor-pointer"
            title="View cart"
            onClick={() => dispatch({ type: "TOGGLE_CART" })}
          >
            <button className="outline-none">
              <BsCart3 className="md:text-2xl text-xl hover:text-blue-400" />
            </button>
            {cart.length > 0 && (
              <p className="absolute top-[-0.75rem] right-[-0.75rem] md:top-[-0.9rem] md:right-[-0.9rem] bg-blue-600 text-white text-sm md:text-base text-center font-semibold md:w-[1.5rem] md:h-[1.5rem] w-[1.2rem] h-[1.2rem] rounded-full">
                {cart.length}
              </p>
            )}
          </div>
        </nav>
      </div>
      {isCartOpen && <Cart />}
    </header>
  );
};

export default Header;
