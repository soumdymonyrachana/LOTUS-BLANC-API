import swaggerJsdoc from "swagger-jsdoc";
import path from "path";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Lotus Blanc API",
      version: "1.0.0",
      description: "API documentation for reservation system",
    },
    servers: [
      {
        url: "http://localhost:8000",
      },
    ],
  },

  // ✅ FIX: this is the KEY problem
  apis: [path.join(process.cwd(), "src/routes/*.ts")],
};

export const specs = swaggerJsdoc(options);