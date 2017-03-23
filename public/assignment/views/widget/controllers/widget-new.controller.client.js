/**
 * Created by shohitbajaj on 13/02/17.
 */


(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetNewController", WidgetNewController);


    function WidgetNewController(WidgetService, $routeParams, $location) {
        var vm = this;
        vm.createWidget = createWidget;

        function init() {
            vm.userId = $routeParams.uid;
            vm.pageId = $routeParams.pid;
            vm.websiteId = $routeParams.wid;
            vm.widgetId = $routeParams.wgid;
            var promise = WidgetService.findWidgetsByPageId(vm.pageId).success(function (widgets) {
                vm.widgets = widgets;
            });
        }

        init();

        function createWidget(widgetType) {
            newWidget = {};
            //newWidget._id = (new Date()).getTime().toString();
            newWidget.type = widgetType;
            newWidget.pageId = vm.pageId;
            switch (widgetType) {
                case "HEADING":
                    newWidget.text = "Default Text";
                    newWidget.size = 3;
                    break;
                case "IMAGE":
                    newWidget.url = "https://i.ytimg.com/vi/fFi4BhD_DUw/maxresdefault.jpg";
                    newWidget.width = "100%";
                    break;
                case "YOUTUBE":
                    newWidget.url = "https://i.ytimg.com/vi/fFi4BhD_DUw/maxresdefault.jpg";
                    newWidget.width = "100%";
                    break;
                case "HTML":
                    newWidget.text = "Default Text";
                    break;
                case "TEXT":
                    newWidget.text = "Default Text";
                    break;
            }
            WidgetService.createWidget(vm.pageId, newWidget).success(function (widget) {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + widget._id);
            });
        }
    }


})();