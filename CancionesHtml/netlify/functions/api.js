const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    const MASTER_KEY = process.env.JSONBIN_MASTER_KEY;
    const { endpoint, method, body } = JSON.parse(event.body || '{}');

    try {
        const response = await fetch(`https://api.jsonbin.io/v3/${endpoint}`, {
            method: method || 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': MASTER_KEY
            },
            body: body ? JSON.stringify(body) : undefined
        });

        const data = await response.json();
        return {
            statusCode: response.status,
            body: JSON.stringify(data)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};