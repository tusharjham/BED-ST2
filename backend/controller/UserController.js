const User = require("../model/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userRegister = async (req, res) => {
  try {
    const { name, email, password, pic } = req.body;
    const check = await User.findOne({ email });
    if (check) {
      res.status(400);
      throw new Error("User already exists");
    }
    const pass = bcrypt.hash(password, 10);
    const userData = await User.create({
      name,
      email,
      password: (await pass).toString(),
      pic,
    });
    const token1 = jwt.sign({ email }, process.env.JWT_SECRET_KEY, {
      expiresIn: "30d",
    });
    res.cookie("login", token1, {
      httpOnly: true,
    });
    res.status(200).send({
      _id: userData._id,
      name,
      email,
      token: token1,
    });
  } catch (error) {
    res.status(400).json(error.toString());
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userLogger = await User.findOne({ email });
    if (!userLogger) throw new Error("Invalid Username/Password");
    const check = await bcrypt.compare(password, userLogger.password);
    if (check) {
      const token1 = jwt.sign({ email }, process.env.JWT_SECRET_KEY, {
        expiresIn: "30d",
      });
      res.cookie("login", token1, {
        httpOnly: true,
      });
      res.status(200).send({
        _id: userLogger._id,
        name: userLogger.name,
        email,
        token: token1,
      });
    } else {
      throw new Error("Invalid Username/Password");
    }
  } catch (err) {
    res.status(400).send(err.toString());
  }
};
const userLogout = async (req, res) => {
  try {
    res.clearCookie("login");
    res.status(200).send();
  } catch (err) {
    res.status(400).send(err.toString());
  }
};

module.exports = { userRegister, userLogin, userLogout };
