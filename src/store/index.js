import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cartSlice from './cartSlice';
import subSlice from './subSlice';

const reducers = combineReducers({
  cartItem : cartSlice.reducer,
  subHidden : subSlice.reducer,
})

const persistConfig = {
  key : 'root',
  storage,
  whitelist : ['cartItem']
}

const persistedReducer = persistReducer(persistConfig, reducers);
const store = configureStore({
  reducer : persistedReducer,
  middleware : getDefaultMiddleware({
    serializableCheck : false
  })
})

export default store;