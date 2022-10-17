module.exports = {
    babel: {
        plugins: [
            [
                '@babel/plugin-transform-typescript',
                {
                    allowDeclareFields: true,
                },
            ],
        ],
    },
};