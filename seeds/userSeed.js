
const { User } = require('../models');

const userData = [
    {
        username: "juan28",
        email: "juan28@hotmail.com",
        password: "first123"
    },
    {
        username: "andrew26",
        email: "andrew26@hotmail.com",
        password: "second123"
    },
    {
        username: "leilani5",
        email: "leilani5@hotmail.com",
        password: "third123"
    }
]

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;