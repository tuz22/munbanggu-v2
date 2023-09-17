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
            if (state[cartItemId].checked === true) {
                state[cartItemId].checked = false;
            } else {
                state[cartItemId].checked = true;
            }
        },
        checkAllItem(state, action) {
            let checkLength = action.payload;
            let cartLength = state.length;
            if (checkLength > 0) {
                for (let i = 0; i < checkLength; i++) {
                    state[i].checked = false;
                }
            } else {
                for (let i = 0; i < cartLength; i++) {
                    state[i].checked = true;
                }
            }
        },
    },
});

export const { addItem, dropItem, increase, decrease, checkItem, checkAllItem } = cartSlice.actions;

export default cartSlice;
