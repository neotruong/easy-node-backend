import express from "express";
import { getUsers, saveUsers } from "./auth.store.js";

const router = express.Router();

/* ===================== */
/* 📝 REGISTER */
/* ===================== */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password, phone]
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@mail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *               phone:
 *                 type: string
 *                 example: "+84901234567"
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 */
router.post("/register", (req, res) => {
  const { email, password, phone } = req.body;

  if (!email || !password || !phone) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const users = getUsers();

  const exists = users.find(u => u.email === email);
  if (exists) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const user = {
    id: Date.now(),
    email,
    password,
    phone
  };

  users.push(user);
  saveUsers(users);

  res.status(201).json({
    message: "Register success",
    user: { id: user.id, email, phone }
  });
});


/* ===================== */
/* 🔐 LOGIN */
/* ===================== */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login with email and password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@mail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login success
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const users = getUsers();

  const user = users.find(
    u => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({
    message: "Login success",
    token: "fake-jwt-token",
    user: { id: user.id, email: user.email, phone: user.phone }
  });
});


export default router;
