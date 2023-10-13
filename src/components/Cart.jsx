import { useContext } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import { MainContext } from "../pages/Home";

const Cart = () => {
    const { dispatch, cart, cartTotal} = useContext(MainContext);

  return (
    <section className="w-full sm:w-[500px] p-5 absolute right-0 top-0 bg-white z-10 shadow-md max-h-screen overflow-scroll">
      <div className="flex justify-between items-center mb-7">
        <h2 className="md:text-[1.4rem] text-[1.25rem] leading-[130%] font-semibold">
          Cart review
        </h2>
        <button onClick={() => dispatch({type: "TOGGLE_CART"})}>
          <CgClose className="md:text-[1.4rem] text-[1.25rem]  font-semibold" />
        </button>
      </div>
      <div className="flex flex-col md:gap-10 gap-5 justify-center">
        {cart.length < 1 ? (
          <p>No item</p>
        ) : (
          cart.map((product) => {
            return (
              <div
                key={product.id}
                className="flex  gap-5 h-[160px] items-center justify-between"
              >
                <div className="md:w-1/2 h-full">
                  <img
                    src={product.images}
                    alt={product.description}
                    className="w-full h-full rounded-[0.5rem]"
                  />{" "}
                </div>
                <div className="md:w-1/2">
                  <h3 className="md:text-[1.4rem] text-[1.25rem] leading-[130%] font-semibold">
                    <span>{product.title}</span>
                  </h3>
                  <p className="md:text-[1.35rem] text-[1.25rem] leading-[130%] font-medium my-2">
                    ${product.price}
                  </p>
                  <div className="w-[200px] flex items-center justify-between gap-5 mb-3 bg-slate-200 py-1 px-4 rounded-sm">
                    <button className="" onClick={() => dispatch({type:"DECREASE_ITEM", payload: product})}>
                      <BiMinus className="text-blue-600 font-semibold text-[1.3rem]" />
                    </button>
                    <p className="font-semibold text-[1.3rem]">{product.quantity}</p>
                    <button onClick={() => dispatch({type:"INCREASE_ITEM", payload: product})}>
                      <BiPlus className="text-blue-600 font-semibold text-[1.3rem]" />
                    </button>
                  </div>
                  <button className="w-[200px] flex justify-center gap-4 items-center py-2 bg-red-600 text-white text-md font-semibold rounded-md" onClick={() => dispatch({type:"REMOVE_ITEM", payload: product})}>
                    Remove
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
      <div className="mt-10">
        <p className="text-xl font-bold mb-5">
          <span>Total:</span> <span>${cartTotal}</span>
        </p>
        <button className="w-[200px] flex justify-center gap-4 items-center py-2 bg-blue-600 text-white text-lg font-semibold rounded-md">
          Checkout
        </button>
      </div>
    </section>
  );
};

export default Cart;
