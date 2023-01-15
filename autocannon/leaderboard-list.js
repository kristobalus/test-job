
const autocannon = require('autocannon')

const instance = autocannon({
    url: `http://${process.env.HOST}:3000/polls/leaderboard/list`,
    duration: 60,
    warmup: true,
    requests: [
        {
            method: 'POST',
            title: "leaderboard.list",
            path: '/polls/leaderboard.list',
            setupRequest: (req, context) => {
                req.body = JSON.stringify({
                    "organizationId": "6911691355886452736",
                    "eventId": "644",
                    "pagination": {
                        "page": Math.floor(Math.random() * 500),
                        "pageSize": 20
                    }
                })
                return req
            }
        }
    ]
})

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