import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Easy Node Backend API',
      version: '1.0.0',
    },
    // Define your categories here globally to prevent the 'null name' error
    tags: [
      { name: 'Splash', description: 'Onboarding screens' },
      { name: 'Home', description: 'Dashboard data' },
      { name: 'Auth', description: 'User registration and login' }
    ]
  },
  apis: [
    './index.js',         
    './feature/**/*.js' // This will catch everything in subfolders       
  ],
};

export const swaggerSpec = swaggerJSDoc(options);