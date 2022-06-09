const express = require("express");
const app = express();

const router = require("./routes");

app.use(express.json());

app.use("/api", router);

app.listen(5000, () => console.log("Server started on port 5000"));
