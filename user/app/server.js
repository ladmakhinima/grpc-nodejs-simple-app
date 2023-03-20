require("./db-connection");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");
const { RpcMethod } = require("./rpc-method");
const userProtoPath = path.join(__dirname, "..", "..", "protos", "user.proto");
const userProto = protoLoader.loadSync(userProtoPath);
const userProtoGrpc = grpc.loadPackageDefinition(userProto);
const server = new grpc.Server();
server.addService(userProtoGrpc.user.UserService.service, {
  CreateUser: RpcMethod.CreateUser,
  DeleteUserById: RpcMethod.DeleteUserById,
  GetAllUsers: RpcMethod.GetAllUsers,
  GetUserById: RpcMethod.GetUserById,
  UpdateUserById: RpcMethod.UpdateUserById,
});
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
