
module.exports = {
    "type": "postgres",
    "host": process.env.DB_HOST || '10.37.64.154',
    "port": process.env.DB_PORT || 5432,
    "username": process.env.DB_USER || 'postgresql',
    "password": process.env.DB_PASS || '123456',
    "database": process.env.DB_DATABASE || 'ted_dev',
    entities: [
        './entity/*.ts'
    ],
    seeds: [
        './seed/*.ts'
    ],
    factories: [
        './factory/*.ts'
    ],
 }