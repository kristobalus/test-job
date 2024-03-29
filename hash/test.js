
const hash = require('object-hash');

console.time("hash")
for(let i = 0; i < 1_000; i++) {
    hash({
        "audience": "api",
        "username": [
            "6909132312244387840",
            "6817829006117699584",
            "7013433561516605440",
            "7013437744105914368",
            "7013433413394759680",
            "7013434180721704960",
            "7013434218118119424",
            "7013435663429140480",
            "7013438591665700864",
            "7013438669449068544",
            "6902283971439099904",
            "6856783825813372928",
            "7013433265264525312",
            "7013437776045539328",
            "7013438983350779904",
            "6856742362194903040",
            "7013437897390948352",
            "6962371713464008704",
            "7013434098815336448",
            "7013434877097803776",
            "7013436616450506752",
            "7013437384083636224",
            "7013437861655478272",
            "6856902655059427328",
            "7013438597965545472",
            "7013438843563016192",
            "6856902758226722816",
            "7013434197859631104",
            "7013435302404423680",
            "7013435491575922688",
            "7013436482127921152",
            "7013438188643418112",
            "7013434428265332736",
            "7013435084082511872",
            "7013435552993116160",
            "7013436460397232128",
            "7013433579405312000",
            "7013436441019547648",
            "7013437096136278016",
            "7013438283371773952"
        ],
        "skipUsernameResolution": true,
        "fields": {
            "api": [
                "firstName",
                "lastName",
                "avatar"
            ]
        },
        "includingBanned": true
    })
}
console.timeEnd("hash")


