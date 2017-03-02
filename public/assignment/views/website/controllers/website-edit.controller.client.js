/**
 * Created by shohitbajaj on 07/02/17.
 */

(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController);

    function WebsiteEditController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;

        function init() {
            vm.userId = $routeParams.uid;
            vm.websiteId = $routeParams.wid;
            var promise = WebsiteService.findWebsitesByUser(vm.userId).success(function (website) {
                vm.websites = website;
            });
            var promise = WebsiteService.findWebsiteById(vm.websiteId).success(function (website) {
                vm.website = website;
            });
        }

        init();

        function deleteWebsite() {
            WebsiteService.deleteWebsite(vm.websiteId).success(function () {
                $location.url("/user/" + vm.userId + "/website");
            });
        }

        function updateWebsite(newWebsite) {
            WebsiteService.updateWebsite(vm.websiteId, newWebsite).success(function () {
                $location.url("/user/" + vm.userId + "/website");
            });
        }
    }
})();