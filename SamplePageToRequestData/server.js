"use strict";

const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.static("public"));

app.listen(process.env.port, () => {
  const port = server.address().port
  console.log(`Server listening on port ${port}...`);
});
