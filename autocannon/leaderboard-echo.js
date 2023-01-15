
const autocannon = require('autocannon')

const instance = autocannon({
    url: `http://${process.env.HOST}:3000/polls/leaderboard/echo`,
    amount: 240000,
    duration: 60,
    requests: [
        {
            method: 'POST',
            path: '/polls/leaderboard.list',
            body: JSON.stringify({
                "organizationId": "6911691355886452736",
                "eventId": "644"
            })
        }
    ]
}, console.log)

// this is used to kill the instance on CTRL-C
process.once('SIGINT', () => {
    instance.stop()
})

// just render results
autocannon.track(instance, {renderProgressBar: false})
