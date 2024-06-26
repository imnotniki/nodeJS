require('dotenv').config();
const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();

const HOST_PORT = process.env.HOST_PORT;

const websites = [
  'https://shananiki.org',
  'https://pomodoro.shananiki.org',
  'https://shananiki.xyz',
  // more to come
];

const checkWebsite = async (url) => {
    try {
        await axios.get(url, {
            headers: { 'User-Agent': 'shananiki webrequest 1' }
        });
        return 'OK';
    } catch (error) {
        return 'OFFLINE';
    }
};

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
    let results = '';
    for (const website of websites) {
        const status = await checkWebsite(website);
        const color = status === 'OK' ? 'green' : 'red';
        results += `
        <tr>
            <td style="text-align: left; padding: 8px;">${website.replace('https://', '')}</td>
            <td style="color: ${color}; padding: 8px;">${status}</td>
        </tr>
        `;
    }

    res.send(`
    <html>
        <head>
        <title>Status</title>
        <style>
            body {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                font-family: Arial, sans-serif;
                background-color: #f0f0f0;
            }
            .container {
                background: #fff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                text-align: center;
            }
            .container p {
                font-size: 1.2em;
                margin: 10px 0;
            }
            .container span {
                font-weight: bold;
            }
        </style>
        </head>
        <body>
            <div class="container">
                <table>
                    <thead>
                        <tr>
                            <th>System</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${results}
                    </tbody>
                </table>
            </div>
        </body>
    </html>
    `);
});

app.listen(HOST_PORT, () => {
  console.log(`Server is running on http://localhost:${HOST_PORT}`);
});
