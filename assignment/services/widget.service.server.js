/**
 * Created by shohitbajaj on 27/02/17.
 */

module.exports = function (app, model) {

    var WidgetModel = model.WidgetModel;

    app.get('/api/page/:pageId/widget', findAllWidgetsForPage);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.get("/api/header/widget/options", getOptions);
    app.put("/page/:pageId/widget", updateWidgetOrder);
    // app.put("/page/:pid/widget", updateWidgetOrder);


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

    // var widgets = [
    //     {"_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
    //     {"_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    //     {
    //         "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
    //         "url": "https://i.kinja-img.com/gawker-media/image/upload/s--UE7cu6DV--/c_scale,fl_progressive,q_80,w_800/xoo0evqxzxrrmrn4ayoq.jpg"
    //     },
    //     {
    //         "_id": "456",
    //         "widgetType": "HTML",
    //         "pageId": "321",
    //         "text": '<p>Anker’s kevlar-reinforced PowerLine cables are <a href="http://gear.lifehacker.com/your-favorite-lightning-cables-anker-powerline-and-pow-1782036601" target="_blank" rel="noopener">far and away our readers’ top choice for charging their gadgets</a>, and you can save on several models today, including some from the nylon-wrapped PowerLine+ collection. I use these cables every single day, and I’ve never had one fray or stop working. Just be sure to note the promo codes below.<br></p>'
    //     },
    //     {"_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    //     {
    //         "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
    //         "url": "https://youtu.be/AM2Ivdi9c4E"
    //     },
    //     {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "Lorem ipsum"},
    //     {"_id": "788", "widgetType": "HEADER", "pageId": "544", "text": "Lorem ipsum", "size": 4}
    // ];


    // function uploadImage(req, res) {
    //     var pageId = null;
    //     var widgetId = req.body.widgetId;
    //     var width = req.body.width;
    //     var userId = req.body.userId;
    //     var websiteId = req.body.websiteId;
    //     if (req.file != null) {
    //         var myFile = req.file;
    //         var destination = myFile.destination; // folder where file is saved to
    //
    //         for (var i in widgets) {
    //             if (widgets[i]._id === widgetId) {
    //                 widgets[i].width = width;
    //                 widgets[i].url = req.protocol + '://' + req.get('host') + "/uploads/" + myFile.filename;
    //
    //                 pageId = widgets[i].pageId;
    //             }
    //         }
    //
    //         res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/");
    //     }
    //     else {
    //         pageId = req.body.pageId;
    //         res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId);
    //     }
    // }


    // function uploadImage(req, res) {
    //     if (req.file) {
    //         console.log(req.myFile);
    //         console.log(req.body);
    //         var pageId = null;
    //         var widgetId = req.body.widgetId;
    //         var width = req.body.width;
    //         var userId = req.body.userId;
    //         var websiteId = req.body.websiteId;
    //         var myFile = req.file;
    //         var destination = myFile.destination; // folder where file is saved to
    //
    //         WidgetModel
    //             .findWidgetById(widgetId)
    //             .then(
    //                 function (widget) {
    //                     // Set the url for the widget
    //                     widget.url = "/uploads/" + filename;
    //
    //                     // Update existing widget and redirect
    //                     WidgetModel
    //                         .updateWidget(widgetId, widget)
    //                         .then(
    //                             function (updatedWidget) {
    //                                 res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId);
    //                             },
    //                             function (failedUpdate) {
    //                                 res.sendStatus(400).send(failedUpdate);
    //                             }
    //                         );
    //                 },
    //                 function (error) {
    //                     res.sendStatus(400).send(error);
    //                 }
    //             );
    //
    //     }
    // }

    function uploadImage(req, res) {
        var pageId = null;
        var widgetId = req.body.widgetId;
        var width = req.body.width;
        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var imgWidget = {
            width: width,
            _id: widgetId
        }
        if (req.file != null) {
            var myFile = req.file;
            var destination = myFile.destination;

            // folder where file is saved to
            /*for (var i in widgets) {
             if (widgets[i]._id === widgetId) {
             widgets[i].width = width;
             widgets[i].url = req.protocol + '://' + req.get('host') + "/uploads/" + myFile.filename;
             pageId = widgets[i].pageId;
             }
             }*/

            //var mimetype = myFile.mimetype;
            imgWidget.url = req.protocol + '://' + req.get('host') + "/uploads/" + myFile.filename;

            WidgetModel
                .updateWidget(widgetId, imgWidget)
                .then(function (response) {
                    if (response.ok === 1 && response.n === 1) {


                        WidgetModel
                            .findWidgetById(widgetId)
                            .then(function (newResponse) {
                                console.log("in hereeeee2");
                                pageId = newResponse._page;
                                res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget");

                            });
                    }
                    else {
                        res.sendStatus(404);
                    }
                }, function (err) {
                    res.sendStatus(404);
                });
            /*widgetModel
             .findWidgetById(widgetId)
             .then(function (response) {
             if (response.ok === 1 && response.n === 1) {
             response.url = req.protocol + '://' + req.get('host') + "/uploads/" + myFile.filename;
             console.log(response.url);
             response.save();
             pageId = response._page;
             console.log(pageId + "dfgshsghfgh");
             res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/"+widgetId);
             }
             else {
             res.sendStatus(404);
             }
             }, function (err) {
             res.sendStatus(404).send(err);
             });*/
        }
        else {
            pageId = req.body.pageId;
            res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId);
        }

    }


    function findAllWidgetsForPage(req, res) {

        var pageId = req.params.pageId;

        WidgetModel
            .findAllWidgetsForPage(pageId)
            .then(
                function (widgets) {
                    res.json(widgets);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            );
    }


    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;

        WidgetModel
            .findWidgetById(widgetId)
            .then(
                function (widget) {
                    res.json(widget);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                });
    }

    // function createWidget(req, res) {
    //     var newWidget = req.body;
    //     var pageId = req.params.pageId;
    //
    //     WidgetModel
    //         .createWidget(pageId, newWidget)
    //         .then(function (newWidget) {
    //                 res.send(newWidget);
    //             },
    //             function (err) {
    //                 res.sendStatus(400).send(err);
    //             });
    // }

    function createWidget(req, res) {
        var pageId = req.params.pageId;
        var widget = req.body;
        //var newWidget = {};
        // switch (widget.widgetType){
        //     case "HEADING":
        //         console.log("99999999999");
        //         widget = {
        //             type: widget.widgetType,
        //             size: widget.size,
        //             text: widget.text};
        //         break;
        //     case "HTML":
        //         widget = {
        //             type: widget.widgetType,
        //             text: widget.text};
        //         break;
        //     case "IMAGE":
        //         widget = {
        //             type: widget.widgetType,
        //             width: widget.width,
        //             url: widget.url};
        //         break;
        //     case "YOUTUBE":
        //         widget = {
        //             type: widget.widgetType,
        //             width: widget.width,
        //             url: widget.url};
        //         break;
        //     // case "TEXT":
        //     //     newWidget = {
        //     //         type: widget.widgetType,
        //     //         text: widget.text,
        //     //         rows: widget.rows,
        //     //         placeholder: widget.placeholder,
        //     //         formatted: widget.formatted};
        //     //     break;
        // }

        WidgetModel
            .createWidget(pageId, widget)
            .then(function (widget) {
                res.json(widget);
            }, function (err) {
                res.sendStatus(404);
            });
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        WidgetModel
            .deleteWidget(widgetId)
            .then(function (response) {
                res.sendStatus(200);
            }, function (err) {
                res.sendStatus(404);
            });
    }

    function getOptions(req, res) {
        res.json(options);
    }

    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var widget = req.body;

        WidgetModel
            .updateWidget(widgetId, widget)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function updateWidgetOrder(req, res) {
        var pageId = req.params.pageId;
        var startIndex = parseInt(req.query.initial);
        var endIndex = parseInt(req.query.final);

        WidgetModel
            .reorderWidget(pageId, startIndex, endIndex)
            .then(function (response) {

                res.sendStatus(response);
            }, function (err) {
                res.sendStatus(404);
            });
    }


};