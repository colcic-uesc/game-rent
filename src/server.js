import app from "./app";

app.listen(process.env.PORT, (error) => {
   if (error) {
      return console.error(error);
   }
   console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
