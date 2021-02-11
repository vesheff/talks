module.exports = {
    type: process.env.DB_TYPE || 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: +process.env.DB_PORT || 3306,
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'mysql',
    database: process.env.DB_DATABASE_NAME,
    synchronize: true,
    entities: [
        'src/data/entities/**/*.entity.ts',
    ],
    migrations: [
        'src/data/migrations/**/*.ts',
    ],
    cli: {
        entitiesDir: 'src/data/entities',
        migrationsDir: 'src/data/migrations',
    },
}
