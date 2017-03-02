/**
 * Created by shohitbajaj on 12/02/17.
 */

(function () {
    angular
        .module("WebAppMaker")
        .controller("PageNewController", PageNewController);

    function PageNewController($routeParams, $location, PageService) {
        var vm = this;
        vm.createPage = createPage;

        function init() {
            vm.userId = $routeParams.uid;
            vm.websiteId = $routeParams.wid;
            var promise = PageService.findPageByWebsiteId(vm.websiteId).success(function (pages) {
                vm.pages = pages
            });
        }

        init();

        function createPage(page) {
            PageService.createPage(vm.websiteId, page).success(function (page) {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/");
            });
        }
    }
})();