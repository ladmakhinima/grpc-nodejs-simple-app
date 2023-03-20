const { UserController } = require("../controllers/user.controller");
const router = require("express").Router();
class UserRouter {
  client;
  controller;
  constructor(client) {
    this.client = client;
    this.controller = new UserController(client);
  }
  init() {
    router.get("/", this.controller.getUsers);
    router.get("/:id", this.controller.getUserById);
    router.delete("/:id", this.controller.deleteUser);
    router.post("/", this.controller.createUser);
    router.patch("/:id", this.controller.updateUser);
    return this;
  }

  getRouter() {
    return router;
  }
}
module.exports = { UserRouter };
