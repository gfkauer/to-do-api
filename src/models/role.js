const monngoose = require('mongoose');

const Role = monngoose.model(
    "Role",
    new monngoose.Schema({
        name: String
    })
);

module.exports = Role;