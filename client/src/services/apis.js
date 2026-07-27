const BASE_URL = process.env.REACT_APP_BASE_URL;

export const categories = {
     CATEGORIES_API: `${BASE_URL}/category/getAllCategories`,
     SUBCATEGORIES_API: `${BASE_URL}/category/getSubCategories`,
     GET_CATEGORY_PAGE_DETAILS_API: `${BASE_URL}/category/getCategoryPageDetails`,
};


export const auth = {
     SEND_OTP: `${BASE_URL}/auth/sendOTP`,
     Sign_UP: `${BASE_URL}/auth/signup`,
     Log_IN: `${BASE_URL}/auth/login`,
     LOGOUT_API: `${BASE_URL}/auth/logout`
}

export const profile = {
     UPDATE_PROFILE: `${BASE_URL}/profile/updateProfile`,
     DELETE_PROFILE: `${BASE_URL}/profile/deleteProfile`,
     GET_ENROLLED_COURSES_API: `${BASE_URL}/profile/getEnrolledCourses`,

}

export const courseEndpoints = {
     COURSE_CREATE_API: `${BASE_URL}/course/createCourse`,
     EDIT_COURSE_API: `${BASE_URL}/course/editCourse`,
     GET_ALL_INSTRUCTOR_COURSES_API: `${BASE_URL}/course/getInstructorCourses`,
     DELETE_COURSE_API: `${BASE_URL}/course/deleteCourse`,
     GET_ALL_COURSES_API: `${BASE_URL}/course/getAllCourses`,
     GET_COURSE_DETAILS_API: `${BASE_URL}/course/getCourseDetails`
}

export const sectionEndpoints = {
     SECTION_CREATE_API: `${BASE_URL}/section/createSection`

}

export const subSectionEndpoints = {
     SUBSECTION_CREATE_API: `${BASE_URL}/subSection/createSubSection`

}

export const studentEndpoints = {
     ENROLL_COURSE_API: `${BASE_URL}/payment/enrollCourse` // Updated to point to the payment route
}

export const courseProgressEndpoints={
     COURSE_PROGRESS_UPDATE_API:`${BASE_URL}/progress/updateCourseProgress`,
     COURSE_PROGRESS_DETAILS_API:`${BASE_URL}/progress/getCourseProgress/:courseId`
}

export const resetpasswordEndpoints = {
    RESETPASSWORD_TOKEN_API:
        BASE_URL + "/reset/reset-password-token",

    RESETPASSWORD_API:
        BASE_URL + "/reset/reset-password"
}