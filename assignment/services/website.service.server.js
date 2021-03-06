/**
 * Created by shohitbajaj on 27/02/17.
 */

module.exports = function (app, model) {

    var WebsiteModel = model.WebsiteModel;

    app.get('/api/user/:userId/website', findWebsitesByUser);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);
    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/website/:websiteId", findWebsiteById);



    function createWebsite(req, res) {
        var website = req.body;
        var userId = req.params.userId;
        // websites.push(website);
        // res.send(websites);
        WebsiteModel
            .createWebsiteForUser(userId, website)
            .then(
                function (website) {
                    res.json(website);

                },
                function (error) {
                    res.status(400).send(error);
                }
            );
    }

    function findWebsitesByUser(req, res) {
        var uid = req.params.userId;
        WebsiteModel
            .findWebsitesByUser(uid)
            .then(
                function (websites) {
                    res.json(websites);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;
        WebsiteModel
            .findWebsiteById(websiteId)
            .then(
                function (website) {
                    res.json(website);
                },
                function (error) {
                    res.status(400).send(error);
                }
            );
    }

    function updateWebsite(req, res) {
        var newWebsite = req.body;
        var websiteId = req.params.websiteId;

        WebsiteModel
            .updateWebsite(websiteId, newWebsite)
            .then(
                function (website) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.status(404).send(error);
                }
            );
    }

    function deleteWebsite(req, res) {
        // var websiteId = req.params.websiteId;
        // WebsiteModel
        //     .deleteWebsite(websiteId)
        //     .then(function (userId) {
        //
        //             res.sendStatus(200);
        //
        //         },
        //         function (error) {
        //             res.status(404).send("Cannot remove website from websites");
        //         }
        //     );
        var websiteId = req.params.websiteId;
        WebsiteModel
            .deleteWebsite(websiteId)
            .then(function (response) {
                if(response.result.n == 1 && response.result.ok == 1){
                    res.sendStatus(200);
                }
                else{
                    res.sendStatus(404);
                }
            }, function (err) {
                res.sendStatus(404);
            });
    }

};

