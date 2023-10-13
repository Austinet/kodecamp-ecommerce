export const defaultState = {
  cart: [],
  cartTotal: 0,
  isCartOpen: false,
};

export const reducer = (state, action) => {
  const incrementItem = (id) => {
    return {
      ...state,
      cart: state.cart.map((item) => {
        if (item.id === id) {
          state.cartTotal += item.price;
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        } else {
          return item;
        }
      }),
    };
  };

  const calcTotal = (cart) => {
    return cart.reduce((total, items) => total += items.quantity * items.price, 0);
  };

  switch (action.type) {
    case "ADD_ITEM": {
      if (state.cart.some((item) => item.id === action.payload.id)) {
        return incrementItem(action.payload.id);
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, quantity: 1 }],
          cartTotal: state.cartTotal + action.payload.price,
        };
      }
    }

    case "INCREASE_ITEM":
      return incrementItem(action.payload.id);

    case "DECREASE_ITEM": {
      let newCart = state.cart.map((item) => {
        if (item.id === action.payload.id) {
          if (item.quantity === 0) {
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
      };
    }

    case "REMOVE_ITEM": {
      let newCart = state.cart.filter((item) => item.id !== action.payload.id);
      return {
        ...state,
        cart: newCart,
        cartTotal: calcTotal(newCart),
      };
    }

    case "TOGGLE_CART":
      return {
        ...state,
        isCartOpen: !state.isCartOpen,
      };

    default:
      break;
  }
};
