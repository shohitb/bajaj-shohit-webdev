/**
 * Created by shohitbajaj on 07/02/17.
 */

(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", WebsiteNewController);

    function WebsiteNewController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.createWebsite = createWebsite;

        function init() {
            vm.userId = $routeParams.uid;
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }

        init();

        function createWebsite(website) {
            WebsiteService.createWebsite(vm.userId, website);
            //vm.websites = WebsiteService.findAllWebsitesForUser(vm.userId);
            $location.url("/user/" + vm.userId + "/website");
        }
    }
})();