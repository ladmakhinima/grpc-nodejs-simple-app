const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");
const userProtoPath = path.join(
  __dirname,
  "..",
  "..",
  "..",
  "protos",
  "user.proto"
);
const userProto = protoLoader.loadSync(userProtoPath);
const userProtoGrpc = grpc.loadPackageDefinition(userProto);
const client = new userProtoGrpc.user.UserService(
  "localhost:8080",
  grpc.credentials.createInsecure()
);
module.exports = { grpcClient: client };
