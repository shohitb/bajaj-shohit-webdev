/**
 * Created by shohitbajaj on 27/02/17.
 */

module.exports = function (app, model) {
    var UserModel = model.UserModel;
    //console.log(UserModel);

    //require("./user/user.model.server")()
    app.get("/api/user", findUser);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);
    app.post("/api/user", createUser);

    // var users = [
    //     {
    //         _id: "123",
    //         username: "alice",
    //         password: "alice",
    //         firstName: "Alice",
    //         lastName: "Wonder",
    //         email: "alice@gmail.com"
    //     },
    //     {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley", email: "bob@gmail.com"},
    //     {
    //         _id: "345",
    //         username: "charly",
    //         password: "charly",
    //         firstName: "Charly",
    //         lastName: "Garcia",
    //         email: "charly@gmail.com"
    //     },
    //     {
    //         _id: "456",
    //         username: "jannunzi",
    //         password: "jannunzi",
    //         firstName: "Jose",
    //         lastName: "Annunzi",
    //         email: "jose@gmail.com"
    //     }
    // ];

    function deleteUser(req, res) {
        var id = req.params.userId;
        UserModel
            .deleteUser(id)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.status(404).send("Unable to remove user");
                }
            );
    }

    function createUser(req, res) {
        var newUser = req.body;
        console.log(newUser);
        console.log("yyyy");
        UserModel
            .createUser(newUser)
            .then(
                function (newUser) {
                    res.send(newUser);
                },
                function (error) {
                    res.sendStatus(404).send(error);
                }
            )
    }

    function updateUser(req, res) {
        var newUser = req.body;
        var id = req.body._id;
        console.log(id+"uuuU");

        UserModel
            .updateUser(newUser,id)
            .then(
                function (user) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400).send("Unable to update user");
                }
            );

    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        console.log("user id at finduser by id");
        console.log(userId+"hrrrr");
        UserModel
            .findUserById(userId)
            .then(
                function (user) {
                    res.send(user);
                },
                function (error) {
                    res.status(404).send(error);
                }
            )

    }

    function findUser(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        if (username && password) {
            findUserByCredentials(req, res);
        } else if (username) {
            findUserByUsername(req, res);
        }
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        console.log(username);
        UserModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    console.log("dfsdfsdf");
                    if (user.length > 0){
                        res.json(user);
                    }
                    else{
                        res.sendStatus(404);
                    }
                },
                function (error) {
                    res.sendStatus(404).send("Unable to find user");
                }
            );
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;

        UserModel
            .findUserByCredentials(username, password)
            .then(
                function (users) {
                    console.log(users);
                    if (users.length > 0) {
                        res.json(users[0]);
                    } else {
                        res.sendStatus(400).send(error);
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }
};