import express from "express";

const server = express();
const PORT = 3000;

server.get('/', (req, res) => {
   res.json({
      message: 'Hello World',
   });
});

server.listen(PORT, (error) => {
   if (error) {
      return console.error(error);
   }
   console.log(`Server is running on http://localhost:${PORT}`);
});