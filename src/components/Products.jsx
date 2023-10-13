import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
// import axios from "../api/axios";
import { FaCartPlus } from "react-icons/fa";
import productsDB from "../utils/data";
import { MainContext } from "../pages/Home";
 
const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {dispatch} = useContext(MainContext);

  //   const getProducts = async () => {
  //     try {
  //       const response = await axios.get("/products");
  //       console.log(response);
  //       if (response.status === 200) {
  //         console.log(response.data);
  //         setProducts(response.data);
  //         setIsLoading(false);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  useEffect(() => {
    // getProducts();
    setProducts(productsDB);
    setIsLoading(false);
  }, []);

  return (
    <section className="bg-gray-200">
      <div className="w-11/12 lg:w-10/12 mx-auto py-[2.5rem] xl:py-[5rem]">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 lg:justify-between justify-center gap-[1.25rem] lg:gap-[3rem] md:items-start">
          {isLoading ? (
            <p>Loading</p>
          ) : (
            products.map((product) => {
              return (
               <Link key={product.id} to={`/product/${product.id}`}>
                <div
                  className="rounded-[0.5rem] bg-white shadow-md"
                >
                  <div>
                    <img
                      src={product.images[0]}
                      alt={product.description}
                      className="w-full h-[250px] rounded-t-[0.5rem]"
                    />
                  </div>
                  <div className="p-6 md:p-8 flex flex-col justify-between gap-3">
                    <h3 className="flex justify-between items-center md:text-[1.4rem] text-[1.25rem] leading-[130%] font-semibold">
                      <span>{product.title}</span> <span>${product.price}</span>
                    </h3>
                    <p className="text-[1.05rem] mb-2">{product.description.length > 80 ? `${product.description.slice(0,75)}...`: product.description }</p>
                    {/* <p>Category: </p> */}
                    {/* <div className="flex justify-between items-center">
                    
                    <p>{product.category.name}</p>

                    <img
                      src={product.category.image}
                      alt={product.category.name}
                      width="50px"
                      height="50px"
                      className="rounded-full"
                    />
                    </div> */}
                    <button className="flex justify-center gap-4 items-center w-full py-3 bg-blue-600 text-white text-lg font-semibold rounded-md" onClick={() => dispatch({type:"ADD_ITEM", payload: product})}>
                      <FaCartPlus />
                      <span>Add to cart</span>
                    </button>
                  </div>
                </div>
               </Link>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default Products;
