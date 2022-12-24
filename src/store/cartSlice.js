import { createSlice } from '@reduxjs/toolkit';
import { useState } from 'react';

const cartSlice = createSlice({
  name :'cartItem',
  initialState : [
    // { id : 0, thumbnail1 : '썸네일1', title : '상품명1', price : 1000 },
    // { id : 1, thumbnail1 : '썸네일2', title : '상품명2', price : 2000 }
  ],
  reducers : {
    addItem(state, action){
      state.push(action.payload)
    },
    dropItem(state, action){
      state.pop(action.payload)
    },
    increase(state, action){
      let cartItemId = state.findIndex((data) => { return data.id == action.payload})
      state[cartItemId].count++
    },
    decrease(state, action){
      let cartItemId = state.findIndex((data) => { return data.id == action.payload})
      if (state[cartItemId].count > 0) {
        state[cartItemId].count--
      }
    },
    checkItem(state, action){
      let cartItemId = state.findIndex((data) => { return data.id == action.payload})
      if (state[cartItemId].checked === true) {
        state[cartItemId].checked = false
      } else {
        state[cartItemId].checked = true
      }
    },
  }
})

export const { addItem, dropItem, increase, decrease, checkItem} = cartSlice.actions

export default cartSlice;