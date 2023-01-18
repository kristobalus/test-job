
const autocannon = require('autocannon');
const fs = require('fs');

/**
 * @type {[*]}
 */
const users = require("../data/test-users.json");

const instance = autocannon({
    url: `http://${process.env.HOST}:3000`,
    duration: 60,
    warmup: true,
    requests: [
        {
            title: "leaderboard.listjs",
            method: 'POST',
            path: '/polls/leaderboard/listjs',
            setupRequest: (req, context) => {
                req.body = JSON.stringify({
                    "organizationId": "6911691355886452736",
                    "eventId": 644,
                    "usersIds": users.slice(0, process.env.USERS ?? 50).map(user => user.Id)
                })
                return req
            },
            onResponse: (req, context) => {

            }
        }
    ]
}, finishedBench)

function finishedBench (err, res) {
    // console.log('finished bench', err, res)
}

// this is used to kill the instance on CTRL-C
process.once('SIGINT', () => {
    instance.stop()
})

// just render results
autocannon.track(instance, {renderProgressBar: true, renderResultsTable: true})

console.log(`benchmarking started...`)