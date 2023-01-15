
const autocannon = require('autocannon')

autocannon({
    url: `http://${process.env.HOST}:3000/polls/leaderboard/list`,
    amount: 60000,
    duration: 60,
    requests: [
        {
            method: 'POST',
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
}, console.log)