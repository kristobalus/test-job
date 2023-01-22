
const autocannon = require('autocannon')

const instance = autocannon({
    url: `http://${process.env.HOST}:3000`,
    duration: process.env.DURATION ? parseInt(process.env.DURATION) : 60,
    connections: process.env.CONNECTIONS ? parseInt(process.env.CONNECTIONS) : 10,
    pipelining: process.env.PIPELINING ? parseInt(process.env.PIPELINING) : 1,
    workers: 2,
    warmup: true,
    requests: [
        {
            title: "leaderboard.echo",
            method: 'POST',
            path: '/polls/leaderboard/echo',
            body: JSON.stringify({
                "organizationId": "6911691355886452736",
                "eventId": 644
            })
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