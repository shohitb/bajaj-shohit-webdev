/**
 * Created by shohitbajaj on 12/02/17.
 */

(function () {
    angular
        .module("WebAppMaker")
        .controller("PageEditController", PageEditController);

    function PageEditController($routeParams, $location, PageService) {
        var vm = this;
        vm.deletePage = deletePage;
        vm.updatePage = updatePage;

        function init() {
            vm.userId = $routeParams.uid;
            vm.websiteId = $routeParams.wid;
            vm.pageId = $routeParams.pid;
            var promise = PageService.findPageByWebsiteId(vm.websiteId).success(function (page) {
                vm.pages = page;
            });
            var promise = PageService.findPageById(vm.pageId).success(function (page) {
                vm.page = page;
            });
        }

        init();

        function deletePage() {
            PageService.deletePage(vm.pageId).success(function () {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/");
            });
        }

        function updatePage(newPage) {
            PageService.updatePage(vm.pageId, newPage).success(function () {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/");
            });
        }
    }
})();