import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQantity: 0,
  changed: false,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    replaceCart(state, action) {
      state.totalQantity = action.payload.totalQantity;
      state.items = action.payload.items;
    },
    addItemToCart(state, action) {
      const newItem = action.payload;
      const foundItem = state.items.find(
        (currentItem) => currentItem.id === newItem.id
      );
      state.totalQantity++;
      state.changed = true;
      if (foundItem) {
        foundItem.quantity++;
        foundItem.totalPrice = foundItem.totalPrice + newItem.price;
      } else {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQantity--;
      state.changed = true;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
