
const autocannon = require('autocannon');
const fs = require('fs');

/**
 * @type {[*]}
 */
const users = require("../data/test-users.json");

const instance = autocannon({
    url: `http://${process.env.HOST}:3000`,
    duration: process.env.DURATION ?? 60,
    warmup: true,
    maxOverallRequests: process.env.COUNT ?? undefined,
    requests: [
        {
            title: "leaderboard.listjs",
            method: 'POST',
            path: '/polls/leaderboard/listjs',
            setupRequest: (req, context) => {
                const start = process.env.RANDOM_OFFSET ? Math.floor(Math.random() * (users.length / 2)) : 0
                const end = start + process.env.USERS ?? 50
                const friends = users.slice(start, end)
                // console.log(start, end, friends.length)
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