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

    // function deleteRecursively(websitesforUser, userId) {
    //     if (websitesforUser.length == 0) {
    //         return UserModel.remove({_id: userId})
    //             .then(function (response) {
    //                 if(response.result.n == 1 && response.result.ok == 1){
    //                     return response;
    //                 }
    //             }, function (err) {
    //                 return err;
    //             });
    //     }
    //     return model.WebsiteModel.cascadeDelete(websitesforUser.shift())
    //         .then(function (response) {
    //             if(response.result.n == 1 && response.result.ok == 1){
    //                 return deleteRecursively(websitesOfUser, userId);
    //             }
    //
    //         }, function (err) {
    //             return err;
    //         });
    // }




    // function deleteUser(userId) {
    //     return UserModel.findById({_id: userId})
    //         .then(function (user) {
    //             var websitesforUser = user.websites;
    //             return deleteRecursively(websitesforUser, userId);
    //         }, function (err) {
    //             return err;
    //         });
    // }

    function findUserByUsername(username) {
        return UserModel.find({
            username: username
        });
    }

    function deleteUser(userId) {
        // Perform cascade delete to delete the associated websites
        // The websites will in turn delete the associated pages
        // The page delete will in turn delete the associated widgets
        // Perform a recursive function delete since the queries
        // are asynchronous
        return UserModel.findById({_id: userId})
            .then(function (user) {
                var websitesOfUser = user.websites;
                return recursiveDelete(websitesOfUser, userId);
            }, function (err) {
                return err;
            });
    }

    function recursiveDelete(websitesOfUser, userId) {
        if(websitesOfUser.length == 0){
            // All websites of user successfully deleted
            // Delete the user
            return UserModel.remove({_id: userId})
                .then(function (response) {
                    if(response.result.n == 1 && response.result.ok == 1){
                        return response;
                    }
                }, function (err) {
                    return err;
                });
        }

        return model.WebsiteModel.deleteWebsiteAndChildren(websitesOfUser.shift())
            .then(function (response) {
                if(response.result.n == 1 && response.result.ok == 1){
                    return recursiveDelete(websitesOfUser, userId);
                }
            }, function (err) {
                return err;
            });
    }
};