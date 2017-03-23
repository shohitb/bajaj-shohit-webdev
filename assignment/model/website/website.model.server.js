/**
 * Created by shohitbajaj on 18/03/17.
 */

module.exports = function () {
    var mongoose = require("mongoose");
    var WebsiteSchema = require("./website.schema.server.js")();
    var WebsiteModel = mongoose.model("WebsiteModel", WebsiteSchema);
    var api = {
            createWebsiteForUser: createWebsiteForUser,
            findWebsitesByUser: findWebsitesByUser,
            findWebsiteById: findWebsiteById,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite,
            setModel: setModel,
            cascadeDelete: cascadeDelete
        }
        ;
    return api;

    function setModel(_model) {
        model = _model;
    }

    function createWebsiteForUser(userId, website) {
        return WebsiteModel
            .create(website)
            .then(
                function (newWebsite) {
                    return model
                        .UserModel
                        .findUserById(userId)
                        .then(
                            function (user) {
                                user.websites.push(newWebsite);
                                newWebsite._user = user._id;
                                user.save();
                                newWebsite.save();
                                return newWebsite;
                            },
                            function (error) {
                                console.log(error);
                            }
                        );
                },
                function (error) {
                    console.log(error);
                });
    }

    function findWebsitesByUser(userId) {
        return WebsiteModel.find({"_user": userId});

    }

    function findWebsiteById(websiteId) {
        return WebsiteModel.findById(websiteId);

    }

    function updateWebsite(websiteId, website) {
        return WebsiteModel.update(
            {_id: websiteId},
            {
                $set: {
                    name: website.name,
                    description: website.description
                }
            }
        )
    }

    function deleteWebsite(websiteId) {
        return WebsiteModel.findOne({_id:websiteId}).populate('_user').then(function (website) {
            website._user.websites.splice(website._user.websites.indexOf(websiteId),1);
            website._user.save();
            return cascadeDelete(websiteId);
        }, function (err) {
            return err;
        });
    }

    function deleteRecursively(pagesforWebsite, websiteId) {
        if(pagesforWebsite.length == 0){
            // All pages of website successfully deleted
            // Delete the website
            return WebsiteModel.remove({_id: websiteId})
                .then(function (response) {
                        return response;
                }, function (err) {
                    return err;
                });
        }
        return model.PageModel.cascadeDelete(pagesforWebsite.shift())
            .then(function (response) {
                    return deleteRecursively(pagesOfWebsite, websiteId);
            }, function (err) {
                return err;
            });
    }

    function cascadeDelete(websiteId){
        // Delete the website and its children (pages)
        return WebsiteModel.findById({_id: websiteId}).select({'pages':1})
            .then(function (website) {
                var pagesforWebsite = website.pages;
                return deleteRecursively(pagesforWebsite, websiteId);
            }, function (err) {
                return err;
            });
    }
};