
const autocannon = require('autocannon')

const instance = autocannon({
    url: `http://${process.env.HOST}:3000`,
    duration: 60,
    warmup: true,
    requests: [
        {
            method: 'POST',
            title: "feed.get",
            path: '/polls/feed/get',
            setupRequest: (req, context) => {
                req.body = JSON.stringify({
                    "organizationId": "6911691355886452736",
                    "eventId": 644
                })
                return req
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