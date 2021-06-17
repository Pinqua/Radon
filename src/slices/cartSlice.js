import { createSlice } from "@reduxjs/toolkit";
import {toast} from "react-toastify"

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
    addToCart: (state, action) => {
      const index = state.items.findIndex(
        (cartItem) => cartItem.id === action.payload.id
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
      toast.success(
        <>
            <span className="font-bold">Added to cart</span>
            <br />
            {action.payload.title.slice(0, 26)}
            {action.payload.title.length > 26 ? "…" : ""}
        </>,
        {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            draggablePercent: 20,
            progress: undefined,
        }
    );
    },
    updateQty: (state, action) => {
      let newCart = [...state.items];
      const index = state.items.findIndex(
        (cartItem) => cartItem.id === action.payload.id
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
        console.warn("Product not found in cart!");
      }
      console.log(action.type);
    },
    removeFromCart: (state, action) => {
      const index = state.items.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );
      let newBastek = [...state.items];
      if (index >= 0) {
        //The item exist in the cart... remove it
        newBastek.splice(index, 1);
      } else {
        console.warn(
          `can't remove product (id:${action.payload.id}) as its not in the cart`
        );
      }
      state.items = newBastek;
    },
  },
});

export const { addToCart, removeFromCart, updateQty,hydrate } = cartSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.cart.items;
export const selectTotal = (state) =>
  state.cart.items.reduce((total, item) => total + item.price*item.qty, 0);
export default cartSlice.reducer;
