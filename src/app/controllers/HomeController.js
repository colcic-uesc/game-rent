class HomeController {
   index(req, res) {
      return res.json({ message: "Welcome to the Game Rent API" });
   }

   show(req, res) {
      // ...
   }

   create(req, res) {
      // ...
   }

   update(req, res) {
      // ...
   }

   destroy(req, res) {
      // ...
   }
}

export default new HomeController();
