//default states
const initialState = {
  loading: false,
  cartItems: [],
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    //Spinner
    case "SHOW_SPINNER":
      return {
        ...state,
        loading: true,
      };

    //hiding spinner
    case "HIDE_SPINNER":
      return {
        ...state,
        loading: false,
      };
    //updating cart

    case "ADDTOCART":
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    case "UPDATE_CART":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item._id === action.payload._id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case "DELETE_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item._id !== action.payload._id
          //   ? { ...item, quantity: action.payload }
          //   : item
        ),
      };
    default:
      return state;
  }
};
