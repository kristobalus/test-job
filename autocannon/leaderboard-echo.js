
const autocannon = require('autocannon')

const instance = autocannon({
    url: `http://${process.env.HOST}:3000`,
    amount: 240000,
    duration: 60,
    requests: [
        {
            title: "leaderboard.echo",
            method: 'POST',
            path: '/polls/leaderboard/echo',
            body: JSON.stringify({
                "organizationId": "6911691355886452736",
                "eventId": "644"
            })
        }
    ]
}, console.log)

function finishedBench (err, res) {
    console.log('finished bench', err, res)
}

// this is used to kill the instance on CTRL-C
process.once('SIGINT', () => {
    instance.stop()
})

// just render results
autocannon.track(instance, {renderProgressBar: true, renderResultsTable: true})

console.log(`benchmarking started...`)