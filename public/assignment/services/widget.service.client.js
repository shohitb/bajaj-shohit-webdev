/**
 * Created by shohitbajaj on 12/02/17.
 */

(function () {
    angular
        .module("WebAppMaker")
        .service("WidgetService", WidgetService);

    function WidgetService() {

        var widgets = [
            {"_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
            {"_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            {
                "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "https://i.kinja-img.com/gawker-media/image/upload/s--UE7cu6DV--/c_scale,fl_progressive,q_80,w_800/xoo0evqxzxrrmrn4ayoq.jpg"
            },
            {
                "_id": "456",
                "widgetType": "HTML",
                "pageId": "321",
                "text": '<p>Anker’s kevlar-reinforced PowerLine cables are <a href="http://gear.lifehacker.com/your-favorite-lightning-cables-anker-powerline-and-pow-1782036601" target="_blank" rel="noopener">far and away our readers’ top choice for charging their gadgets</a>, and you can save on several models today, including some from the nylon-wrapped PowerLine+ collection. I use these cables every single day, and I’ve never had one fray or stop working. Just be sure to note the promo codes below.<br></p>'
            },
            {"_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            {
                "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E"
            },
            {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "Lorem ipsum"},
            {"_id": "788", "widgetType": "HEADER", "pageId": "544", "text": "Lorem ipsum"}
        ];

        var api = {
            "findAllWidgets": findAllWidgets,
            "findWidgetByPageId": findWidgetByPageId,
            "findWidgetById": findWidgetById,
            "createWidget": createWidget,
            "deleteWidget": deleteWidget,
            "updateWidget": updateWidget
        };
        return api;

        function findWidgetByPageId(pageId) {
            var wg = [];
            for (var w in widgets) {
                if (widgets[w].pageId === pageId) {
                    wg.push(widgets[w]);
                }
            }
            return wg;
        }

        function findAllWidgets(pageId) {
            return widgets;
        }

        function findWidgetById(widgetId) {
            for (var w in widgets) {
                if (widgets[w]._id == widgetId) {
                    return angular.copy(widgets[w]);
                }
            }
            return null;
        }

        function createWidget(pageId, widget) {
            widgets.push(widget);
        }

        function deleteWidget(widgetId) {
            for (var w in widgets) {
                if (widgets[w]._id == widgetId) {
                    widgets.splice(w, 1);
                }
            }
        }

        function updateWidget(widgetId, widget) {
            for (var w in widgets) {
                if (widgets[w]._id == widgetId) {
                    if (widget.widgetType == "HEADER") {
                        widgets[w].text = widget.text;
                        widgets[w].size = widget.size;
                    }
                    else if ((widget.widgetType == "IMAGE") || (widget.widgetType == "YOUTUBE")) {
                        widgets[w].url = widget.url;
                        widgets[w].width = widget.width;
                    }
                    else if (widget.widgetType == "HTML") {
                        widgets[w].text = widget.text;
                    }
                    return;
                }
            }
        }
    }

})();