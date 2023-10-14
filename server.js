const dotenv = require("dotenv");
dotenv.config();
const htpp = require("http");
const mongodb = require("mongodb");

const connectionString = process.env.MONGO_URL;

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
      let PORT = process.env.PORT || 3000;
      server.listen(PORT, function () {
        console.log(
          `The server is running successfully on port: ${PORT}, http//localhost:${PORT} `
        );
      });
    }
  }
);
