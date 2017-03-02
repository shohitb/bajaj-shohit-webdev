/**
 * Created by shohitbajaj on 11/02/17.
 */

(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService($http) {

        var api = {
            "createPage": createPage,
            "findPageById": findPageById,
            "deletePage": deletePage,
            "updatePage": updatePage,
            "findPageByWebsiteId": findPageByWebsiteId
        };
        return api;

        function findPageById(pid) {
            return $http.get("/api/page/" + pid);
        }

        function deletePage(pageId) {
            return $http.delete("/api/page/" + pageId);
        }

        function createPage(websiteId, page) {
            return $http.post("/api/website/" + websiteId + "/page", page);
        }

        function findPageByWebsiteId(websiteId) {
            return $http.get("/api/website/" + websiteId + "/page");
        }


        function updatePage(pageId, page) {
            return $http.put("/api/page/" + pageId, page);
        }
    }
})();