const User = require("../models/User");
const Thought = require("../models/Thought");

module.exports = {
  // find all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.status(200).json(thoughts);
    } catch (err) {
      console.log("Something went wrong");
      res.status(500).json(err);
    }
  },
  // find a single thought
  async getSingleThought(req, res) {
    try {
      const singlethought = await Thought.findOne({
        _id: req.params.thoughtId,
      }).select("-__v");

      if (!singlethought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      res.status(200).json(singlethought);
    } catch (err) {
      console.log("Something went wrong");
      res.status(500).json(err);
    }
  },
  // create a new thought
  async createThought(req, res) {
    try {
      const dbThoughtData = await Thought.create({
        thoughtText: req.body.thoughtText,
        username: req.body.username,
      });
      const dbUserDataUpdate = await User.findOneAndUpdate(
        { username: req.body.username },
        {
          $push: { thoughts: dbThoughtData._id },
        },
        { new: true }
      );
      res.status(200).json(dbUserDataUpdate);
      console.log(`Created: ${dbThoughtData}`);
    } catch (err) {
      console.log("Something went wrong");
      res.status(500).json(err);
    }
  },
  // update a thought
  async updateThought(req, res) {
    try {
      const updateThought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        {
          thoughtText: req.body.thoughtText,
        },
        { new: true }
      );
      res.status(200).json(updateThought);
      console.log(`Updated: ${updateThought}`);
    } catch (err) {
      console.log("Something went wrong");
      res.status(500).json(err);
    }
  },
  // delete a thought
  async deleteThought(req, res) {
    try {
      const deleteThought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      }).select("-__v");

      if (!deleteThought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }
      await User.findOneAndUpdate(
        { _id: req.params.userId },
        {
          $pull: { thought: req.params.thoughtId },
        },
        { new: true }
      );
      res.status(200).json({ message: "Thought deleted!" });
      console.log("Deleted thought!");
    } catch (err) {
      console.log("Something went wrong");
      res.status(500).json(err);
    }
  },
  // add reaction
  async addReactions(req, res) {
    try {
      const addReactions = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        {
          $push: {
            reactions: {
              reactionBody: req.body.reactionBody,
              username: req.body.username,
            },
          },
        },
        { new: true }
      );
      res.status(200).json(addReactions);
      console.log(`Added Reaction: ${addReactions}`);
    } catch (err) {
      console.log("Something went wrong");
      res.status(500).json(err);
    }
  },
  // delete reaction
  async deleteReactions(req, res) {
    try {
      await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        {
          $pull: {
            reactions: {
              _id: req.params.reactionId,
            },
          },
        }
      );
      res.status(200).json({ message: "Reaction deleted!" });
      console.log(`Deleted Reaction`);
    } catch (err) {
      console.log("Something went wrong");
      res.status(500).json(err);
    }
  },
};
