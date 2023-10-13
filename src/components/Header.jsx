import { BsCart3 } from "react-icons/bs";
import Cart from "./Cart";
import { useContext } from "react";
import { MainContext } from "../pages/Home";
import { Link } from "react-router-dom";

const Header = () => {
  const { dispatch, isCartOpen, cart } = useContext(MainContext);

  return (
    <header className="lg:static fixed w-full top-0 z-10 bg-white shadow-md">
      <div>
        <nav className="w-11/12 lg:w-10/12 mx-auto py-5 lg:py-7 flex justify-between items-center">
          <Link to="/">
            <h2 className="text-blue-600 text-xl lg:text-2xl font-semibold">
              Kodecamp Ecommerce
            </h2>
          </Link>
          <div
            className="relative cursor-pointer"
            title="View cart"
            onClick={() => dispatch({ type: "TOGGLE_CART" })}
          >
            <button className="outline-none">
              <BsCart3 className="text-2xl" />
            </button>
            {cart.length > 0 && (
              <p className="absolute top-[-0.9rem] right-[-0.9rem] bg-blue-600 text-white text-center font-semibold w-[1.5rem] h-[1.5rem] rounded-full">
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
