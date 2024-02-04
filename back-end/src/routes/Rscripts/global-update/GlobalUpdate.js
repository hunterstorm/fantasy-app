const express = require('express');
const router = express.Router();
const { execSync } = require('child_process');

const { processPositionData } = require('./positionDataProcessor');
const { processKickingData } = require('./kickingDataProcessor');

const commands = ['Rscript position_data.R', 'Rscript kicking_data.R', 'Rscript off_def_epa.R'];

router.post('/', async (req, res) => {
    try {
        const outputs = await Promise.all(commands.map(async (command) => {
            try {
                const scriptOutput = await executeScript(command);
                console.log(`Script output for ${command}:`, scriptOutput);
                return { command, scriptOutput };
            } catch (scriptError) {
                console.error(`Error running script for ${command}:`, scriptError);
                throw scriptError;
            }
        }));

        for (const output of outputs) {
            const { command, scriptOutput } = output;
            if (command === 'Rscript position_data.R') {
                await processPositionData(scriptOutput);
                console.log(`Position data processed successfully for ${command}`);
            } else if (command === 'Rscript kicking_data.R') {
                await processKickingData(scriptOutput);
                console.log(`Kicking data processed successfully for ${command}`);
            } else {
                console.log(`Unhandled command: ${command}`);
            }
        }

        res.json({ success: true, message: 'Scripts executed successfully' });
    } catch (error) {
        console.error('General error:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

async function executeScript(command) {
    try {
        return await execSync(command, { encoding: 'utf-8' });
    } catch (scriptError) {
        console.error(`Error running script for ${command}:`, scriptError);
        throw scriptError;
    }
}

module.exports = router;
