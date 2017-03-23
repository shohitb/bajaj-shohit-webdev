/**
 * Created by shohitbajaj on 18/03/17.
 */

module.exports = function () {
    var mongoose = require('mongoose');

    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        phone: String,
        email: String,
        websites: [{type: mongoose.Schema.Types.ObjectId, ref: 'WebsiteModel'}],
        dateCreated: { type: Date, default: Date.now}
    }, {collection: 'user'});

    //console.log("schema");
    return UserSchema;
};
