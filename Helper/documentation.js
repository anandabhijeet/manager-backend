const swaggerDocumentation = {
    openapi: "3.0.0",
    info: {
        title: "Demo",
        version: "0.0.1",
        description: "first swagger documentation"
    },

    servers: [
        {
            url: "http://localhost:3000",
            description:"local dev"
        }
    ]
};

module.exports = swaggerDocumentation;