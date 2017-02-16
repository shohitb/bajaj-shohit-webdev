/**
 * Created by shohitbajaj on 12/02/17.
 */

(function(){
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
            vm.pageId= $routeParams.pid;
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
            vm.page = PageService.findPageById(vm.pageId);
        }
        init();

        function deletePage () {
            PageService.deletePage(vm.pageId);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/");
        }

        function updatePage (newPage) {
            PageService.updatePage(vm.pageId, newPage);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/");
        }
    }
})();