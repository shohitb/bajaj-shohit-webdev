/**
 * Created by shohitbajaj on 18/03/17.
 */

module.exports = function () {

    var mongoose = require('mongoose');

    var UserSchema = require('./user.schema.server')();
    var UserModel = mongoose.model('UserModel', UserSchema);

    var api = {
        createUser: createUser,
        findUserByCredentials: findUserByCredentials,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        updateUser: updateUser,
        deleteUser: deleteUser,
        setModel: setModel
    };

    return api;

    function createUser(user) {
        return UserModel.create(user);
    }

    function setModel(_model) {
        model = _model;
    }

    function findUserByCredentials(username, password) {

        return UserModel.find({
            username: username,
            password: password
        });
    }

    function findUserById(userId) {
        //console.log(userId);
        return UserModel.findById(userId);
    }

    function updateUser(user, userId) {

        return UserModel
            .update(
                {
                    _id: userId
                },
                {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone
                }
            );
    }

    function deleteRecursively(websitesforUser, userId) {
        if (websitesforUser.length == 0) {
            return UserModel.remove({_id: userId})
                .then(function (response) {
                    if(response.result.n == 1 && response.result.ok == 1){
                        return response;
                    }
                }, function (err) {
                    return err;
                });
        }
        return model.WebsiteModel.cascadeDelete(websitesforUser.shift())
            .then(function (response) {
                if(response.result.n == 1 && response.result.ok == 1){
                    return deleteRecursively(websitesOfUser, userId);
                }

            }, function (err) {
                return err;
            });
    }




    function deleteUser(userId) {
        return UserModel.findById({_id: userId})
            .then(function (user) {
                var websitesforUser = user.websites;
                return deleteRecursively(websitesforUser, userId);
            }, function (err) {
                return err;
            });
    }

    function findUserByUsername(username) {
        return UserModel.find({
            username: username
        });
    }
};