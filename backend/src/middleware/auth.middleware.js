import { admin } from "../config/firebase.config.js";
import { to } from "../lib/to.lib.js";

/**
 * Authentication middleware to verify Firebase ID tokens and attach user info to the request object.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
async function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization || "";

  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res
      .status(401)
      .json({ error: "Unauthorized", message: "No token provided" });

  const token = authHeader.split(" ")[1];

  const [error, decodedToken] = await to(admin.auth().verifyIdToken(token));
  if (error) {
    console.error("Error verifying Firebase ID token:", error);

    if (error.code === "auth/id-token-expired")
      return res
        .status(401)
        .json({ error: "Unauthorized", message: "Token expired" });

    return res
      .status(401)
      .json({ error: "Unauthorized", message: "Invalid Token" });
  }

  req.user = decodedToken;
  next();
}
