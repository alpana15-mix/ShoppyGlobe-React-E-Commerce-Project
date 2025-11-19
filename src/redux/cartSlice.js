// redux/cartSlice.js
// Handles cart items and quantities.
// We keep a simple structure: { items: { [productId]: {product, qty} }, totalCount, totalPrice }

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: {}, // keyed by product.id
  totalCount: 0,
  totalPrice: 0,
};

// helper to recalc totals
const recalc = (items) => {
  let totalCount = 0;
  let totalPrice = 0;
  Object.values(items).forEach(({ product, qty }) => {
    totalCount += qty;
    totalPrice += product.price * qty;
  });
  return { totalCount, totalPrice };
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const id = product.id;
      if (state.items[id]) {
        state.items[id].qty += 1;
      } else {
        state.items[id] = { product, qty: 1 };
      }
      const totals = recalc(state.items);
      state.totalCount = totals.totalCount;
      state.totalPrice = totals.totalPrice;
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      if (!state.items[id]) return;
      delete state.items[id];
      const totals = recalc(state.items);
      state.totalCount = totals.totalCount;
      state.totalPrice = totals.totalPrice;
    },
    increaseQty: (state, action) => {
      const id = action.payload;
      if (state.items[id]) {
        state.items[id].qty += 1;
      }
      const totals = recalc(state.items);
      state.totalCount = totals.totalCount;
      state.totalPrice = totals.totalPrice;
    },
    decreaseQty: (state, action) => {
      const id = action.payload;
      if (state.items[id] && state.items[id].qty > 1) {
        state.items[id].qty -= 1;
      }
      // ensure qty never goes below 1 (requirement)
      const totals = recalc(state.items);
      state.totalCount = totals.totalCount;
      state.totalPrice = totals.totalPrice;
    },
    clearCart: (state) => {
      state.items = {};
      state.totalCount = 0;
      state.totalPrice = 0;
    },
    // optional: load cart from persisted object
    setCartFromObject: (state, action) => {
      state.items = action.payload.items || {};
      const totals = recalc(state.items);
      state.totalCount = totals.totalCount;
      state.totalPrice = totals.totalPrice;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
  setCartFromObject,
} = cartSlice.actions;

export default cartSlice.reducer;

// Selectors (for components)
export const selectCartItems = (state) => state.cart.items;
export const selectCartCount = (state) => state.cart.totalCount;
export const selectCartTotal = (state) => state.cart.totalPrice;