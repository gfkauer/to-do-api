const monngoose = require('mongoose');

const schema = monngoose.Schema({
    name: String
});

schema.set('toJSON', {
    transform: (doc, ret, options) => ({
        id: ret._id,
        name: ret.name
    })
});

module.exports = monngoose.model("Role", schema);