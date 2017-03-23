/**
 * Created by shohitbajaj on 12/02/17.
 */

(function () {
    angular
        .module("WebAppMaker")
        .service("WidgetService", WidgetService);

    function WidgetService($http) {

        var api = {
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "createWidget": createWidget,
            "deleteWidget": deleteWidget,
            "updateWidget": updateWidget,
            "updateWidgetOrder": updateWidgetOrder,
            "getOptions": getOptions
        };
        return api;

        function getOptions() {
            return $http.get("/api/header/widget/options");
        }

        function findWidgetsByPageId(pageId) {
            return $http.get("/api/page/" + pageId + "/widget");
        }


        function findWidgetById(widgetId) {
            return $http.get("/api/widget/" + widgetId);
        }

        function createWidget(pageId, widget) {
            return $http.post("/api/page/" + pageId + "/widget", widget);
        }

        function deleteWidget(widgetId) {
            return $http.delete("/api/widget/" + widgetId);
        }

        function updateWidget(widgetId, widget) {
            return $http.put("/api/widget/" + widgetId, widget);
        }

        // function updateWidgetOrder(pageId, startIndex, endIndex) {
        //     return $http.put("/page/" + pageId + "/widget?initial=" + startIndex + "&final=" + endIndex);
        // }
        function updateWidgetOrder(pageId, startIndex, endIndex) {
            return $http.put("/page/"+pageId+"/widget?initial="+startIndex+"&final="+endIndex);
        }
    }
})();