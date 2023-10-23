const User = require("../models/User");
const Thought = require("../models/Thought");

module.exports = {
  //find all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //find a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId }).select(
        "-__v"
      );

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //update a user
  async updateUser(req, res) {
    try {
      const result = await User.findOneAndUpdate(
        { _id: req.params.userId },
        {
          username: req.body.username,
          email: req.body.email,
        },
        { new: true }
      );
      res.status(200).json(result);
      console.log(`Updated: ${result}`);
    } catch (err) {
      console.log("Something went wrong");
      res.status(500).json({ error: "Something went wrong" });
    }
  },
  // delete a user and their thoughts
  async deleteUser(req, res) {
    try {
      const userdel = await User.findOneAndDelete({
        _id: req.params.userId,
      }).select("-__v");

      if (!userdel) {
        return res.status(404).json({ message: "No user with that ID" });
      }
      const thoughtDel = await Thought.deleteMany({
        username: req.params.userId,
      });
      res.status(200).json(userdel);
      res.status(200).json(thoughtDel);
      console.log(`Deleted: ${userdel} and their thoughts!`);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
