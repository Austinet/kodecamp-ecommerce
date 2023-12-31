import { useContext } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import { BsTrashFill } from "react-icons/bs";
import { MainContext } from "../App";

const Cart = () => {
  const { dispatch, cart, cartTotal } = useContext(MainContext);

  const removeProduct = (product) => {
    if (confirm(`Remove ${product.title} from Cart?`)) {
      dispatch({ type: "REMOVE_ITEM", payload: product });
    }
  };

  return (
    <section className="w-[100vw] min-h-[100vh] p-5 fixed top-0 bg-[#0000009c] z-10">
      <div className="w-[95%] bg-white sm:w-[450px] p-5 fixed right-0 top-0 overflow-y-scroll max-h-screen rounded-b-md shadow-md">
        <div className="flex justify-between items-center md:mb-7 mb-4">
          <h2 className="md:text-[1.4rem] text-[1.2rem] leading-[130%] font-semibold">
            Cart review
          </h2>
          <button onClick={() => dispatch({ type: "TOGGLE_CART" })}>
            <CgClose className="md:text-[1.4rem] text-[1.2rem] font-semibold" />
          </button>
        </div>
        <div className="flex flex-col md:gap-10 gap-5 justify-center">
          {cart?.length < 1 ? (
            <p>Your cart is empty, add products!</p>
          ) : (
            cart?.map((product) => {
              return (
                <div
                  key={product.id}
                  className="flex gap-3 h-[150px] items-center justify-between"
                >
                  <div className="w-1/3 h-full">
                    <img
                      src={product.image}
                      alt={product.description}
                      className="h-full rounded-[0.5rem] "
                    />
                  </div>
                  <div className="w-2/3 flex flex-col gap-3">
                    <h3 className="sm:text-[1.05rem] leading-[100%] text-base font-semibold">
                      {product?.title.length > 29
                        ? `${product.title.slice(0, 29)}...`
                        : product.title}
                    </h3>
                    <p className="sm:text-[1.1rem] text-[1.05rem] leading-[120%] font-medium">
                      ${product.price}
                    </p>
                    <div className="w-full flex items-center justify-between gap-5 bg-slate-200 py-1 px-4 rounded-sm">
                      <button
                        className=""
                        onClick={() =>
                          dispatch({ type: "DECREASE_ITEM", payload: product })
                        }
                      >
                        <BiMinus className="text-blue-600 font-semibold  md:text-[1.2rem] text-lg hover:text-blue-400" />
                      </button>
                      <p className="font-semibold md:text-[1.2rem] text-lg">
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
                        <BiPlus className="text-blue-600 font-semibold text-[1.2rem] hover:text-blue-400" />
                      </button>
                    </div>

                    <button
                      className="w-full flex justify-center gap-2 items-center py-2 bg-red-600 hover:bg-red-400 outline-none text-white text-md font-semibold rounded-md"
                      onClick={() => removeProduct(product)}
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
        <div className="md:mt-10 mt-4">
          <p className="md:text-xl text-lg font-bold mb-5">
            <span>Total: ${cartTotal}</span>
          </p>
          <button className="md:w-[200px] w-full flex justify-center gap-4 items-center py-2 bg-blue-600 hover:bg-blue-400 outline-none text-white text-lg font-semibold rounded-md">
            Checkout
          </button>
        </div>
      </div>
    </section>
  );
};

export default Cart;
