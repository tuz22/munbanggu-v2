import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cartSlice from './cartSlice';
import subSlice from './subSlice';
import checkSlice from './checkSlice';

const reducers = combineReducers({
  cartItem : cartSlice.reducer,
  subHidden : subSlice.reducer,
  checkCount : checkSlice.reducer
})

const persistConfig = {
  key : 'root',
  storage,
  whitelist : ['cartItem']
}

const persistedReducer = persistReducer(persistConfig, reducers);
const store = configureStore({
  reducer : persistedReducer
})

// const store = configureStore({
//   reducer: {
//     cartItem : cartSlice.reducer,
//     subHidden : subSlice.reducer,
//     checkCount : checkSlice.reducer
//   }
// })

export default store;