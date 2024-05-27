export default () => ({
    cors: {
        origin: process.env.CORS_ORIGIN || true,
        methods: process.env.CORS_METHODS || 'GET,PUT,PATCH,POST',
        credentials: process.env.CORS_CREDENTIALS || true,
    },
    email: {
        key: process.env.BREVO_API_KEY || '',
    },
});