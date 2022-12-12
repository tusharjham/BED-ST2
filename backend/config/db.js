const mongoose = require("mongoose");

const mongo = async () => {
  await mongoose
    .connect(`${process.env.MONGO_URI}`)
    .then(() => console.log("Connected to database succesfully"))
    .catch((err) => console.log(err));
};
module.exports = mongo;
