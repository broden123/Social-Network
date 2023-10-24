const User = require("../models/User");
const Thought = require("../models/Thought");

module.exports = {
  // find all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      console.log("Something went wrong");
      res.status(500).json(err);
    }
  },
  // find a single user
  async getSingleUser(req, res) {
    try {
      const singleuser = await User.findOne({ _id: req.params.userId }).select(
        "-__v"
      );

      if (!singleuser) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      res.status(200).json(singleuser);
    } catch (err) {
      console.log("Something went wrong");
      res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const dbUserData = await User.create({
        username: req.body.username,
        email: req.body.email,
      });
      res.status(200).json(dbUserData);
    } catch (err) {
      console.log("Something went wrong");
      res.status(500).json(err);
    }
  },
  // update a user
  async updateUser(req, res) {
    try {
      const updateUsers = await User.findOneAndUpdate(
        { _id: req.params.userId },
        {
          username: req.body.username,
          email: req.body.email,
        },
        { new: true }
      );
      res.status(200).json(updateUsers);
      console.log(`Updated: ${updateUsers}`);
    } catch (err) {
      console.log("Something went wrong");
      res.status(500).json({ error: "Something went wrong" });
    }
  },
  // delete a user and their thoughts
  async deleteUser(req, res) {
    try {
      const userDelete = await User.findOneAndDelete({
        _id: req.params.userId,
      }).select("-__v");

      if (!userDelete) {
        return res.status(404).json({ message: "No user with that ID" });
      }
      // need to add way to find username from userID for this to work
      // await Thought.deleteMany({
      //   username: req.params.userId,
      // });
      res.status(200).json({ message: "Deleted User" });
      console.log(`Deleted User`);
    } catch (err) {
      console.log("Something went wrong");
      res.status(500).json(err);
    }
  },
  // add a friend
  async addFriends(req, res) {
    try {
      const addFriends = await User.findOneAndUpdate(
        { _id: req.params.userId },
        {
          $push: { friends: req.params.friendId },
        },
        { new: true }
      );
      res.status(200).json(addFriends);
      console.log(`Added Friend: ${addFriends}`);
    } catch (err) {
      console.log("Something went wrong");
      res.status(500).json(err);
    }
  },
  // delete a friend
  async deleteFriends(req, res) {
    try {
      const deleteFriends = await User.findOneAndUpdate(
        { _id: req.params.userId },
        {
          $pull: { friends: req.params.friendId },
        },
        { new: true }
      );
      res.status(200).json(deleteFriends);
      console.log(`Deleted Friend: ${deleteFriends}`);
    } catch (err) {
      console.log("Something went wrong");
      res.status(500).json(err);
    }
  },
};
