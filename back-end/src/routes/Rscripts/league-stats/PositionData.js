const express = require('express');
const router = express.Router();
const path = require('path');
const { execSync } = require('child_process');
const fs = require('fs/promises');

const scriptDirectory = path.join(__dirname, '../../../../../scripts');
process.chdir(scriptDirectory);

const positions = [ 'qb_leaders_2023', 'wr_leaders_2023', 'rb_leaders_2023'];

router.get('/', async (req, res) => {
    try {
        const jsonData = {};

        // Run R script to generate JSON files
        const command = 'Rscript position_data.R';
        const result = execSync(command, { encoding: 'utf-8' });

        // Load JSON data from files dynamically
        for (const position of positions) {
            const filePath = `json-files/position-data/${position}.json`;
            const fileContent = await fs.readFile(filePath, 'utf-8');
            jsonData[position] = JSON.parse(fileContent);
        }

        console.log('Parsed JSON Data:', jsonData);
        res.json(jsonData);
    } catch (error) {
        console.error('Error running script', error);
        console.error('Script stderr:', error.stderr.toString());
        console.error('Script stdout:', error.stdout.toString());
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
