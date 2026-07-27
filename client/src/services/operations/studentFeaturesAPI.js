import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { studentEndpoints } from "../apis";
import { resetCart } from "../../slices/cartSlice"; // Assuming you have a resetCart action
import { setUser, clearUser } from "../../slices/profileSlice"; // Assuming setUser updates user's profile
import { clearToken } from "../../slices/authSlice"; // Import clearToken

export const buyCourse = async (token, courses, user, navigate, dispatch) => {
    const toastId = toast.loading("Enrolling in course(s)...");
    try {
        const response = await apiConnector("POST", studentEndpoints.ENROLL_COURSE_API,
            { courses }, // Send an array of course IDs to the backend
            {
                Authorization: `Bearer ${token}`,
            }
        );

        console.log("ENROLL COURSE API RESPONSE............", response);

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        toast.success("Enrolled in course(s) successfully!");

        // Update Redux state
        dispatch(resetCart()); // Clear the cart after successful purchase
        // Assuming the backend returns the updated user object with new courses
        // If not, you might need to refetch user details or manually add the course to user.courses
        if (response.data.updatedUser) {
            dispatch(setUser(response.data.updatedUser));
            localStorage.setItem("user", JSON.stringify(response.data.updatedUser));
        } else {
            // Fallback: Manually update the user's courses array in Redux for immediate UI reflection
            const updatedUser = { ...user, courses: [...user.courses, ...courses.map(courseId => ({ _id: courseId }))] };
            dispatch(setUser(updatedUser));
            localStorage.setItem("user", JSON.stringify(updatedUser));
        }
        navigate("/dashboard"); // Navigate to dashboard, where Enrolled Courses will be shown
    } catch (error) {
        console.log("ENROLL COURSE API ERROR............", error);
        if (error?.response?.status === 401) {
            // If token is expired or invalid, clear user data and redirect to login
            dispatch(clearToken());
            dispatch(clearUser());
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            toast.error(
                error?.response?.data?.message || "JWT expired. Please login again."
            );
            navigate("/login");
        } else {
            toast.error(error?.response?.data?.message || error.message || "Could not enroll in course(s)");
        }
    }
    toast.dismiss(toastId);
};