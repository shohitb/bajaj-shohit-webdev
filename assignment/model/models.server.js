/**
 * Created by shohitbajaj on 18/03/17.
 */

// module.exports = function () {
//     //var connectionString = 'mongodb://127.0.0.1:27017/WebdevSpring2016';
//     //mongoose.connect(connectionString);
//     var mongoose = require("mongoose");
//     var mongojs  = require('mongojs');
//
//     mongoose.connect('mongodb://localhost/cs5610');
//     mongojs('cs5610');
//
//     var UserModel = require("./user/user.model.server.js")();
//     //var WebsiteModel = require("./website/website.model.server.js")();
//     //var PageModel = require("./page/page.model.server.js")();
//     //var WidgetModel = require("./widget/widget.model.server.js")();
//
//     var model = {
//         UserModel: UserModel
//       //  WebsiteModel: WebsiteModel,
//        // PageModel: PageModel,
//        // WidgetModel: WidgetModel
//     };
//
//    // WebsiteModel.setModel(model);
//     UserModel.setModel(model);
//     return model;
// };


module.exports = function () {
    var mongoose = require('mongoose');
    var UserModel = require("./user/user.model.server")();
    var WebsiteModel = require("./website/website.model.server")();
    var PageModel = require("./page/page.model.server")();
    var WidgetModel = require("./widget/widget.model.server")();
    var model = {
        UserModel: UserModel,
        WebsiteModel: WebsiteModel,
        PageModel: PageModel,
        WidgetModel: WidgetModel
    };

    WidgetModel.setModel(model);
    WebsiteModel.setModel(model);
    UserModel.setModel(model);
    PageModel.setModel(model);
    mongoose.connection.on('connected', function () {
    });
    return model;
};