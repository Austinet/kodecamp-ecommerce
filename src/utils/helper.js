export const defaultState = {
  cart: [],
  cartTotal: 0,
  isCartOpen: false,
};

export const reducer = (state, action) => {
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
      cartTotal: state.cartTotal + payload.price * payload.quantity

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
        };
      }
    }

    case "INCREASE_ITEM":
      return incrementItem(action.payload);

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
