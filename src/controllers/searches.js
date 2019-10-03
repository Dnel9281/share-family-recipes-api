'use strict';
// Models, operators, and database function helpers
const sequelize = require('../models/sequelize').sequelize;
const Meal = require('../models/sequelize').meal;
const User = require('../models/sequelize').user;
const Like = require('../models/sequelize').like;
const Op = require('sequelize').Op;

const attributesArray = [
  'id', 'difficulty', 'mealPic', 'name', 'cookTime', 'creatorId', 'description', 'createdAt', 'updatedAt'
];

const errorMessage = 'There was an error getting the list of meals.';

module.exports = {
  getByNewest: async (req, res) => {
    try {
      let meals = await Meal.findAndCountAll({
        offset: req.query.offset,
        limit: req.query.limit,
        attributes: attributesArray,
        order: [['createdAt', 'DESC']],
        include: [
          { model: User, as: "creator", attributes: ['username', 'profilePic'], duplicating: false },
          { model: Like, attributes: ['userId'], duplicating: false }
        ]
      });

      if (meals.rows.length === 0) return res.status(404).json({ message: 'There are no meals.' });

      res.status(200).json(meals);

    } catch (err) {
      res.status(500).json({ message: errorMessage });
    }
  },

  getByOldest: async (req, res) => {
    try {
      let meals = await Meal.findAndCountAll({
        offset: req.query.offset,
        limit: req.query.limit,
        attributes: attributesArray,
        order: ['createdAt'],
        include: [
          { model: User, as: "creator", attributes: ['username', 'profilePic'], duplicating: false },
          { model: Like, attributes: ['userId'], duplicating: false }
        ]
      });

      if (meals.rows.length === 0) return res.status(404).json({ message: 'There are no meals.' });

      res.status(200).json(meals);
    } catch (err) {
      res.status(500).json({ message: errorMessage });
    }
  },

  getMealsAtoZ: async (req, res) => {
    try {
      let meals = await Meal.findAndCountAll({
        offset: req.query.offset,
        limit: req.query.limit,
        order: [sequelize.fn('lower', sequelize.col('name'))],
        attributes: attributesArray,
        include: [
          { model: User, as: "creator", attributes: ['username', 'profilePic'], duplicating: false },
          { model: Like, attributes: ['userId'], duplicating: false },
        ]
      });

      if (meals.rows.length === 0) return res.status(404).json({ message: 'There are no meals.' });

      res.status(200).json(meals);
    } catch (err) {
      res.status(500).json({ message: errorMessage });
    }
  },

  getMealsZtoA: async (req, res) => {
    try {
      let meals = await Meal.findAndCountAll({
        offset: req.query.offset,
        limit: req.query.limit,
        attributes: attributesArray,
        order: [[sequelize.fn('lower', sequelize.col('name')), 'DESC']],
        include: [
          { model: User, as: "creator", attributes: ['username', 'profilePic'], duplicating: false },
          { model: Like, attributes: ['userId'], duplicating: false }
        ]
      });

      if (meals.rows.length === 0) return res.status(404).json({ message: 'There are no meals.' });

      res.status(200).json(meals);
    } catch (err) {
      res.status(500).json({ message: errorMessage });
    }
  },

  getMealsByIngredientsAtoZ: async (req, res) => {
    try {
      if (!req.query.ingredient) return res.status(400).json({ message: 'You must add ingredients to the search.' });

      let temp;
      if (!Array.isArray(req.query.ingredient)) {
        temp = [req.query.ingredient];
      } else {
        temp = req.query.ingredient;
      }
      let ingredients = temp.map(val => `%${val.toLowerCase()}%`);

      let meals = await Meal.findAndCountAll({
        offset: req.query.offset,
        limit: req.query.limit,
        where: {
          ingredients: {
            [Op.like]: sequelize.fn('ALL', ingredients)
          }
        },
        order: [sequelize.fn('lower', sequelize.col('name'))],
        attributes: attributesArray,
        include: [
          { model: User, as: "creator", attributes: ['username', 'profilePic'], duplicating: false },
          { model: Like, attributes: ['userId'], duplicating: false }
        ]
      });

      if (meals.rows.length === 0) return res.status(404).json({ message: 'There are no meals with those ingredients.' });

      res.status(200).json(meals);
    } catch (err) {
      res.status(500).json({ message: errorMessage });
    }
  },

  getMealsByIngredientsZtoA: async (req, res) => {
    try {
      if (!req.query.ingredient) return res.status(400).json({ message: 'You must add ingredients to the search.' });

      let temp;
      if (!Array.isArray(req.query.ingredient)) {
        temp = [req.query.ingredient];
      } else {
        temp = req.query.ingredient;
      }
      let ingredients = temp.map(val => `%${val.toLowerCase()}%`);

      let meals = await Meal.findAndCountAll({
        offset: req.query.offset,
        limit: req.query.limit,
        where: {
          ingredients: {
            [Op.like]: sequelize.fn('ALL', ingredients)
          }
        },
        order: [[sequelize.fn('lower', sequelize.col('name')), 'DESC']],
        attributes: attributesArray,
        include: [
          { model: User, as: "creator", attributes: ['username', 'profilePic'], duplicating: false },
          { model: Like, attributes: ['userId'], duplicating: false }
        ]
      });

      if (meals.rows.length === 0) return res.status(404).json({ message: 'There are no meals with those ingredients.' });

      res.status(200).json(meals);
    } catch (err) {
      res.status(500).json({ message: errorMessage });
    }
  },

  getMealsByIngredientsNewest: async (req, res) => {
    try {
      if (!req.query.ingredient) return res.status(400).json({ message: 'You must add ingredients to the search.' });

      let temp;
      if (!Array.isArray(req.query.ingredient)) {
        temp = [req.query.ingredient];
      } else {
        temp = req.query.ingredient;
      }
      let ingredients = temp.map(val => `%${val.toLowerCase()}%`);

      let meals = await Meal.findAndCountAll({
        offset: req.query.offset,
        limit: req.query.limit,
        where: {
          ingredients: {
            [Op.like]: sequelize.fn('ALL', ingredients)
          }
        },
        order: [['createdAt', 'DESC']],
        attributes: attributesArray,
        include: [
          { model: User, as: "creator", attributes: ['username', 'profilePic'], duplicating: false },
          { model: Like, attributes: ['userId'], duplicating: false }
        ]
      });

      if (meals.rows.length === 0) return res.status(404).json({ message: 'There are no meals with those ingredients.' });

      res.status(200).json(meals);
    } catch (err) {
      res.status(500).json({ message: errorMessage });
    }
  },

  getMealsByIngredientsOldest: async (req, res) => {
    try {
      if (!req.query.ingredient) return res.status(400).json({ message: 'You must add ingredients to the search.' });

      let temp;
      if (!Array.isArray(req.query.ingredient)) {
        temp = [req.query.ingredient];
      } else {
        temp = req.query.ingredient;
      }
      let ingredients = temp.map(val => `%${val.toLowerCase()}%`);

      let meals = await Meal.findAndCountAll({
        offset: req.query.offset,
        limit: req.query.limit,
        where: {
          ingredients: {
            [Op.like]: sequelize.fn('ALL', ingredients)
          }
        },
        order: ['createdAt'],
        attributes: attributesArray,
        include: [
          { model: User, as: "creator", attributes: ['username', 'profilePic'], duplicating: false },
          { model: Like, attributes: ['userId'], duplicating: false }
        ]
      });

      if (meals.rows.length === 0) return res.status(404).json({ message: 'There are no meals with those ingredients.' });

      res.status(200).json(meals);
    } catch (err) {
      res.status(500).json({ message: errorMessage });
    }
  },

  getMealsCreatedByUserAtoZ: async (req, res) => {
    try {
      let user = await User.findOne({
        where: {          
          username: req.query.username
        },
        attributes: ['username', 'profilePic'],
        include: [
          { 
            model: Meal, as: 'meals', 
            attributes: attributesArray,
            offset: req.query.offset,
            limit: req.query.limit,
            order: [[sequelize.fn('lower', sequelize.col('name'))]],
            include: [
              { model: User, as: "creator", attributes: ['username', 'profilePic'], duplicating: false },
              { model: Like, attributes: ['userId'], duplicating: false }
            ]
          },
        ]
      });

      if (!user) return res.status(404).json({ message: 'This user does not exist.'});

      let count = await Meal.count({
        where: {
          creatorId: user.id
        }
      });

      let userMeals = {
        id: user.id,
        username: user.username,
        profilePic: user.profilePic,
        count: count,
        rows: user.meals
      }
      res.status(200).json(userMeals);
    } catch (err) {
      res.status(500).json({ message: errorMessage });
    }
  },

  getMealsCreatedByUserZtoA: async (req, res) => {
    try {
      let user = await User.findOne({
        where: {          
          username: req.query.username
        },
        attributes: ['username', 'profilePic'],
        include: [
          { 
            model: Meal, as: 'meals', 
            attributes: attributesArray,
            offset: req.query.offset,
            limit: req.query.limit,
            order: [[sequelize.fn('lower', sequelize.col('name')), 'DESC']],
            include: [
              { model: User, as: "creator", attributes: ['username', 'profilePic'], duplicating: false },
              { model: Like, attributes: ['userId'], duplicating: false }
            ]
          },
        ]
      });

      if (!user) return res.status(404).json({ message: 'This user does not exist.'});

      let count = await Meal.count({
        where: {
          creatorId: user.id
        }
      });

      let userMeals = {
        id: user.id,
        username: user.username,
        profilePic: user.profilePic,
        count: count,
        rows: user.meals
      }
      res.status(200).json(userMeals);
    } catch (err) {
      res.status(500).json({ message: errorMessage });
    }
  },

  searchByName: async (req, res) => {
    try {
      let meals = await Meal.findAll({
        where: {
          name: {
            [Op.iLike]: `%${req.query.name}%`
          }
        },
        limit: 10,
        order: [sequelize.fn('lower', sequelize.col('name'))],
        attributes: ['id', 'name']
      });

      res.status(200).json(meals);
    } catch (err) {
      res.status(500).json({ message: errorMessage });
    }
  }
}