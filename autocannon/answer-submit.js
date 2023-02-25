
const autocannon = require('autocannon')

const instance = autocannon({
    url: `http://${process.env.HOST ?? "localhost"}:3000`,
    duration: process.env.DURATION ? parseInt(process.env.DURATION) : 60,
    amount: process.env.AMOUNT ? parseInt(process.env.AMOUNT) : undefined,
    connections: process.env.CONNECTIONS ? parseInt(process.env.CONNECTIONS) : 10,
    pipelining: process.env.PIPELINING ? parseInt(process.env.PIPELINING) : 5,
    warmup: true,
    requests: [
        {
            method: 'POST',
            title: "leaderboard.list",
            path: `/${ process.env.PREFIX ?? 'polls' }/leaderboard/list`,
            setupRequest: (req, context) => {
                req.body = JSON.stringify({
                    "organizationId": "6911691355886452736",
                    "eventId": 644,
                    "pagination": {
                        "page": Math.floor(Math.random() * 500),
                        "pageSize": process.env.PAGE_SIZE ? parseInt(process.env.PAGE_SIZE) : 20
                    }
                })
                return req
            },
            onResponse: (status, body, context, headers) => {
                if ( process.env.AMOUNT ) {
                    console.log(status, body, context, headers)
                }
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