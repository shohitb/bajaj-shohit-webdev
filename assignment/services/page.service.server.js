/**
 * Created by shohitbajaj on 27/02/17.
 */

module.exports = function (app) {
    app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);
    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/page/:pageId", findPageById);

    var pages = [
        {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
        {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
        {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"},
        {"_id": "544", "name": "Post 4", "websiteId": "567", "description": "Lorem"}
    ];

    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.websiteId;

        var page = [];
        for (var w in pages) {
            if (websiteId === pages[w].websiteId) {
                page.push(pages[w]);
            }
        }
        res.json(page);
    }

    function findPageById(req, res) {
        var pageId = req.params['pageId'];
        for (var w in pages) {
            if (pages[w]._id === pageId) {
                res.send(pages[w]);
                return;
            }
        }
    }

    function deletePage(req, res) {
        var pageId = req.params['pageId'];
        for (var w in pages) {
            if (pages[w]._id === pageId) {
                pages.splice(w, 1);
                res.sendStatus(200);
                return;
            }
        }
    }

    function updatePage(req, res) {
        var page = req.body;
        var pageId = req.params['pageId'];
        for (var w in pages) {
            if (pages[w]._id === pageId) {
                pages[w].name = page.name;
                pages[w].description = page.description;
                res.json(page);
                return;
            }
        }
    }


    function createPage(req, res) {
        var newPage = req.body;
        newPage.websiteId = req.params['websiteId'];
        newPage._id = (new Date()).getTime().toString();
        pages.push(newPage);
        res.json(newPage);
    }
};