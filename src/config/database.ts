export const mongooseConnection = {
    uri: process.env.MONGODB_URI || 'mongodb://localhost/prestamype',
    user: process.env.MONGODB_USER,
    password: process.env.MONGODB_PASSWORD
}

export const EXPIRES_IN = 60 * 30;