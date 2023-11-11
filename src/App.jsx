import { Routes, Route } from "react-router-dom";
import { useReducer, createContext } from "react";
import { reducer, defaultValues } from "./utils/helper";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Login from "./pages/Login";
import Register from "./pages/Register";

export const MainContext = createContext();

const App = () => {
  const [state, dispatch] = useReducer(reducer, defaultValues);

  return (
    <>
      <MainContext.Provider
        value={{
          dispatch,
          cart: state.cart,
          isCartOpen: state.isCartOpen,
          cartTotal: state.cartTotal,
          isModalOpen: state.isModalOpen,
          modalMessage: state.modalMessage,
          usersDB: state.usersDB,
          userAuthenticated: state.userAuthenticated,
          isUserLoggedIn: state.isUserLoggedIn
        }}
      >
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="/product/:id" element={<Product />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </MainContext.Provider>
    </>
  );
};

export default App;
