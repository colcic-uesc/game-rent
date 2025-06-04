import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
   definition: {
      openapi: "3.0.0",
      info: {
         title: "API Documentation",
         version: "1.0.0",
         description: "Documentation for Game Rent API",
      },
      servers: [
         {
            url: `http://localhost:${process.env.PORT}`,
         },
      ],
      components: {
         securitySchemes: {
            bearerAuth: {
               type: 'http',
               scheme: 'bearer',
               bearerFormat: 'JWT',
            },
         },
      },
      security: [
         {
            bearerAuth: [],
         },
      ],
   },
   apis: ["./src/routes.js"],
};

const specs = swaggerJsdoc(options);

export {
   specs,
   swaggerUi
}
