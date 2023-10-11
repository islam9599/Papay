const htpp = require("http");

const mongodb = require("mongodb");

let db;
const connectionString =
  "mongodb+srv://islam9995:R2DLdhWIcP3BQuQq@cluster0.1znigwz.mongodb.net/Papay";

mongodb.connect(
  connectionString,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, client) => {
    if (err) console.log("Error on connection MongoDB");
    else {
      console.log("MongoDB is connected succesafully");
      //   console.log(client);
      module.exports = client;
      const app = require("./app");
      const server = htpp.createServer(app);
      let PORT = 3002;
      server.listen(PORT, function () {
        console.log(
          `The server is running successfully on port: ${PORT}, http//localhost:${PORT} `
        );
      });
    }
  }
);
