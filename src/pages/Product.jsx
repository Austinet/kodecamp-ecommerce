import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import { BiMinus, BiPlus, BiSolidChevronLeft } from "react-icons/bi";
import { BsStar, BsStarFill } from "react-icons/bs";
import axios from "../api/axios";
import Header from "../components/Header";
import Loading from "../components/Loading";
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
        <section className="bg-gray-100 pb-[3rem] pt-[7rem] xl:pb-[3.5rem] xl:pt-[8rem]">
          <div className="w-11/12 xl:w-10/12 mx-auto">
            {isLoading ? (
              <Loading />
            ) : (
              <div>
                <Link to={"/"}>
                  <p className="w-[100px] text-center bg-white rounded-md text-lg font-medium p-2 mb-4 xl:mb-7 text-blue-600 hover:text-blue-400">
                    <BiSolidChevronLeft className="inline text-[1.1rem] pb-[0.1rem] mr-1" />
                    <span>Back</span>
                  </p>
                </Link>
                <div className="rounded-[0.5rem] p-5 bg-white shadow-md flex flex-col md:flex-row gap-3 xs:h-[70vh] sm:min-h-[77vh]">
                  <div className="md:w-1/2 p-3 border border-blue-300">
                    <img
                      src={product.image}
                      alt={product.description}
                      className="mx-auto object-contain max-w-[370px] md:w-[90%] h-[260px] md:h-full sm:rounded-l-[0.5rem] rounded-t-[0.5rem] sm:rounded-t-none"
                    />
                  </div>
                  <div className="lg:p-9 flex flex-col justify-center gap-2 md:w-1/2">
                    <h2 className="capitalize text-blue-600 text-xl font-semibold">
                      {product.category}
                    </h2>
                    <h3 className="lg:text-[1.7rem] text-[1.1rem] leading-[130%] font-semibold">
                      {product.title}
                    </h3>
                    <p className="md:text-[1.05rem] text-base md:mb-2">
                      {product.description}
                    </p>
                    <p className="flex my-1">
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

                    <div className="flex justify-between items-center ">
                      <p className="flex items-center gap-6">
                        <span className="md:text-[2rem] text-[1.25rem] leading-[130%] font-semibold">
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
