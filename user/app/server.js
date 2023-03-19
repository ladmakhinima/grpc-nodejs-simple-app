const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");
const userProtoPath = path.join(__dirname, "..", "..", "protos", "user.proto");
const userProto = protoLoader.loadSync(userProtoPath);
const userProtoGrpc = grpc.loadPackageDefinition(userProto);
const server = new grpc.Server();
const userServiceImpl = {
  CreateUser: function (call, callback) {
    const newUser = { ...call.request, id: 1 };
    console.log("new user", newUser);
    callback(null, newUser);
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
