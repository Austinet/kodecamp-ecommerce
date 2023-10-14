import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { FaCartPlus } from "react-icons/fa";
import { BiMinus, BiPlus } from "react-icons/bi";
import axios from "../api/axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { MainContext } from "../App";

const Product = () => {
  const item = useParams();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { dispatch } = useContext(MainContext);
  const [quantity, setQuantity] = useState(1);

  const getProduct = async () => {
    try {
      const response = await axios.get(`/products/${item.id}`);
      if (response.status === 200) {
        setProduct(response.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      <Header />
      <main>
        <section className="bg-gray-200">
          <div className="w-11/12 lg:w-10/12 mx-auto pb-[1.8rem] pt-[6rem] sm:pb-[3.3rem] lg:pt-[2.5rem] lg:pb-[2.5rem]">
            {isLoading ? (
              <div className="grid place-items-center lg:min-h-[69vh] min-h-[72.5vh]">
                <p className="text-lg">Loading...</p>
              </div>
            ) : (
              <div className="rounded-[0.5rem] bg-white shadow-md flex flex-col sm:flex-row sm:h-[70vh] sm:gap-3 lg:gap-12">
                <div className="sm:w-1/2">
                  <img
                    src={product.images[0]}
                    alt={product.description}
                    className="w-full h-[250px] sm:h-full sm:rounded-l-[0.5rem] rounded-t-[0.5rem] sm:rounded-t-none"
                  />
                </div>
                <div className="p-4 lg:p-10 flex flex-col justify-center gap-2 sm:w-1/2">
                  <h2 className="text-blue-600 text-xl font-semibold">
                    Kodecamp Ecommerce
                  </h2>
                  <h3 className="md:text-[2rem] text-[1.25rem] leading-[130%] font-semibold">
                    {product.title}
                  </h3>
                  <p className="md:text-[1.05rem] text-base mb-2">
                    {product.description}
                  </p>
                  <p className=" md:text-[2rem] text-[1.25rem] leading-[130%] font-semibold">
                    ${product.price}
                  </p>

                  <div className="md:w-[200px] flex items-center justify-between gap-5 my-3 bg-slate-200 py-1 px-4 rounded-sm">
                    <button
                      onClick={() =>
                        setQuantity(quantity > 1 ? quantity - 1 : quantity)
                      }
                    >
                      <BiMinus className="text-blue-600 font-semibold md:text-[1.3rem] text-lg hover:text-blue-400" />
                    </button>
                    <p className="font-semibold md:text-[1.3rem] text-lg">
                      {quantity}
                    </p>
                    <button onClick={() => setQuantity(quantity + 1)}>
                      <BiPlus className="text-blue-600 font-semibold md:text-[1.3rem] text-lg hover:text-blue-400" />
                    </button>
                  </div>
                  <button
                    className="flex justify-center gap-4 items-center w-full py-3 bg-blue-600 hover:bg-blue-400 outline-none text-white text-lg font-semibold rounded-md"
                    onClick={() =>
                      dispatch({
                        type: "ADD_ITEM",
                        payload: { ...product, quantity },
                      })
                    }
                  >
                    <FaCartPlus />
                    <span>Add to cart</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Product;
