const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.authentication = (req, res, next) => {
    try {
        // Extract token from header, cookies, or body
        const token =
            req.header("Authorization")?.replace("Bearer ", "") ||
            req.cookies?.token ||
            req.body?.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is missing"
            })
        }

        try {
            // Verification
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decode;
            next();
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "JWT expired. Please login again.",
                error: error.message,
            });
        }
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Something went wrong while validating the token",
            error: error.message,
        })
    }
}


exports.isStudent = (req, res, next) => {
    try {
        if (req.user.accountType !== "Student") {
            return res.status(403).json({
                success: false,
                message: "This route is restricted to students only",
            });
        }

        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

exports.isAdmin = (req, res, next) => {
    try {
        if (req.user.accountType !== "Admin") {
            return res.status(403).json({
                success: false,
                message: "This route is restricted to admins only",
            });
        }

        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};
exports.isInstructor = (req, res, next) => {
    try {
        if (req.user.accountType !== "Instructor") {
            return res.status(403).json({
                success: false,
                message: "This route is restricted to Instructor only",
            });
        }

        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};