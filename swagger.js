import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Splash Backend API",
      version: "1.0.0",
      description: "Simple onboarding/splash backend for mobile apps"
    },
    servers: [
      {
        url: "/",               
        description: "Current server"
      }
    ]
  },
  apis: ["./index.js", "./auth.routes.js"]
};

export const swaggerSpec = swaggerJSDoc(options);
