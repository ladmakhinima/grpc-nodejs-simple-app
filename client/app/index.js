const express = require("express");
const http = require("http");
const morgan = require("morgan");
const { grpcClient } = require("./grpc/loader");
const app = express();
app.use(morgan("dev"));
app.use(express.json());
const { UserRouter } = require("./routes/user.routes");
app.use("/api/users", new UserRouter(grpcClient).init().getRouter());
const server = http.createServer(app);
server.listen(3000, () => {
  console.log("the users app run at 3000");
});
