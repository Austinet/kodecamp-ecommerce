import { useReducer, createContext } from "react";
import { reducer, defaultState } from "../utils/contents";
import Header from "../components/Header";
import Products from "../components/Products";

export const MainContext = createContext();

const Home = () => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  return (
    <>
      <MainContext.Provider
        value={{ dispatch, cart: state.cart, isCartOpen: state.isCartOpen, cartTotal: state.cartTotal }}
      >
        <Header />
        <Products />
      </MainContext.Provider>
    </>
  );
};

export default Home;
