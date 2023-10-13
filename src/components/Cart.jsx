import { useContext } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import { BsTrashFill } from "react-icons/bs";
import { MainContext } from "../App";

const Cart = () => {
  const { dispatch, cart, cartTotal } = useContext(MainContext);

  return (
    <section className="w-[95%] sm:w-[500px] p-5 fixed right-0 top-0 bg-white z-10 shadow-md max-h-screen overflow-y-scroll">
      <div className="flex justify-between items-center md:mb-7 mb-4">
        <h2 className="md:text-[1.4rem] text-[1.2rem] leading-[130%] font-semibold">
          Cart review
        </h2>
        <button onClick={() => dispatch({ type: "TOGGLE_CART" })}>
          <CgClose className="md:text-[1.4rem] text-[1.2rem] font-semibold" />
        </button>
      </div>
      <div className="flex flex-col md:gap-10 gap-5 justify-center">
        {cart.length < 1 ? (
          <p>Your cart is empty, add products!</p>
        ) : (
          cart.map((product) => {
            return (
              <div
                key={product.id}
                className="flex gap-5 h-[150px] items-center justify-between"
              >
                <div className="w-1/2 h-full">
                  <img
                    src={product.images}
                    alt={product.description}
                    className="w-full h-full rounded-[0.5rem]"
                  />{" "}
                </div>
                <div className="w-1/2">
                  <h3 className="md:text-[1.4rem] text-base leading-[130%] font-semibold">
                    <span>{product.title}</span>
                  </h3>
                  <p className="md:text-[1.35rem] text-[1.1rem] leading-[130%] font-medium md:my-2 my-1">
                    ${product.price}
                  </p>
                  <div className="md:w-[200px] w-full flex items-center justify-between gap-5 mb-3 bg-slate-200 py-1 px-4 rounded-sm">
                    <button
                      className=""
                      onClick={() =>
                        dispatch({ type: "DECREASE_ITEM", payload: product })
                      }
                    >
                      <BiMinus className="text-blue-600 font-semibold md:text-[1.3rem] text-lg hover:text-blue-400" />
                    </button>
                    <p className="font-semibold md:text-[1.3rem] text-lg">
                      {product.quantity}
                    </p>
                    <button
                      onClick={() =>
                        dispatch({
                          type: "INCREASE_ITEM",
                          payload: { ...product, quantity: 1 },
                        })
                      }
                    >
                      <BiPlus className="text-blue-600 font-semibold text-[1.3rem] hover:text-blue-400" />
                    </button>
                  </div>
                  <button
                    className="md:w-[200px] w-full flex justify-center gap-2 items-center py-2 bg-red-600 hover:bg-red-400 outline-none text-white text-md font-semibold rounded-md"
                    onClick={() =>
                      dispatch({ type: "REMOVE_ITEM", payload: product })
                    }
                  >
                    <BsTrashFill />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
      <div className="md:mt-10 mt-3">
        <p className="md:text-xl text-lg font-bold mb-5">
          <span>Total:</span> <span>${cartTotal}</span>
        </p>
        <button className="md:w-[200px] w-full flex justify-center gap-4 items-center py-2 bg-blue-600 hover:bg-blue-400 outline-none text-white text-lg font-semibold rounded-md">
          Checkout
        </button>
      </div>
    </section>
  );
};

export default Cart;
