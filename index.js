import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import authRoutes from "./auth.routes.js";
const app = express();

app.use(cors());
app.use(express.json());

/* ===================== */
/* 🔧 Swagger Setup */
/* ===================== */

const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Easy Backend API",
      version: "1.0.0"
    },
    tags: [
      { name: "Auth", description: "Authentication APIs" },
      { name: "Splash", description: "Splash / onboarding APIs" }
    ],
    servers: [
      {
        url: "http://localhost:3000"
      }
    ]
  },
  apis: ["./index.js", "./auth.routes.js"]
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/* ===================== */
/* 🔐 Auth */
/* ===================== */

app.use("/api/auth", authRoutes);

/* ===================== */
/* 🏠 Health Check */
/* ===================== */

app.get("/", (_, res) => {
  res.json({ status: "Splash backend running 🚀" });
});

/* ===================== */
/* 📱 Splash API */
/* ===================== */

/**
 * @swagger
 * /api/splash:
 *   get:
 *     summary: Get splash/onboarding configuration
 *     description: Returns dynamic splash screens with skip logic and local image keys
 *     tags:
 *       - Splash
 *     responses:
 *       200:
 *         description: Splash configuration
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 version:
 *                   type: number
 *                   example: 1
 *                 canSkipAll:
 *                   type: boolean
 *                   example: false
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: splash-1
 *                       title:
 *                         type: string
 *                         example: Get Discounts On All Products
 *                       description:
 *                         type: string
 *                         example: Enjoy exclusive discounts every day
 *                       image:
 *                         type: string
 *                         example: splash_discount_apple
 *                       type:
 *                         type: string
 *                         enum: [skippable, not_skippable]
 *                       cta:
 *                         type: string
 *                         example: Get Started
 *                       order:
 *                         type: number
 *                         example: 1
 */
app.get("/api/splash", (req, res) => {
  res.json({
    version: 1,
    canSkipAll: false,
    items: [
      {
        id: "splash-1",
        title: "Get Discounts On All Products",
        description: "Enjoy exclusive discounts on all grocery items every day.",
        image: "splash_discount_apple",
        type: "skippable",
        cta: "Get Started",
        order: 1
      },
      {
        id: "splash-2",
        title: "Buy Premium Quality Fruits",
        description: "Fresh, hand-picked fruits sourced directly from farms.",
        image: "splash_premium_fruits",
        type: "skippable",
        cta: "Next",
        order: 2
      },
      {
        id: "splash-3",
        title: "Buy Quality Dairy Products",
        description: "Milk, cheese, and dairy products with guaranteed freshness.",
        image: "splash_dairy",
        type: "skippable",
        cta: "Next",
        order: 3
      },
      {
        id: "splash-4",
        title: "Welcome to FreshCart",
        description: "Premium food delivered at your doorstep with care.",
        image: "splash_welcome_farmer",
        type: "not_skippable",
        cta: "Continue",
        order: 4
      },
      {
        id: "splash-5",
        title: "Buy Premium Quality Fruits",
        description: "Seasonal fruits packed and delivered on the same day.",
        image: "splash_orange_plate",
        type: "skippable",
        cta: "Next",
        order: 5
      },
      {
        id: "splash-6",
        title: "Buy Quality Dairy Products",
        description: "Healthy dairy products delivered cold and fresh.",
        image: "splash_milk_bottle",
        type: "skippable",
        cta: "Next",
        order: 6
      },
      {
        id: "splash-7",
        title: "Get Discounts On All Products",
        description: "Save more with weekly deals and special offers.",
        image: "splash_seafood_discount",
        type: "skippable",
        cta: "Next",
        order: 7
      },
      {
        id: "splash-8",
        title: "Buy Grocery Easily",
        description: "Order groceries in just a few taps from your phone.",
        image: "splash_grocery_illustration",
        type: "skippable",
        cta: "Next",
        order: 8
      },
      {
        id: "splash-9",
        title: "Fast Delivery",
        description: "Get your groceries delivered fast and on time.",
        image: "splash_fast_delivery",
        type: "not_skippable",
        cta: "Next",
        order: 9
      },
      {
        id: "splash-10",
        title: "Enjoy Quality Food",
        description: "We ensure quality checks on every product you receive.",
        image: "splash_quality_food",
        type: "not_skippable",
        cta: "Start Shopping",
        order: 10
      }
    ]
  });
});

/* ===================== */
/* 🚀 Start Server */
/* ===================== */

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
