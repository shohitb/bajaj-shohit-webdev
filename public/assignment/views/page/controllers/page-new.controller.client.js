/**
 * Created by shohitbajaj on 12/02/17.
 */

(function () {
    angular
        .module("WebAppMaker")
        .controller("PageNewController", PageNewController);

    function PageNewController($routeParams, $location, PageService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.createPage = createPage;

        function init() {
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        }
        init();

        function createPage(page) {
            PageService.createPage(vm.websiteId, page);
            //vm.websites = WebsiteService.findPageByWebsiteId(vm.userId);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/");
        }
    }
})();