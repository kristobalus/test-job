
const autocannon = require('autocannon');

/**
 * @type {[*]}
 */
const users = require("../data/test-users.json");
const length = process.env.USERS ? parseInt(process.env.USERS) : 50

console.log(`users in list`, length)

const instance = autocannon({
    url: `http://${process.env.HOST ?? "localhost"}`,
    duration: process.env.DURATION ? parseInt(process.env.DURATION) : 60,
    connections: process.env.CONNECTIONS ? parseInt(process.env.CONNECTIONS) : 10,
    pipelining: process.env.PIPELINING ? parseInt(process.env.PIPELINING) : 5,
    warmup: true,
    // maxOverallRequests: process.env.COUNT ? parseInt(process.env.COUNT) : undefined,
    requests: [
        {
            title: "leaderboard.friends",
            method: 'POST',
            path: `/${ process.env.PREFIX ?? 'polls' }/leaderboard/list`,
            setupRequest: (req, context) => {
                const start = Math.floor(Math.random() * (users.length - length))
                const end = start + length
                const friends = users.slice(start, end)
                friends.sort(function () {
                    return Math.random() - 0.5;
                });
                req.body = JSON.stringify({
                    "organizationId": "6911691355886452736",
                    "eventId": 644,
                    "usersIds": friends.map(user => user.Id)
                })
                return req
            },
            onResponse: (status, body, context, headers) => {
                // console.log(status, body, context, headers)
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