import { createSlice } from "@reduxjs/toolkit";

type ArrayItemsType = {
  id: number,
  imageUrl: string,
  title: string,
  type: number[],
  size: number[],
  price: number,
  category: number,
  rating: number
  count: number
}
type init = {
  totalPrice: number,
  items: ArrayItemsType[]

}
const initialState: init = {
  totalPrice: 0,
  items: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find(obj => obj.id === action.payload.id)
      if (findItem) {
        findItem.count++
      } else {
        state.items.push({
          ...action.payload, count: 1
        })
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return (obj.price * obj.count) + sum;
      }, 0)
    },
    plusItem(state, action) {
      const findItem = state.items.find(obj => obj.id === action.payload.id)
      if (findItem) {
        findItem.count++
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return (obj.price * obj.count) + sum;
      }, 0)

    },
    minusItem(state, action) {
      const findItem = state.items.find(obj => obj.id === action.payload.id)
      if (findItem) {
        findItem.count > 0 && findItem.count--
      }
    },
    removeItem(state, action) {
      state.items = state.items.filter((f) => f.id !== action.payload)
      // state.totalPrice = state.totalPrice - action.payload.price
    },
    clearItems(state) {
      state.items = []
      state.totalPrice = 0
    }
  }
})

export const { addItem, removeItem, clearItems, plusItem, minusItem } = cartSlice.actions
export default cartSlice.reducer