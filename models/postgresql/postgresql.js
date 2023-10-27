import pgPromise from 'pg-promise'

const pgp = pgPromise()

const dbPostgre = pgp('postgres://fl0user:WugM1KRGYF4H@ep-noisy-darkness-34801236.us-east-2.aws.neon.fl0.io:5432/DBGESTLAB?sslmode=require')

export { dbPostgre }
