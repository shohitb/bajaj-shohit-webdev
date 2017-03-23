/**
 * Created by shohitbajaj on 18/03/17.
 */

module.exports = function () {
    var mongoose = require("mongoose");
    var PageSchema = require("./page.schema.server.js")();
    var PageModel = mongoose.model('PageModel', PageSchema);

    var api = {
        createPage: createPage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        findPageById: findPageById,
        updatePage: updatePage,
        //deletePage: deletePage,
        //deletePagesForWebsite: deletePagesForWebsite,
        setModel: setModel,
        deletePage:deletePage,
        deletePageAndChildren:deletePageAndChildren
    };
    return api;

    function setModel(_model) {
        model = _model;
    }

    function findAllPagesForWebsite(websiteId) {
        return PageModel.find({"_website": websiteId});
    }

    function findPageById(pageId) {
        return PageModel
            .findById(pageId);
    }

    function updatePage(page, pageId) {
        return PageModel.update(
            {
                _id: pageId
            },
            {
                name: page.name,
                title: page.title,
                description: page.description
            }
        );

    }

    function createPage(websiteId, page) {
        return PageModel
            .create(page)
            .then(function (pageObj) {
                model.WebsiteModel
                    .findWebsiteById(websiteId)
                    .then(function (websiteObj) {
                        websiteObj.pages.push(pageObj);
                        pageObj._website = websiteObj._id;
                        pageObj.save();
                        return websiteObj.save();
                    })
            });
    }

    // function deletePage(pageId) {
    //     return PageModel.findById(pageId).populate('_website').then(function (page) {
    //         page._website.pages.splice(page._website.pages.indexOf(pageId), 1);
    //         page._website.save();
    //         return cascadeDelete(pageId);
    //     }, function (err) {
    //         return err;
    //     });
    // }

    // function deleteRecursively(widgetsforPage, pageId) {
    //     if (widgetsforPage.length == 0) {
    //         // All widgets of page successfully deleted
    //         // Delete the page
    //         return PageModel.remove({_id: pageId})
    //             .then(function (response) {
    //                 if(response.result.n == 1 && response.result.ok == 1){
    //                     return response;
    //                 }
    //
    //             }, function (err) {
    //                 return err;
    //             });
    //     }
    //
    //     return model.WidgetModel.cascadeDelete(widgetsforPage.shift())
    //         .then(function (response) {
    //             if(response.result.n == 1 && response.result.ok == 1){
    //                 return deleteRecursively(widgetsforPage, pageId);
    //             }
    //
    //         }, function (err) {
    //             return err;
    //         });
    // }

    // function cascadeDelete(pageId) {
    //
    //     return PageModel.findById({_id: pageId})
    //         .then(function (page) {
    //             var widgetsforPage = page.widgets;
    //             return deleteRecursively(widgetsforPage, pageId);
    //         }, function (err) {
    //             return err;
    //         });
    // }


    function deletePage(pageId) {
        // Delete a page, its reference in parent website and its children (widgets)
        return PageModel.findById(pageId).populate('_website').then(function (page) {
            page._website.pages.splice(page._website.pages.indexOf(pageId),1);
            page._website.save();

            return deletePageAndChildren(pageId);
        }, function (err) {
            return err;
        });
    }

    function deletePageAndChildren(pageId) {
        // Delete the page and its children (widgets)
        return PageModel.findById({_id: pageId})
            .then(function (page) {

                var widgetsOfPage = page.widgets;

                return recursiveDelete(widgetsOfPage, pageId);
            }, function (err) {
                return err;
            });
    }


    function recursiveDelete(widgetsOfPage, pageId) {

        if(widgetsOfPage.length == 0){
            // All widgets of page successfully deleted
            // Delete the page
            return PageModel.remove({_id: pageId})
                .then(function (response) {
                    if(response.result.n == 1 && response.result.ok == 1){
                        return response;
                    }
                }, function (err) {
                    return err;
                });
        }

        return model.WidgetModel.deleteWidgetOfPage(widgetsOfPage.shift())
            .then(function (response) {
                if(response.result.n == 1 && response.result.ok == 1){
                    return recursiveDelete(widgetsOfPage, pageId);
                }
            }, function (err) {
                return err;
            });
    }
};

