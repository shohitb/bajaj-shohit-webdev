/**
 * Created by shohitbajaj on 18/03/17.
 */

module.exports = function () {
    var mongoose = require("mongoose");
    var WidgetSchema = require("./widget.schema.server.js")();
    var WidgetModel = mongoose.model("WidgetModel", WidgetSchema);
    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        reorderWidget: reorderWidget,
        setModel: setModel,
        cascadeDelete: cascadeDelete
    };
    return api;

    function setModel(_model) {
        model = _model;
    }

    function findAllWidgetsForPage(pageId) {
        return model.PageModel
            .findPageById(pageId)
            .then(function (page) {
                var widgetsOfPage = page.widgets;
                var numberOfWidgets = widgetsOfPage.length;
                var widgetCollectionForPage = [];

                return getWidgetsRecursively(numberOfWidgets, widgetsOfPage, widgetCollectionForPage);
            }, function (err) {
                return err;
            });
    }

    function getWidgetsRecursively(count, widgetsOfPage, widgetCollectionForPage) {
        if (count == 0) {
            return widgetCollectionForPage;
        }

        return WidgetModel.findById(widgetsOfPage.shift()).select('-__v')
            .then(function (widget) {
                widgetCollectionForPage.push(widget);
                return getWidgetsRecursively(--count, widgetsOfPage, widgetCollectionForPage);
            }, function (err) {
                return err;
            });
    }

    function findWidgetById(widgetId) {
        return WidgetModel.findById(widgetId);
    }

    function updateWidget(widgetId, widget) {
        return WidgetModel
            .update(
                {_id: widgetId}, {
                    $set: widget
                });
    }

    function deleteWidget(widgetId) {
        // Delete the widget, its reference in the parent page and delete the image
        // associated (if the widget is an IMAGE widget)
        return WidgetModel.findById(widgetId).populate('_page').then(function (widget) {
            widget._page.widgets.splice(widget._page.widgets.indexOf(widgetId), 1);
            widget._page.save();
            if (widget.type == "IMAGE") {
                //deleteUploadedImage(widget.url);
            }
            return WidgetModel.remove({_id: widgetId});
        }, function (err) {
            return err;
        });
    }

    function cascadeDelete(widgetId) {
        // Delete the widget and the associated image (if present)
        return WidgetModel.findById(widgetId)
            .then(function (widget) {
                if (widget.type == "IMAGE") {
                    //deleteUploadedImage(widget.url);
                }
                return WidgetModel.remove({_id: widgetId});
            }, function (err) {
                return err;
            });
    }

    // function reorderWidget(pageId, start, end) {
    //     console.log("sdfsdf");
    //     return WidgetModel
    //         .find({_page: pageId}, function (err, widgets) {
    //             widgets.forEach(function (widget) {
    //                 if (start < end) {
    //                     if (widget.order == start) {
    //                         widget.order = end;
    //                         widget.save();
    //                     }
    //                     else if (widget.order > start && widget.order <= end) {
    //                         widget.order = widget.order - 1;
    //                         widget.save();
    //                     }
    //                 } else {
    //                     if (widget.order == start) {
    //                         widget.order = end;
    //                         widget.save();
    //                     }
    //
    //                     else if (widget.order < start && widget.order >= end) {
    //                         widget.order = widget.order + 1;
    //                         widget.save();
    //                     }
    //                 }
    //             });
    //         });
    // }


    // function reorderWidget(pageId, start, end) {
    //     console.log(start);
    //     console.log(end);
    //     return WidgetModel
    //         .find({ _page: pageId}, function (err, widgets) {
    //             widgets.forEach(function (widget) {
    //                 if (start < end) {
    //                     if (widget.pos == start) {
    //                         widget.pos = end;
    //                         widget.save();
    //                     }
    //                     else if (widget.pos > start && widget.pos <= end) {
    //                         widget.pos = widget.pos - 1;
    //                         widget.save();
    //                     }
    //                 } else {
    //                     if (widget.pos == start) {
    //                         widget.pos = end;
    //                         widget.save();
    //                     }
    //
    //                     else if (widget.pos < start && widget.pos >= end) {
    //                         widget.pos = widget.pos + 1;
    //                         widget.save();
    //                     }
    //                 }
    //             });
    //         });
    // }

    // function createWidget(pageId, widget) {
    //     widget._page = pageId;
    //
    //     return WidgetModel
    //         .find({"_page": pageId})
    //         .then(
    //             function (widgets) {
    //                 widget.order = widgets.length;
    //
    //                 return WidgetModel
    //                     .create(widget)
    //                     .then(
    //                         function (newWidget) {
    //                             return model
    //                                 .PageModel
    //                                 .findPageById(pageId)
    //                                 .then(
    //                                     function (page) {
    //                                         console.log(page);
    //                                         page.widgets.push(newWidget);
    //                                         newWidget._page = page._id;
    //                                         console.log("helloooo"+page._id);
    //                                         page.save();
    //                                         newWidget.save();
    //                                         console.log(newWidget);
    //                                         return newWidget;
    //                                     },
    //                                     function (error) {
    //                                         console.log(error);
    //                                     }
    //                                 );
    //                         },
    //                         function (error) {
    //                             console.log(error);
    //                         });
    //
    //             },
    //             function (err) {
    //                 return null;
    //             }
    //         );
    // }

    // function createWidget(pageId, newWidget){
    //     console.log(newWidget);
    //     console.log(pageId);
    //     console.log("--------");
    //     return WidgetModel
    //         .create(newWidget)
    //         .then(function (widget) {
    //             console.log("here");
    //             return model
    //                 .PageModel
    //                 .findPageById(pageId)
    //                 .then(function (page) {
    //                     console.log("yahooo");
    //                     widget._page = page._id;
    //                     page.widgets.push(widget._id);
    //                     widget.save();
    //                     page.save();
    //                     console.log(widget+"terte");
    //                     return widget;
    //                 }, function (err) {
    //                     return err;
    //                 });
    //         }, function (err) {
    //             return err;
    //         });
    // }

    function createWidget(pageId, widget) {

        widget._page = pageId;
        return WidgetModel
            .find({"_page": pageId})
            .then(function (widgets) {
                    widget.pos = widgets.length;
                    return WidgetModel
                        .create(widget)
                        .then(function (newWidget) {
                            return model.PageModel
                                .findPageById(pageId)
                                .then(function (page) {
                                    newWidget._page = page._id;
                                    page.widgets.push(newWidget._id);
                                    page.save();
                                    newWidget.save();

                                    return newWidget;
                                }, function (err) {
                                    res.sendStatus(404);
                                });
                        }, function (err) {
                            res.sendStatus(404);
                        });
                },
                function (err) {
                    res.sendStatus(404).send(err);
                });
    }

    function reorderWidget(pageId, start, end) {
        return model.PageModel
            .findPageById(pageId)
            .then(function (page) {
                page.widgets.splice(end, 0, page.widgets.splice(start, 1)[0]);
                page.save();
                return 200;
            }, function (err) {
                return err;
            });
    }


};
