const _ = require('lodash');
const yargs = require('yargs');

const directory = require('./directory/directory-commands');

const customerOptions = {
    describe: "The customer ID of your company",
    demand: true,
    alias: "c"
}
const maxResultsOptions = {
    describe: "The number of records to return",
    demand: false,
    default: 100,
    alias: "m"
}

const argv = yargs
    .command('listUsers', 'List all users in Gsuite', {
        customer: customerOptions,
        maxResults: maxResultsOptions
    })
    .help()
    .argv;

var command = argv._[0];

if (command === 'listUsers') {
    directory.listUsers(argv.customer, argv.maxResults, (err, res) => {
        if (err) {
            return console.log('Unable to list users, ', err);
        }
        console.log(res);
    })
}