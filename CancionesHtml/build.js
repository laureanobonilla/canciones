const fs = require('fs');

// Variables de entorno que Netlify proveerá en producción
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
const JSONBIN_MASTER_KEY = process.env.JSONBIN_MASTER_KEY || '';
const JSONBIN_INDICE_ID = process.env.JSONBIN_INDICE_ID || '';

// Procesar index.html
if (fs.existsSync('index.html')) {
    let html = fs.readFileSync('index.html', 'utf8');
    html = html.replace(/__GEMINI_API_KEY__/g, GEMINI_API_KEY);
    html = html.replace(/__JSONBIN_MASTER_KEY__/g, JSONBIN_MASTER_KEY);
    html = html.replace(/__JSONBIN_INDICE_ID__/g, JSONBIN_INDICE_ID);
    fs.writeFileSync('index.html', html);
}

// Procesar admin.html
if (fs.existsSync('admin.html')) {
    let html = fs.readFileSync('admin.html', 'utf8');
    html = html.replace(/__GEMINI_API_KEY__/g, GEMINI_API_KEY);
    html = html.replace(/__JSONBIN_MASTER_KEY__/g, JSONBIN_MASTER_KEY);
    html = html.replace(/__JSONBIN_INDICE_ID__/g, JSONBIN_INDICE_ID);
    fs.writeFileSync('admin.html', html);
}

console.log("Variables de entorno inyectadas correctamente en la compilación.");