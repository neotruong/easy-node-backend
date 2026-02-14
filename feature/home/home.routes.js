import express from 'express';
const router = express.Router();

/**
 * @swagger
 * /api/v1/banners:
 *   get:
 *     summary: Get promotional banners
 *     tags: [Home]
 *     responses:
 *       200:
 *         description: List of banners
 */

router.get("/banners", (req, res) => {
  res.json({
    banners: [
      {
        id: "b_001",
        image_url: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80",
        deeplink: "app://offers/first-purchase",
        alt_text: "20% off on your first purchase"
      },
      {
        id: "b_002",
        image_url: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&w=800&q=80",
        deeplink: "app://category/vegetables",
        alt_text: "Fresh Veggie Week"
      }
    ]
  });
});

/**
 * @swagger
 * /api/v1/categories:
 *   get:
 *     summary: Get product categories
 *     tags: [Home]
 *     responses:
 *       200:
 *         description: List of categories
 */

router.get("/categories", (req, res) => {
  res.json({
    categories: [
      { id: "cat_1", name: "Vegetables", icon_url: "https://cdn-icons-png.flaticon.com/512/2329/2329865.png", bg_color_hex: "#E8F5E9" },
      { id: "cat_2", name: "Fruits", icon_url: "https://cdn-icons-png.flaticon.com/512/3194/3194766.png", bg_color_hex: "#FBE9E7" },
      { id: "cat_3", name: "Beverages", icon_url: "https://cdn-icons-png.flaticon.com/512/3127/3127450.png", bg_color_hex: "#FFF3E0" },
      { id: "cat_4", name: "Grocery", icon_url: "https://cdn-icons-png.flaticon.com/512/3724/3724720.png", bg_color_hex: "#F3E5F5" },
      { id: "cat_5", name: "Edible oil", icon_url: "https://cdn-icons-png.flaticon.com/512/1041/1041913.png", bg_color_hex: "#E0F7FA" },
      { id: "cat_6", name: "Household", icon_url: "https://cdn-icons-png.flaticon.com/512/2553/2553642.png", bg_color_hex: "#FCE4EC" }
    ]
  });
});

/**
 * @swagger
 * /api/v1/products/featured:
 *   get:
 *     summary: Get featured products
 *     tags: [Home]
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           default: 4
 *           maximum: 10
 *           example: 4
 *         description: Number of products per page (max 10)
 *     responses:
 *       200:
 *         description: List of products
 */


// Mock Database: A larger list of products
const ALL_PRODUCTS = [
  {
    id: "prod_001",
    name: "Fresh Peach",
    price: 8.00,
    currency: "USD",
    unit: "dozen",
    image_url: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=400&q=80",
    is_favorite: true,
    discount_label: "10% OFF",
    cart_quantity: 0
  },
  {
    id: "prod_002",
    name: "Organic Avocado",
    price: 12.50,
    currency: "USD",
    unit: "kg",
    image_url: "https://images.unsplash.com/photo-1523049673856-3843e97d4400?auto=format&fit=crop&w=400&q=80",
    is_favorite: false,
    discount_label: null,
    cart_quantity: 0
  },
  {
    id: "prod_003",
    name: "Red Apple",
    price: 5.00,
    currency: "USD",
    unit: "kg",
    image_url: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?auto=format&fit=crop&w=400&q=80",
    is_favorite: false,
    discount_label: null,
    cart_quantity: 2
  },
  {
    id: "prod_004",
    name: "Yellow Banana",
    price: 3.50,
    currency: "USD",
    unit: "bunch",
    image_url: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=400&q=80",
    is_favorite: true,
    discount_label: "Best Seller",
    cart_quantity: 0
  },
  {
    id: "prod_005",
    name: "Sweet Cherry",
    price: 15.00,
    currency: "USD",
    unit: "box",
    image_url: "https://images.unsplash.com/photo-1528821154947-1aa3d1b74941?auto=format&fit=crop&w=400&q=80",
    is_favorite: false,
    discount_label: null,
    cart_quantity: 0
  },
  {
    id: "prod_006",
    name: "Fresh Orange",
    price: 6.00,
    currency: "USD",
    unit: "kg",
    image_url: "https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&w=400&q=80",
    is_favorite: false,
    discount_label: "New",
    cart_quantity: 0
  },
  {
    id: "prod_007",
    name: "Ripe Strawberry",
    price: 9.00,
    currency: "USD",
    unit: "box",
    image_url: "https://images.unsplash.com/photo-1518635017498-87f514b751ba?auto=format&fit=crop&w=400&q=80",
    is_favorite: true,
    discount_label: null,
    cart_quantity: 0
  },
  {
    id: "prod_008",
    name: "Green Lemon",
    price: 4.50,
    currency: "USD",
    unit: "dozen",
    image_url: "https://images.unsplash.com/photo-1568569350062-ebfa3cb195df?auto=format&fit=crop&w=400&q=80",
    is_favorite: false,
    discount_label: null,
    cart_quantity: 0
  },
  {
    id: "prod_009",
    name: "Watermelon",
    price: 7.00,
    currency: "USD",
    unit: "piece",
    image_url: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=400&q=80",
    is_favorite: false,
    discount_label: "Seasonal",
    cart_quantity: 0
  },
  {
    id: "prod_010",
    name: "Pineapple",
    price: 6.50,
    currency: "USD",
    unit: "piece",
    image_url: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=400&q=80",
    is_favorite: false,
    discount_label: null,
    cart_quantity: 0
  }
];

router.get("/products/featured", (req, res) => {
  // Constants
  const DEFAULT_LIMIT = 4;
  const MAX_LIMIT = 10; // Cap the maximum items per page

  // 1. Parse query params
  const page = parseInt(req.query.page) || 1;
  
  // Logic: Take the user's limit, default to 4 if missing, and cap it at MAX_LIMIT
  let limit = parseInt(req.query.limit) || DEFAULT_LIMIT;
  if (limit > MAX_LIMIT) {
    limit = MAX_LIMIT;
  }

  // 2. Calculate indexes
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  // 3. Slice data
  const resultProducts = ALL_PRODUCTS.slice(startIndex, endIndex);

  // 4. Pagination metadata
  const totalItems = ALL_PRODUCTS.length;
  const totalPages = Math.ceil(totalItems / limit);
  const hasMore = endIndex < totalItems;

  // 5. Send response
  res.json({
    products: resultProducts,
    pagination: {
      current_page: page,
      total_pages: totalPages,
      total_items: totalItems,
      per_page: limit,
      has_more: hasMore
    }
  });
});

/**
 * @swagger
 * /api/v1/cart/summary:
 *   get:
 *     summary: Get cart summary
 *     tags: [Home]
 *     responses:
 *       200:
 *         description: Cart total
 */
router.get("/cart/summary", (req, res) => {
  res.json({
    total_items: 1,
    total_price: 7.00,
    currency_symbol: "$"
  });
});

export default router;