import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import { BiSolidChevronRight } from "react-icons/bi";
import { BsStar, BsStarFill } from "react-icons/bs";
import axios from "../api/axios";
import { MainContext } from "../App";
import Loading from "./Loading";

let categories = [
  {
    id: 1,
    name: "All",
    active: true,
  },
  {
    id: 2,
    name: "Men's clothing",
    active: false,
  },
  {
    id: 3,
    name: "Women's clothing",
    active: false,
  },
  {
    id: 4,
    name: "Electronics",
    active: false,
  },
  {
    id: 5,
    name: "Jewelery",
    active: false,
  },
];

const Products = () => {
  const [products, setProducts] = useState([]);
  const [displayProducts, setDisplayProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { dispatch, isUserLoggedIn } = useContext(MainContext);

  const getProducts = async () => {
    try {
      const response = await axios.get("/products");
      if (response.status === 200) {
        setProducts(response.data);
        setDisplayProducts(response.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Filter by categories
  const filterCategory = (category) => {
    if (category === "All") {
      setDisplayProducts(products);
    } else {
      let filter = products.filter(
        (product) => product.category.toUpperCase() === category.toUpperCase()
      );
      setDisplayProducts(filter);
    }

    categories = categories.map((categoryItem) => {
      if (categoryItem.name.toUpperCase() === category.toUpperCase()) {
        return { ...categoryItem, active: true };
      } else {
        return { ...categoryItem, active: false };
      }
    });
  };

  // Search feature
  const searchProducts = (e) => {
    let filter = products.filter((products) =>
      products.title.toUpperCase().includes(e.target.value.toUpperCase())
    );

    if (filter.length > 0) {
      setDisplayProducts(filter);
    }
  };

  //Authenticate users
  const authenticateUser = (product) => {
    if (isUserLoggedIn) {
      dispatch({
        type: "ADD_ITEM",
        payload: { ...product, quantity: 1 },
      });
    } else {
      alert("You must be logged in first, please login")
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <section className="bg-gray-100">
      <div className="w-11/12 xl:w-10/12 mx-auto pt-[7rem] pb-[4rem] sm:pt-[9rem]">
        <div>
          {isLoading ? (
            <Loading />
          ) : (
            <div>
              <div className="flex flex-col md:flex-row gap-5 md:justify-between lg:items-center mb-[2rem]">
                {/* Sort by category */}
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => filterCategory(`${category.name}`)}
                      className={`md:text-lg font-semibold rounded-md px-2 py-1 md:px-4 md:py-2 hover:bg-blue-600 hover:text-white ${
                        category.active ? "bg-blue-600 text-white" : "bg-white "
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>

                {/* Search */}
                <div className="w-full md:w-auto">
                  <input
                    type="search"
                    name="search"
                    id="search"
                    placeholder="Search by title"
                    onChange={searchProducts}
                    className="w-full md:w-[300px] h-[45px] md:h-[50px] lg:text-lg text-base font-semibold rounded-md px-3 outline-none border-2 border-blue-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 lg:justify-between gap-[1.25rem] lg:gap-[3rem] md:items-start">
                {displayProducts.map((product) => {
                  return (
                    <div
                      className="rounded-[0.5rem] bg-white shadow-md p-4 md:p-6 flex flex-col gap-4"
                      key={product.id}
                    >
                      <div className="border border-blue-300 p-2">
                        <img
                          src={product.image}
                          alt={product.description}
                          className="mx-auto h-[200px] object-contain"
                        />
                      </div>
                      <div className="flex flex-col justify-between gap-3">
                        <h3 className="md:text-[1.25rem] text-[1.1rem] leading-[120%] font-semibold">
                          {product.title.length > 32
                            ? `${product.title.slice(0, 32)}...`
                            : product.title}
                        </h3>
                        <Link to={`/product/${product.id}`}>
                          <p className="text-base">
                            <span>
                              {product.description.length > 65
                                ? `${product.description.slice(0, 62)}...`
                                : product.description}{" "}
                            </span>
                            <span className="text-[1.1rem] text-blue-600 font-semibold hover:text-blue-400">
                              <span className="">see more</span>
                              <BiSolidChevronRight className="inline text-[1.1rem] pb-[0.1rem]" />
                            </span>
                          </p>
                        </Link>
                        <p className="flex my-[0.1rem]">
                          {[...Array(Math.round(product.rating.rate))].map(
                            (star, i) => (
                              <BsStarFill key={i} className="text-yellow-500" />
                            )
                          )}
                          {[...Array(5 - Math.round(product.rating.rate))].map(
                            (star, i) => (
                              <BsStar key={i} className="text-yellow-500" />
                            )
                          )}
                        </p>
                        <div className="flex justify-between items-center mb-[0.6rem]">
                          <p className="flex items-center gap-6">
                            <span className="md:text-[1.35rem] text-[1.1rem] leading-[120%] font-semibold">
                              ${product.price}
                            </span>
                            <span className="bg-blue-200 md:text-lg text-base px-2 py-1 font-bold rounded-md text-blue-600">
                              50%
                            </span>
                          </p>
                          <p className="font-semibold text-gray-600 line-through">
                            ${product.price * 2}.00
                          </p>
                        </div>

                        <button
                          className="flex justify-center md:gap-4 gap-3 items-center w-full py-3 bg-blue-600 hover:bg-blue-400 outline-none text-white md:text-lg font-semibold rounded-md"
                          onClick={() => authenticateUser(product)}
                        >
                          <FaCartPlus />
                          <span>Add to cart</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Products;
