import knex from 'knex'

import nameGenerator from './lib/name-generator'

const db = knex({
  client: 'mysql',
  connection: {
    timezone: 'UTC',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
  }
})

// Events table only contains ids so using this to fake relational data
const getCareRecipientName = nameGenerator()

const decorateCareRecipient = ({ id }: { id: string }): CareRecipient => ({ id, name: getCareRecipientName(id) })

interface CareRecipient {
  id: string
  name: string
}

export const getCareRecipients = async (): Promise<CareRecipient[]> => {
  const recipients = await db.distinct().select('care_recipient_id as id').from('events')
  return recipients.map(decorateCareRecipient)
}

// this doesn't actually need to hit the db at the moment
export const getCareRecipient = async (recipientId : string): Promise<CareRecipient> => {
  return decorateCareRecipient({ id: recipientId })
}

export const getEventsPerDayForCareRecipient = (recipientId: string): knex.QueryBuilder =>
  db.select(db.raw('DATE(`timestamp`) as date'))
    .count('* as numberOfEvents')
    .from('events')
    .orderBy('timestamp', 'asc')
    .where('care_recipient_id', recipientId)
    .groupByRaw('DATE(`timestamp`)')

interface EventsOptions {
  recipientId?: string;
  date?: Date;
}

export const getEvents = ({ recipientId, date }: EventsOptions): knex.QueryBuilder => {
  const query = db
    .select(
      'id',
      'event_type as eventType',
      'visit_id as visitId',
      'caregiver_id as caregiverId',
      'care_recipient_id as careRecipientId',
      // the timestamp is a mix of UTC and GMT so this is a quick and dirty solution to clean that up
      db.raw('CASE WHEN `timestamp` LIKE "%+01:00" THEN CONVERT_TZ(`timestamp`, "+01:00", "+00:00") ELSE FROM_UNIXTIME(UNIX_TIMESTAMP(`timestamp`)) END as `timestamp`')
    )
    .from('events')

  if (recipientId) {
    query.where('care_recipient_id', recipientId)
  }

  if (date) {
    query.whereRaw('DATE(`timestamp`) = ?', date)
  }

  return query.orderBy('timestamp', 'desc')
}

export default db
