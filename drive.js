const _ = require('lodash');
const yargs = require('yargs');

const drive = require('./drive/drive-commands');

const emailOptions = {
    describe: "The email address of the target user",
    demand: true,
    alias: "e"
}
const fileNameOptions = {
    describe: "The filename, or parts of the filename, to search for",
    demand: true,
    alias: "f"
}
const allFieldsOptions = {
    describe: "Returns all fields/ metadata of the file",
    demand: false,
    alias: "a"
}
const fileIdOptions = {
    describe: "The file ID of the target file",
    demand: false,
    alias: "i"
}

const argv = yargs
    .command('search', 'Search a gdrive file', {
            emailAddress: emailOptions,
            fileName: fileNameOptions,
            allFields: allFieldsOptions
    })
    .command('get_permissions', 'Get all defined permissions on a file', {
            emailAddress: emailOptions,
            fileId: fileIdOptions
    })
    .help()
    .argv;

var command = argv._[0];

if (command === 'search') {
    drive.search(argv.emailAddress, argv.fileName, argv.allFields, (err, res) => {
        if (err) {
            return console.log('Unable to search drive, ', err);
        }
        console.log(res);
    })
}
if (command === 'get_permissions') {
    drive.get_permissions(argv.emailAddress, argv.fileId, (err, res) => {
        if (err) {
            return console.log('Unable to get permissions: ', err);
        }
        console.log(res);
    })
}