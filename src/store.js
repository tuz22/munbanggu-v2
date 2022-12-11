import { configureStore, createSlice } from '@reduxjs/toolkit';

let cartItem = createSlice({
  name :'cartItem',
  initialState : [
    { id : 0, thumbnail1 : '썸네일1', title : '상품명1', price : 1000 },
    { id : 1, thumbnail1 : '썸네일2', title : '상품명2', price : 2000 }
  ],
  reducer : {
    addItem(state, action){
      state.push(action.payload)
    }
  }
})

export let { addItem } = cartItem.actions
export default configureStore({
  reducer : { cartItem : cartItem.reducer }
})