const db = require("../models");

const User = db.user;
const Role = db.role;

get = (req, res) => {
    User
        .find({})
        .populate("roles")
        .then(users => { res.send(users) })
        .catch(err => { res.status(400).send(err.message) });
};

getById = (req, res) => {
    User
        .find({ _id: req.params.id })
        .populate("roles")
        .then(users => { res.send(users) })
        .catch(err => { res.status(400).send(err.message) });
};

create = async (req, res) => {
    const user = new User(
        {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            roles: []
        }
    );

    if (req.body.roles && req.body.roles.length > 0) {
        Role.find(
            { name: { $in: req.body.roles } },
            (err, roles) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                user.roles = roles.map(role => role._id);
            }
        );
    } else {
        Role
            .findOne({ name: "user" })
            .then(role => { user.roles = [role._id] })
            .catch(err => {
                res.status(500).send({ message: err });
            });
    }

    user.save((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.status(201).send(user);
    });
};
update = (req, res) => { };
remove = (req, res) => { };

allAccess = (req, res) => {
    res.status(200).send("Public content.");
};

userBoard = (req, res) => {
    res.status(200).send("User content.");
};

adminBoard = (req, res) => {
    res.status(200).send("Admin content.");
};


const userFunctions = {
    get,
    getById,
    create,
    allAccess,
    userBoard,
    adminBoard
}

module.exports = userFunctions;