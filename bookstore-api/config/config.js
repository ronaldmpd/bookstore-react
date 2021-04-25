const PORT = process.env.PORT || 3000;
const development = {
  username: process.env.USERNAMEDB || "root",
  password: process.env.PASSWORDDB || "",
  database: process.env.DATABASE || "bookstore-online-dev",
  host: process.env.HOSTDB || "127.0.0.1",
  dialect: process.env.DIALECTDB || "mysql",
};

const test = {
  username: process.env.USERNAMEDB || "root",
  password: process.env.PASSWORDDB || "",
  database: process.env.DATABASE || "bookstore-online-test",
  host: process.env.HOSTDB || "127.0.0.1",
  dialect: process.env.DIALECTDB || "mysql",
};

  const production = {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  };

  const swaggerOptions = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "BookStore Onlie API with Swagger",
        version: "0.1.0",
        description:
          "Este es un API que permite realizar un CRUD para administrar/usar nuestra libreria online",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
          name: "ronaldmpd",
          url: "https://ronaldmpd.me",
          email: "info@email.com",
        },
      },
      servers: [
        {
          url: "http://localhost:3000",
        },
      ],
    },
    apis: ["./routes/authors.js", './routes/books.js', "./routes/clients.js", "./routes/carts.js", "./routes/cartdetails.js"],
  };
  
module.exports = {
    PORT,
    development,
    test,
    production,
    swaggerOptions,
};