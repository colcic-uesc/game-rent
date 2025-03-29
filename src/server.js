import app from './app.js';

const PORT = 3000;

app.listen(PORT, (error) => {
   if (error) {
      return console.error(error);
   }
   console.log(`Server is running on http://localhost:${PORT}`);
});