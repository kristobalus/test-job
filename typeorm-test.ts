import { ConnectionOptions, createConnections, getConnection } from 'typeorm'
import { Moderation } from './entities/moderation'

(async () => {

    const eventId = process.env.EVENT_ID || '644'
    const orgId = process.env.ORG_ID || '6911691355886452736'

    await createConnections([{
        type: 'postgres',
        host: process.env.PG_HOST,
        port: 5432,
        username: 'polls',
        password: process.env.PG_PASSWORD,
        database: 'polls',
        entities: [
            Moderation
        ],
        synchronize: false,
        ssl: {
            rejectUnauthorized: false,
        },
        extra: {
            min: 1,
            max: 10,
            connectionTimeoutMillis: 5000,
            idleTimeoutMillis: 30000,
        },
        logging: false,
    }] as ConnectionOptions[])

    const count = 100_000
    const time1 = Date.now()

    for (let i = 0; i < count; i++) {
        const repository = getConnection().getRepository(Moderation)
        const qb = repository.createQueryBuilder()
        qb.andWhere('organization_id = :orgId', { orgId })
        qb.andWhere('event_id = :eventId', { eventId })
        // @ts-ignore
        const item = await qb.getRawOne()
    }
    console.log(`raw: millis per select`, (Date.now() - time1) / count)

    const time2 = Date.now()
    for (let i = 0; i < count; i++) {
        // @ts-ignore
        const item = await Moderation.findOne({
            where: {
                organizationId: orgId,
                eventId: parseInt(eventId) as any
            }
        })
    }
    console.log(`orm: millis per select`, (Date.now() - time2) / count)

})().catch(err => console.log(err))