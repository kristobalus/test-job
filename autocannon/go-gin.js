
const autocannon = require('autocannon')
const qs = require('querystring')

const instance = autocannon({
    url: `http://${process.env.HOST}:8080` ?? `http://localhost:8080`,
    duration: 60,
    connections: 20,
    pipelining: 50,
    warmup: true,
    renderStatusCodes: true,
    requests: [
        {
            title: "leaderboard.listjs",
            method: 'GET',
            path: `/get`,
            setupRequest: (req, context) => {
                const query = {}
                query.orgId = "6911691355886452736"
                query.eventId = "644"
                query.page = Math.floor(Math.random() * 500)
                query.pageSize = process.env.PAGE_SIZE ? parseInt(process.env.PAGE_SIZE) : 20
                req.path = "/get?" + qs.stringify(query)
                return req
            },
            onResponse: (status, body, context, headers) => {
                // console.log(status, body)
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