import { apiConnector } from "../apiconnector";
import { courseEndpoints, sectionEndpoints, subSectionEndpoints } from "../apis";
import { toast } from "react-hot-toast";



export const addCourseDetails = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", courseEndpoints.COURSE_CREATE_API, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        });

        if (!response?.data?.success) {
            throw new Error("Could Not Add Course Details");
        }
        toast.success("Course Details Added Successfully");
        result = response?.data?.data;
    } catch (error) {
        console.log("CREATE COURSE API ERROR............", error);
        toast.error(error?.response?.data?.message || error.message);
    }
    toast.dismiss(toastId);
    return result;
};

export const createSection = async (data, token) => {
    let result = null;
    try {
        const response = await apiConnector("POST", sectionEndpoints.SECTION_CREATE_API, data, {
            Authorization: `Bearer ${token}`,
        });
        if (!response?.data?.success) {
            throw new Error("Could Not Create Section");
        }
        result = response?.data?.data;
    } catch (error) {
        console.log("CREATE SECTION API ERROR............", error);
    }
    return result;
};

export const createSubSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Uploading video and saving lecture...");
    try {
        const response = await apiConnector("POST", subSectionEndpoints.SUBSECTION_CREATE_API, data, {

            Authorization: `Bearer ${token}`,
        });

        if (!response?.data?.success) {
            throw new Error("Could Not Add Lecture");
        }
        toast.success("Lecture Added Successfully");
        result = response?.data?.data;
    } catch (error) {
        console.log("CREATE SUB-SECTION API ERROR............", error);
        toast.error(error?.response?.data?.message || "Failed to add lecture");
    }
    toast.dismiss(toastId);
    return result;
};

export const editCourseDetails = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Updating Course...");
    try {
        const response = await apiConnector("POST", courseEndpoints.EDIT_COURSE_API, data, {
            Authorization: `Bearer ${token}`,
        });

        if (!response?.data?.success) {
            throw new Error("Could Not Update Course Details");
        }
        toast.success("Course Details Updated Successfully");
        result = response?.data?.data;
    } catch (error) {
        console.log("EDIT COURSE API ERROR............", error);
        toast.error(error?.response?.data?.message || error.message);
    }
    toast.dismiss(toastId);
    return result;
};

export const fetchInstructorCourses = async (token) => {
    let result = [];
    try {
        const response = await apiConnector("GET", courseEndpoints.GET_ALL_INSTRUCTOR_COURSES_API, null, {
            Authorization: `Bearer ${token}`,
        });
        result = response?.data?.data;
    } catch (error) {
        console.log("INSTRUCTOR COURSES API ERROR............", error);
    }
    return result;
};

export const deleteCourse = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Deleting Course...");
    try {
        const response = await apiConnector("DELETE", courseEndpoints.DELETE_COURSE_API, data, {
            Authorization: `Bearer ${token}`,
        });

        if (!response?.data?.success) {
            throw new Error("Could Not Delete Course");
        }
        toast.success("Course Deleted Successfully");
        result = response?.data?.success;
    } catch (error) {
        console.log("DELETE COURSE API ERROR............", error);
        toast.error(error?.response?.data?.message || error.message);
    }
    toast.dismiss(toastId);
    return result;
};


export const getAllCourses = async () => {
    let result = [];
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("GET", courseEndpoints.GET_ALL_COURSES_API);

        if (!response?.data?.success) {
            throw new Error("Could not fetch courses");
        }

        result = response?.data?.data;
    } catch (error) {
        console.log("GET ALL COURSES API ERROR............", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
};