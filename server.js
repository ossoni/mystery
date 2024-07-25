const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const fetch = require('node-fetch');
const app = express();
const PORT = 3000;

const FILE_PATH = './access_codes.json';

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

// Load access codes from file
let accessCodes = [];
if (fs.existsSync(FILE_PATH)) {
    accessCodes = JSON.parse(fs.readFileSync(FILE_PATH));
}

// Endpoint to create access code
app.post('/create-code', async (req, res) => {
    const codeData = req.body;
    const gistData = {
        description: "Access Code",
        public: false,
        files: {
            "access_codes.json": {
                content: JSON.stringify(codeData)
            }
        }
    };

    try {
        // Token 제거된 상태로 요청
        const response = await fetch('https://api.github.com/gists', {
            method: 'POST',
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            },
            body: JSON.stringify(gistData)
        });
        const data = await response.json();
        if (!data.id) throw new Error('Failed to create gist');
        codeData.gistId = data.id;
        accessCodes.push(codeData);
        fs.writeFileSync(FILE_PATH, JSON.stringify(accessCodes));
        res.status(201).send(codeData);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Endpoint to get access codes
app.get('/access-codes', (req, res) => {
    res.json(accessCodes);
});

// Endpoint to delete access code
app.delete('/delete-code/:code', async (req, res) => {
    const code = req.params.code;
    const codeData = accessCodes.find(c => c.code === code);

    try {
        // Token 제거된 상태로 요청
        await fetch(`https://api.github.com/gists/${codeData.gistId}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        accessCodes = accessCodes.filter(c => c.code !== code);
        fs.writeFileSync(FILE_PATH, JSON.stringify(accessCodes));
        res.status(204).send();
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
