const {google} = require('googleapis');

const key = require('./../auth.json');
const scopes = ['https://www.googleapis.com/auth/admin.directory.group.readonly','https://www.googleapis.com/auth/admin.directory.user.readonly'];
const auth = new google.auth.JWT(
    key.client_email,
    null,
    key.private_key, 
    scopes);
const directory = google.admin('directory_v1');

var authorize = (email) => {
    auth.subject = email;
    auth.authorize((err, response) => {
        if (err) {
            return err;
        }
    });
};

var listUsers = (customer, maxResults, callback) => {
    if (authorize('svcgam@booking.com')) {
        return callback('Authorization failed');
    }

    directory.users.list({
        auth,
        customer,
        maxResults,
        orderBy: 'email',
    }, (err, res) => {
        if (err) return callback(err);
  
        const users = res.data.users;
        if (users.length) {
            return callback(null, users);
        } else {
            return callback('No users found');
        }
    });
}

module.exports = {
    listUsers
}