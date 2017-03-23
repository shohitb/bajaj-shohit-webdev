/**
 * Created by shohitbajaj on 27/02/17.
 */

module.exports = function (app, model) {
    var PageModel = model.PageModel;
    app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);
    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/page/:pageId", findPageById);


    function findAllPagesForWebsite(req, res) {

        var websiteId = req.params.websiteId;

        PageModel
            .findAllPagesForWebsite(websiteId)
            .then(
                function (pages) {
                    res.json(pages);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            );
    }

    function findPageById(req, res) {

        var pageId = req.params.pageId;

        PageModel
            .findPageById(pageId)
            .then(
                function (page) {
                    res.json(page);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                });
    }

    function deletePage(req, res) {
        var pageId = req.params.pageId;
        PageModel
            .deletePage(pageId)
            .then(function (response) {
                res.sendStatus(200);
            }, function (err) {
                res.sendStatus(404);
            });
    }

    function updatePage(req, res) {

        var pageId = req.params.pageId;
        var page = req.body;
        PageModel
            .updatePage(pageId, page)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }


    function createPage(req, res) {
        var newPage = req.body;
        var websiteId = req.params.websiteId;

        PageModel
            .createPage(websiteId, newPage)
            .then(function (newPage) {
                    console.log("lol");
                    res.send(newPage);

                },
                function (err) {
                    res.sendStatus(400).send(err);
                });
    }
};