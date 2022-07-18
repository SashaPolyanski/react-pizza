import { createSlice } from "@reduxjs/toolkit";

type init = {
  categoryID: number,
  pageCount: number
  sort: {
    name: string,
    sortType: string
  }
}
const initialState:init = {
  categoryID: 0,
  pageCount: 1,
  sort: {
    name: 'популярности',
    sortType: 'rating'
  }
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryID(state, action) {
      state.categoryID = action.payload
    },
    setSort(state, action) {
      state.sort = action.payload
    },
    setPageCount(state, action) {
      state.pageCount = action.payload
    },
  }
})

export const { setCategoryID, setSort, setPageCount } = filterSlice.actions
export default filterSlice.reducer