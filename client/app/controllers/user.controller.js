class UserController {
  client;
  constructor(client) {
    this.client = client;
  }
  createUser = (req, res) => {
    console.log(req.body);
    this.client.CreateUser(req.body, (err, message) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error Happen in creating user ..." });
      } else {
        return res
          .status(201)
          .json({ message: "User Created Successfully", data: message });
      }
    });
  };

  getUsers = (req, res) => {
    this.client.GetAllUsers(null, (err, message) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error Happen in selecting users ..." });
      } else {
        return res.status(200).json(message);
      }
    });
  };

  getUserById = (req, res) => {
    this.client.GetUserById({ id: req.params.id }, (err, message) => {
      if (err) {
        return res
          .status(404)
          .json({ message: "Error Happen in finding user by id ..." });
      } else {
        return res.status(200).json({ data: message });
      }
    });
  };

  updateUser = (req, res) => {
    this.client.UpdateUserById(
      {
        select: req.params,
        data: req.body,
      },
      (err, message) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Error Happen in creating user ..." });
        } else {
          return res.status(200).json({ message: "User Updated Successfully" });
        }
      }
    );
  };

  deleteUser = (req, res) => {
    this.client.DeleteUserById(req.params, (err, message) => {
      if (err) {
        return res.status(500).json({ message: "Delete User Failed ..." });
      } else {
        return res.status(200).json({ message: "Delete User Successfully" });
      }
    });
  };
}

module.exports = { UserController };
