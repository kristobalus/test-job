
const autocannon = require('autocannon')

const instance = autocannon({
    url: `http://${process.env.HOST ?? "polls-service.load-tests.svc.cluster.local"}`,
    duration: process.env.DURATION ? parseInt(process.env.DURATION) : 60,
    amount: process.env.AMOUNT ? parseInt(process.env.AMOUNT) : undefined,
    connections: process.env.CONNECTIONS ? parseInt(process.env.CONNECTIONS) : 10,
    pipelining: process.env.PIPELINING ? parseInt(process.env.PIPELINING) : 5,
    warmup: true,
    requests: [
        {
            method: 'POST',
            title: "feed.history",
            path: '/polls/feed/history',
            setupRequest: (req, context) => {
                req.body = JSON.stringify({
                    "organizationId": "6911691355886452736",
                    "eventId": "644",        
                    "userId": "6772240274761449472",
                    "deviceId": "B5EAC246-A58F-4F50-97D5-CB4A15B141E9",
                    "questionType": [ "1" ] ,
                    "pagination": {
                        "page": 0,
                        "pageSize": 20
                    }
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