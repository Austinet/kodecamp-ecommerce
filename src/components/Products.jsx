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
    <section className="bg-gray-200">
      <div className="w-11/12 lg:w-10/12 mx-auto pb-[2.5rem] pt-[6rem] lg:pt-[4rem] lg:pb-[4rem]">
        <div>
          {isLoading ? (
            <div className="grid place-items-center lg:min-h-[62.7vh] min-h-[72.5vh]">
              <p className="text-lg">Loading...</p>
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
