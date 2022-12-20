import { createSlice } from '@reduxjs/toolkit';

const checkSlice = createSlice({
  name : 'checkCount',
  initialState : 0,
  reducers : {
    checkToggle(state){
      { state == 0 ? state = 1 : state = 0 }
      return state
    }
  }
})

export const { checkToggle } = checkSlice.actions

export default checkSlice;