import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import { FaCartPlus } from "react-icons/fa";
import { MainContext } from "../App";
import { BiSolidChevronsRight } from "react-icons/bi";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { dispatch } = useContext(MainContext);

  const getProducts = async () => {
    try {
      const response = await axios.get("/products");
      if (response.status === 200) {
        setProducts(response.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <section className="bg-gray-100">
      <div className="w-11/12 lg:w-10/12 mx-auto pt-[9rem] pb-[4rem]">
        <div>
          {isLoading ? (
            <div
              role="status"
              className="grid place-items-center lg:min-h-[78vh] min-h-[72.5vh]"
            >
              <svg
                aria-hidden="true"
                className="w-[5rem] h-[5rem] mr-2 text-gray-200 animate-spin dark:text-gray-400 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 lg:justify-between justify-center gap-[1.25rem] lg:gap-[3rem] md:items-start">
              {products.map((product) => {
                return (
                  <div
                    className="rounded-[0.5rem] bg-white shadow-md"
                    key={product.id}
                  >
                    <div>
                      <img
                        src={product.images[0]}
                        alt={product.description}
                        className="w-full h-[200px] md:h-[250px] rounded-t-[0.5rem]"
                      />
                    </div>
                    <div className="p-4 md:p-8 flex flex-col justify-between gap-3">
                      <h3 className="flex justify-between items-center md:text-[1.4rem] text-[1.25rem] leading-[130%] font-semibold">
                        <span>{product.title}</span>{" "}
                        <span>${product.price}</span>
                      </h3>
                      <Link to={`/product/${product.id}`}>
                        <p className="text-base md:text-[1.05rem] mb-2 ">
                          <span>
                            {product.description.length > 65
                              ? `${product.description.slice(0, 65)}...`
                              : product.description}{" "}
                          </span>{" "}
                          <span className="text-blue-600 font-semibold hover:text-blue-400">
                            see more{" "}
                            <BiSolidChevronsRight className="inline text-[1.35rem] pb-[0.2rem]" />
                          </span>{" "}
                        </p>
                      </Link>
                      <button
                        className="flex justify-center md:gap-4 gap-3 items-center w-full py-3 bg-blue-600 hover:bg-blue-400 outline-none text-white text-lg font-semibold rounded-md"
                        onClick={() =>
                          dispatch({
                            type: "ADD_ITEM",
                            payload: { ...product, quantity: 1 },
                          })
                        }
                      >
                        <FaCartPlus />
                        <span>Add to cart</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Products;
