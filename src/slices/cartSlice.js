import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    //Actions
    hydrate: (state, action) => {
      return action.payload;
    },
    //Add item to cart
    addToCart: (state, action) => {
      const index = state.items.findIndex(
        (cartItem) => cartItem._id === action.payload._id
      );
      if (index >= 0) {
        let newCart = [...state.items];
        newCart[index] = {
          ...newCart[index],
          qty: newCart[index].qty + 1,
        };
        state.items = newCart;
      } else {
        state.items = [...state.items, action.payload];
      }
      //Toast to indicate item added to cart
      toast.success(
        <>
          <span className="font-semibold">Added to cart</span>
          <br />
          <span className="text-sm">
            {action.payload.title.slice(0, 32)}
            {action.payload.title.length > 32 ? "…" : ""}
          </span>
        </>,
        {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          draggablePercent: 20,
          progress: undefined,
        }
      );
    },
    //Update the quantity of item in cart
    updateQty: (state, action) => {
      let newCart = [...state.items];
      const index = state.items.findIndex(
        (cartItem) => cartItem._id === action.payload._id
      );
      if (index >= 0) {
        if (action.payload.qty >= 1) {
          newCart[index] = action.payload;
          state.items = newCart;
        } else {
          newCart.splice(index, 1);
          state.items = newCart;
        }
      } else {
        console.warn("Product not present in the cart!");
      }
    },
    //Remove a item from cart
    removeFromCart: (state, action) => {
      const index = state.items.findIndex(
        (cartItem) => cartItem._id === action.payload._id
      );
      let newBastek = [...state.items];
      if (index >= 0) {
        newBastek.splice(index, 1);
      } else {
        console.warn(
          `Can't remove product (_id:${action.payload._id}) as its not in the cart`
        );
      }
      state.items = newBastek;
    },
  },
});

export const { addToCart, removeFromCart, updateQty, hydrate } =
  cartSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.cart.items;
export const selectTotal = (state) =>
  state.cart.items.reduce((total, item) => total + item.price * item.qty, 0);

export default cartSlice.reducer;
