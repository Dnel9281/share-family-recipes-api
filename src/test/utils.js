'use strict';
module.exports = {
  // User controller test objects
  user: {
    username: "johndoe",
    firstName: "John",
    lastName: "Doe",
    email: "test@email.com",
    password: "password",
    isAdmin: true,
    adminCode: "123456789"
  },
  userNewUsername: {
    username: "johndoe2",
    firstName: "John",
    lastName: "Doe",
    email: "test@email.com",
    password: "password",
    isAdmin: true
  },
  user2: {
    username: "jsmith",
    firstName: "John",
    lastName: "Smith",
    email: "smith@email.com",
    password: "password",
    isAdmin: false,
    adminCode: "notValid"
  },
  userWithShortUsername: {
    username: "jdoe",
    firstName: "John",
    lastName: "Doe",
    email: "test@email.com",
    password: "password",
    isAdmin: true
  },
  userWithCredentials: {
    email: "test@email.com",
    password: "password"
  },
  userWithWrongEmail: {
    email: "wrong@email.com",
    password: "password"
  },
  userWithWrongPassword: {
    email: "test@email.com",
    password: "wrongpassword"
  },
  user3: {
    username: "user3",
    firstName: "Aaaa",
    lastName: "Aaaa",
    email: "three@email.com",
    password: "password",
    isAdmin: false,
    adminCode: "notValid"
  },
  user4: {
    username: "user4",
    firstName: "Bbbb",
    lastName: "Bbbb",
    email: "four@email.com",
    password: "password",
    isAdmin: false,
    adminCode: "notValid"
  },
  user5: {
    username: "user5",
    firstName: "Cccc",
    lastName: "Cccc",
    email: "five@email.com",
    password: "password",
    isAdmin: false,
    adminCode: "notValid"
  },
  user6: {
    username: "user6",
    firstName: "Dddd",
    lastName: "Dddd",
    email: "six@email.com",
    password: "password",
    isAdmin: false,
    adminCode: "notValid"
  },
  user7: {
    username: "user7",
    firstName: "Eeee",
    lastName: "Eeee",
    email: "seven@email.com",
    password: "password",
    isAdmin: false,
    adminCode: "notValid"
  },
  user8: {
    username: "user8",
    firstName: "Ffff",
    lastName: "Ffff",
    email: "eight@email.com",
    password: "password",
    isAdmin: false,
    adminCode: "notValid"
  },
  user9: {
    username: "user9",
    firstName: "Gggg",
    lastName: "Gggg",
    email: "nine@email.com",
    password: "password",
    isAdmin: false,
    adminCode: "notValid"
  },
  user10: {
    username: "user10",
    firstName: "Hhhh",
    lastName: "Hhhh",
    email: "ten@email.com",
    password: "password",
    isAdmin: false,
    adminCode: "notValid"
  },
  user11: {
    username: "user11",
    firstName: "Iiii",
    lastName: "Iiii",
    email: "eleven@email.com",
    password: "password",
    isAdmin: false,
    adminCode: "notValid"
  },
  user12: {
    username: "user12",
    firstName: "Jjjj",
    lastName: "Jjjj",
    email: "twelve@email.com",
    password: "password",
    isAdmin: false,
    adminCode: "notValid"
  },
  meal1: {
    name: 'Sandwich',
    ingredients: ['bread', 'cheese', 'meat'],
    instructions: [
      'Put the bread on the counter.', 
      'Put the meat between 2 slices of bread.', 
      'Put the cheese on the meat.'
    ],
    prepTime: 5,
    cookTime: 0,
    difficulty: 1,
    creatorId: 1
  },
  meal2: {
    name: 'Soup',
    ingredients: ['water', 'vegetables', 'meat'],
    instructions: [
      'Cut the veggies.', 
      'Boil the water.', 
      'Put veggies and meat in the water until it is cooked.'
    ],
    prepTime: 10,
    cookTime: 20,
    difficulty: 3,
    creatorId: 2
  },
  meal3: {
    id: 3,
    name: 'Rice',
    ingredients: ['water', 'rice'],
    instructions: [
      'Wash the rice.', 
      'Put the rice into the rice cooker.',
      'Turn on the rice cooker.'
    ],
    prepTime: 2,
    cookTime: 20,
    difficulty: 1
  },
  meal3Update: {
    id: 3,
    name: 'Rice and spicy sauce',
    ingredients: ['water', 'rice'],
    instructions: [
      'Wash the rice.', 
      'Put the rice into the rice cooker.',
      'Turn on the rice cooker.',
      'Add spicy sauce'
    ],
    prepTime: 2,
    cookTime: 20,
    difficulty: 1
  }
};