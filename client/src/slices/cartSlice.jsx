import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
const initialState = {

    cart: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,

    reducers: {
        addToCart: (state, action) => {
            const course = action.payload;
            const index = state.cart.findIndex((item) => item._id === course._id);

            if (index >= 0) {
                // Course is already in the cart, do not add again
                toast.error("Course is already in your cart");
                return;
            }
            state.cart.push(course);

            localStorage.setItem('cart', JSON.stringify(state.cart));
            toast.success("Course added to cart");
        },

        removeFromCart: (state, action) => {
            const courseId = action.payload;
            const index = state.cart.findIndex((item) => item._id === courseId);

            if (index >= 0) {
                state.cart.splice(index, 1); // Remove the item

                localStorage.setItem('cart', JSON.stringify(state.cart));
                toast.success("Course removed from cart");
            }
        },
        resetCart: (state) => {
            state.cart = [];
            localStorage.removeItem('cart');
        }

    }
});
export const { addToCart, removeFromCart, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
