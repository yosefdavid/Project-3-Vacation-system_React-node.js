var express = require('express');
var router = express.Router();
const Sequelize = require('sequelize');
var mySocketHelper = require('../utils/mysockethelper');


const sequelize = new Sequelize('travel_agency', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

const Users = sequelize.define('users', {
    first_name: Sequelize.STRING,
    last_name: Sequelize.STRING,
    username: Sequelize.STRING,
    password: Sequelize.INTEGER,
    role: Sequelize.STRING
});

const Vacations = sequelize.define('vacations', {
    destination: Sequelize.STRING,
    description: Sequelize.STRING,
    image: Sequelize.STRING,
    from_date: Sequelize.STRING,
    end_date: Sequelize.STRING,
    price: Sequelize.STRING,
    followers: Sequelize.INTEGER
});

let allUsersFollow = [];


router.post('/login', async (req, res) => {

    await sequelize.sync();

    let vacations = await Vacations.findAll({});

    if (req.session.role) {

        if (req.session.role == "user") {

            for (let i = 0; i < allUsersFollow.length; i++) {

                if (allUsersFollow[i].username == req.session.username) {

                    var newVacations1Session = [];
                    var newVacations2Session = [];

                    for (let t = 0; t < allUsersFollow[i].vacationsIdFollow.length; t++) {

                        for (let x = 0; x < vacations.length; x++) {

                            if (allUsersFollow[i].vacationsIdFollow[t] == vacations[x].id) {

                                newVacations1Session.push(vacations[x]);

                            }

                        }

                    }

                    for (let x = 0; x < vacations.length; x++) {

                        let index = newVacations1Session.indexOf(vacations[x]);

                        if (index == -1) {

                            newVacations2Session.push(vacations[x]);

                        }

                    }

                }

            }

            res.json({
                role: req.session.role,
                username: req.session.username,
                vacationsOnFoolow: newVacations1Session,
                vacationsOffFoolow: newVacations2Session
            });

        }

        else {

            res.json({
                role: req.session.role,
                username: req.session.username,
                vacationsOnFoolow: vacations
            });

        }

    }

    else {

        if (!req.body.username) {

            res.json({ role: "" });

        }

        else {

            let user = await Users.findAll({
                where: req.body
            });

            if (user.length == 0) {

                res.json({ status: "error", msg: "username or password wrong!" });

            }

            else {

                if (user[0].role == "user") {

                    req.session.role = "user";
                    req.session.username = user[0].username;

                    let exsitUserFollow = allUsersFollow.find(currUser => currUser.username == user[0].username);

                    if (!exsitUserFollow) {

                        allUsersFollow.push({
                            username: user[0].username,
                            vacationsIdFollow: []
                        });

                    }

                    var newVacations1 = [];
                    var newVacations2 = [];

                    for (let i = 0; i < allUsersFollow.length; i++) {

                        if (allUsersFollow[i].username == req.session.username) {

                            for (let t = 0; t < allUsersFollow[i].vacationsIdFollow.length; t++) {

                                for (let x = 0; x < vacations.length; x++) {

                                    if (allUsersFollow[i].vacationsIdFollow[t] == vacations[x].id) {

                                        newVacations1.push(vacations[x]);

                                    }

                                }

                            }

                            for (let x = 0; x < vacations.length; x++) {

                                let index = newVacations1.indexOf(vacations[x]);

                                if (index == -1) {

                                    newVacations2.push(vacations[x]);

                                }

                            }

                        }

                    }

                    res.json({
                        role: user[0].role,
                        username: user[0].username,
                        vacationsOnFoolow: newVacations1,
                        vacationsOffFoolow: newVacations2
                    });

                }

                else {

                    req.session.role = "admin";
                    req.session.username = user[0].username;

                    res.json({
                        role: user[0].role,
                        username: user[0].username,
                        vacationsOnFoolow: vacations
                    });

                }

            }

        }

    }

});


router.post('/signup', async (req, res) => {

    await sequelize.sync();

    let user = await Users.findAll({
        where: {
            username: req.body.username
        }
    });

    if (user.length != 0) {

        res.json({ msg: "Username already exists - replace and try again!" });

    }

    else {

        await Users.create(req.body);

        res.json({ status: "ok", msg: "The registration was successful!" });

    }

});


router.get('/logout', function (req, res) {

    req.session.role = "";
    req.session.username = "";

    res.json({
        role: "",
        msg: "",
        vacations: [],
        username: ""
    });

});


router.get('/addfollow/:vacationId', async (req, res) => {

    await sequelize.sync();

    let vacation = await Vacations.findAll({
        where: {
            id: req.params.vacationId
        }
    })

    let currFollowers = vacation[0].followers + 1;

    await Vacations.update({ followers: currFollowers }, {
        where: {
            id: req.params.vacationId
        }
    });

    let vacations = await Vacations.findAll({});

    var newVacations1 = [];
    var newVacations2 = [];

    for (let i = 0; i < allUsersFollow.length; i++) {

        if (allUsersFollow[i].username == req.session.username) {

            allUsersFollow[i].vacationsIdFollow.push(req.params.vacationId);

            for (let t = 0; t < allUsersFollow[i].vacationsIdFollow.length; t++) {

                for (let x = 0; x < vacations.length; x++) {

                    if (allUsersFollow[i].vacationsIdFollow[t] == vacations[x].id) {

                        newVacations1.push(vacations[x]);

                    }

                }

            }

            for (let x = 0; x < vacations.length; x++) {

                let index = newVacations1.indexOf(vacations[x]);

                if (index == -1) {

                    newVacations2.push(vacations[x]);

                }

            }

        }

    }

    res.json({
        vacationsOnFoolow: newVacations1,
        vacationsOffFoolow: newVacations2
    });

    mySocketHelper.sendMessgae("followersChange");

});


router.get('/removefollow/:vacationId', async (req, res) => {

    await sequelize.sync();

    let vacation = await Vacations.findAll({
        where: {
            id: req.params.vacationId
        }
    })

    let currFollowers = vacation[0].followers - 1;

    await Vacations.update({ followers: currFollowers }, {
        where: {
            id: req.params.vacationId
        }
    });

    let vacations = await Vacations.findAll({});

    var newVacations1 = [];
    var newVacations2 = [];

    for (let i = 0; i < allUsersFollow.length; i++) {

        if (allUsersFollow[i].username == req.session.username) {

            let index = allUsersFollow[i].vacationsIdFollow.indexOf(req.params.vacationId);

            allUsersFollow[i].vacationsIdFollow.splice(index, 1);

            for (let t = 0; t < allUsersFollow[i].vacationsIdFollow.length; t++) {

                for (let x = 0; x < vacations.length; x++) {

                    if (allUsersFollow[i].vacationsIdFollow[t] == vacations[x].id) {

                        newVacations1.push(vacations[x]);

                    }

                }

            }

            for (let x = 0; x < vacations.length; x++) {

                let index = newVacations1.indexOf(vacations[x]);

                if (index == -1) {

                    newVacations2.push(vacations[x]);

                }

            }

        }

    }

    res.json({
        vacationsOnFoolow: newVacations1,
        vacationsOffFoolow: newVacations2
    });

    mySocketHelper.sendMessgae("followersChange");

});


router.post('/deletevacation/:vacationId', async (req, res) => {

    await sequelize.sync();

    await Vacations.destroy({
        where: {
            id: req.params.vacationId
        }
    });

    for (let i = 0; i < allUsersFollow.length; i++) {

        let index = allUsersFollow[i].vacationsIdFollow.indexOf(req.params.vacationId);

        if (index != -1) {

            allUsersFollow[i].vacationsIdFollow.splice(index, 1);

        }

    }

    let vacations = await Vacations.findAll({});

    res.json(vacations);

    mySocketHelper.sendMessgae("vacationsChange");

});


router.post('/editvacation', async (req, res) => {

    await sequelize.sync();

    await Vacations.update(req.body.vacationBody, {
        where: {
            id: req.body.vacationId
        }
    });

    let vacations = await Vacations.findAll({});

    res.json(vacations);

    mySocketHelper.sendMessgae("vacationsChange");

});

router.post('/addvacation', async (req, res) => {

    await sequelize.sync();

    await Vacations.create(req.body);

    let vacations = await Vacations.findAll({});

    res.json(vacations);

    mySocketHelper.sendMessgae("vacationsChange");

});


// rest-full API

router.get('/vacations', async (req, res) => {

    await sequelize.sync();

    let vacations = await Vacations.findAll({});

    res.json(vacations);

});

router.get('/vacations/:id', async (req, res) => {

    await sequelize.sync();

    let vacation = await Vacations.findAll({
        where: {
            id: req.params.id
        }
    });

    res.json(vacation);

});


router.get('/login', function (req, res) {

    res.redirect("http://localhost:3000/");

});

router.get('/singup', function (req, res) {

    res.redirect("http://localhost:3000/");

});

router.get('/allvacations', function (req, res) {

    res.redirect("http://localhost:3000/");

});

router.get('/reports', function (req, res) {

    res.redirect("http://localhost:3000/");

});


module.exports = router;
