import { query } from "../db/connection.db.js";
import { to } from "../lib/to.lib.js";

/**
 * Controller to handle user signup
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function signup(req, res) {
  const { uid, email, name } = req.body;

  // Check if the user already exists in the database
  const [existsError, existingUser] = await to(
    query("SELECT * FROM users WHERE firebase_uid = $1", [uid])
  );

  if (existsError) {
    console.error(
      "Database error checking existing user:",
      existsError.message
    );
    return res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to check user existence",
    });
  }

  if (existingUser.rows.length > 0)
    return res
      .status(400)
      .json({ error: "Conflict", message: "User already exists" });

  // User does not exists, create a new user in the database
  const [insertError, _] = await to(
    query(
      "INSERT INTO users (firebase_uid, name, email, role) VALUES ($1, $2, $3, $4)",
      [uid, name, email, "client"]
    )
  );

  if (insertError) {
    console.error("Database error inserting user:", insertError.message);
    return res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to create user",
    });
  }

  return res.status(201).json({ message: "User created successfully" });
}

export { signup };
