import { createSlice } from '@reduxjs/toolkit';

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
    }
  }
})
// let subHidden = createSlice({
//   name : 'subHidden',
//   initialState : 'hidden',
//   reducers : {
//     subChange(state){
//       const body = document.querySelector('body').style;
//       if (state == 'hidden') {
//         state = ''
//         body.overflow = 'hidden';
//         body.height = '100%';
//       } else {
//         state = 'hidden'
//         body.overflow = '';
//         body.height = '';
//       }
//       return state
//     }
//   }
// })
// let checkCount = createSlice({
//   name : 'checkCount',
//   initialState : 0,
//   reducers : {
//     checkToggle(state){
//       { state == 0 ? state = 1 : state = 0 }
//       return state
//     }
//   }
// })

export const { addItem, dropItem, increase, decrease } = cartSlice.actions
// export let { subChange } = subHidden.actions
// export let { checkToggle } = checkCount.actions
// export default configureStore({
//   reducer : { 
//     cartItem : cartItem.reducer,
//     subHidden : subHidden.reducer,
//     checkCount : checkCount.reducer
//   }
// })

export default cartSlice;