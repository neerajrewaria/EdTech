import { addToCart } from "../../slices/cartSlice";
import { toast } from "react-hot-toast";

export const AddToCart = (course, token, navigate, dispatch) => {
    if (!token) {
        toast.error("Please login to add items to your cart");
        navigate("/login");
        return;
    }
    dispatch(addToCart(course));
}