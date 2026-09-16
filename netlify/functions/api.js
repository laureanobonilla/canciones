const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    const MASTER_KEY = process.env.JSONBIN_MASTER_KEY;
    
    if (!MASTER_KEY) {
        return { statusCode: 500, body: JSON.stringify({ error: "Master Key no configurada en el servidor" }) };
    }

    try {
        const { action, binId, data, binName } = JSON.parse(event.body || '{}');
        let url = "https://api.jsonbin.io/v3/b";
        let method = "GET";
        let body = undefined;

        if (action === 'create') {
            method = "POST";
            body = JSON.stringify(data);
        } else if (action === 'update') {
            method = "PUT";
            url = `https://api.jsonbin.io/v3/b/${binId}`;
            body = JSON.stringify(data);
        } else if (action === 'get') {
            method = "GET";
            url = `https://api.jsonbin.io/v3/b/${binId}/latest`;
        } else if (action === 'list') {
            method = "GET";
            url = "https://api.jsonbin.io/v3/b?meta=false";
        }

        const headers = {
            'Content-Type': 'application/json',
            'X-Master-Key': MASTER_KEY
        };
        if (binName && action === 'create') {
            headers['X-Bin-Name'] = binName;
        }

        const response = await fetch(url, { method, headers, body });
        const jsonResponse = await response.json();

        return {
            statusCode: response.status,
            body: JSON.stringify(jsonResponse)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};