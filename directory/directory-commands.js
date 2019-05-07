const {google} = require('googleapis');

const key = require('./../auth.json');
const scopes = ['https://www.googleapis.com/auth/admin.directory.group.readonly','https://www.googleapis.com/auth/admin.directory.user.readonly'];
const jwt = new google.auth.JWT(
    key.client_email,
    null,
    key.private_key, 
    scopes);
const directory = google.admin('directory_v1');

var authorize = (email) => {
    jwt.subject = email;
    jwt.authorize((err, response) => {
        if (err) {
            return err;
        }
    });
};

var listUsers = (customer, maxResults, callback) => {
    if (authorize(email)) {
        return callback('Authorization failed');
    }

    directory.users.list({
        customer,
        maxResults,
        orderBy: 'email',
    }, (err, res) => {
        if (err) return callback(err);
  
        const users = res.data.users;
        if (users.length) {
            return callback(users);
        } else {
            return callback('No users found');
        }
    });
}