const mongoose = require('mongoose');
const config = require('config');
const db = require('./models');

const mongodbUrl = process.env.MONGODB_URL || config.get('database.mongoUrl');

const Role = db.role;

const connect = () =>
    mongoose
        .connect(mongodbUrl,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
        .then(() => {
            console.log("Successful connected to MondoDB");
            startDb();
        })
        .catch(err => {
            console.log("Connection error", err);
            process.exit();
        });

function startDb() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role(
                {
                    name: "user"
                })
                .save(err => {
                    if (err) {
                        console.log("error", err);
                    } else {
                        console.log("added 'user' to roles collection");
                    }
                });
            new Role(
                {
                    name: "admin"
                })
                .save(err => {
                    if (err) {
                        console.log("error", err);
                    } else {
                        console.log("added 'admin' to roles collection");
                    }
                });
        }
    });
}


module.exports = {
    connect,
    connection: mongoose.connection
}