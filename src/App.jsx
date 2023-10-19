import { Routes, Route } from "react-router-dom";
import { useReducer, createContext } from "react";
import { reducer, defaultState } from "./utils/helper";
import Home from "./pages/Home";
import Product from "./pages/Product";

export const MainContext = createContext();

const App = () => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  return (
    <>
      <MainContext.Provider
        value={{
          dispatch,
          cart: state.cart,
          isCartOpen: state.isCartOpen,
          cartTotal: state.cartTotal,
          isModalOpen: state.isModalOpen,
          modalMessage: state.modalMessage
        }}
      >
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="/product/:id" element={<Product />}></Route>
        </Routes>
      </MainContext.Provider>
    </>
  );
};

export default App;
