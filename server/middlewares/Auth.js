const jwt = require("jsonwebtoken");   // Import JWT for token verification
const User = require("../models/User"); // Import User model for validation

// ✅ Middleware to authenticate using JWT
const auth = async (req, res, next) => {
    try {
        // Extract token from Authorization header
        const token = req.header("Authorization")?.replace("Bearer ", "");

        // If token is missing
        if (!token) {
            return res.status(401).json({ success: false, message: "Token Missing" });
        }

        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Attach the decoded user ID to the request
        req.user = { userId: decoded.userId };

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error("Authentication error:", error);
        res.status(401).json({ success: false, message: "Invalid or Expired Token" });
    }
};

module.exports = auth;  // ✅ Export the middleware properly
