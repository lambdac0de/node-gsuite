const {google} = require('googleapis');

const key = require('./../auth.json');
const scopes = ['https://www.googleapis.com/auth/drive'];
const jwt = new google.auth.JWT(
    key.client_email,
    null,
    key.private_key, 
    scopes);
const drive = google.drive('v3');

var authorize = (email) => {
    jwt.subject = email;
    jwt.authorize((err, response) => {
        if (err) {
            return err;
        }
    });
};

var search = (email, fileName, allFields, callback) => {
    if (authorize(email)) {
        return callback('Authorization failed');
    }
    var params = {
        auth: jwt,
        q: `name contains '${fileName}'`
    };
    if (allFields) {
        params.fields = '*';
    }
    drive.files.list(params, (err, response) => {
        if (err) {
            return callback(err);
        }

        var files = response.data.files;
        if (files.length == 0) {
            return callback('No files found');
        }

        callback(null, files);
    });
}

var get_permissions = (email, fileId, callback) => {
    if (authorize(email)) {
        return callback('Authorization failed');
    }
    var params = {
        auth: jwt,
        fileId: fileId,
        fields: '*'
    };
    drive.permissions.list(params, (err, response) => {
        if (err) {
            return callback(err);
        }

        var perms = response.data.permissions;
        if (perms.length == 0) {
            return callback('No permissions found');
        }

        callback(null, perms);
    });
}

module.exports = {
    search,
    get_permissions
}