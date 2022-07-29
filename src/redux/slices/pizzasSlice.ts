import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type ArrayItemsType = {
  id: number,
  imageUrl: string,
  title: string,
  types: number[],
  sizes: number[],
  price: number,
  category: number,
  rating: number
  count: number
}
type init = {
  items: ArrayItemsType[]

}
const initialState: init = {
  items: [],
}

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload
    }
  },

})

export const { setItems } = pizzaSlice.actions
export default pizzaSlice.reducer
export const fetchPizzas = createAsyncThunk(
  'pizza/fetch',
  async (params: any, { dispatch }) => {
    try {
      const response = await axios.get(`https://62c3e72d7d83a75e39ea17ca.mockapi.io/items?page=${params.currentPage}&limit=4&${params.category}&${params.search}&sortBy=${params.sortType}&order=desc`)
      return response
    } catch (e) {
    }
  },
);