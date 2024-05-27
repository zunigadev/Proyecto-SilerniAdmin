export default () => ({
    cors: {
        origin: process.env.CORS_ORIGIN || true,
        methods: process.env.CORS_METHODS || 'GET,PUT,PATCH,POST',
        credentials: process.env.CORS_CREDENTIALS || true,
    },
    email: {
        key: process.env.EMAIL_API_KEY || '',
        sender: process.env.EMAIL_SENDER || '',
        nameSender: process.env.EMAIL_NAME_SENDER || 'no reply',
    },
});