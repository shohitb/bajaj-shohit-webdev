/**
 * Created by shohitbajaj on 27/02/17.
 */

module.exports = function (app) {

    app.get('/api/page/:pageId/widget', findAllWidgetsForPage);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.get("/api/header/widget/options", getOptions);

    var multer = require('multer');

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, __dirname + "/../../public/uploads")
        },
        filename: function (req, file, cb) {
            var extArray = file.mimetype.split("/");
            var extension = extArray[extArray.length - 1];
            cb(null, 'widget_image_' + Date.now() + '.' + extension)
        }
    });
    var upload = multer({storage: storage});

    app.post("/api/upload", upload.single('myFile'), uploadImage);

    var options =
        [1, 2, 3, 4, 5, 6];

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
        {"_id": "788", "widgetType": "HEADER", "pageId": "544", "text": "Lorem ipsum", "size": 4}
    ];


    function uploadImage(req, res) {
        var pageId = null;
        var widgetId = req.body.widgetId;
        var width = req.body.width;
        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        if (req.file != null) {
            var myFile = req.file;
            var destination = myFile.destination; // folder where file is saved to

            for (var i in widgets) {
                if (widgets[i]._id === widgetId) {
                    widgets[i].width = width;
                    widgets[i].url = req.protocol + '://' + req.get('host') + "/uploads/" + myFile.filename;

                    pageId = widgets[i].pageId;
                }
            }

            res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/");
        }
        else{
            pageId = req.body.pageId;
            res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/"+widgetId);
        }
    }


    function findAllWidgetsForPage(req, res) {
        var pageId = req.param('pageId')
        var wg = [];
        for (var w in widgets) {
            if (widgets[w].pageId === pageId) {
                wg.push(widgets[w]);
            }
        }
        res.json(wg);
    }


    function findWidgetById(req, res) {
        var widgetId = req.params['widgetId'];
        for (var w in widgets) {
            if (widgets[w]._id == widgetId) {
                res.send(widgets[w]);
                return;
            }
        }
    }

    function createWidget(req, res) {
        var widget = req.body
        widgets.push(widget);
        res.json(widget);
    }

    function deleteWidget(req, res) {
        var widgetId = req.params['widgetId'];
        for (var w in widgets) {
            if (widgets[w]._id == widgetId) {
                widgets.splice(w, 1);
                res.sendStatus(200);
                return;
            }
        }
    }

    function getOptions(req, res) {
        res.json(options);
    }

    function updateWidget(req, res) {
        var widget = req.body;
        var widgetId = req.params['widgetId'];
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
                res.json(widget);
                return;
            }
        }
    }
};