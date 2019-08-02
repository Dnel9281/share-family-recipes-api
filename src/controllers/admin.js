'use strict';
const User = require('../models/sequelize').user;
const sequelize = require('../models/sequelize').sequelize;

let attributesArray = [
  'id', 'username', 'firstName', 'lastName', 
  'email', 'isVerified', 'isAdmin', 'createdAt'
];

function checkOffset(offset) {
  if (offset < 0 || !offset) {
    return 0;
  } else {
    return offset;
  }
}

function checkLimit(limit) {
  if (limit <= 0 || !limit) {
    return  5;
  } else {
    return limit;
  }
}

module.exports = {
  getUsersByNewest: async (req, res) => {
    try {
      let offset = checkOffset(req.query.offset);
      let limit = checkLimit(req.query.limit);

      let users = await User.findAll({
        offset: offset,
        limit: limit,
        attributes: attributesArray,
        order: [['createdAt', 'DESC']]
      });
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ message: "There was an error getting the list of users." });
    }
  },
  getUsersByOldest: async (req, res) => {
    try {
      let offset = checkOffset(req.query.offset);
      let limit = checkLimit(req.query.limit);

      let users = await User.findAll({
        offset: offset,
        limit: limit,
        attributes: attributesArray,
        order: [['createdAt']]
      });
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ message: "There was an error getting the list of users." });
    }
  },
  getUsersAtoZ: async (req, res) => {
    try {
      let offset = checkOffset(req.query.offset);
      let limit = checkLimit(req.query.limit);

      let users = await User.findAll({
        offset: offset,
        limit: limit,
        attributes: attributesArray,
        order: [[sequelize.fn('lower', sequelize.col('username'))]]
      });
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ message: "There was an error getting the list of users." });
    }
  },
  getUsersZtoA: async (req, res) => {
    try {
      let offset = checkOffset(req.query.offset);
      let limit = checkLimit(req.query.limit);

      let users = await User.findAll({
        offset: offset,
        limit: limit,
        attributes: attributesArray, 
        order: [[sequelize.fn('lower', sequelize.col('username')), 'DESC']]
      });
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ message: "There was an error getting the list of users." });
    }
  },
  getUsersFirstNameAtoZ: async (req, res) => {
    try {
      let offset = checkOffset(req.query.offset);
      let limit = checkLimit(req.query.limit);

      let users = await User.findAll({
        offset: offset,
        limit: limit,
        attributes: attributesArray,
        order: [[sequelize.fn('lower', sequelize.col('firstName'))]]
      });
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ message: "There was an error getting the list of users." });
    }
  },
  getUsersFirstNameZtoA: async (req, res) => {
    try {
      let offset = checkOffset(req.query.offset);
      let limit = checkLimit(req.query.limit);

      let users = await User.findAll({
        offset: offset,
        limit: limit,
        attributes: attributesArray, 
        order: [[sequelize.fn('lower', sequelize.col('firstName')), 'DESC']]
      });
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ message: "There was an error getting the list of users." });
    }
  },
  getUsersLastNameAtoZ: async (req, res) => {
    try {
      let offset = checkOffset(req.query.offset);
      let limit = checkLimit(req.query.limit);

      let users = await User.findAll({
        offset: offset,
        limit: limit,
        attributes: attributesArray,
        order: [[sequelize.fn('lower', sequelize.col('lastName'))]]
      });
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ message: "There was an error getting the list of users." });
    }
  },
  getUsersLastNameZtoA: async (req, res) => {
    try {
      let offset = checkOffset(req.query.offset);
      let limit = checkLimit(req.query.limit);

      let users = await User.findAll({
        offset: offset,
        limit: limit,
        attributes: attributesArray, 
        order: [[sequelize.fn('lower', sequelize.col('lastName')), 'DESC']]
      });
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ message: "There was an error getting the list of users." });
    }
  }
}