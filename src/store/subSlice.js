import { createSlice } from '@reduxjs/toolkit';

const subSlice = createSlice({
  name : 'subHidden',
  initialState : 'hidden',
  reducers : {
    subChange(state){
      const body = document.querySelector('body').style;
      if (state == 'hidden') {
        state = ''
        body.overflow = 'hidden';
        body.height = '100%';
      } else {
        state = 'hidden'
        body.overflow = '';
        body.height = '';
      }
      return state
    }
  }
})

export const { subChange } = subSlice.actions

export default subSlice;