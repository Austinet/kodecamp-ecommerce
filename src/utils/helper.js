export let defaultValues = {
  cart: [],
  cartTotal: 0,
  isCartOpen: false,
  isModalOpen: false,
  modalMessage: "",
  usersDB : [],
  userAuthenticated: {},
  isUserLoggedIn: false,
};

 defaultValues = JSON.parse(localStorage.getItem("defaultValues"));

if (defaultValues === null) {
  defaultValues = {
    cart: [],
    cartTotal: 0,
    isCartOpen: false,
    isModalOpen: false,
    modalMessage: "",
    usersDB: [],
    isUserLoggedIn: false,
  };

  localStorage.setItem("defaultValues", JSON.stringify(defaultValues));
  let storedItems = JSON.parse(localStorage.getItem("defaultValues"));
  console.log(storedItems)
}

export const reducer = (state, action) => {
  let storedItems = JSON.parse(localStorage.getItem("defaultValues"));
console.log(storedItems)
  const incrementItem = (payload) => {
    return {
      ...state,
      cart: state.cart.map((item) => {
        if (item.id === payload.id) {
          return {
            ...item,
            quantity: item.quantity + payload.quantity,
          };
        } else {
          return item;
        }
      }),
      cartTotal: state.cartTotal + payload.price * payload.quantity,
      isModalOpen: true,
      modalMessage: `Added to cart successfully`,
    };
  };

  const calcTotal = (cart) => {
    return cart.reduce(
      (total, items) => (total += items.quantity * items.price),
      0
    );
  };

  switch (action.type) {
    case "ADD_ITEM": {
      if (state.cart.some((item) => item.id === action.payload.id)) {
        return incrementItem(action.payload);
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload }],
          cartTotal:
            state.cartTotal + action.payload.price * action.payload.quantity,
          isModalOpen: true,
          modalMessage: `Added to cart successfully`,
        };
      }
    }

    case "INCREASE_ITEM":
      return incrementItem(action.payload);

    case "DECREASE_ITEM": {
      let openModal = true;
      let newCart = state.cart.map((item) => {
        if (item.id === action.payload.id) {
          if (item.quantity <= 1) {
            openModal = false;
            return item;
          } else {
            return {
              ...item,
              quantity: item.quantity - 1,
            };
          }
        } else {
          return item;
        }
      });
      return {
        ...state,
        cart: newCart,
        cartTotal: calcTotal(newCart),
        modalMessage: `Removed from cart successfully`,
        isModalOpen: openModal,
      };
    }

    case "REMOVE_ITEM": {
      let newCart = state.cart.filter((item) => item.id !== action.payload.id);
      return {
        ...state,
        cart: newCart,
        cartTotal: calcTotal(newCart),
        modalMessage: `Removed from cart successfully`,
        isModalOpen: true,
      };
    }

    case "TOGGLE_CART":
      return {
        ...state,
        isCartOpen: !state.isCartOpen,
      };
    case "TOGGLE_MODAL":
      return {
        ...state,
        isModalOpen: false,
      };
    case "ADD_USER": {
      storedItems.usersDB = [...storedItems.usersDB, action.payload]
      localStorage.setItem("defaultValues", JSON.stringify(storedItems));
      return {
        ...state,
        usersDB: [...storedItems.usersDB ]
      }
    }
    case "USER_LOGGED_IN": {
      storedItems.isUserLoggedIn = true
      storedItems.userAuthenticated = storedItems.usersDB.filter(users => users.email === action.payload.email)[0]
      localStorage.setItem("defaultValues", JSON.stringify(storedItems));

      return {
        ...state,
        isUserLoggedIn: storedItems.isUserLoggedIn,
        userAuthenticated: storedItems.userAuthenticated
      }
    }
    case "LOG_OUT": {
      storedItems.isUserLoggedIn = false
      storedItems.userAuthenticated = {}
      localStorage.setItem("defaultState", JSON.stringify(storedItems));

      return {
        ...state,
        isUserLoggedIn: storedItems.isUserLoggedIn,
        userAuthenticated: {}
      }
    }

    default:
      break;
  }
};
