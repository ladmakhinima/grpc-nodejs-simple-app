const UserModel = require("./user.model");

class RpcMethod {
  static CreateUser = async function (call, callback) {
    const user = new UserModel(call.request);
    await user.save();
    callback(null, user);
  };
  static GetAllUsers = async function (call, callback) {
    const data = await UserModel.find({});
    callback(null, { data });
  };
  static GetUserById = async function (call, callback) {
    const { id } = call.request;
    const user = await UserModel.findOne({ id });
    callback(null, user);
  };
  static DeleteUserById = async function (call, callback) {
    const { id } = call.request;
    const user = await UserModel.findOne({ id });
    if (!user) {
      callback({ message: "Not Found" }, {});
      return;
    }
    await user.deleteOne();
    callback(null, { status: 1 });
  };
  static UpdateUserById = async function (call, callback) {
    const { select, data } = call.request;
    const user = await UserModel.findOne({ id: select.id });
    if (!user) {
      callback({ message: "User Not Found" }, null);
      return;
    }
    const updateUser = Object.assign(user, data);
    await user.save(updateUser);
    callback(null, { status: 1 });
  };
}

module.exports = { RpcMethod };
