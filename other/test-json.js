
const str = `{"name":"app","hostname":"c166d9d1079a","pid":1,"level":20,"streamName":"call-processor-4","dto":{"className":"BitrixShowResponse","jsonSerializedData":"{\\"Uniqueid\\":\\"1673678259.31577\\",\\"Linkedid\\":\\"1673678259.31577\\",\\"data\\":true,\\"error\\":false,\\"id\\":\\"016f6d42-af40-4c38-8a22-651a4636d465\\"}","responseStream":"bitrix-connector","streamName":"call-processor-4"},"msg":"publishing dto","time":"2023-01-14T06:37:40.554Z","v":0}`
console.time("parse")
for (let i = 0; i < 20; i++) {
    JSON.parse(str)
}
console.timeEnd("parse")