/**
 * Created by shohitbajaj on 11/02/17.
 */

(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService() {
        var pages = [
            {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
            {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
            {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"},
            {"_id": "544", "name": "Post 4", "websiteId": "567", "description": "Lorem"}
        ];

        var api = {
            "createPage": createPage,
            "findPageById": findPageById,
            "deletePage": deletePage,
            "updatePage": updatePage,
            "findPageByWebsiteId": findPageByWebsiteId
        };
        return api;

        function findPageById(pid) {
            for (var w in pages) {
                if (pages[w]._id === pid) {
                    return angular.copy(pages[w]);
                }
            }
            return null;
        }

        function deletePage(pageId) {
            for (var w in pages) {
                if (pages[w]._id === pageId) {
                    pages.splice(w, 1);
                }
            }
        }

        function createPage(websiteId, page) {
            page.websiteId = websiteId;
            page._id = (new Date()).getTime().toString();
            pages.push(page);
        }

        function findPageByWebsiteId(websiteId) {
            var pg = [];
            for (var w in pages) {
                if (pages[w].websiteId === websiteId) {
                    pg.push(pages[w]);
                }
            }
            return pg;
        }


        function updatePage(pageId, page) {
            for (var w in pages) {
                if (pages[w]._id === pageId) {
                    pages[w].name = page.name;
                    pages[w].description = page.description;
                    return pages;
                }
            }
        }
    }
})();