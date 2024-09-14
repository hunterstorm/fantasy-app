//imports
const express = require('express');
const router = express.Router();
const path = require('path')
const { execSync } = require('child_process');

const scriptDirectory = path.join(__dirname, '../../../../../scripts');
process.chdir(scriptDirectory);

router.get('/', (req,res) => {
    try {
        const command = 'Rscript team_stats.R'
        const result = execSync(command, {encoding: 'utf-8'})
        console.log('R Script Output:', result);
        const jsonData = JSON.parse(result);
        res.json(jsonData)
    }catch(error) {
        console.error('Error running script', error);
        console.error('Script stderr:', error.stderr.toString());
        console.error('Script stdout:', error.stdout.toString());
        res.status(500).json({error:'Internal Server Error'})
    }
});

module.exports = router;