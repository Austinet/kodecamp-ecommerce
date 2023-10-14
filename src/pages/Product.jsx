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
      // const response = await axios.get(`/products/${item.id}`);
      const response ={status: 100}
      if (response.status === 200) {
        setProduct(response.data);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setProduct( {
          id: 94,
          title: "Rustic Plastic Chair",
          price: 135,
          description:
            "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
          images: [
            "https://i.imgur.com/fpT4052.jpeg",
            "https://i.imgur.com/5iNAL9T.jpeg",
            "https://i.imgur.com/kTPCFG2.jpeg",
          ],
          creationAt: "2023-10-11T03:24:10.000Z",
          updatedAt: "2023-10-11T03:24:10.000Z",
          category: {
            id: 4,
            name: "Shoes",
            image: "https://i.imgur.com/x0K3SKA.jpeg",
            creationAt: "2023-10-11T03:24:10.000Z",
            updatedAt: "2023-10-11T03:24:10.000Z",
          },
        })
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
        <section className="bg-gray-100  pb-[4rem] pt-[9rem] xl:pb-[2.5rem] xl:pt-[8rem]">
          <div className="w-11/12 lg:w-10/12 mx-auto">
            {isLoading ? (
              <div
                role="status"
                className="grid place-items-center lg:min-h-[70vh] min-h-[72.5vh]"
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
              <div className="rounded-[0.5rem] bg-white shadow-md flex flex-col sm:flex-row sm:gap-3 lg:gap-12 xs:h-[70vh] sm:h-[77vh]">
                <div className="sm:w-1/2">
                  <img
                    src={product.images[0]}
                    alt={product.description}
                    className="w-full h-[260px] sm:h-full sm:rounded-l-[0.5rem] rounded-t-[0.5rem] sm:rounded-t-none"
                  />
                </div>
                <div className="p-5 py-8 lg:p-10 flex flex-col justify-center gap-2 sm:w-1/2">
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
