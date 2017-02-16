/**
 * Created by shohitbajaj on 11/02/17.
 */

(function(){
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($routeParams, PageService) {
        var vm = this;

        function init() {
            vm.userId = $routeParams.uid;
            vm.websiteId = $routeParams.wid;
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        }
        init();

    }
})();