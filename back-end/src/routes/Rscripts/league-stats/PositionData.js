const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs/promises');
const { execSync } = require('child_process');

const scriptDirectory = path.join(__dirname, '../../../../../scripts');
process.chdir(scriptDirectory);

const positions = [ 'qb_leaders_2023', 'wr_leaders_2023', 'rb_leaders_2023', 'te_leaders_2023', 'k_leaders_2023'];

const commands = ['Rscript position_data.R', 'Rscript kicking_data.R']

router.get('/', async (req, res) => {
    try {
        //run scripts
        for (const command of commands) {
            execSync(command, {encoding: 'utf-8'})
        }
        
        // Load JSON data from files dynamically
        const jsonData = {};
        for (const position of positions) {
            const filePath = `json-files/position-data/${position}.json`;
            const fileContent = await fs.readFile(filePath, 'utf-8');
            jsonData[position] = JSON.parse(fileContent);
        }
        res.json(jsonData);

    } catch (error) {
        console.error('Error running script', error);
        console.error('Script stderr:', error.stderr.toString());
        console.error('Script stdout:', error.stdout.toString());
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
