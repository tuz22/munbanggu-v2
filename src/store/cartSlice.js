import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cartItem',
    initialState: [],
    reducers: {
        addItem(state, action) {
            state.push(action.payload);
        },
        dropItem(state, action) {
            const cartItemId = state.findIndex((data) => {
                return data.id === action.payload;
            });
            if (cartItemId !== -1) {
                return state.filter((data) => data.id !== action.payload);
            }
            return state;
        },
        increase(state, action) {
            const cartItemId = state.findIndex((data) => {
                return data.id === action.payload;
            });
            if (cartItemId !== -1) {
                state[cartItemId].count++;
            }
        },
        decrease(state, action) {
            const cartItemId = state.findIndex((data) => {
                return data.id === action.payload;
            });
            if (cartItemId !== -1 && state[cartItemId].count > 0) {
                state[cartItemId].count--;
            }
        },
        checkItem(state, action) {
            const cartItemId = state.findIndex((data) => {
                return data.id === action.payload;
            });
            if (cartItemId !== -1) {
                state[cartItemId].checked = !state[cartItemId].checked;
            }
        },
        checkAllItem(state, action) {
            const checked = state.filter((item) => item.checked).length;
            const totalChecked = state.length;

            if (checked === totalChecked) {
                state.forEach((item) => {
                    item.checked = false;
                });
            } else {
                state.forEach((item) => {
                    item.checked = true;
                });
            }
        },
    },
});

export const { addItem, dropItem, increase, decrease, checkItem, checkAllItem } = cartSlice.actions;

export default cartSlice;
