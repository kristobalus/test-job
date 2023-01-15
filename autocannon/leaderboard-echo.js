
const autocannon = require('autocannon')

autocannon({
    url: "http://$HOST:3000/polls/leaderboard/echo",
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