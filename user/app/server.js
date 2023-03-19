require("./db-connection");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");
const { UserModel } = require("./user.model");
const userProtoPath = path.join(__dirname, "..", "..", "protos", "user.proto");
const userProto = protoLoader.loadSync(userProtoPath);
const userProtoGrpc = grpc.loadPackageDefinition(userProto);
const server = new grpc.Server();
const userServiceImpl = {
  CreateUser: async function (call, callback) {
    const user = new UserModel(call.request);
    await user.save();
    callback(null, user);
  },
};
server.addService(userProtoGrpc.user.UserService.service, userServiceImpl);
server.bindAsync(
  "localhost:8080",
  grpc.ServerCredentials.createInsecure(),
  (err, port) => {
    if (err) console.log(`server not running`);
    else {
      console.log(`the server is running at ${port}`);
      server.start();
    }
  }
);
